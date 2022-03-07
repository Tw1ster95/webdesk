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
            break;
        }
        case 'taskbar_color': {
            $('#taskbar').css({
                'background-color': val
            });
            break;
        }
        case 'bg_url': {
            $('#desktopBackground').empty();
            if(getData('bg_type') == 'img') {
                $('#desktopBackground').append(`<img class="${getData('bg_style')}" src="${val}" alt="Background Image">`);
            }
            else {
                $('#desktopBackground').append(`<video class="${getData('bg_style')}" autoplay loop src="${val}" alt="Background Video">`);
            }
            break;
        }
        case 'bg_style': {
            $('#desktopBackground *').removeClass(getData('bg_style'));
            $('#desktopBackground *').addClass(val);
            break;
        }
    }

    dataObj[key] = val;
}

const getUserInfo = async () => {
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
}

export {
    getData, setData, getUserInfo
}