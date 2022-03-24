<?php
session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. Try reloading the page.'
    ));
    exit;
}

$fail_msg = NULL;
if (!isset($_POST['file_id'])) {
    $fail_msg = 'Error getting file. File ID not set.';
} else if (!isset($_POST['file_type'])) {
    $fail_msg = 'Error getting file. File type not set.';
}

if ($fail_msg !== NULL) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => $fail_msg
    ));
    exit;
}

$dir = '../../files/' . $_SESSION['id'];
$file_id = $_POST['file_id'];
$file_type = $_POST['file_type'];

if (!is_dir($dir)) {
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Error getting file. File directory error.'
    ));
    exit;
}

$dir .= '/' . $file_id . '.' . $file_type;

$content = file_get_contents($dir);

echo json_encode(array(
    'status' => 'ok',
    'content' => $content
));
