<?php
function validate_form($decoded_data)
{
    $patterns = [
        "/.{3,}/",
        "/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/",
    ];
    $errorMessages = [
        "your name must be more than 3 characters",
        "this must be a valid email address"
    ];
    $i = 0;
    $err_res = [];
    // if(!preg_match($patterns[0], $)) {

    // }
    foreach ($decoded_data as $val) {
        if (!preg_match($patterns[$i], $val)) {
            $err_res[$i] = $errorMessages[$i];
        }
        $i += 1;
    }
    if (count($err_res) == 0) {
        return 0;
    } else {
        return $err_res;
    }
}
function update_handler()
{
    global $connection;
    $input_data = file_get_contents('php://input');
    $decoded_data = json_decode($input_data, true);
    // send_json($decoded_data);
    // exit();
    $password = "";
    if (empty($decoded_data["newpassword"])) {
        $password = $decoded_data["oldpassword"];
    } else {
        $password = sha1($decoded_data["newpassword"]);
    }
    $values = [
        $decoded_data['username'],
        $password,
        $decoded_data['email'],
        $decoded_data['full'],
        $decoded_data['id']
    ];
    if ($errors = validate_form([
        $decoded_data['username'],
        $decoded_data['email']
    ])) {
        send_json($errors, 404);
        exit();
    }
    $stmt = updateItem("users", $decoded_data['id'], $values);
    // $stmt = $connection->prepare("UPDATE 
    // users
    // SET username = ?,
    // password = ?,
    // email = ?,
    // full_name = ? WHERE id = ?");
    // $stmt->execute($values);
    send_json(["message" => $stmt->rowCount() . " Records Updated"]);
}
