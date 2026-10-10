'use strict';
const DOMAINS=[
  {code:'GV',name:'Govern',description:'Oversight and accountability',qs:['A named owner is accountable for cybersecurity decisions.','Leadership reviews and approves the organization’s cyber risk priorities.','Cybersecurity responsibilities and policies are communicated and reviewed.']},
  {code:'ID',name:'Identify',description:'Assets and risk visibility',qs:['Critical devices, applications and data are inventoried.','Key business processes and third-party dependencies are mapped.','Material cyber risks are documented and regularly reassessed.']},
  {code:'PR',name:'Protect',description:'Preventive safeguards',qs:['Multi-factor authentication is enabled for high-risk accounts.','Critical software updates and secure configurations are managed.','Sensitive information is access-controlled and backed up.']},
  {code:'DE',name:'Detect',description:'Threat monitoring',qs:['Important systems create security-relevant logs.','Alerts are reviewed by designated people in a defined timeframe.','Suspicious activity is escalated and investigated consistently.']},
  {code:'RS',name:'Respond',description:'Incident coordination',qs:['An incident response plan identifies who does what.','Contacts and communication steps exist for an incident.','The response team practises incidents and captures lessons.']},
  {code:'RC',name:'Recover',description:'Service restoration',qs:['Recovery-time and recovery-point needs are understood.','Critical backups are tested by actual restoration.','Recovery procedures are updated after tests or incidents.']}
];
const questions=document.getElementById('questions');const links=document.getElementById('domainLinks');const form=document.getElementById('assessmentForm');const error=document.getElementById('formError');
for(const d of DOMAINS){
 const group=document.createElement('section');group.id='domain-'+d.code;
 const header=document.createElement('div');header.className='domain-header';const short=document.createElement('small');short.textContent=d.code;const h=document.createElement('h3');h.textContent=d.name;header.append(short,h);group.append(header);
 d.qs.forEach((label,index)=>{
  const id=d.code+String(index+1).padStart(2,'0');const field=document.createElement('fieldset');field.className='question';field.dataset.qid=id;
  const legend=document.createElement('legend');legend.textContent=(index+1)+'. '+label;field.append(legend);
  const controls=document.createElement('div');controls.className='choices';controls.setAttribute('aria-label',id+' response scale');
  for(let score=0;score<=4;score++){
   const entry=document.createElement('label');entry.className='choice';const input=document.createElement('input');input.type='radio';input.name=id;input.value=String(score);input.required=true;input.setAttribute('aria-label',String(score)+' out of 4');const span=document.createElement('span');span.textContent=String(score);entry.append(input,span);controls.append(entry);
  }
  field.append(controls);group.append(field);
 });questions.append(group);
 const link=document.createElement('a');link.className='domain-link';link.href='#domain-'+d.code;link.textContent=d.name;const status=document.createElement('span');status.textContent='○';status.dataset.status=d.code;link.append(status);links.append(link);
}
function progress(){let completed=0;for(const d of DOMAINS){let domainDone=0;for(let i=1;i<=3;i++){const id=d.code+String(i).padStart(2,'0');if(form.querySelector('input[name="'+id+'"]:checked')){completed++;domainDone++;}}const tag=links.querySelector('[data-status="'+d.code+'"]');tag.textContent=domainDone===3?'✓':domainDone+'/3';tag.parentElement.classList.toggle('active',domainDone>0);}document.getElementById('progressCount').textContent=completed+' / 18';document.getElementById('progressBar').style.width=(completed/18*100)+'%';return completed;}
form.addEventListener('change',()=>{progress();error.hidden=true;});
form.addEventListener('reset',()=>{setTimeout(()=>{progress();error.hidden=true;},0);});
document.getElementById('sampleBtn').addEventListener('click',()=>{const values={GV:[3,2,3],ID:[2,2,2],PR:[3,3,2],DE:[1,0,1],RS:[1,1,0],RC:[2,1,2]};for(const d of DOMAINS)for(let i=0;i<3;i++){form.querySelector('input[name="'+d.code+String(i+1).padStart(2,'0')+'"][value="'+values[d.code][i]+'"]').checked=true;}progress();error.hidden=true;});
form.addEventListener('submit',async event=>{
 event.preventDefault();if(progress()!==18){error.textContent='Complete all 18 statements before calculating your readiness.';error.hidden=false;const first=[...form.querySelectorAll('fieldset')].find(f=>!f.querySelector('input:checked'));first?.scrollIntoView({behavior:'smooth',block:'center'});first?.querySelector('input')?.focus();return;}
 const answers=DOMAINS.flatMap(d=>d.qs.map((_,i)=>{const id=d.code+String(i+1).padStart(2,'0');return{id,value:Number(form.querySelector('input[name="'+id+'"]:checked').value)};}));
 const btn=document.getElementById('submitBtn');btn.disabled=true;btn.textContent='Calculating…';error.hidden=true;
 try{const response=await fetch('./api/score.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers}),cache:'no-store'});const data=await response.json();if(!response.ok)throw new Error(data.error||'The scoring API returned an error.');renderResults(data);}
 catch(err){error.textContent='The live scoring service is unavailable. Please try again. '+(err.message||'');error.hidden=false;}
 finally{btn.disabled=false;btn.innerHTML='Calculate readiness <span>→</span>';}
});
function renderResults(result){const section=document.getElementById('results');document.getElementById('overallScore').textContent=result.score;document.getElementById('overallBand').textContent=result.band+' readiness';const barTarget=document.getElementById('domainBars');barTarget.replaceChildren();for(const d of result.domains){const row=document.createElement('div');row.className='bar-row';const name=document.createElement('span');name.textContent=d.name;const track=document.createElement('div');track.className='bar-track';const bar=document.createElement('div');bar.className='bar-fill';bar.style.width=d.score+'%';bar.setAttribute('role','progressbar');bar.setAttribute('aria-label',d.name);bar.setAttribute('aria-valuenow',String(d.score));bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');track.append(bar);const value=document.createElement('strong');value.textContent=d.score+'%';row.append(name,track,value);barTarget.append(row);}const target=document.getElementById('priorityCards');target.replaceChildren();result.priorities.forEach((p,i)=>{const card=document.createElement('article');card.className='rec-card';const rank=document.createElement('div');rank.className='rec-rank';rank.textContent='PRIORITY 0'+(i+1)+' · '+p.score+' / 100';const title=document.createElement('h4');title.textContent=p.name;const body=document.createElement('p');body.textContent=p.action;card.append(rank,title,body);target.append(card);});section.hidden=false;section.scrollIntoView({behavior:'smooth'});}
document.getElementById('printBtn').addEventListener('click',()=>window.print());document.getElementById('redoBtn').addEventListener('click',()=>document.getElementById('assessment').scrollIntoView({behavior:'smooth'}));progress();
