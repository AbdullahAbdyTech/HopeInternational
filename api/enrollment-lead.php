<?php
declare(strict_types=1);

const HITA_PIXEL_ID = '1030696829380782';
const HITA_GRAPH_API_VERSION = 'v25.0';
const HITA_EMAIL_RECIPIENT = 'hopeinternationaltutoracademy@gmail.com';
const HITA_FLOWFORM_ENDPOINT = 'https://flowform.to/submit';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['ok' => false, 'message' => 'Method not allowed.'], 405);
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    respond(['ok' => false, 'message' => 'Invalid JSON payload.'], 400);
}

$action = sanitize_text($payload['action'] ?? '', 40);

if ($action === 'track_event') {
    handle_track_event($payload);
}

if ($action === 'submit_enrollment') {
    handle_submit_enrollment($payload);
}

if ($action === 'track_conversion') {
    handle_track_conversion($payload);
}

respond(['ok' => false, 'message' => 'Unknown action.'], 400);

function handle_track_event(array $payload): void
{
    $eventName = sanitize_text($payload['event_name'] ?? '', 80);
    $eventId = sanitize_event_id($payload['event_id'] ?? '');
    $sourceUrl = sanitize_url($payload['event_source_url'] ?? '');

    $allowedEvents = ['PageView', 'ViewContent', 'Contact'];

    if (!in_array($eventName, $allowedEvents, true) || $eventId === '') {
        respond(['ok' => false, 'message' => 'Invalid tracking event.'], 422);
    }

    $customData = sanitize_custom_data($payload['custom_data'] ?? []);
    $userData = build_user_data([], $payload);
    $event = build_meta_event($eventName, $eventId, $sourceUrl, $userData, $customData);
    $capi = send_meta_events([$event]);

    respond([
        'ok' => true,
        'event_id' => $eventId,
        'capi_configured' => $capi['configured'],
        'capi_sent' => $capi['sent'],
        'capi_status' => $capi['status'],
        'capi_transport' => $capi['transport']
    ]);
}

function handle_submit_enrollment(array $payload): void
{
    $lead = normalize_lead($payload['lead'] ?? []);
    $errors = validate_lead($lead);

    if ($lead['website'] !== '') {
        respond(['ok' => true, 'email_sent' => false, 'capi_sent' => false]);
    }

    if ($errors !== []) {
        respond(['ok' => false, 'message' => 'Please correct the highlighted fields.', 'errors' => $errors], 422);
    }

    $email = send_email_notification($lead);
    if (!$email['sent']) {
        respond([
            'ok' => false,
            'message' => 'The lead was validated but the email notification could not be sent. Please try again.',
            'email_error' => $email['message']
        ], 502);
    }

    $leadEventId = sanitize_event_id($payload['event_id'] ?? '') ?: generate_event_id('lead');
    $registrationEventId = sanitize_event_id($payload['registration_event_id'] ?? '') ?: generate_event_id('registration');
    $sourceUrl = sanitize_url($payload['event_source_url'] ?? '');
    $userData = build_user_data($lead, $payload);
    $customData = [
        'content_name' => 'Student Enrollment Lead',
        'content_category' => 'Education',
        'content_type' => 'lead_form',
        'content_ids' => ['student-enrollment'],
        'status' => 'submitted',
        'program' => $lead['courseProgram']
    ];

    $capi = send_meta_events([
        build_meta_event('Lead', $leadEventId, $sourceUrl, $userData, $customData),
        build_meta_event('CompleteRegistration', $registrationEventId, $sourceUrl, $userData, $customData)
    ]);

    respond([
        'ok' => true,
        'email_sent' => true,
        'event_id' => $leadEventId,
        'registration_event_id' => $registrationEventId,
        'capi_configured' => $capi['configured'],
        'capi_sent' => $capi['sent'],
        'capi_status' => $capi['status'],
        'capi_transport' => $capi['transport']
    ]);
}

