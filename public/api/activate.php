<?php
function activateMember($id)
{
    if (updateItem("users", $id, ['reg_status' => 1])->rowCount() > 0) {
        send_json(['message' => 'One Record Has Been Activated']);
    }
}
