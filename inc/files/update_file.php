<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error creating file. Try reloading the page.'
    ));
    exit;
}

$fail_msg = NULL;
if (!isset($_POST['file_id'])) {
    $fail_msg = 'Error creating file. File ID not set.';
} else if (!isset($_POST['file_type'])) {
    $fail_msg = 'Error creating file. File type not set.';
} else if (!isset($_POST['content'])) {
    $fail_msg = 'Error creating file. File content not set.';
}

if ($fail_msg !== NULL) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => $fail_msg
    ));
    exit;
}

$userid = $_SESSION['id'];
$dir = '../../files/' . $userid;

if (!is_dir($dir)) {
    mkdir($dir);
}


// Check file id in database
$database = new Database();
$database->connect(
    MAIN_MYSQL_HOST,
    MAIN_MYSQL_USERNAME,
    MAIN_MYSQL_PASSWORD,
    MAIN_MYSQL_DB
);

$file_id = $database->escape_string($_POST['file_id']);

$fetchInfo = $database->get(array(
    'table' => 'icons',
    'filter' => "user_id = " . $userid . " AND id = " . $file_id
));

if ($fetchInfo->num_rows == 0) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. Could not find that file id in the database.'
    ));
    exit;
}

$file_type = $_POST['file_type'];
$content = $_POST['content'];

$dir .= '/' . $file_id . '.' . $file_type;

file_put_contents($dir, $content);

echo json_encode(array(
    'status' => 'ok'
));
