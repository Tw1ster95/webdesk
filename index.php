<?php
    if(strlen($_SERVER['REQUEST_URI']) > 1) {
        header('location ' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://') . $_SERVER['SERVER_NAME']);
        exit;
    }

    include_once 'app.html';