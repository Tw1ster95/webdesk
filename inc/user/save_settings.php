<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (isset($_POST['user_id'])) {
    $arrKeys = array(
        'bg_type',
        'bg_url',
        'bg_style',
        'icon_size',
        'taskbar_color',
        'modal_top_color',
        'modal_top_text_color'
    );
    $arrVals = array();

    foreach ($arrKeys as $key) {
        if (isset($_POST[$key])) {
            array_push($arrVals, $_POST[$key]);
        } else {
            unset($arrKeys[array_search($key, $arrKeys)]);
        }
    }

    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $userid = $database->escape_string($_POST['user_id']);

    if (count($arrKeys) > 0) {
        $database->update(
            'settings',
            $arrKeys,
            $arrVals,
            'user_id',
            $userid
        );

        echo json_encode(array(
            'status' => 'ok',
            'message' => 'Settings saved successfuly'
        ));
        exit;
    }
}

echo json_encode(array(
    'status' => 'fail',
    'message' => 'Error saving user settings. Try reloading the page.'
));
