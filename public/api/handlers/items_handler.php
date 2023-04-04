<?php
function validate_inputs($input)
{
    // return $input;
    $formErrors = array();
    if (empty($input->category)) {
        $formErrors[] = 'Category must not be empty';
    }
    if (empty($input->country)) {
        $formErrors[] = 'Country must not be empty';
    }
    if (empty($input->description)) {
        $formErrors[] = 'Description must not be empty';
    }
    if (empty($input->member)) {
        $formErrors[] = 'Member must not be empty';
    }
    if (empty($input->name)) {
        $formErrors[] = 'Name must not be empty';
    }
    if (empty($input->price)) {
        $formErrors[] = 'Price must not be empty';
    }
    if (empty($input->status)) {
        $formErrors[] = 'Status must not be empty';
    }
    return $formErrors;
}
function items_handler()
{
    global $input;
    global $connection;
    $data = json_decode($input);
    $errors = validate_inputs($data);

    if (
        count($errors) > 0
    ) {
        send_json($errors, 401);
    } else {
        $stmt = $connection->prepare(
            "INSERT INTO items
            (
                    name,
                    description,
                    price,
                    origin_country,
                    status,
                    member_id,
                    cat_id,
                    add_date
            )
            VALUES (
                    :name,
                    :description,
                    :price,
                    :origin_country,
                    :status,
                    :member_id,
                    :cat_id,
                    NOW()
                )"
        );
        $stmt->bindValue(":name", $data->name);
        $stmt->bindValue(":description", $data->description);
        $stmt->bindValue(":price", $data->price);
        $stmt->bindValue(":origin_country", $data->country);
        $stmt->bindValue(":status", $data->status);
        $stmt->bindValue(":member_id", $data->member);
        $stmt->bindValue(":cat_id", $data->category);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            send_json(['message' => 'item inserted successfully']);
        }
    }
}
