<?php
// === CORS HEADERS ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Opcija: prekini izvršavanje ako je preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// === SESSION ===
session_start();

// === DATABASE CONNECTION ===
$host = "localhost";
$db   = "kviz";
$user = "root";
$pass = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Uzimamo JSON podatke iz React fetch-a
    $data = json_decode(file_get_contents("php://input"), true);

    $username = trim($data["username"] ?? "");
    $password = trim($data["password"] ?? "");

    if (!$username || !$password) {
        echo json_encode(["success" => false, "message" => "Sva polja su obavezna"]);
        exit;
    }

    // Tražimo korisnika po username-u
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user && password_verify($password, $user["password_hash"])) {
        $_SESSION["user_id"] = $user["user_id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["role"] = $user["role"];

        echo json_encode([
            "success" => true,
            "message" => "Uspešno logovanje",
            "user" => [
                "id" => $user["user_id"],
                "username" => $user["username"],
                "role" => $user["role"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Pogrešno korisničko ime ili lozinka"]);
    }

} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
