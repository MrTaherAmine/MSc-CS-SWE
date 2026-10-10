<?php
declare(strict_types=1);
require_once __DIR__.'/../web/src/scoring.php';
function submission(mixed $v):array{$answers=[];foreach(array_keys(CSF_DOMAINS) as $d){for($i=1;$i<=3;$i++){$answers[]=['id'=>sprintf('%s%02d',$d,$i),'value'=>is_callable($v)?$v($d,$i):$v];}}return ['answers'=>$answers];}
function check(bool $ok,string $message):void {if(!$ok)throw new RuntimeException($message);}
function should_reject(array $p):void{try{score_assessment($p);}catch(InvalidArgumentException){return;}throw new RuntimeException('Expected rejection');}
$tests=[
 'minimum score'=>function(){ $x=score_assessment(submission(0));check($x['score']===0&&$x['band']==='Initial','Minimum');},
 'maximum score'=>function(){ $x=score_assessment(submission(4));check($x['score']===100&&$x['band']==='Adaptive','Maximum');},
 'intermediate band'=>function(){ $x=score_assessment(submission(2));check($x['score']===50&&$x['band']==='Developing','Midpoint');},
 'missing answer'=>function(){ $x=submission(1);array_pop($x['answers']);should_reject($x);},
 'duplicate id'=>function(){ $x=submission(1);$x['answers'][1]['id']=$x['answers'][0]['id'];should_reject($x);},
 'invalid values'=>function(){foreach(['4',-1,5,2.5,null] as $v){$x=submission(1);$x['answers'][0]['value']=$v;should_reject($x);}},
 'unknown id and additional key'=>function(){$x=submission(1);$x['answers'][0]['id']='BAD';should_reject($x);$x=submission(1);$x['extra']='bad';should_reject($x);},
 'weakest first'=>function(){ $x=score_assessment(submission(fn($d,$i)=>$d==='DE'?0:4));check($x['priorities'][0]['code']==='DE','Priorities');},
 'all 18 unique questions'=>function(){ $x=score_assessment(submission(2));check(count($x['domains'])===6 && count($x['priorities'])===3,'Domain count');}
];$passed=0;foreach($tests as $name=>$test){$test();$passed++;echo "PASS: {$name}\n";}echo "{$passed}/".count($tests)." PHP tests passed\n";
