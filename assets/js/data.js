import { displayQuickMessage, startLoading, endLoading } from './utils.js';

let dataObj = Array();

const getData = (type, key = null) => {
    return key ? dataObj[type][key] : dataObj[type];
}
const setData = (type, key, val) => {
    if(type == 'settings') {
        switch(key) {
            case 'modal_top_color': {
                $('.modal .top').css({
                    'background-color': val
                });
                
                $('#windowTopColorSetting').val(val);

                break;
            }
            case 'modal_top_text_color': {
                $('.modal .top label').css({
                    'color': val
                });
                
                $('#windowTopTextColorSetting').val(val);

                break;
            }
            case 'taskbar_color': {
                $('#taskbar').css({
                    'background-color': val
                });

                $('#taskbarColorSetting').val(val);

                break;
            }
            case 'bg_url': {
                $('#desktopBackground').empty();
                $('#desktopBackground').append(
                    (getData('settings', 'bg_type') == 'img') ?
                    $(`<img class="${getData('settings', 'bg_style')}" src="${val}" alt="Background Image">`) :
                    $(`<video class="${getData('settings', 'bg_style')}" muted autoplay loop src="${val}" alt="Background Video">`)
                );
                $('#backgroundSetting').val(val);

                break;
            }
            case 'bg_style': {
                $('#desktopBackground *').removeClass(getData('settings', 'bg_style'));
                $('#desktopBackground *').addClass(val);

                $('#bgStyleSetting').val(val);
                
                break;
            }
        }
    }

    if(!dataObj[type])
        dataObj[type] = Array();

    dataObj[type][key] = val;
}

const getUserInfo = async () => {
    startLoading();
    const response = await $.ajax({
        url: 'inc/get_user_info.php',
        type: 'post',
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    if(result.status == 'ok') {
        setData('user', 'userid', result.id);
        setData('user', 'username', result.username);
    }

    endLoading();
}

const getUserSettings = async (reset = false) => {
    startLoading();
    const response = await $.ajax({
        url: 'inc/get_settings.php',
        type: 'post',
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    if(result.status == 'ok') {
        Object.keys(result.data).forEach(key => {
            setData('settings', key, result.data[key]);
        });
        if(reset)
            displayQuickMessage(`Settings reseted.`);
    }
    else {
        alert(result.message);
        location.href = location;
    }

    endLoading();
}

const saveUserSettings = async () => {
    startLoading();
    const fd = new FormData();
    
    for (const [key, value] of Object.entries(dataObj)) {
        fd.append(key, value);
    }
    const response = await $.ajax({
        url: 'inc/save_settings.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    if(result.status == 'ok')
        displayQuickMessage(result.message);
    else
        displayQuickMessage(result.message);
    
    endLoading();
}

const getIcons = async (id) => {
    startLoading();
    const fd = new FormData();
    fd.append('folder_id', id);

    const response = await $.ajax({
        url: 'inc/get_icons.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    endLoading();

    if(result.status == 'ok')
        return result.data;
   
    displayQuickMessage(result.message);
}

const loadWebsiteData = async () => {
    startLoading();
    const response = await $.ajax({
        url: 'inc/get_website_data.php',
        type: 'post',
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    if(result.status == 'ok') {
        for(const table in result.data) {
            setData('website', table, result.data[table]);
        }
    }
    else
        displayQuickMessage(result.message);
    endLoading();
}

const generateNewIconData = async ({
    type,
    in_folder_id,
    name,
    row,
    col
}) => {
    startLoading();
    const fd = new FormData();
    fd.append('type', type);
    fd.append('in_folder_id', in_folder_id);
    fd.append('name', name);
    fd.append('row', row);
    fd.append('col', col);

    const response = await $.ajax({
        url: 'inc/create_new_icon.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false
    });

    const result = JSON.parse(response);

    endLoading();
    
    if(result.status == 'ok')
        return result.id;
    
    displayQuickMessage(result.message);
    return null;
}

export {
    getData, setData, getUserInfo, getUserSettings, saveUserSettings, getIcons, loadWebsiteData, generateNewIconData
}