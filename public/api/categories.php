<?php
function fetchCategories($sort_order = "ASC")
{
    global $connection;
    $sorting_options = array("ASC", "DESC");
    if (!in_array($sort_order, $sorting_options)) {
        $sort_order = "ASC";
    }
    return $connection->query("SELECT * FROM categories ORDER BY ordering $sort_order")->fetchAll();
}
