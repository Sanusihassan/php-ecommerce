<?php

function getMembers()
{
    global $connection;
    $pendingCond = "";
    if (isset($_GET['page'])) {
        if (($page = $_GET['page']) && $page == "pending") {
            $pendingCond = "AND reg_status = 0";
        }
    }
    // selection("*", "")
    $stmt = $connection->query("SELECT * FROM users WHERE id != 1 $pendingCond");
    return $stmt->fetchAll();
}
