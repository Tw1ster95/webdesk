<?php
session_start();
include_once '../config.php';
include_once '../database.php';

if (
    isset($_SESSION['id'])
    && isset($_POST['type'])
    && isset($_POST['in_folder_id'])
    && isset($_POST['name'])
    && isset($_POST['pos_row'])
    && isset($_POST['pos_col'])
) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $user_id = $database->escape_string($_SESSION['id']);
    $type = $database->escape_string($_POST['type']);
    $in_folder_id = $database->escape_string($_POST['in_folder_id']);
    $name = $database->escape_string($_POST['name']);
    $row = $database->escape_string($_POST['pos_row']);
    $col = $database->escape_string($_POST['pos_col']);

    if ($database->create(
        'icons',
        array('name', 'type', 'in_folder_id', 'user_id', 'pos_row', 'pos_col'),
        array($name, $type, $in_folder_id, $user_id, $row, $col)
    ) == TRUE) {
        $id = $database->getLastInsertedId();

        // type 3 = img
        if ($type == 3) {
            if ($database->create(
                'img_urls',
                array('icon_id', 'image_url'),
                array($id, 'http://webdesk.test/assets/img/icons/noimage.jpg')
            ) == TRUE) {
                echo json_encode(array(
                    'status' => 'ok',
                    'id' => $id
                ));
            } else {
                echo json_encode(array(
                    'status' => 'fail',
                    'message' => 'Icon generated but could not insert image data to the img_urls table.'
                ));
            }
            exit;
        }

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
