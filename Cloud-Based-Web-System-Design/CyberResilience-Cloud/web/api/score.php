<?php
declare(strict_types=1);
require_once __DIR__.'/../src/scoring.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Allow: POST'); http_response_code(405);echo json_encode(['error'=>'Method not allowed']);exit;
}
$contentType=strtolower(trim(explode(';',$_SERVER['CONTENT_TYPE']??'')[0]));
if($contentType!=='application/json'){
  http_response_code(415);echo json_encode(['error'=>'Content-Type must be application/json']);exit;
}
$raw=file_get_contents('php://input',false,null,0,8193);
if($raw===false || strlen($raw)>8192){http_response_code(413);echo json_encode(['error'=>'Request exceeds 8 KB limit']);exit;}
try{
  $payload=json_decode($raw,true,10,JSON_THROW_ON_ERROR);
  $result=score_assessment($payload);
  echo json_encode($result,JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);
}catch(JsonException|InvalidArgumentException $e){
  http_response_code(400);echo json_encode(['error'=>'Invalid assessment payload: '.$e->getMessage()]);
}catch(Throwable $e){
  error_log('CyberResilience score error: '.get_class($e));
  http_response_code(500);echo json_encode(['error'=>'Assessment processing error']);
}
