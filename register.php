<?php

// === CORS HEADERS ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Content-Type: application/json; charset=UTF-8");

// Povezivanje na bazu
$dsn = "mysql:host=localhost;dbname=kviz;charset=utf8mb4";
$user = "root";
$pass = "";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Greška pri konekciji: " . $e->getMessage()]);
    exit;
}

// Uzimanje inputa (može i JSON i form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback na klasičan POST
}

$username = trim($data["username"] ?? "");
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

// Validacija
if ($username === "" || $password === "") {
    echo json_encode(["success" => false, "message" => "Sva polja su obavezna"]);
    exit;
}

// Provera da li već postoji korisnik
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Korisničko ime je zauzeto"]);
    exit;
}

// Hash lozinke
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Unos u bazu
$stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
$stmt->execute([$username, $email, $password_hash]);

echo json_encode(["success" => true, "message" => "Registracija uspešna"]);
