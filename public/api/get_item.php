<?php
function get_item($id)
{
    global $connection;
    $retval = $connection->query("SELECT * FROM items WHERE id = $id")->fetch();
    return $retval ? $retval : [];
}
