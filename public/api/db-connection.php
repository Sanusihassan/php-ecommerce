<?php
$dsn = "mysql:host=localhost;dbname=shop;";
$user = "root";
$password = "12345";


$options = [
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
];

try {
    $connection = new PDO($dsn, $user, $password, $options);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "error: " . $e->getMessage();
}
