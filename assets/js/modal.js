import { addToTaskbar } from './taskbar.js';

const positionModal = (target) => {
    const width = $(window).width();
    const height = $(window).height();
    $(target).css(`top`, `${Math.floor(height/3)}px`);
    $(target).css(`left`, `${Math.floor(width/3)}px`);
    $(target).css(`height`, `${Math.floor(height/3)}px`);
    $(target).css(`width`, `${Math.floor(width/3)}px`);
}

const createModal = ({ type, id, name }) => {
    switch(type) {
        case "display": {
            const modalEl = $('<div class="modal" id="displaySettingsModal"></div>');
            $('#modals').append(modalEl);
            addDisplaySettingsModalItems(modalEl);
            positionModal(modalEl);
            break;
        }
        case "folder": {
            const modalEl = $(`<div class="modal" for-folder-id=${id}></div>`);
            $('#modals').append(modalEl);
            addFolderModalItems(modalEl, name);
            positionModal(modalEl);
            addToTaskbar('folder', id);
            break;
        }
    }
}

const addFolderModalItems = (target, name) => {
    $(target).append(`<div class="top"><div class="title">${name}</div><div class="top-buttons"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div></div><div class="menu"></div><div class="window"><div class="side"></div><div class="main"></div></div>`);

    addTopModalEvents(target);
}
const addDisplaySettingsModalItems = (target) => {
    $(target).append(`<div class="top"><div class="title">Display Settings</div><div class="top-buttons"><div class="minimize">_</div><div class="expand disabled">[ ]</div><div class="close">X</div></div></div><div class="window"><div class="main no-scroll"></div></div>`);
    addTopModalEvents(target);
}

const addTopModalEvents = (target) => {
    const topEl = $(target).find('.top');
    const minimize = $(topEl).find('.minimize:not(.disabled)');
    const expand = $(topEl).find('.expand:not(.disabled)');
    const close = $(topEl).find('.close:not(.disabled)');
    if(minimize) {
        $(minimize).click((e) => {
            console.log($(target));
        });
    }
    if(expand) {
        $(expand).click((e) => {
            if($(target).hasClass('expanded')) {
                $(target).css({
                    top: $(target).attr('old-top'),
                    left: $(target).attr('old-left'),
                    height: $(target).attr('old-height'),
                    width: $(target).attr('old-width')
                });
                $(target).attr({
                    'old-top': '',
                    'old-left': '',
                    'old-height': '',
                    'old-width': ''
                });
                $(target).removeClass('expanded');
            }
            else {
                $(target).attr({
                    'old-top': target.css('top'),
                    'old-left': target.css('left'),
                    'old-height': target.css('height'),
                    'old-width': target.css('width')
                });
                $(target).css({
                    top: '',
                    left: '',
                    height: '',
                    width: ''
                });
                $(target).addClass('expanded');
            }
        });
    }
    if(close) {
        $(close).click((e) => {
            $(target).remove();
        });
    }
}

const toggleModal = ({ type, id }) => {
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