import { createModal, toggleModal, mTypes } from './modal.js';
import { displayQuickMessage } from './utils.js';
import { setData } from './data.js';
import { updateFolderGrid } from './desktop.js';

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
    const dropPosEl = $(e.currentTarget);
    const dropRow = $(dropPosEl).attr('data-row');
    const dropCol = $(dropPosEl).attr('data-col');

    if(dragRow == dropRow && dragCol == dropCol)
        return;
    
    const dragElements = $(dragPosEl).clone();
    const dropElements = $(dropPosEl).clone();
    $(dragPosEl).html('');
    $(dropPosEl).html('');
    $(dragPosEl).append($(dropElements).children());
    $(dropPosEl).append($(dragElements).children());
    $(dragPosEl).dblclick(onFolderClick);
    $(dropPosEl).dblclick(onFolderClick);
    $(dragPosEl).on('dragstart', iconDragStart);
    $(dropPosEl).on('dragstart', iconDragStart);
}

const onFolderClick = (e) => {
    const folderId = $(e.currentTarget).attr('icon-id');

    if(!$(`.modal[for-icon-id="${folderId}"]`).length) {
        const name = $(e.currentTarget).find('span').text();
        createModal({
            type: mTypes.folder,
            id: folderId,
            name: name
        });
    }
    else {
        toggleModal({
            type: mTypes.folder,
            id: folderId
        });
    }
}

const createNewFolder = (selector) => {
    const emptySpace = $(selector + ' .flex-file-space:empty')[0];
    if(emptySpace) {
        const folderEl = $('<div class="folder" draggable="true" icon-id="1"><span contenteditable="true">Folder Name</span></div>');
        $(emptySpace).append(folderEl);
        $(folderEl).dblclick(onFolderClick);
        $(folderEl).on('dragstart', iconDragStart);
    }
    else
        displayQuickMessage('There is no space for a new folder!');
}

const setIconSize = (size) => {
    setData('icon_size', size);
    updateFolderGrid('#desktop');
}

export {
    iconAllowDrop, iconDrop, createNewFolder, setIconSize
}