<?php
function get_category($id)
{
    global $connection;
    if (isset($id) || $id != "") {
        $res = $connection->query("SELECT * FROM categories WHERE id = $id")->fetch();
        // return $res;
        $retval = [
            "ads" => $res['allow_ads'],
            "commenting" => $res['allow_comment'],
            "description" => $res['description'],
            "name" => $res['name'],
            "ordering" => $res['ordering'],
            "visibility" => $res['visibility'],
            "id" => $res['id']
        ];
        return $retval;
    } else {
        return send_json(['message' => 'please provide an id'], 401);
    }
}
