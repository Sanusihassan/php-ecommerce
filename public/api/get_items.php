<?php
function get_items()
{
    global $connection;
    return $connection->query(
        "SELECT items.*, categories.name as cat_name, users.username FROM items
    INNER JOIN categories ON categories.id = items.cat_id
    INNER JOIN users ON users.id = items.member_id
    "
    )->fetchAll();
}
