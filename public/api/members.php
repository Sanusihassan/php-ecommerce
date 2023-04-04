<?php

/**
 * =================================================================
 * manage members page
 * =================================================================
 */

function fetchMembers($id)
{
    global $connection;
    if (!is_numeric($id)) {
        return;
    }
    $row = getRowById(["username", "password", "email", "id", "reg_date", "reg_status"], "users", $id);
    // $stmt = $connection->prepare("SELECT  FROM users WHERE id = ? LIMIT 1");
    // $stmt->execute(array($id));
    // $row = $stmt->fetch();
    return $row;
}
$result = fetchMembers($id);
$response = [];
if ($result) {
    $response = [
        'username' => $result['username'],
        // 'oldpassword' => $result['password'],
        'password' => $result['password'],
        'email' => $result['email'],
        'id' => $result['id'],
        'reg_date' => $result['reg_date'],
        'reg_status' => $result['reg_status']
    ];
}
