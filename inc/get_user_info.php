<?php
session_start();

if (isset($_SESSION['id'])) {
    echo json_encode(array(
        'status' => 'ok',
        'id' => $_SESSION['id'],
        'username' => $_SESSION['username']
    ));
} else
    echo json_encode(array(
        'status' => 'fail'
    ));
