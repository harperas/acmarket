<?php
require '../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"));
$google_token = $data->token ?? '';

if (!$google_token) {
  http_response_code(400);
  echo json_encode(["message" => "Missing Google token"]);
  exit;
}

// Verify token with Google
$googleData = file_get_contents("https://oauth2.googleapis.com/tokeninfo?id_token=" . $google_token);
$googleUser = json_decode($googleData, true);

// Validate audience (aud)
$expectedClientId = "763469761685-v814dnuj2llu7v0hvra7u0gavtb6bcav.apps.googleusercontent.com"; // replace this!
if (!isset($googleUser['email']) || $googleUser['aud'] !== $expectedClientId) {
  http_response_code(401);
  echo json_encode(["message" => "Invalid Google token"]);
  exit;
}

$email = $googleUser['email'];
$name = $googleUser['name'];

// Check if user exists, else create one
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  // Register new user
  $insert = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, '', 'buyer')");
  $insert->bind_param("ss", $name, $email);
  $insert->execute();

// get the details of user
$getUserSql = "SELECT * FROM users WHERE email = ?";
$getUserStmt = $conn->prepare($getUserSql);
$getUserStmt->bind_param("s", $email);
$getUserStmt->execute();
$result = $getUserStmt->get_result();
$currentUser = $result->fetch_assoc();

$userId = $currentUser['id'];

} else {
  $user = $result->fetch_assoc();
  $userId = $user['id'];
}

// Create JWT token
$payload = [
  "iss" => "http://localhost",
  "iat" => time(),
  "exp" => time() + (60 * 60 * 24),
  "user_id" => $userId,
  "email" => $email,
  "role" => "user",
  "name" => $name
];

$secretKey = "your_secret_key_here";
$jwt = JWT::encode($payload, $secretKey, 'HS256');

echo json_encode(["token" => $jwt]);

?>