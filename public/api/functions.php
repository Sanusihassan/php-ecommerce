<?php
function send_json($json, $status = 200)
{
    header('Content-type: application/json');
    http_response_code($status);
    echo json_encode($json);
}
class Console
{
    public function log($str)
    {
        // $fp = fopen('php://output', 'w');
        exec("echo PHP OUTPUT: " . date("H:i:s") . " - $str - " . PHP_EOL);
        // fclose($fp);
        // print($message);
        // flush();
        // ob_flush();
    }
}

$console = new Console;

function sanitize_url($url)
{
    $url = strtok($url, '?');
    return $url;
}
