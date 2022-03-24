<?php
session_start();

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

$dir = '../../files/' . $_SESSION['id'];
$file_id = $_POST['file_id'];
$file_type = $_POST['file_type'];
$content = $_POST['content'];

if (!is_dir($dir)) {
    mkdir($dir);
}

$dir .= '/' . $file_id . '.' . $file_type;

file_put_contents($dir, $content);

echo json_encode(array(
    'status' => 'ok'
));
