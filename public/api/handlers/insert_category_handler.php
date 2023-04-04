<?php
function category_insert()
{
    global $input;
    $decoded_data = json_decode($input);
    $send_err = fn ($err) => send_json($err, 401);
    global $connection;
    $stmt = $connection->prepare("SELECT * FROM categories WHERE name = ?");
    $stmt->execute([$decoded_data->name]);
    if ($stmt->rowCount() > 0) {
        $send_err(['message' => 'category with name ' . $decoded_data->name . ' already exist']);
    } else {
        $stmt = createItem("categories", [
            "name" => $decoded_data->name,
            "description" => $decoded_data->description,
            "ordering" => intval($decoded_data->ordering),
            "allow_ads" => $decoded_data->ads,
            "allow_comment" => $decoded_data->commenting
        ]);
        if ($stmt->rowCount() > 0) {
            send_json(['message' => 'Item Added successfully']);
        } else {
            $send_err(['message' => 'something went wrong']);
        }
    }
}
