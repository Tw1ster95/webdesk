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
    checkFileExists, GetGridElementsPosition, startLoading, endLoading, getRandomInt
}