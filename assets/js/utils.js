const checkFileExists = async (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();
     
    if(xhr.status == "200")
        return true;
    return false;
}

export {
    checkFileExists
}