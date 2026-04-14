<?php
// Data Receiver from SA-MP Server
$name = $_POST['name'] ?? '';
$ip = $_POST['ip'] ?? '';

if (!empty($name)) {
    $data = [
        "name" => $name,
        "ip"   => $ip,
        "time" => time()
    ];

    $filePath = __DIR__ . DIRECTORY_SEPARATOR . 'last_join.json';

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filePath, $jsonData, LOCK_EX);
}
?>