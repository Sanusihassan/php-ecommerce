<?php
function edit_comment()
{
    global $input;
    global $connection;
    $data = json_decode($input);
    // send_json($data);
    $stmt = $connection->prepare("UPDATE comments SET comment = ? WHERE id = ?");
    $stmt->execute([
        $data->comment,
        $data->id
    ]);
    send_json(['message' => "Comment updated"]);
}
