<?php
function delete_item($id)
{
    global $connection;
    $row = $connection->query("SELECT * FROM items WHERE id = $id")->fetch();
    if ($row) {
        $connection->query("DELETE FROM items WHERE id = $id");
        send_json(['message' => 'item deleted successfully']);
    }
}