function handle_track_conversion(array $payload): void
{
    $formType = sanitize_text($payload['form_type'] ?? '', 80);
    $allowedTypes = ['Student Registration', 'Teacher Registration', 'Contact Message'];

    if (!in_array($formType, $allowedTypes, true)) {
        respond(['ok' => false, 'message' => 'Unsupported conversion type.'], 422);
    }

    $lead = normalize_registration_lead($payload['lead'] ?? []);
    $leadEventId = sanitize_event_id($payload['event_id'] ?? '') ?: generate_event_id('lead');
    $registrationEventId = sanitize_event_id($payload['registration_event_id'] ?? '') ?: generate_event_id('registration');
    $sourceUrl = sanitize_url($payload['event_source_url'] ?? '');

    if ($formType === 'Contact Message') {
        $customData = [
            'content_name' => 'Contact Form Lead',
            'content_category' => 'Education',
            'content_type' => 'contact_form',
            'content_ids' => ['contact-form'],
            'status' => 'submitted',
            'program' => $lead['courseProgram'] !== '' ? $lead['courseProgram'] : 'Contact Request'
        ];
        $userData = build_user_data($lead, $payload);
        $capi = send_meta_events([
            build_meta_event('Lead', $leadEventId, $sourceUrl, $userData, $customData)
        ]);

        respond([
            'ok' => true,
            'event_id' => $leadEventId,
            'capi_configured' => $capi['configured'],
            'capi_sent' => $capi['sent'],
            'capi_status' => $capi['status'],
            'capi_transport' => $capi['transport']
        ]);
    }

    $contentId = $formType === 'Teacher Registration' ? 'teacher-registration' : 'student-registration';
    $program = $lead['courseProgram'] !== '' ? $lead['courseProgram'] : $formType;
    $customData = [
        'content_name' => $formType,
        'content_category' => 'Education',
        'content_type' => 'lead_form',
        'content_ids' => [$contentId],
        'status' => 'submitted',
        'program' => $program
    ];
    $userData = build_user_data($lead, $payload);
    $capi = send_meta_events([
        build_meta_event('Lead', $leadEventId, $sourceUrl, $userData, $customData),
        build_meta_event('CompleteRegistration', $registrationEventId, $sourceUrl, $userData, $customData)
    ]);

    respond([
        'ok' => true,
        'event_id' => $leadEventId,
        'registration_event_id' => $registrationEventId,
        'capi_configured' => $capi['configured'],
        'capi_sent' => $capi['sent'],
        'capi_status' => $capi['status'],
        'capi_transport' => $capi['transport']
    ]);
}

function normalize_lead($rawLead): array
{
    $lead = is_array($rawLead) ? $rawLead : [];

    return [
        'fullName' => sanitize_text($lead['fullName'] ?? '', 120),
        'email' => sanitize_email($lead['email'] ?? ''),
        'phone' => sanitize_text($lead['phone'] ?? '', 30),
        'city' => sanitize_text($lead['city'] ?? '', 100),
        'courseProgram' => sanitize_text($lead['courseProgram'] ?? '', 150),
        'message' => sanitize_textarea($lead['message'] ?? '', 1000),
        'website' => sanitize_text($lead['website'] ?? '', 200)
    ];
}

function normalize_registration_lead($rawLead): array
{
    $lead = is_array($rawLead) ? $rawLead : [];
    $fullName = $lead['fullName'] ?? $lead['studentName'] ?? $lead['parentName'] ?? $lead['name'] ?? '';
    $courseProgram = $lead['courseProgram'] ?? $lead['subjects'] ?? $lead['grade'] ?? $lead['qualification'] ?? $lead['subject'] ?? '';
    $message = $lead['message'] ?? $lead['about'] ?? '';

    return [
        'fullName' => sanitize_text($fullName, 120),
        'email' => sanitize_email($lead['email'] ?? ''),
        'phone' => sanitize_text($lead['phone'] ?? '', 30),
        'city' => sanitize_text($lead['city'] ?? '', 100),
        'courseProgram' => sanitize_text($courseProgram, 150),
        'message' => sanitize_textarea($message, 1000),
        'website' => ''
    ];
}

function validate_lead(array $lead): array
{
    $errors = [];

    if (strlen($lead['fullName']) < 2) {
        $errors['fullName'] = 'Enter the student or parent full name.';
    }

    if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Enter a valid email address.';
    }

    if (!preg_match('/^[0-9+\-()\s]{7,20}$/', $lead['phone'])) {
        $errors['phone'] = 'Enter a valid phone number.';
    }

    if (strlen($lead['city']) < 2) {
        $errors['city'] = 'Enter your city or country.';
    }

    if (strlen($lead['courseProgram']) < 2) {
        $errors['courseProgram'] = 'Select or enter a course/program.';
    }

    if (strlen($lead['message']) > 1000) {
        $errors['message'] = 'Keep the message under 1000 characters.';
    }

    return $errors;
}

