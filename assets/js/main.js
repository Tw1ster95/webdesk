let lastClickTime = new Date().getTime();
let lastXpos, lastYpos;

const settings = {
    iconsize: 100,
    bgImageStyle: 'cover',
    bgImageUrl: '/assets/img/bg/win10.jpg'
}

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

$(document).bind("mousedown", (e) => {
    if(!$(e.target).parents(".desktop-menu").length > 0)
        $(".desktop-menu").hide(100);
});

$(".desktop-menu li").click((e) => {
    time = new Date().getTime();
    if(time - lastClickTime < 50) return;
    lastClickTime = time;

    switch($(e.target).attr("data-action")) {
        case "submenu": return;
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
                const folderEl = $('<div class="folder" ondragstart="drag(event)" draggable="true" folder-id="1"><span contenteditable="true">Folder Name</span></div>');
                $(emptySpace).append(folderEl);
                $(folderEl).click(onFolderClick);
            }
            else
                alert('There is no space for a new folder!');
            break;
        }
        case "display": {
            if(!$('#displaySettingsModal').length) {
                const modalEl = $('<div class="modal" id="displaySettingsModal"></div>');
                $('#modals').append(modalEl);
                //addDisplaySettingsModalItems(modalEl);
                positionModal(modalEl);
            }
            else {
                $('#modals').append($('#displaySettingsModal'));
            }
            break;
        }
    }

    $(".desktop-menu").hide(100);
});

$(document).ready(async () => {
    $('body').css('cursor', 'wait');

    getUserSettings();
    $('body').css('cursor', 'auto');
});

$( window ).resize(function() {
    generateSquares();
});
function generateSquares() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / settings.iconsize);
    const rows = Math.floor(height / settings.iconsize);
    const squares = cols * rows;

    const desktopEl = $('#desktop');
    squaresNum = $(desktopEl).children().length;

    if(squaresNum < squares) {
        let itemsNum = squares;

        for(let i = squaresNum; i < itemsNum; i++) {
            $("#desktop").append(`<div class="flex-file-space" data-desktop-pos="${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`);
        }
    }
    else if(squaresNum > squares) {
        for(let i = squaresNum; i > squares; i--) {
            $(desktopEl).children()[i-1].remove();
        }
    }

    $('.flex-file-space').css('width', `${settings.iconsize}px`);
    $('.flex-file-space').css('height', `${settings.iconsize}px`);
    $('.flex-file-space').css('font-size', `${Math.floor(settings.iconsize/6)}px`);
}

function allowDrop(e) {
    e.preventDefault();
}
function drag(e) {
    e.dataTransfer.setData("text", $(e.currentTarget).parents()[0].getAttribute('data-desktop-pos'));
}
function drop(e) {
    e.preventDefault();

    const dragPos = e.dataTransfer.getData("text");

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
}

function addFolderModalItems(target) {
    $(target).append('<div class="top"><div class="minimize">_</div><div class="expand">[ ]</div><div class="close">X</div></div>',
    '<div class="menu"></div>',
    '<div class="window"><div class="side"></div><div class="main"></div></div>');
}

function positionModal(target) {
    const width = $(window).width();
    const height = $(window).height();
    $(target).css(`top`, `${Math.floor(height/3)}px`);
    $(target).css(`left`, `${Math.floor(width/3)}px`);
    $(target).css(`height`, `${Math.floor(height/3)}px`);
    $(target).css(`width`, `${Math.floor(width/3)}px`);
}

function onFolderClick(e) {
    time = new Date().getTime();
    if(time - lastClickTime < 50) return;
    lastClickTime = time;

    const folderId = $(e.target).attr('folder-id');

    if(!$(`.modal[for-folder-id="${folderId}"]`).length) {
        const modalEl = $(`<div class="modal" for-folder-id=${folderId}></div>`);
        $('#modals').append(modalEl);
        addFolderModalItems(modalEl);
        positionModal(modalEl);
        addToTaskbar('folder', folderId);
    }
    else {
        $('#modals').append($(`.modal[for-folder-id="${folderId}"]`));
    }
}

function addToTaskbar(type, id) {

}

function setIconSize(size) {
    settings.iconsize = size;
    generateSquares();
}

function getUserSettings() {
    const fd = new FormData();

    fd.append('userid', 1);

    $.ajax({
        url: 'inc/get_settings.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(response){
            console.log(response);
        },
    });
    generateSquares();
    $('.bgimage').addClass(settings.bgImageStyle);
    $('.bgimage img').attr('src', settings.bgImageUrl);
}