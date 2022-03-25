import { displayQuickMessage, endLoading, startLoading } from './utils.js';

const editableIcons = array(
    'txt'
);

const updateFile = async ({ id, type, content = '' }) => {
    if(!editableIcons.find(type))
        return;

    startLoading();

    const fd = new FormData();
    fd.append('file_id', id);
    fd.append('file_type', type);
    fd.append('content', content);

    const response = await $.ajax({
        url: 'inc/files/update_file.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    if(result.status !== 'ok')
        displayQuickMessage(result.message);
    endLoading();
}

const loadFileContent = async ({ id, type }) => {
    if(!editableIcons.find(type))
        return;

    startLoading();

    const fd = new FormData();
    fd.append('file_id', id);
    fd.append('file_type', type);

    const response = await $.ajax({
        url: 'inc/files/get_file.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    endLoading();
    
    if(result.status == 'ok')
        return result.content;
    else {
        displayQuickMessage(result.message);
        return null;
    }
}

export {
    updateFile, loadFileContent
}