function send_email_notification(array $lead): array
{
    $subject = 'New Student Enrollment Lead - Hope International Tutor Academy';
    $fields = [
        '_to' => HITA_EMAIL_RECIPIENT,
        '_replyto' => $lead['email'],
        '_subject' => $subject,
        'formType' => 'Student Enrollment Lead',
        'fullName' => $lead['fullName'],
        'email' => $lead['email'],
        'phone' => $lead['phone'],
        'city' => $lead['city'],
        'courseProgram' => $lead['courseProgram'],
        'message' => $lead['message'],
        'submittedAt' => gmdate('c')
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init(HITA_FLOWFORM_ENDPOINT);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $fields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_HTTPHEADER => ['Accept: application/json']
        ]);

        curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($status >= 200 && $status < 300) {
            return ['sent' => true, 'message' => 'sent via Flowform'];
        }

        $fallback = send_mail_fallback($lead, $subject);
        if ($fallback['sent']) {
            return $fallback;
        }

        return ['sent' => false, 'message' => $error ?: 'Flowform returned HTTP ' . $status];
    }

    return send_mail_fallback($lead, $subject);
}

function send_mail_fallback(array $lead, string $subject): array
{
    if (!function_exists('mail')) {
        return ['sent' => false, 'message' => 'No server mail function is available.'];
    }

    $safeReplyTo = str_replace(["\r", "\n"], '', $lead['email']);
    $body = "New student enrollment lead\n\n"
        . "Full Name: {$lead['fullName']}\n"
        . "Email: {$lead['email']}\n"
        . "Phone: {$lead['phone']}\n"
        . "City: {$lead['city']}\n"
        . "Course/Program: {$lead['courseProgram']}\n"
        . "Message: {$lead['message']}\n"
        . "Submitted At: " . gmdate('c') . "\n";

    $headers = "Reply-To: {$safeReplyTo}\r\nContent-Type: text/plain; charset=UTF-8";
    $sent = @mail(HITA_EMAIL_RECIPIENT, $subject, $body, $headers);

    return ['sent' => $sent, 'message' => $sent ? 'sent via mail fallback' : 'mail fallback failed'];
}

function build_meta_event(string $eventName, string $eventId, string $sourceUrl, array $userData, array $customData): array
{
    return [
        'event_name' => $eventName,
        'event_time' => time(),
        'event_id' => $eventId,
        'event_source_url' => $sourceUrl,
        'action_source' => 'website',
        'user_data' => $userData,
        'custom_data' => $customData
    ];
}

function build_user_data(array $lead, array $payload): array
{
    [$firstName, $lastName] = split_name($lead['fullName'] ?? '');

    return filter_null_values([
        'em' => hash_meta_value($lead['email'] ?? ''),
        'ph' => hash_meta_value(normalize_phone($lead['phone'] ?? '')),
        'fn' => hash_meta_value($firstName),
        'ln' => hash_meta_value($lastName),
        'ct' => hash_meta_value($lead['city'] ?? ''),
        'client_ip_address' => get_client_ip(),
        'client_user_agent' => sanitize_text($_SERVER['HTTP_USER_AGENT'] ?? '', 500),
        'fbp' => sanitize_text($payload['fbp'] ?? '', 120),
        'fbc' => sanitize_text($payload['fbc'] ?? '', 120)
    ]);
}

function send_meta_events(array $events): array
{
    $accessToken = get_secret_value('META_CAPI_ACCESS_TOKEN') ?: get_secret_value('FB_CAPI_ACCESS_TOKEN');
    $testEventCode = get_secret_value('META_TEST_EVENT_CODE');

    if ($accessToken === '') {
        return ['configured' => false, 'sent' => false, 'response' => null, 'status' => null, 'transport' => null];
    }

    $body = ['data' => $events];
    if ($testEventCode !== '') {
        $body['test_event_code'] = $testEventCode;
    }

    $url = 'https://graph.facebook.com/' . HITA_GRAPH_API_VERSION . '/' . rawurlencode(HITA_PIXEL_ID) . '/events'
        . '?access_token=' . rawurlencode($accessToken);
    $result = post_json_with_curl($url, $body);

    if (!$result['attempted'] || $result['status'] === 0) {
        $fallback = post_json_with_stream($url, $body);
        if ($fallback['attempted']) {
            $result = $fallback;
        }
    }

    return [
        'configured' => true,
        'sent' => $result['status'] >= 200 && $result['status'] < 300,
        'response' => $result['response'] ?: $result['error'],
        'status' => $result['status'] ?: null,
        'transport' => $result['transport']
    ];
}

