<?php
session_start();
include_once 'config.php';
include_once 'database.php';

if (
    isset($_SESSION['id'])
    && isset($_POST['id'])
) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $user_id = $database->escape_string($_SESSION['id']);
    $id = $database->escape_string($_POST['id']);

    $arrCols = ['type', 'in_folder_id', 'name', 'pos_row', 'pos_col'];
    $arrTags = array();
    $arrVals = array();
    foreach ($arrCols as $col) {
        if (isset($_POST[$col])) {
            array_push($arrTags, $database->escape_string($col));
            array_push($arrVals, $database->escape_string($_POST[$col]));
        }
    }

    $database->update(
        'icons',
        $arrTags,
        $arrVals,
        'id',
        $id
    );

    echo json_encode(array(
        'status' => 'ok'
    ));
    exit;
}
echo json_encode(array(
    'status' => 'fail',
    'message' => 'Unexpected error'
));
