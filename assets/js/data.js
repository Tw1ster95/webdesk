let dataObj = {
    userid: null,
    username: '',
    icon_size: 100,
    bg_type: '',
    bg_style: '',
    bg_url: ''
}

const getData = ($key) => {
    return dataObj[$key];
}
const setData = ($key, $val) => {
    if(dataObj[$key] !== undefined)
        dataObj[$key] = $val;
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