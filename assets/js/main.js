let lastClickTime = new Date().getTime();

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
        case "newfolder": {
            const emptySpace = $('.flex-file-space:empty')[0];
            if(emptySpace) {
                $(emptySpace).append($('<div class="folder" ondragstart="drag(event)" draggable="true"><span contenteditable="true">Folder Name</span></div>'));
            }
            else
                alert('There is no space for a new folder!');
            break;
        }
    }

    $(".desktop-menu").hide(100);
});

$(".folder").click((e) => {
    time = new Date().getTime();
    if(time - lastClickTime < 50) return;
    lastClickTime = time;

    console.log(e.target);
});

$(document).ready(() => {
    generateSquares();
});
$( window ).resize(function() {
    generateSquares();
});
function generateSquares() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.floor(width / 150);
    const rows = Math.floor(height / 150);
    const squares = cols * rows;

    const desktopEl = document.querySelector('.desktop-flex');
    squaresNum = desktopEl.childElementCount;

    console.log('cols: ' + cols)
    console.log('rows: ' + rows)
    console.log('squaresNum: ' + squaresNum)
    console.log('squares: ' + squares)

    if(squaresNum < squares) {
        let itemsNum = squares;

        for(let i = squaresNum; i < itemsNum; i++) {
            $(".desktop-flex").append(`<div class="flex-file-space" data-desktop-pos="${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`);
        }
    }
    else if(squaresNum > squares) {
        for(let i = squaresNum; i > squares; i--) {
            desktopEl.children[i-1].remove();
        }
    }
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
}