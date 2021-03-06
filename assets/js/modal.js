import { getData } from './data.js';
import { addToTaskbar, removeFromTaskbar, setTopTaskActive } from './taskbar.js';
import { addDisplayModalItems } from './display-settings.js';
import { getRandomInt, observeDeleteElement } from './utils.js';
import { updateFile, loadFileContent } from './files.js';
import { getImageIconUrl, iconAllowDrop, iconDrop, loadIcons } from './icons.js';
import { askForImageUrl } from './popups.js';

const mTypes = {
    display: Symbol("display"),
    folder: Symbol("folder"),
    txt: Symbol("txt"),
    img: Symbol("img")
}

const loadModals = () => {
    $('body').append(`<div class="modals" id="modals"></div>`);
    observeDeleteElement('modals');
}

const createModal = async ({ type, id, name }) => {
    const width = $(window).width();
    const height = $(window).height();
    switch(type) {
        case mTypes.display: {
            const modalEl = $('<div class="modal" window-type="display" id="displaySettingsModal"></div>');
            $('#modals').append(modalEl);
            
            addModalItems({
                type: mTypes.display,
                target: modalEl
            });
            
            $(modalEl).css({
                top: `${Math.floor(getRandomInt(height-100, height+100)/3)}px`,
                left: `${Math.floor(getRandomInt(width-100, width+100)/3)}px`,
                height: `auto`,
                width: `400px`
            });

            addToTaskbar({
                type: mTypes.display,
                name: name
            });

            break;
        }
        case mTypes.folder: {
            const modalEl = $(`<div class="modal" window-type="folder" for-icon-id=${id}></div>`);
            $('#modals').append(modalEl);

            addModalItems({
                type: mTypes.folder,
                target: modalEl,
                name: name
            });

            $(modalEl).css({
                top: `${Math.floor(getRandomInt(height-100, height+100)/3)}px`,
                left: `${Math.floor(getRandomInt(width-100, width+100)/3)}px`,
                height: `${Math.floor(height/3)}px`,
                width: `${Math.floor(width/3)}px`
            });

            addToTaskbar({
                type: mTypes.folder,
                id: id,
                name: name
            });

            loadIcons(id);
            break;
        }
        case mTypes.txt: {
            const content = await loadFileContent({
                id: id,
                type: 'txt'
            });
            if(content == null)
                return;
            
            const modalEl = $(`<div class="modal" window-type="txt" for-icon-id=${id}></div>`);
            $('#modals').append(modalEl);

            addModalItems({
                id: id,
                type: mTypes.txt,
                target: modalEl,
                name: name,
                content: content
            });

            $(modalEl).css({
                top: `${Math.floor(height/3)}px`,
                left: `${Math.floor(width/3)}px`,
                height: `${Math.floor(height/3)}px`,
                width: `${Math.floor(width/3)}px`
            });

            addToTaskbar({
                type: mTypes.txt,
                id: id,
                name: name
            });
            break;
        }
        case mTypes.img: {
            const modalEl = $(`<div class="modal" window-type="img" for-icon-id=${id}></div>`);
            $('#modals').append(modalEl);

            addModalItems({
                id: id,
                type: mTypes.img,
                target: modalEl,
                name: name
            });

            $(modalEl).css({
                top: `${Math.floor(height/3)}px`,
                left: `${Math.floor(width/3)}px`,
                height: `${Math.floor(height/3)}px`,
                width: `${Math.floor(width/3)}px`
            });

            addToTaskbar({
                type: mTypes.img,
                id: id,
                name: name
            });
            break;
        }
    }
}

const addModalItems = async ({ target, type, name, content = '', id = null }) => {
    switch(type) {
        case mTypes.display: {
            $(target).append(`<div class="top" style="background-color: ${getData('settings', 'modal_top_color')}"><label class="title" style="color: ${getData('settings', 'modal_top_text_color')}">Display Settings</label><div class="top-buttons"><div class="minimize">_</div><div class="expand disabled">[ ]</div><div class="close">X</div></div></div><div class="window"><div class="main no-scroll"></div></div>`);

            addDisplayModalItems(target);
            break;
        }
        case mTypes.folder: {
            $(target).append(`<div class="top" style="background-color: ${getData('settings', 'modal_top_color')}"><label class="title" style="color: ${getData('settings', 'modal_top_text_color')}">${name}</label><div class="top-buttons"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div></div><ul class="menu"></ul><div class="window"><div class="side"></div><div class="main"></div></div><div class="resize"></div>`);

            const main = $(target).find('.main');
            $(main).on('dragover', iconAllowDrop);
            $(main).on('drop', iconDrop);
            break;
        }
        case mTypes.txt: {
            $(target).append(`<div class="top" style="background-color: ${getData('settings', 'modal_top_color')}"><label class="title" style="color: ${getData('settings', 'modal_top_text_color')}">${name}</label><div class="top-buttons"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div></div><ul class="menu"></ul><div class="window"><textarea class="main doc-content">${content}</textarea></div><div class="resize"></div>`);
            break;
        }
        case mTypes.img: {
            $(target).append(`<div class="top" style="background-color: ${getData('settings', 'modal_top_color')}"><label class="title" style="color: ${getData('settings', 'modal_top_text_color')}">${name}</label><div class="top-buttons"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div></div><ul class="menu"></ul><div class="window"><img class="image-modal" src="${getImageIconUrl(id)}"/></div><div class="resize"></div>`);
            break;
        }
    }

    addTopModalEvents(target);
    addTopMenu({target, id, name, type});
}

