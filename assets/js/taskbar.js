import { mTypes, toggleModal } from './modal.js';
import { getData } from './data.js';

const loadTaskbar = () => {
    $('body').append(`<div class="taskbar" id="taskbar" style="background-color: ${getData('settings', 'taskbar_color')}">
        <div class="start-menu-btn" id="startMenuBtn">
            <img src="assets/img/win10logo.png" alt="OS Logo">
        </div>
    </div>`);
}

const addToTaskbar = ({ type, id }) => {
    let el;
    switch(type) {
        case mTypes.display: {
            el = $(`<div window-type="display"><img src="/assets/img/display-settings.png" alt="Taskbar Icon" /></div>`);
            $('#taskbar').append(el);
            break;
        }
        case mTypes.folder: {
            el = $(`<div window-type="folder" window-id="${id}"><img src="/assets/img/folder.png" alt="Taskbar Icon" /></div>`);
            $('#taskbar').append(el);
            break;
        }
        case mTypes.txt: {
            el = $(`<div window-type="txt" window-id="${id}"><img src="/assets/img/txt.png" alt="Taskbar Icon" /></div>`);
            $('#taskbar').append(el);
            break;
        }
    }
    $(el).click((e) => {
        const type = $(el).attr('window-type');
        const id = $(el).attr('window-id');
        toggleModal({
            type: mTypes[type],
            id: id,
            taskbar: true
        })
    });

    setTopTaskActive();
}

const removeFromTaskbar = ({ type, id }) => {
    switch(type) {
        case mTypes.display: {
            $(`#taskbar [window-type="display"]`).remove();
            break;
        }
        case mTypes.folder:
        case mTypes.txt: {
            $(`#taskbar [window-id="${id}"]`).remove();
            break;
        }
    }
    
    setTopTaskActive();
}

const setTopTaskActive = () => {
    $('#taskbar').children().removeClass('active');

    const modals = $('#modals [window-type]');

    if(modals.length == 0)
        return;
    
    const targetModal = $($(modals)[modals.length - 1]);

    if($(targetModal).css('display') == 'none')
        return;
    
    const type = $(targetModal).attr('window-type');
    const id = $(targetModal).attr('for-icon-id');

    let target;
    switch(mTypes[type]) {
        case mTypes.display: {
            target = $(`#taskbar [window-type="display"]`);
            break;
        }
        case mTypes.folder:
        case mTypes.txt: {
            target = $(`#taskbar [window-id="${id}"]`);
            break;
        }
    }

    $(target).addClass('active');
}

export {
    addToTaskbar, removeFromTaskbar, setTopTaskActive, loadTaskbar
}