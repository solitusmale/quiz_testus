<?php
require_once __DIR__ . '/config/database.php';

// parametri: php create_admin.php adminUsername adminPassword admin@example.com
$username = $argv[1] ?? 'admin';
$password = $argv[2] ?? 'admin123';
$email    = $argv[3] ?? 'admin@example.com';

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$api_token = bin2hex(random_bytes(32));

$stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, role, subscription, api_token) VALUES (?, ?, ?, 'admin', 1, ?)");
$stmt->execute([$username, $email, $password_hash, $api_token]);

echo "Admin created: username={$username}, password={$password}\n";
echo "API token (čuvaj ga): {$api_token}\n";
