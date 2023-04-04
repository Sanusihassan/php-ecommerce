<?php
function createItem($tableName, $params)
{
    $query = "INSERT INTO $tableName (" . implode(', ', array_keys($params)) . ") VALUES (:" . implode(', :', array_keys($params)) . ")";
    $stmt = $GLOBALS['connection']->prepare($query);
    $stmt->execute($params);
    return $stmt;
}
function colonify($arr)
{
    $arr = array_map(function ($item) {
        return ":$item";
    }, $arr);
    return $arr;
}
function getRowById($items, $tableName, $id)
{
    global $connection;
    $stuff = implode(", ", $items);
    $query = "SELECT $stuff FROM $tableName WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->execute(["id" => $id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function selection($items, $table, $cond)
{
    global $connection;
    $numeric_val = filter_var($cond, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    // if (!($numeric_val || $cond == "TRUE" || $cond == "OKAY")) {
    $stuff = $items;
    $query = "SELECT $stuff FROM $table WHERE $cond";
    $stmt = $connection->prepare($query);
    if (gettype($items) == "array") {
        $items = colonify($items);
        $stuff = implode(", ", $items);
        foreach ($items as $item) {
            $stmt->bindParam("$item", str_replace(":", "", $item));
        }
    }
    $stmt->execute();
    return $stmt;
    // }
}

function get_latest($items, $table, $limit = 5, $field = 'id')
{
    $result = selection($items, $table, "TRUE ORDER BY $field DESC LIMIT $limit");
    return $result->fetchAll();
}

function updateItem($tableName, $id, $params)
{
    $query = "UPDATE $tableName SET " . implode(', ', array_map(function ($column) {
        return "$column=:$column";
    }, array_keys($params))) . " WHERE id = :id";
    $params['id'] = $id;
    $stmt = $GLOBALS['connection']->prepare($query);
    $stmt->execute($params);
    return $stmt;
}

function deleteItem($tableName, $id)
{
    $query = "DELETE FROM $tableName WHERE id = :id";
    $stmt = $GLOBALS['connection']->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}
