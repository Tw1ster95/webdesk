<?php
session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. Try reloading the page.'
    ));
    exit;
}

if (!isset($_POST['file_id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. File ID not set.'
    ));
    exit;
}
if (!isset($_POST['file_type'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. File type not set.'
    ));
    exit;
}

$dir = '../../files/' . $_SESSION['id'];

if (!is_dir($dir)) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. File directory error.'
    ));
    exit;
}

$file_id = $_POST['file_id'];
$file_type = $_POST['file_type'];

$dir .= '/' . $file_id . '.' . $file_type;

if(!file_exists($dir)) {
    file_put_contents($dir, '');
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. File was not found. Generated a new empty one.'
    ));
    exit;
}

$content = file_get_contents($dir);

echo json_encode(array(
    'status' => 'ok',
    'content' => $content
));
