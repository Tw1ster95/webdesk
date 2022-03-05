import { createModal, toggleModal } from './modal.js';

let lastClickTime = new Date().getTime();

const iconAllowDrop = (e) => {
    e.preventDefault();
}
const iconDragStart = (e) => {
    e.originalEvent.dataTransfer.setData("text", $(e.target).parents()[0].getAttribute('data-desktop-pos'));
}
const iconDrop = (e) => {
    e.preventDefault();

    const dragPos = e.originalEvent.dataTransfer.getData("text");

    if(dragPos == undefined)
        return;
    
    const dragPosEl = $(`.flex-file-space[data-desktop-pos="${dragPos}"]`);
    const dropPosEl = $(e.currentTarget);
    const drPos = $(dropPosEl).attr('data-desktop-pos');
    if(dragPos == drPos)
        return;
    const dragElements = $(dragPosEl).clone();
    const dropElements = $(dropPosEl).clone();
    $(dragPosEl).html('');
    $(dropPosEl).html('');
    $(dragPosEl).append($(dropElements).children());
    $(dropPosEl).append($(dragElements).children());
    $(dragPosEl).click(onFolderClick);
    $(dropPosEl).click(onFolderClick);
    $(dragPosEl).on('dragstart', iconDragStart);
    $(dropPosEl).on('dragstart', iconDragStart);
}

const onFolderClick = (e) => {
    const time = new Date().getTime();
    if(time - lastClickTime < 50) return;
    lastClickTime = time;

    const folderId = $(e.target).attr('folder-id');

    if(!$(`.modal[for-folder-id="${folderId}"]`).length) {
        createModal('folder', folderId);
    }
    else {
        toggleModal('folder', folderId);
    }
}

export {
    iconAllowDrop, iconDragStart, iconDrop, onFolderClick
}