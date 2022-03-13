import { createNewIcon, setIconSize } from './icons.js'
import { createModal, toggleModal, mTypes } from './modal.js';

let lastClickTime = new Date().getTime();

const loadRightClickMenu = () => {

    // Load desktop menu html
    $('body').append(`<ul class='desktop-menu'>
        <li data-action="submenu">View<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="l-icons">Large Icons</li>
                <li data-action="m-icons">Medium Icons</li>
                <li data-action="s-icons">Small Icons</li>
            </ul>
        </li>
        <li data-action="submenu">Sort by<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="l-icons">Name</li>
                <li data-action="m-icons">Size</li>
                <li data-action="s-icons">Item type</li>
            </ul>
        </li>
        <li data-action="refresh">Refresh</li>
        <li data-action="submenu">New<i class="fa fa-angle-right"></i>
            <ul class='desktop-submenu'>
                <li data-action="newfolder">Folder</li>
                <li data-action="newtxtdoc">Text Document</li>
                <li data-action="newimage">Image</li>
            </ul>
        </li>
        <li data-action="display">Display</li>
    </ul>`);

    // On right click open custom menu
    $(document).bind("contextmenu", (e) => {
        e.preventDefault();
    
        if($(e.target).hasClass('flex-file-space')) {
            $(".desktop-menu").finish().toggle(100).
                css({
                    top: e.pageY + "px",
                    left: e.pageX + "px"
                });
        }
    });
    
    // On mousedown hide desktop menu
    $(document).bind("mousedown", (e) => {
        if(!$(e.target).parents(".desktop-menu").length > 0)
            $(".desktop-menu").hide(100);
    });

    // Load Desktop right click menu items
    $(".desktop-menu li").click((e) => {
        const time = new Date().getTime();
        if(time - lastClickTime < 50) return;
        lastClickTime = time;

        const action = $(e.target).attr("data-action");

        if(action == 'submenu')
            return;
    
        desktopMenuAction(action);

        $(".desktop-menu").hide(100);
    });
}

const desktopMenuAction = (action) => {
    switch(action) {
        case "l-icons": {
            setIconSize(150);
            break;
        }
        case "m-icons": {
            setIconSize(100);
            break;
        }
        case "s-icons": {
            setIconSize(50);
            break;
        }
        case "newfolder": {
            createNewIcon({
                type: 'folder',
                in_folder_id: 0,
                name: 'New Folder'
            });
            break;
        }
        case "newtxtdoc": {
            createNewIcon({
                type: 'txt',
                in_folder_id: 0,
                name: 'Text Document'
            });
            break;
        }
        case "display": {
            if(!$('#displaySettingsModal').length) {
                createModal({
                    type: mTypes.display
                });
            }
            else {
                toggleModal({
                    type: mTypes.display
                });
            }
            break;
        }
    }
}

export {
    loadRightClickMenu
}