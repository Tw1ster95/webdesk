import { createModal, toggleModal, mTypes, renameModal } from './modal.js';
import { setData, getData, getIcons, generateNewIconData, changeIconData, getImageUrl } from './data.js';
import { updateDesktopGrid } from './desktop.js';
import { renameTaskbarItem } from './taskbar.js';
import { updateFile } from './files.js';
import { askForImageUrl, displayQuickMessage } from './popups.js';

const loadIcons = async (id) => {
    const icons = await getIcons(id);

    if(icons && icons.length > 0) {
        for(let i = 0; i < icons.length; i++) {
            createNewIcon({
                id: icons[i].id,
                type: getIconTypeText(icons[i].type),
                in_folder_id: icons[i].in_folder_id,
                name: icons[i].name,
                row: icons[i].pos_row,
                col: icons[i].pos_col
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
    const col = $(fileSpace).attr('data-col');
    const row = $(fileSpace).attr('data-row');
    const modal_id = (col && row) ? 0 : ($(fileSpace).parent().parent().parent().attr('for-icon-id'));
    const icon_id = (col && row) ? 0 : ($(fileSpace).find('.icon').attr('icon-id'));
    e.originalEvent.dataTransfer.setData("text", (row + '|' + col + '|' + modal_id + '|' + icon_id));
}
const iconDrop = (e) => {
    e.preventDefault();

    const dragPos = e.originalEvent.dataTransfer.getData("text");

    if(dragPos == undefined)
        return;
    
    const [dragRow, dragCol, modal_id, icon_id] = dragPos.split('|');

    const fromFolder = (modal_id && modal_id > 0) ? true : false;
    
    const dragPosEl = (fromFolder) ? ($(`.modal[for-icon-id=${modal_id}] .flex-file-space .icon[icon-id=${icon_id}]`).parent()) : ($(`#desktop .flex-file-space[data-row="${dragRow}"][data-col="${dragCol}"]`));

    if(!dragPosEl.length)
        return;

    const dropPosEl = $(e.currentTarget);
    if($(dropPosEl).hasClass('flex-file-space')) {
        const dropRow = $(dropPosEl).attr('data-row');
        const dropCol = $(dropPosEl).attr('data-col');

        const dropModal = (dropRow && dropCol) ? 0 : ($(dropPosEl).parent().parent().parent().attr('for-icon-id'));

        if(dragRow == dropRow && dragCol == dropCol)
            return;
        
        let dragIcon = $(dragPosEl).find('.icon');
        dragIcon = (dragIcon.length > 0) ? $(dragIcon).clone() : null;
        let dropIcon = $(dropPosEl).find('.icon');
        dropIcon = (dropIcon.length > 0) ? $(dropIcon).clone() : null;

        if(fromFolder) $(dragPosEl).remove();
        else $(dragPosEl).empty();

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
                in_folder_id: dropModal,
                row: (dropModal) ? 0 : dropRow,
                col: (dropModal) ? 0 : dropCol
            });
        if(!$(dropPosEl).is(':empty'))
            changeIconData({
                id: $($(dropPosEl).children()[0]).attr('icon-id'),
                in_folder_id: dropModal,
                row: (dropModal) ? 0 : dropRow,
                col: (dropModal) ? 0 : dropCol
            });
    }
    else {
        const modal = $(dropPosEl).parent().parent();
        if(!modal.length)
            return;
        let dragIcon = $(dragPosEl).find('.icon');
        dragIcon = (dragIcon.length > 0) ? $(dragIcon).clone() : null;

        if(fromFolder) $(dragPosEl).remove();
        else $(dragPosEl).empty();

        if(dragIcon) {
            const icon_size = getData('settings', 'icon_size');
            const fileSpaceEl = $(`<div class="flex-file-space" style='width: ${icon_size}px; height: ${icon_size}px;'></div>`);

            $(fileSpaceEl).append($(dragIcon));
            $(dropPosEl).append($(fileSpaceEl));
            $(dragIcon).dblclick(onIconClick);
            $(dragIcon).on('dragstart', iconDragStart);

            const folder_id = $(modal).attr('for-icon-id');
            changeIconData({
                id: $(dragIcon).attr('icon-id'),
                in_folder_id: folder_id,
                row: 0,
                col: 0
            });
        }
    }
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
        col = null
    }) => {
    
    if(!type)
        return;
    
    let space, isNew = false;
    if(in_folder_id == 0) {
        if(row == null || col == null) {
            space = $(`#desktop .flex-file-space:empty`)[0];
        }
        else {
            space = $('#desktop').find(`.flex-file-space[data-row="${row}"][data-col="${col}"]`);
            if(!$(space).length)
                space = $(`#desktop .flex-file-space:empty`)[0];
        }

        if(!space) {
            if(New) {
                displayQuickMessage('There is no space for a new folder!');
            }
            return;
        }
    }
    else {
        const icon_size = getData('settings', 'icon_size');
        space = $(`<div class="flex-file-space" style='width: ${icon_size}px; height: ${icon_size}px;'></div>`);
        $(`.modal[for-icon-id="${in_folder_id}"] .main`).append(space);
    }

    if(!id) {
        isNew = true;
        id = await generateNewIconData({
            type: getIconTypeId(type),
            in_folder_id: in_folder_id,
            name: name,
            row: $(space).attr('data-row') || 0,
            col: $(space).attr('data-col') || 0
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

    if(isNew) {
        if(type == 'img') {
            $(iconEl).css({
                'background-image': 'url(assets/img/icons/noimage.jpg)'
            });
            askForImageUrl({
                    id: id,
                    name: name
                });
            }
        else
            updateFile({
                id: id,
                type: type,
                isNew: true
            });
    }
    else {
        if(type == 'img')
            $(iconEl).css({
                'background-image': `url(${(await getImageUrl(id))})`
            });
    }
}

const setIconSize = (size) => {
    setData('settings', 'icon_size', size);
    updateDesktopGrid('#desktop');
}

const removeIcon = async (icon_id) => {
    $(`.icon[icon-id="${icon_id}"]`).remove();
}

const getImageIconUrl = (icon_id) => {
    const url = $(`.icon[icon-id="${icon_id}"]`).css('background-image');
    return url.slice(5, url.length-2);
}

export {
    iconAllowDrop, iconDrop, createNewIcon, setIconSize, loadIcons, removeIcon, getImageIconUrl
}