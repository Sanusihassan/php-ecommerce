<?php
function item_update()
{
    global $connection;
    global $input;
    $data = json_decode($input, true);
    $id = $data['id'];
    $errors = validate_inputs($data);
    if (count($errors) > 0) {
        $values = [
            $data["description"],
            $data["price"],
            $data["origin_country"],
            $data["status"],
            $data["cat_id"],
            $data["member_id"],
            $data["name"],
            $data["id"],
        ];
        $stmt = $connection->prepare("UPDATE items SET
            description = ?,
            price = ?,
            origin_country = ?,
            status = ?,
            cat_id = ?,
            member_id = ?,
            name = ?
            WHERE id = ?");
        $stmt->execute($values);
        send_json(["message" => "One Record Updated"]);
    } else {
        send_json($errors, 401);
    }
}
