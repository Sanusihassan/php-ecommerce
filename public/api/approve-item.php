<?php
function approve_item($id)
{
    // global $connection;
    // $stmt = $connection->prepare("UPDATE items SET approve = 0 WHERE $id = ?");
    // $stmt->execute(array($id));
    if (updateItem("items", $id, ['approve' => 1])->rowCount() > 0) {
        send_json(['message' => 'One Item Has Been Approved']);
    }
}