const addTopModalEvents = (target) => {
    const topEl = $(target).find('.top');
    const minimize = $(topEl).find('.minimize:not(.disabled)');
    const expand = $(topEl).find('.expand:not(.disabled)');
    const close = $(topEl).find('.close:not(.disabled)');
    const resize = $(target).find('.resize');

    let lastPos = { x: null, y: null };
    let lastClickTime = new Date().getTime();
    let dragModal = false, resizeModal = false;

    if(minimize.length > 0) {
        $(minimize).click((e) => {
            $(target).hide(100);
            setTopTaskActive();
        });
    }
    if(expand.length > 0) {
        $(expand).click((e) => {
            toggleModalExpand(target);
        });
    }
    if(close.length > 0) {
        $(close).click((e) => {
            const type = mTypes[$(target).attr('window-type')];
            const forId = $(target).attr('for-icon-id');
            $(target).remove();
            removeFromTaskbar({ type: type, id: forId });
        });
    }
    if(resize.length > 0) {
        $(resize).on('mousedown', (e) => {
            lastPos = {
                x: e.pageX,
                y: e.pageY
            }
            resizeModal = true;
        });
    }

    $(topEl).on('mousedown', (e) => {
        if($(e.target).hasClass('minimize')
        || $(e.target).hasClass('expand')
        || $(e.target).hasClass('close'))
            return;
        
        $('#modals').append(target);
        setTopTaskActive();

        const time = new Date().getTime();
        if(expand.length > 0 && (time - lastClickTime) < 200)
            toggleModalExpand(target);
        lastClickTime = time;

        if($(target).hasClass('expanded'))
            return;
        
        lastPos = {
            x: e.pageX,
            y: e.pageY
        }

        dragModal = true;
    });
    $(window).on('mousemove', (e) => {
        const width = $(window).width();
        const height = $(window).height();
        const modalOffset = $(target).offset();

        if(e.pageY > (height - 30)
            || e.pageY < 10
            || e.pageX > width - 10
            || e.pageX < 10)
            return;
        
        if(dragModal) {
            $(target).css({
                top: (modalOffset.top + (e.pageY - lastPos.y)) + `px`,
                left: (modalOffset.left + (e.pageX - lastPos.x)) + `px`
            });
        }
        else if(resizeModal) {
            const modalWidth = $(target).width() + (e.pageX - lastPos.x);
            const modalHeight = $(target).height() + (e.pageY - lastPos.y);
            const modalBottom = modalOffset.top + modalHeight;
            const modalRight = modalOffset.left + modalWidth;
            
            if((modalBottom - 20) < e.pageY && (modalOffset.top + modalHeight) < (height - 30)) {
                $(target).css({
                    height: modalHeight + `px`,
                });
            }
            if((modalRight - 20) < e.pageX && (modalOffset.left + modalWidth) < width - 10) {
                $(target).css({
                    width: modalWidth + `px`
                });
            }
        }
        
        lastPos = {
            x: e.pageX,
            y: e.pageY
        }
    });
    $(window).on('mouseup', (e) => {
        dragModal = false;
        resizeModal = false;
    });
}

const addTopMenu = ({ target, id, name, type }) => {
    const menu = $(target).find('.menu');
    if(!menu)
        return;

    switch(type) {
        case mTypes.txt: {
            menu.append(
                `<li>File
                    <ul class="submenu">
                        <li class="js-save-file">Save</li>
                    </ul>
                </li>`);

            menu.find(`.js-save-file`).click((e) => {
                updateFile({
                    id: id,
                    type: 'txt',
                    content: $(target).find(`.doc-content`).val()
                });
            });
            break;
        }
        case mTypes.img: {
            menu.append(
                `<li>File
                    <ul class="submenu">
                        <li class="js-change-img">Change Image</li>
                    </ul>
                </li>`);

            menu.find(`.js-change-img`).click((e) => {
                askForImageUrl({
                    id: id,
                    name: name,
                    current: getImageIconUrl(id)
                })
            });
        }
    }
}

const toggleModalExpand = (target) => {
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
}

const toggleModal = ({ type, id, taskbar }) => {
    let target;
    switch(type) {
        case mTypes.display: {
            target = $('#displaySettingsModal');
            break;
        }
        case mTypes.folder:
        case mTypes.txt: {
            target = $(`.modal[for-icon-id="${id}"]`);
            break;
        }
    }
    if(taskbar) {
        if($(target).css('display') == 'none') {
            $(target).finish().toggle(100);
            $('#modals').append(target);
        }
        else {
            const allModals = $($(target).parents()[0]).children();
            if($(target)[0] == $(allModals)[allModals.length - 1]) {
                $(target).hide(100);
                $('#modals').prepend(target);
            }
            else
                $('#modals').append(target);
        }
    }
    else
        $('#modals').append(target);
    
    setTopTaskActive();
}

const renameModal = ({ id, name }) => {
    $(`.modal[for-icon-id="${id}"] .top label.title`).text(name);
}

const closeModal = ({ id }) => {
    $(`.modal[for-icon-id="${id}"]`).remove();
}

export {
    createModal, toggleModal, mTypes, loadModals, renameModal, closeModal
}