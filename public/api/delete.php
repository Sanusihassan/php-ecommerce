<?php
function delete_user()
{
    global $id;
    global $connection;
    $stmt = $connection->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute(array($id));
}
