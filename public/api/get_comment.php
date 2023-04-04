<?php
function get_comment($id)
{
    global $connection;
    return $connection->query("SELECT * FROM comments WHERE id = $id")->fetch();
}
