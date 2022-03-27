<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error removing icon. Try reloading the page.'
    ));
    exit;
}

if (!isset($_POST['icon_id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error removing icon. Icon ID not set.'
    ));
    exit;
}

$database = new Database();
$database->connect(
    MAIN_MYSQL_HOST,
    MAIN_MYSQL_USERNAME,
    MAIN_MYSQL_PASSWORD,
    MAIN_MYSQL_DB
);

$icon_id = $database->escape_string($_POST['icon_id']);

$fetchInfo = $database->get(array(
    'table' => 'icons',
    'filter' => "id = " . $icon_id
));

if ($fetchInfo->num_rows == 0) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error removing icon. Icon not found.'
    ));
    exit;
}

$icon_info = $fetchInfo->fetch_assoc();

$database->delete(
    'icons',
    "id = $icon_id"
);

// Type 3 == img
if ($icon_info['type'] == 3) {
    $database->delete(
        'img_urls',
        "icon_id = $icon_id"
    );
}

echo json_encode(array(
    'status' => 'ok',
    'message' => 'Icon deleted.'
));
