<?php
function get_comments()
{
    global $connection;
    return $connection->query("SELECT 
    comments.*,
    items.name as item_name, users.username as username FROM comments
    INNER JOIN items ON items.id = comments.item_id
    INNER JOIN users ON users.id = comments.user_id
    ")->fetchAll();
}
