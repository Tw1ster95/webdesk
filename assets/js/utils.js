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

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const observeDeleteElement = (id) => {
    const observer = new MutationObserver((mutations_list) => {
        mutations_list.forEach((mutation) => {
            mutation.removedNodes.forEach((removed_node) => {
                if($(removed_node).attr('id') == id) {
                    observer.disconnect();
                    alert(`Can't touch this.`);
                    location = location.href;
                }
            });
        });
    });
    
    observer.observe(document.getElementById(id).parentNode, { subtree: false, childList: true });
}

export {
    checkFileExists, GetGridElementsPosition, startLoading, endLoading, getRandomInt, observeDeleteElement
}