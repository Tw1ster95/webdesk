<?php
session_start();
include_once 'config.php';
include_once 'database.php';

if (
    isset($_SESSION['id'])
    && isset($_POST['type'])
    && isset($_POST['in_folder_id'])
    && isset($_POST['name'])
    && isset($_POST['row'])
    && isset($_POST['col'])
) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $id = $database->escape_string($_SESSION['id']);
    $type = $database->escape_string($_POST['type']);
    $in_folder_id = $database->escape_string($_POST['in_folder_id']);
    $name = $database->escape_string($_POST['name']);
    $row = $database->escape_string($_POST['row']);
    $col = $database->escape_string($_POST['col']);

    if ($database->create(
        'icons',
        array('name', 'type', 'folder_id', 'user_id', 'pos_row', 'pos_col'),
        array($name, $type, $in_folder_id, $id, $row, $col)
    ) == TRUE) {
        $id = $database->getLastInsertedId();

        echo json_encode(array(
            'status' => 'ok',
            'id' => $id
        ));
        exit;
    }

    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Icon could not be generated. Please try again.'
    ));
    exit;
}
echo json_encode(array(
    'status' => 'fail',
    'message' => 'Unexpected error'
));
