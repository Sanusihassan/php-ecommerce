<?php

function admin_handler($username, $password)
{
    global $connection;
    // readItem("users", $id);
    // selection([], "", "TRUE");
    $hashedPass = sha1($password);
    // $stmt = $connection->prepare("SELECT id, username, password FROM users WHERE username = ? AND password = ? AND group_id = 1 LIMIT 1");
    // $stmt->execute(array($username, $hashedPassword));
    // $row = $stmt->fetch();
    $row  = selection([
        "username",
        "password",
        "id"
    ], "users", "username = $username AND password = $hashedPass AND group_id = 1 LIMIT 1");
    if (count($row) > 0) {
        // $_SESSION["username"] = $username;
        // Store the user in a cookie
        // setcookie('username', $username, time() + (86400 * 30), "/"); // cookie expires in 30 days
        $_SESSION["id"] = $row['id'];
        // send_json(['username' => $username]);
        exit();
    } else {
        // send_json(["message" => "you are not admin"]);
    }
}
