<?php
function delete_comment($id)
{
    global $connection;
    return $connection->query("DELETE FROM comments WHERE id = $id")->execute();
}
