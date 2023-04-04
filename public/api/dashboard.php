<?php

// session_start();

// if (isset($_SESSION["username"])) {
//     echo $_SESSION['username'];
// } else {
//     header("Location: /");
// }

function getItemsCount($item = "id", $table = "users")
{

    global $connection;

    $stmt2 = $connection->prepare("SELECT COUNT(`$item`) FROM $table");

    $stmt2->execute();

    return $stmt2->fetchColumn();
}

function getPendingMembers()
{
    global $connection;
    $result = $connection->query("SELECT * FROM users WHERE reg_status = 0");
    return $result ? $result->rowCount() : 0;
}


// unset($_SESSION['username']);
