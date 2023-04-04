<?php
function delete_category($id)
{
    global $connection;
    $row = $connection->query("SELECT * FROM categories WHERE id = $id")->fetch();
    if ($row) {
        $connection->query("DELETE FROM categories WHERE id = $id");
        send_json(['message' => 'category deleted successfully']);
    } else {
        send_json(['message' => 'somthing went wront'], 401);
    }
}
