const checkFileExists = async (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();
     
    if(xhr.status == "200")
        return true;
    return false;
}

const GetGridElementsPosition = (index) => {
    const colCount = $('#desktop').css('grid-template-columns').split(' ').length;

    const rowPosition = Math.floor(index / colCount);
    const colPosition = index % colCount;

    return { row: rowPosition, column: colPosition } ;
}

const displayQuickMessage = (message) => {
    let msgEl = $('#quickMsgBlock');
    if(msgEl.length == 0) {
        msgEl = $(`<div id="quickMsgBlock" class="quick-msg-block" style="display: none;">${message}</div>`);
        $('body').append(msgEl);
    }
    else
        $(msgEl).stop().hide().text(message);
    
    $(msgEl).show(100).delay(2500).fadeOut();
}

const startLoading = () => {
    $('body').css('cursor', 'wait');
    $('#loadingScreen').show();
}

const endLoading = () => {
    $('body').css('cursor', 'auto');
    $('#loadingScreen').hide();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    checkFileExists, GetGridElementsPosition, displayQuickMessage, startLoading, endLoading, getRandomInt
}