function post_json_with_curl(string $url, array $body): array
{
    if (!function_exists('curl_init')) {
        return [
            'attempted' => false,
            'status' => 0,
            'response' => null,
            'error' => 'cURL is unavailable',
            'transport' => 'curl'
        ];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json']
    ]);

    $responseBody = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    return [
        'attempted' => true,
        'status' => $status,
        'response' => is_string($responseBody) ? $responseBody : null,
        'error' => $error,
        'transport' => 'curl'
    ];
}

function post_json_with_stream(string $url, array $body): array
{
    if (!filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOLEAN)) {
        return [
            'attempted' => false,
            'status' => 0,
            'response' => null,
            'error' => 'allow_url_fopen is disabled',
            'transport' => 'stream'
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\nAccept: application/json\r\n",
            'content' => json_encode($body),
            'timeout' => 12,
            'ignore_errors' => true
        ]
    ]);
    $responseBody = @file_get_contents($url, false, $context);
    $headers = $http_response_header ?? [];
    $status = 0;

    if (isset($headers[0]) && preg_match('/\s(\d{3})\s/', $headers[0], $matches)) {
        $status = (int) $matches[1];
    }

    $lastError = error_get_last();

    return [
        'attempted' => true,
        'status' => $status,
        'response' => is_string($responseBody) ? $responseBody : null,
        'error' => $lastError['message'] ?? '',
        'transport' => 'stream'
    ];
}

function get_secret_value(string $key): string
{
    $envValue = getenv($key);
    if (is_string($envValue) && trim($envValue) !== '') {
        return trim($envValue);
    }

    foreach ([__DIR__ . '/.capi-secrets.php', dirname(__DIR__) . '/.capi-secrets.php'] as $path) {
        if (!is_file($path)) {
            continue;
        }

        $secrets = include $path;
        if (is_array($secrets) && isset($secrets[$key]) && trim((string) $secrets[$key]) !== '') {
            return trim((string) $secrets[$key]);
        }
    }

    return '';
}

function sanitize_custom_data($customData): array
{
    if (!is_array($customData)) {
        return [];
    }

    $allowed = ['content_name', 'content_category', 'content_type', 'content_ids', 'status', 'program'];
    $clean = [];

    foreach ($allowed as $key) {
        if (!array_key_exists($key, $customData)) {
            continue;
        }

        if ($key === 'content_ids' && is_array($customData[$key])) {
            $clean[$key] = array_values(array_filter(array_map(static function ($value) {
                return sanitize_text($value, 80);
            }, $customData[$key])));
        } else {
            $clean[$key] = sanitize_text($customData[$key], 150);
        }
    }

    return $clean;
}

function split_name(string $name): array
{
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    $first = $parts[0] ?? '';
    $last = count($parts) > 1 ? $parts[count($parts) - 1] : '';

    return [$first, $last];
}

function hash_meta_value(string $value): ?string
{
    $normalized = strtolower(trim($value));
    if ($normalized === '') {
        return null;
    }

    return hash('sha256', $normalized);
}

function normalize_phone(string $phone): string
{
    return preg_replace('/\D+/', '', $phone) ?: '';
}

function get_client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (empty($_SERVER[$key])) {
            continue;
        }

        $value = explode(',', (string) $_SERVER[$key])[0];
        $value = trim($value);

        if (filter_var($value, FILTER_VALIDATE_IP)) {
            return $value;
        }
    }

    return '';
}

function sanitize_text($value, int $maxLength): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/\s+/', ' ', $value) ?: '';

    return substr($value, 0, $maxLength);
}

function sanitize_textarea($value, int $maxLength): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace("/[ \t]+/", ' ', $value) ?: '';

    return substr($value, 0, $maxLength);
}

function sanitize_email($value): string
{
    return substr(trim((string) $value), 0, 254);
}

function sanitize_url($value): string
{
    $url = substr(trim((string) $value), 0, 500);

    if ($url !== '' && filter_var($url, FILTER_VALIDATE_URL)) {
        return $url;
    }

    return 'https://hitutoracademy.com/student-enrollment';
}

function sanitize_event_id($value): string
{
    $value = preg_replace('/[^A-Za-z0-9_.:-]/', '', (string) $value) ?: '';

    return substr($value, 0, 120);
}

function generate_event_id(string $eventName): string
{
    return 'hita-' . $eventName . '-' . time() . '-' . bin2hex(random_bytes(4));
}

function filter_null_values(array $values): array
{
    return array_filter($values, static function ($value) {
        return $value !== null && $value !== '';
    });
}

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}
