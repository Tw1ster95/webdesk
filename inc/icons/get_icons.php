<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (
    isset($_SESSION['id'])
    && isset($_POST['in_folder_id'])
) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $userid = $database->escape_string($_SESSION['id']);
    $folder_id = $database->escape_string($_POST['in_folder_id']);

    $fetchInfo = $database->get(array(
        'table' => 'icons',
        'filter' => "user_id = " . $userid . " AND in_folder_id = " . $folder_id
    ));

    $icons = $fetchInfo->fetch_all(MYSQLI_ASSOC);

    echo json_encode(array(
        'status' => 'ok',
        'data' => $icons
    ));
} else {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting user icons. Try reloading the page.'
    ));
}
