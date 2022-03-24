import { createModal, toggleModal, mTypes, renameModal } from './modal.js';
import { displayQuickMessage } from './utils.js';
import { setData, getData, getIcons, generateNewIconData, changeIconData } from './data.js';
import { updateFolderGrid } from './desktop.js';
import { renameTaskbarItem } from './taskbar.js';
import { updateFile } from './files.js';

const loadIcons = async (id) => {
    const icons = await getIcons(id);

    if(icons && icons.length > 0) {
        for(let i = 0; i < icons.length; i++) {
            createNewIcon({
                id: icons[i].id,
                type: getIconTypeText(icons[i].type),
                in_folder_id: icons[i].folder_id,
                name: icons[i].name,
                row: icons[i].pos_row,
                col: icons[i].pos_col,
                New: false
            });
        }
    }
}

const getIconTypeText = (type_id) => {
    return getData('website', 'icon_types').find(t => t.id == type_id).label;
}
const getIconTypeId = (type_text) => {
    return getData('website', 'icon_types').find(t => t.label == type_text).id;
}

const iconAllowDrop = (e) => {
    e.preventDefault();
}
const iconDragStart = (e) => {
    const fileSpace = $(e.target).parents()[0];
    e.originalEvent.dataTransfer.setData("text", ($(fileSpace).attr('data-row') + '|' + $(fileSpace).attr('data-col')));
}
const iconDrop = (e) => {
    e.preventDefault();

    const dragPos = e.originalEvent.dataTransfer.getData("text");

    if(dragPos == undefined)
        return;
    
    const [dragRow, dragCol] = dragPos.split('|');
    
    const dragPosEl = $(`.flex-file-space[data-row="${dragRow}"][data-col="${dragCol}"]`);
    if(!dragPosEl.length)
        return;
    
    const dropPosEl = $(e.currentTarget);
    const dropRow = $(dropPosEl).attr('data-row');
    const dropCol = $(dropPosEl).attr('data-col');

    if(dragRow == dropRow && dragCol == dropCol)
        return;
    
    let dragIcon = $(dragPosEl).find('.icon');
    dragIcon = (dragIcon.length > 0) ? $(dragIcon).clone() : null;
    let dropIcon = $(dropPosEl).find('.icon');
    dropIcon = (dropIcon.length > 0) ? $(dropIcon).clone() : null;
    $(dragPosEl).empty();
    $(dropPosEl).empty();
    if(dragIcon) {
        $(dropPosEl).append($(dragIcon));
        $(dragIcon).dblclick(onIconClick);
        $(dragIcon).on('dragstart', iconDragStart);
    }
    if(dropIcon) {
        $(dragPosEl).append($(dropIcon));
        $(dropIcon).dblclick(onIconClick);
        $(dropIcon).on('dragstart', iconDragStart);
    }

    if(!$(dragPosEl).is(':empty'))
        changeIconData({
            id: $($(dragPosEl).children()[0]).attr('icon-id'),
            row: dragRow,
            col: dragCol
        });
    if(!$(dropPosEl).is(':empty'))
        changeIconData({
            id: $($(dropPosEl).children()[0]).attr('icon-id'),
            row: dropRow,
            col: dropCol
        });
}

const onIconClick = (e) => {
    const iconId = $(e.currentTarget).attr('icon-id');
    const type = $(e.currentTarget).attr('icon-type');

    if(!$(`.modal[for-icon-id="${iconId}"]`).length) {
        createModal({
            type: mTypes[type],
            id: iconId,
            name: $(e.currentTarget).find('span').text()
        });
    }
    else {
        toggleModal({
            type: mTypes[type],
            id: iconId
        });
    }
}

const onFolderChangeSpanText = (e) => {
    const id = $(e.currentTarget).parent().attr('icon-id');
    const name = $(e.currentTarget).text();

    changeIconData({
        id: id,
        name: name
    });
    renameTaskbarItem({
        id: id,
        name: name
    });
    renameModal({
        id: id,
        name: name
    });
}

const onFolderSpanTypeText = (e) => {
    if($(e.currentTarget).text().length > 50 && e.keyCode != 8)
        e.preventDefault();
}

const createNewIcon = async ({
        id = null,
        type,
        in_folder_id = 0,
        name = '',
        row = null,
        col = null,
        New = true
    }) => {
    
    if(!type)
        return;
    
    let selector, space;
    if(in_folder_id == 0)
        selector = '#desktop';
    else
        selector = '#desktop';
    
    if(row == null || col == null) {
        space = $(selector + ` .flex-file-space:empty`)[0];
    }
    else {
        space = $(selector).find(`.flex-file-space[data-row="${row}"][data-col="${col}"]`);
        if(!$(space).length)
            space = $(selector + ` .flex-file-space:empty`)[0];
    }

    if(!space) {
        if(New) {
            displayQuickMessage('There is no space for a new folder!');
        }
        return;
    }

    if(!id) {
        id = await generateNewIconData({
            type: getIconTypeId(type),
            in_folder_id: in_folder_id,
            name: name,
            row: $(space).attr('data-row'),
            col: $(space).attr('data-col')
        });

        if(!id)
            return;
    }
    
    const iconEl = $(`<div class="icon" draggable="true" icon-id="${id}" icon-type="${type}"></div>`);
    const iconSpan = $(`<span contenteditable="true">${name}</span>`);
    $(iconEl).append(iconSpan);
    $(space).append(iconEl);
    $(iconEl).dblclick(onIconClick);
    $(iconEl).on('dragstart', iconDragStart);
    $(iconSpan).on('keydown paste', onFolderSpanTypeText);
    $(iconSpan).on('keyup', onFolderChangeSpanText);
    
    if(New)
        updateFile({
            id: id,
            type: type
        });
}

const setIconSize = (size) => {
    setData('settings', 'icon_size', size);
    updateFolderGrid('#desktop');
}

export {
    iconAllowDrop, iconDrop, createNewIcon, setIconSize, loadIcons
}