<?php
function category_update()
{
    global $input;
    global $connection;
    $decoded_data = json_decode($input, true);
    $values = [
        $decoded_data['name'],
        $decoded_data['description'],
        intval($decoded_data['ordering']),
        $decoded_data['visibility'],
        $decoded_data['commenting'],
        $decoded_data['ads']
    ];
    $id = $decoded_data['id'];
    $stmt = $connection->prepare(
        "UPDATE 
        categories SET 
        name = ?,
        description = ?,
        ordering = ?,
        visibility = ?,
        allow_comment = ?,
        allow_ads = ?
        WHERE id = $id"
    );
    $stmt->execute($values);
    send_json(["message" => $stmt->rowCount() . " Records Updated"]);
}
