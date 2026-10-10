<?php
declare(strict_types=1);
/** CyberResilience v2.1.0. Stateless pure assessment module. No database required. */
const CSF_DOMAINS = [
  'GV'=>['Govern','Accountability, policies and oversight','Assign a named cybersecurity owner and approve a short risk policy with quarterly leadership review.'],
  'ID'=>['Identify','Assets, dependencies and risk','Create an up-to-date inventory of critical assets and suppliers; record the top five business risks.'],
  'PR'=>['Protect','Safeguards and prevention','Roll out MFA for privileged and remote access, patch critical systems, and verify backups.'],
  'DE'=>['Detect','Monitoring and early warning','Centralize essential security logs and define an accountable alert triage workflow.'],
  'RS'=>['Respond','Incident readiness and coordination','Publish an incident-response playbook, escalation contacts, and run a tabletop exercise.'],
  'RC'=>['Recover','Restoration and learning','Define recovery objectives and perform a documented restoration test of critical data.'],
];
function score_assessment(mixed $payload): array {
  if (!is_array($payload) || array_keys($payload)!==['answers']) {
    throw new InvalidArgumentException('Expected an object containing only answers.');
  }
  $answers=$payload['answers'];
  if (!is_array($answers) || !array_is_list($answers) || count($answers)!==18) {
    throw new InvalidArgumentException('Exactly 18 answers are required.');
  }
  $seen=[];
  foreach($answers as $answer){
    if (!is_array($answer) || !isset($answer['id'],$answer['value']) || count($answer)!==2 || !is_string($answer['id']) || !is_int($answer['value'])) {
      throw new InvalidArgumentException('Invalid assessment response structure.');
    }
    $id=$answer['id']; $value=$answer['value']; $domain=substr($id,0,2);
    if (!isset(CSF_DOMAINS[$domain]) || !preg_match('/^(GV|ID|PR|DE|RS|RC)0[1-3]$/D',$id) || isset($seen[$id]) || $value<0 || $value>4) {
      throw new InvalidArgumentException('Invalid, duplicate or out-of-range assessment response.');
    }
    $seen[$id]=$value;
  }
  $domains=[];
  foreach(CSF_DOMAINS as $code=>$metadata){
    $sum=0;
    for($i=1;$i<=3;$i++){
      $id=sprintf('%s%02d',$code,$i);
      if(!array_key_exists($id,$seen))throw new InvalidArgumentException('Missing required assessment response.');
      $sum+=$seen[$id];
    }
    $domains[]=['code'=>$code,'name'=>$metadata[0],'description'=>$metadata[1],'score'=>(int)round($sum/12*100),'action'=>$metadata[2]];
  }
  $overall=(int)round(array_sum(array_column($domains,'score'))/6);
  $band=$overall<40?'Initial':($overall<60?'Developing':($overall<80?'Defined':'Adaptive'));
  $priorities=$domains;
  // PHP usort is stable on equal values (PHP >= 8.0), preserving original function order.
  usort($priorities,static fn(array $a,array $b):int=>$a['score']<=>$b['score']);
  $priorities=array_map(static fn(array $a):array=>['code'=>$a['code'],'name'=>$a['name'],'score'=>$a['score'],'action'=>$a['action']],array_slice($priorities,0,3));
  return ['score'=>$overall,'band'=>$band,'domains'=>$domains,'priorities'=>$priorities,'model'=>'CSF 2.0-inspired self-assessment, not a certification','retention'=>'Responses are not persisted by this demonstrator.'];
}
