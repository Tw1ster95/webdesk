<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error setting image url. Try reloading the page.'
    ));
    exit;
}

if (!isset($_POST['icon_id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error setting image url. Icon ID not set.'
    ));
    exit;
}
if (!isset($_POST['url'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error setting image url. Image url not set.'
    ));
    exit;
}

if (!filter_var($_POST['url'], FILTER_VALIDATE_URL)) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error setting image url. Image url is invalid.'
    ));
    exit;
}

$header_response = get_headers($_POST['url'], 1);
if (strpos($header_response[0], "404") !== false) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error setting image url. Image url is invalid.'
    ));
    exit;
}

// Check file id in database
$database = new Database();
$database->connect(
    MAIN_MYSQL_HOST,
    MAIN_MYSQL_USERNAME,
    MAIN_MYSQL_PASSWORD,
    MAIN_MYSQL_DB
);

$icon_id = $database->escape_string($_POST['icon_id']);
$url = $database->escape_string($_POST['url']);

$database->update(
    'img_urls',
    ['image_url'],
    [$url],
    'icon_id',
    $icon_id
);

echo json_encode(array(
    'status' => 'ok',
    'message' => 'Image updated.'
));
