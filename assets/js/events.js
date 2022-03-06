import { createModal, toggleModal, mTypes } from './modal.js';
import { setIconSize } from './os-load.js'

let lastClickTime = new Date().getTime();

const loadEvents = () => {
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
            const emptySpace = $('.flex-file-space:empty')[0];
            if(emptySpace) {
                const folderEl = $('<div class="folder" draggable="true" folder-id="1"><span contenteditable="true">Folder Name</span></div>');
                $(emptySpace).append(folderEl);
                $(folderEl).dblclick(onFolderClick);
                $(folderEl).on('dragstart', iconDragStart);
            }
            else
                alert('There is no space for a new folder!');
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
    $(dragPosEl).dblclick(onFolderClick);
    $(dropPosEl).dblclick(onFolderClick);
    $(dragPosEl).on('dragstart', iconDragStart);
    $(dropPosEl).on('dragstart', iconDragStart);
}

const onFolderClick = (e) => {
    const folderId = $(e.currentTarget).attr('folder-id');

    if(!$(`.modal[for-folder-id="${folderId}"]`).length) {
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

export {
    loadEvents, iconAllowDrop, iconDragStart, iconDrop, onFolderClick
}