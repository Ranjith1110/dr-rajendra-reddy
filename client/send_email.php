<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}

// Get the JSON data sent from React
$json_data = file_get_contents("php://input");
$data = json_decode($json_data);

// Sanitize and assign inputs
$name = isset($data->name) ? htmlspecialchars(strip_tags(trim($data->name))) : '';
$email = isset($data->email) ? filter_var(trim($data->email), FILTER_SANITIZE_EMAIL) : '';
$message = isset($data->message) ? htmlspecialchars(strip_tags(trim($data->message))) : '';

// Server-side validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

// ==========================================
// EMAIL CONFIGURATION & SPAM FIX
// ==========================================
$to = "rajendrareddy999@gmail.com";
$subject = "New Consultation Request: $name";

// CRITICAL SPAM FIX: This MUST be an email on your hosting domain!
// Do NOT use a gmail/yahoo address here. Use something like info@yourwebsite.com
$from_email = "noreply@yourdomain.com";

// ==========================================
// HTML EMAIL TEMPLATE
// ==========================================
$body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Contact Request</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F9F8F6; margin: 0; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; border-top: 5px solid #14B8A6; box-shadow: 0 10px 25px rgba(10,25,47,0.05); }
        h2 { color: #0A192F; margin-top: 0; font-size: 24px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px; }
        .field { margin-bottom: 24px; }
        .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; display: block; }
        .value { font-size: 16px; color: #0A192F; background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; line-height: 1.6; white-space: pre-wrap; }
        .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.5; }
    </style>
</head>
<body>
    <div class='container'>
        <h2>New Website Inquiry</h2>
        
        <div class='field'>
            <span class='label'>Patient Name</span>
            <div class='value'>$name</div>
        </div>
        
        <div class='field'>
            <span class='label'>Email Address</span>
            <div class='value'>$email</div>
        </div>
        
        <div class='field'>
            <span class='label'>Message / Symptoms</span>
            <div class='value'>$message</div>
        </div>
    </div>
    <div class='footer'>
        This is an automated notification from your website's contact form.<br>
        <strong>Simply reply to this email to respond directly to the patient.</strong>
    </div>
</body>
</html>
";

// ==========================================
// EMAIL HEADERS (Required for HTML & Spam Prevention)
// ==========================================
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
// The email is technically SENT from your server domain (Passes Spam Checks)
$headers .= "From: Spine Clinic Website <$from_email>\r\n";
// But when you click "Reply", it goes to the patient
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send the email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send message. Please try again later."]);
}
