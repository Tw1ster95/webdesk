import { removeIconData } from './data.js';
import { createNewIcon, setIconSize, removeIcon } from './icons.js'
import { createModal, toggleModal, mTypes, closeModal } from './modal.js';
import { removeFromTaskbar } from './taskbar.js';

let lastClickTime = new Date().getTime();

const loadRightClickMenu = () => {

    // Load desktop menu html
    $('body').append(`<ul class='right-click-menu desktop-menu'>
        <li data-action="submenu">View<i class="fa fa-angle-right"></i>
            <ul class='right-click-submenu'>
                <li data-action="l-icons">Large Icons</li>
                <li data-action="m-icons">Medium Icons</li>
                <li data-action="s-icons">Small Icons</li>
            </ul>
        </li>
        <li data-action="submenu">Sort by<i class="fa fa-angle-right"></i>
            <ul class='right-click-submenu'>
                <li data-action="l-icons">Name</li>
                <li data-action="m-icons">Size</li>
                <li data-action="s-icons">Item type</li>
            </ul>
        </li>
        <li data-action="refresh">Refresh</li>
        <li data-action="submenu">New<i class="fa fa-angle-right"></i>
            <ul class='right-click-submenu'>
                <li data-action="newfolder">Folder</li>
                <li data-action="newtxtdoc">Text Document</li>
                <li data-action="newimage">Image</li>
            </ul>
        </li>
        <li data-action="display">Display</li>
    </ul>`);

    // Load icon menu html
    $('body').append(`<ul class='right-click-menu icon-menu'>
        <li data-action="deleteicon">Delete</li>
    </ul>`);

    // On right click open custom menu
    $(document).bind("contextmenu", (e) => {
        e.preventDefault();
    
        if($(e.target).hasClass('flex-file-space')) {
            const parent = $(e.target).parent();
            if($(parent).hasClass('desktop-grid')) {
                $(".right-click-menu").hide();
                $(".desktop-menu").css({
                        top: e.pageY + "px",
                        left: e.pageX + "px"
                    }).show(100);
            }
        }
        else if($(e.target).hasClass('icon')) {
            $(".right-click-menu").hide();
            $('.icon-menu').attr('for-icon-id', $(e.target).attr('icon-id'));
            $(".icon-menu").css({
                    top: e.pageY + "px",
                    left: e.pageX + "px"
                }).show(100);
        }
    });
    
    // On mousedown hide desktop menu
    $(document).bind("mousedown", (e) => {
        if(!$(e.target).parents(".right-click-menu").length > 0)
            $(".right-click-menu").hide(100);
    });

    // Load Desktop right click menu items
    $(".right-click-menu li").click((e) => {
        const time = new Date().getTime();
        if(time - lastClickTime < 50) return;
        lastClickTime = time;

        const action = $(e.target).attr("data-action");

        if(action == 'right-click-submenu')
            return;
    
        const for_icon_id = $(e.target).parent('.right-click-menu').attr("for-icon-id");

        desktopMenuAction(action, for_icon_id);

        $(".right-click-menu").hide(100);
    });
}

const desktopMenuAction = async (action, icon_id) => {
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
        case "newimage": {
            createNewIcon({
                type: 'img',
                in_folder_id: 0,
                name: 'New Image'
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
        case "deleteicon": {
            if((await removeIconData(icon_id))) {
                removeIcon(icon_id);
                closeModal({ id: icon_id });
                removeFromTaskbar({ id: icon_id });
            }
            break;
        }
    }
}

export {
    loadRightClickMenu
}