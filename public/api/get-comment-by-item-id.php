<?php
function get_that_comment($id)
{
    global $connection;
    return $connection->query("SELECT comments.*, users.username, items.name as item_name FROM comments
    INNER JOIN users ON comments.user_id = users.id
    INNER JOIN items ON comments.item_id = items.id
    WHERE item_id = $id")->fetchAll();
}
