<?php
session_start();
include_once 'config.php';
include_once 'database.php';

if (isset($_SESSION['id'])) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $userid = $database->escape_string($_SESSION['id']);

    $arr = array();

    $fetch_tables = ['icon_types'];

    foreach ($fetch_tables as $table) {
        $fetchInfo = $database->get(array(
            'table' => $table
        ));
        $arr[$table] = $fetchInfo->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode(array(
        'status' => 'ok',
        'data' => $arr
    ));
} else {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting website data. Try reloading the page.'
    ));
}
