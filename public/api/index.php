<?php
ob_start();
session_start();
// cors
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
?>
<?php
include "./db-connection.php";
require "./functions.php";
// helper functions for crud operations
include_once "./crud.php";
// post handlers
include_once "./handlers/admin_handler.php";
include_once "./handlers/update_handler.php";
include_once "./handlers/insert_handler.php";
include_once "./handlers/insert_category_handler.php";
include_once "./handlers/category_update_handler.php";
include_once "./handlers/items_handler.php";
include_once "./handlers/item_update.php";
include_once "./handlers/edit-comment.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = file_get_contents('php://input');
    $input_data = json_decode($input);
    $request = $_SERVER['REQUEST_URI'];
    $request = sanitize_url($request);
    switch ($request) {
        case '/':
            $username = $input_data->username;
            $password = $input_data->oldpassword;
            admin_handler($username, $password);
            break;
        case '/update':
            update_handler();
            break;
        case '/update-category':
            category_update();
            break;
        case '/insert':
            insert_handler();
            break;
        case "/category":
            category_insert();
            break;
        case "/items":
            items_handler();
            break;
        case "/edit-item":
            item_update();
            break;
        case "/edit-comment":
            edit_comment();
            break;
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $request = $_SERVER['REQUEST_URI'];
    $request = sanitize_url($request);
    $id = "";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
    }
    switch ($request) {
        case '/':
            break;
        case "/logout":
            include_once "./logout.php";
            break;
        case "/members":
            include_once "./members.php";
            send_json($result ? $response : []);
            break;
        case "/manage":
            include_once "./manage.php";
            send_json(getMembers());
            break;
        case "/delete":
            include_once "./delete.php";
            delete_user();
            break;
        case "/dashboard":
            include_once "./dashboard.php";
            send_json([
                "items_count" => getItemsCount("id", "items"),
                "users_count" => getItemsCount(),
                "pending_members" => getPendingMembers(),
                "latest_users" => get_latest("*", "users", 5),
                "latest_items" => get_latest("*", "items", 5),
                "latest_comments" => (function () {
                    global $connection;
                    return $connection->query(
                        "SELECT 
                    comments.*, users.username FROM comments 
                    LEFT JOIN users ON users.id = comments.user_id"
                    )->fetchAll();
                })()
            ]);
            // send_json();
            break;
        case "/activate":
            include_once "./activate.php";
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                activateMember($id);
            } else {
                send_json(['message' => 'please provide an id'], 401);
            }
            break;
        case "/categories":
            include_once "./categories.php";
            $sort_order = isset($_GET['sort_order']) ? $_GET['sort_order'] : "ASC";
            send_json(fetchCategories($sort_order));
            break;
        case '/category':
            include_once "./category.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                send_json(get_category($id));
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/delete-category':
            include_once 'delete_category.php';
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                delete_category($id);
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/items':
            include_once "./get_items.php";
            send_json(get_items());
            break;
        case '/item':
            include_once "./get_item.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                send_json(get_item($id));
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/delete-item':
            include_once "./delete-item.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                delete_item($id);
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/approve-item':
            include_once "./approve-item.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                approve_item($id);
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/comments':
            include_once "./comments.php";
            send_json(get_comments());
            break;
        case '/comment':
            include_once "./get_comment.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                send_json(get_comment($id));
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
        case '/get-commnet-by-item-id':
            include_once "get-comment-by-item-id.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                send_json(get_that_comment($id));
            }
            break;
        case '/delete-comment':
            include_once "./delete-comment.php";
            if (isset($_GET['id']) && $_GET['id']) {
                $id = $_GET['id'];
                send_json(delete_comment($id));
            } else {
                send_json(['message' => 'please provide an id with a value'], 401);
            }
            break;
    }
}

ob_end_flush();
