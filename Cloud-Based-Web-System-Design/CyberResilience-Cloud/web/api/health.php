<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
if ($_SERVER['REQUEST_METHOD']!=='GET') {
  header('Allow: GET'); http_response_code(405);echo json_encode(['error'=>'Method not allowed']);exit;
}
echo json_encode(['status'=>'ok','service'=>'cyberresilience-cloud','version'=>'2.1.0','runtime'=>'PHP']);
