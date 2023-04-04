<?php
function insert_validate_form($decoded_data)
{
    $user     = $decoded_data->username;
    $pass     = $decoded_data->password;
    $email    = $decoded_data->email;
    $name     = $decoded_data->full;


    $formErrors = array();

    if (strlen($user) < 4) {
        $formErrors[] = 'Username Cant Be Less Than 4 Characters';
    }

    if (strlen($user) > 20) {
        $formErrors[] = 'Username Cant Be More Than 20 Characters';
    }

    if (empty($user)) {
        $formErrors[] = 'Username Cant Be Empty';
    }

    if (empty($pass)) {
        $formErrors[] = 'Password Cant Be Empty';
    }

    if (empty($name)) {
        $formErrors[] = 'Full Name Cant Be Empty';
    }

    if (empty($email)) {
        $formErrors[] = 'Email Cant Be Empty';
    }
    // if (empty($avatarName)) {
    //     $formErrors[] = 'Avatar Is Required';
    // }

    return $formErrors ? $formErrors : [];
}
function insert_handler()
{
    $input = json_decode(file_get_contents('php://input'));
    // $input = json_decode((stdClass) $input, true);
    // send_json($input);

    if ($errors = insert_validate_form($input)) {
        send_json(array_values($errors), 404);
    } else {
        $hashPass = sha1($input->password);
        $now = date('Y-m-d H:i:s');
        $values = [
            "username" => $input->username,
            "password" => $hashPass,
            "email" => $input->email,
            "full_name" => $input->full,
            "reg_date" => "$now",
            "reg_status" => 1
        ];
        // if (!$connection->query("SELECT * FROM users WHERE username = '$input->username'")) {
        try {
            // $stmt = $connection->prepare("INSERT INTO 
            //     users
            //     (
            //     username,
            //     password,
            //     email,
            //     full_name) VALUES (:username, :password, :email, :full_name)");
            // $stmt->execute($values);
            $stmt = createItem("users", $values);
            send_json(["message" => $stmt->rowCount() . " Records Added"]);
        } catch (PDOException $e) {
            send_json(["message" => $e->getMessage()]);
        }
    }
}
