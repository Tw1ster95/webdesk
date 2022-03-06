let dataObj = Array();

const getData = ($key) => {
    return dataObj[$key];
}
const setData = ($key, $val) => {
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