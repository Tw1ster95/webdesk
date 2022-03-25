<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (isset($_SESSION['id'])) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $userid = $database->escape_string($_SESSION['id']);

    $fetchInfo = $database->get(array(
        'table' => 'settings',
        'filter' => "user_id = " . $userid
    ));

    $settings = $fetchInfo->fetch_assoc();
    $arr = array();

    foreach ($settings as $key => $val) {
        $arr[$key] = $val;
    }

    echo json_encode(array(
        'status' => 'ok',
        'data' => $arr
    ));
} else {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting user settings. Try reloading the page.'
    ));
}
