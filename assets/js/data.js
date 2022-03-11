import { startLoading, endLoading, displayQuickMessage } from './os-load.js';

let dataObj = Array();

const getData = (key) => {
    return dataObj[key];
}
const setData = (key, val) => {
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
                (getData('bg_type') == 'img') ?
                $(`<img class="${getData('bg_style')}" src="${val}" alt="Background Image">`) :
                $(`<video class="${getData('bg_style')}" muted autoplay loop src="${val}" alt="Background Video">`)
            );
            $('#backgroundSetting').val(val);

            break;
        }
        case 'bg_style': {
            $('#desktopBackground *').removeClass(getData('bg_style'));
            $('#desktopBackground *').addClass(val);

            $('#bgStyleSetting').val(val);
            
            break;
        }
    }

    dataObj[key] = val;
}

const getUserInfo = async () => {
    startLoading();
    await $.ajax({
        url: 'inc/get_user_info.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                setData('userid', result.id);
                setData('username', result.username);
            }
        },
    });
    endLoading();
}

const getUserSettings = async (reset = false) => {
    startLoading();
    await $.ajax({
        url: 'inc/get_settings.php',
        type: 'post',
        contentType: false,
        processData: false,
        success: function(response){
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                Object.keys(result.data).forEach(key => {
                    setData(key, result.data[key]);
                });
                if(reset)
                    displayQuickMessage(`Settings reseted.`);
            }
            else {
                alert(result.message);
                location.href = location;
            }
        },
    });
    endLoading();
}

const saveUserSettings = async () => {
    startLoading();
    const fd = new FormData();
    
    for (const [key, value] of Object.entries(dataObj)) {
        fd.append(key, value);
    }
    await $.ajax({
        url: 'inc/save_settings.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(response) {
            const result = JSON.parse(response);

            if(result.status == 'ok') {
                displayQuickMessage(result.message);
            }
            else {
                displayQuickMessage(result.message);
            }
        },
    });
    endLoading();
}

export {
    getData, setData, getUserInfo, getUserSettings, saveUserSettings
}