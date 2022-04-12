<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting image url. Try reloading the page.'
    ));
    exit;
}

if (!isset($_POST['icon_id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting image url. Icon ID not set.'
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
    'table' => 'img_urls',
    'filter' => "icon_id = " . $icon_id
));

if ($fetchInfo->num_rows == 0) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting image url. Image id not found in database.'
    ));
    exit;
}

$img_info = $fetchInfo->fetch_assoc();

if (filter_var($img_info['image_url'], FILTER_VALIDATE_URL)) {
    $header_response = get_headers($img_info['image_url'], 1);
    if (isset($header_response[0]) && strpos($header_response[0], "404") !== false) {
        echo json_encode(array(
            'status' => 'fail',
            'message' => 'Error setting image url. Image url is invalid.'
        ));
        exit;
    }
}

echo json_encode(array(
    'status' => 'ok',
    'url' => $img_info['image_url']
));
