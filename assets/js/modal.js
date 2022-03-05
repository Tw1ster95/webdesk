import { addToTaskbar } from '../js/taskbar.js';

const positionModal = (target) => {
    const width = $(window).width();
    const height = $(window).height();
    $(target).css(`top`, `${Math.floor(height/3)}px`);
    $(target).css(`left`, `${Math.floor(width/3)}px`);
    $(target).css(`height`, `${Math.floor(height/3)}px`);
    $(target).css(`width`, `${Math.floor(width/3)}px`);
}

const createModal = (type, id) => {
    switch(type) {
        case "display": {
            const modalEl = $('<div class="modal" id="displaySettingsModal"></div>');
            $('#modals').append(modalEl);
            //addDisplaySettingsModalItems(modalEl);
            positionModal(modalEl);
            break;
        }
        case "folder": {
            const modalEl = $(`<div class="modal" for-folder-id=${id}></div>`);
            $('#modals').append(modalEl);
            addFolderModalItems(modalEl);
            positionModal(modalEl);
            addToTaskbar('folder', id);
            break;
        }
    }
}

const addFolderModalItems = (target) => {
    $(target).append('<div class="top"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div>',
    '<div class="menu"></div>',
    '<div class="window"><div class="side"></div><div class="main"></div></div>');
}

const toggleModal = (type, id) => {
    switch(type) {
        case "display": {
            $('#modals').append($('#displaySettingsModal'));
            break;
        }
        case "folder": {
            $('#modals').append($(`.modal[for-folder-id="${id}"]`));
            break;
        }
    }
}

export {
    createModal, toggleModal
}