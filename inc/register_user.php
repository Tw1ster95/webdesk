<?php
    session_start();
    include_once 'config.php';
    include_once 'database.php';

    if(isset($_POST['username'])
    && isset($_POST['password'])
    && isset($_POST['password2'])) {
        $database = new Database();
        $database->connect(
            MAIN_MYSQL_HOST,
            MAIN_MYSQL_USERNAME,
            MAIN_MYSQL_PASSWORD,
            MAIN_MYSQL_DB
        );

        $username = $database->escape_string($_POST['username']);
        $password = $database->escape_string($_POST['password']);
        $password2 = $database->escape_string($_POST['password2']);

        if(strlen($username) < 5) {
            echo json_encode(array(
                'status' => 'fail',
                'message' => 'Username needs to be 5 or more characters.'
            ));
            exit;
        }
        if(strlen($password) < 5) {
            echo json_encode(array(
                'status' => 'fail',
                'message' => 'Password needs to be 5 or more characters.'
            ));
            exit;
        }
        
        if($password !== $password2) {
            echo json_encode(array(
                'status' => 'fail',
                'message' => 'Passwords are not the same.'
            ));
            exit;
        }

        $fetchInfo = $database->get(array(
            'table' => 'users',
            'filter' => "username = '" . $username . "'"
        ));
        if($fetchInfo->num_rows !== 0) {
            echo json_encode(array(
                'status' => 'fail',
                'message' => 'User with this Username already exists.'
            ));
            exit;
        }

        $encrypted_password = $database->encodePassword($password);

        if($database->create(
            'users',
            array('username', 'password'),
            array($username, $encrypted_password)
        ) == TRUE) {
            $id = $database->getLastInsertedId();

            $database->create(
                'settings',
                array('user_id'),
                array($id)
            );

            $_SESSION['id'] = $id;
            $_SESSION['username'] = $username;

            echo json_encode(array(
                'status' => 'ok',
                'id' => $id,
                'username' => $username
            ));
            exit;
        }
        
        echo json_encode(array(
            'status' => 'fail',
            'message' => 'Registration was not successfull. Please try again.'
        ));
        exit;
    }
    echo json_encode(array(
        'status' => 'fail',
        'message' => 'Unexpected error'
    ));
