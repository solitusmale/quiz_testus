<?php
// api/get_questions.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/database.php';

$subject_id = isset($_GET['subject_id']) ? (int)$_GET['subject_id'] : null;
$token = $_GET['token'] ?? null;

// helper: nađi korisnika po tokenu (ako postoji)
function getUserByToken($pdo, $token) {
    if(!$token) return null;
    $stmt = $pdo->prepare("SELECT id, username, subscription FROM users WHERE api_token = ? LIMIT 1");
    $stmt->execute([$token]);
    return $stmt->fetch();
}

if (!$subject_id) {
    http_response_code(400);
    echo json_encode(['error' => 'subject_id je obavezan']);
    exit;
}

$user = getUserByToken($pdo, $token);
$subscribed = ($user && $user['subscription'] == 1);

// limit ako nije pretplaćen
$limitClause = $subscribed ? '' : ' LIMIT 5';

// uzimamo pitanja (random redosled)
$sql = "SELECT question_id, question_text, explanation FROM questions WHERE subject_id = ? ORDER BY RAND()" . $limitClause;
$stmt = $pdo->prepare($sql);
$stmt->execute([$subject_id]);
$questions = $stmt->fetchAll();

// za svako pitanje dohvati odgovore
foreach($questions as &$q) {
    $stmt2 = $pdo->prepare("SELECT answer_id, answer_text FROM answers WHERE question_id = ?");
    $stmt2->execute([$q['question_id']]);
    $q['answers'] = $stmt2->fetchAll();
    // ne vraćamo is_correct u odgovoru (ne otkrivaj tačan odgovor klijentu)
}
unset($q);

echo json_encode([
    'subject_id' => $subject_id,
    'subscribed' => (bool)$subscribed,
    'count' => count($questions),
    'questions' => $questions
]);
