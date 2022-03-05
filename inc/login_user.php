<?php
session_start();
include_once 'config.php';
include_once 'database.php';

if (
    isset($_POST['username'])
    && isset($_POST['password'])
) {
    $database = new Database();
    $database->connect(
        MAIN_MYSQL_HOST,
        MAIN_MYSQL_USERNAME,
        MAIN_MYSQL_PASSWORD,
        MAIN_MYSQL_DB
    );

    $username = $database->escape_string($_POST['username']);
    $password = $database->escape_string($_POST['password']);

    $fetchInfo = $database->get(array(
        'table' => 'users',
        'filter' => "username = '" . $username . "'"
    ));

    if ($fetchInfo->num_rows == 0)
        echo json_encode(array(
            'status' => 'fail',
            'message' => 'User with that username not found.'
        ));
    else {
        $user = $fetchInfo->fetch_assoc();

        if ($user['password'] !== $database->encodePassword($password))
            echo json_encode(array(
                'status' => 'fail',
                'message' => 'Password is incorrect.'
            ));
        else {
            $_SESSION['id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            echo json_encode(array(
                'status' => 'ok',
                'id' => $user['id'],
                'username' => $user['username']
            ));
        }
    }
} else
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Unexpected error'
    ));
