'use strict';
const $=s=>document.querySelector(s),escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.body.className='editorial';
let data,day=1,speakerProfiles={};
// Derive public starts from source cues without changing the production schedule.
function timeRange(value){
 const m=String(value).match(/^(\d{1,2}):(\d{2})\s*([ap](?:m)?)?\s*[-–]\s*(\d{1,2}):(\d{2})\s*([ap](?:m)?)$/i);
 if(!m)return null;
 const minutes=(h,min,period)=>(Number(h)%12)+(period.toLowerCase()[0]==='p'?12:0);
 const end=minutes(m[4],m[5],m[6])*60+Number(m[5]);
 let start=minutes(m[1],m[2],m[3]||m[6])*60+Number(m[2]);
 if(!m[3]&&start>end)start-=12*60;
 return {start,end,startText:m[1]+':'+m[2]};
}
function displayTime(s){
 if(s.production||s.kind==='meal')return s.time;
 const index=data.items.findIndex(item=>item.id===s.id),cue=data.items[index-1];
 if(!cue||cue.day!==s.day||!cue.production||!/^CONTEXT VIDEO\b/i.test(cue.title||''))return s.time;
 const before=timeRange(cue.time),current=timeRange(s.time);
 if(!before||!current||before.end-before.start!==1||before.end!==current.start)return s.time;
 return s.time.replace(/^\d{1,2}:\d{2}/,before.startText);
}
function speakerIdentity(label,sessionId){
 const person=speakerProfiles[label];
 const name=label.split(' (')[0].replace(/^(Dr\.|Sen\.|Secretary|General)\s+/,'');
 const sourceOrg=label.includes(' (')?label.slice(label.indexOf(' (')+2,-1).split(' - ')[0]:'';
 const org=/Congressman/.test(sourceOrg)?(person?.org&&!/Congressman|Tennessee/.test(person.org)?person.org:''):(sourceOrg||person?.org||'').replace(/, TN$/,'');
 return {name:name==='Paul M. Nakasone'?'Gen. Paul M. Nakasone (USA Ret.)':name==='Art Laffer'?'Dr. Art Laffer':name,org:(name==='Brandon Williams'||name==='James P. Danly')?'US Department of Energy':name==='Paul M. Nakasone'?'Vanderbilt University Institute of National Security':name==='Matt Van Epps'?'U.S. Congress':name==='Farida Nabourema'?'Katutu Civil Rights Center':(name==='Javier El-Hage'||name==='Alex Gladstein')?'HRF':org==='Reynolds Foundation'?'The Reynolds Foundation':org};
}
function speakerSummary(label,sessionId){const {name,org}=speakerIdentity(label,sessionId);return org?`${name} (${org})`:name;}
function sessionHTML(s){const title=s.title||'Session title not provided';return `<button class="session ${s.production?'cue':''} ${!s.title?'unresolved':''}" data-id="${s.id}" aria-label="View ${escapeHTML(title)}"><span class="session-time">${escapeHTML(displayTime(s))}</span><span class="session-content"><span class="session-room">${escapeHTML(s.room||'Room not specified')}</span><strong>${escapeHTML(title)}</strong><span class="speakers">${escapeHTML(s.description||[...s.speakers.map(label=>speakerSummary(label,s.id)),...(s.specialGuests?[s.specialGuests]:[])].join(' · ')|| (s.production?'Production cue':(s.speakerPlaceholder||(s.id===36?'Speakers to be announced':'Speakers to be confirmed'))))}</span></span><span class="open-indicator" aria-hidden="true">↗</span></button>`;}
function render(){if(!data)return;const query=$('#search').value.trim().toLowerCase();const roomControl=$('#room');if(!Array.from(roomControl.options).some(option=>option.value===roomControl.value))roomControl.value='';const room=roomControl.value;const selected=data.items.filter(s=>s.day===day&&!s.production&&(!room||s.room===room)&&(!query||[s.title,...s.speakers,s.room].join(' ').toLowerCase().includes(query)));$('#result-count').textContent=`${selected.length} agenda entries`;$('#date-label').textContent=day===1?'MONDAY, OCTOBER 5':'TUESDAY, OCTOBER 6';$('#day-title').textContent=day===1?'Day 1 agenda':'Day 2 agenda';$('#end-note').textContent=day===1?'Source note: exit building 5:30pm.':'Source note: audience exit building by 5:00pm.';document.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.day)===day)));if(!selected.length){$('#schedule').innerHTML='<div class="empty"><h3>No matching entries.</h3><p>Try another speaker, room, or day.</p></div>';return;}$('#schedule').innerHTML=`<div class="running-order">${selected.map(sessionHTML).join('')}</div>`;}


// Print from the complete approved data, independently of screen filters.
function renderPrintAgenda(){
 $('#print-agenda-pages').innerHTML=[1,2].map(printDay=>{
  const sessions=data.items.filter(s=>s.day===printDay&&!s.production);
  const rows=sessions.map(s=>{
   const people=[...s.speakers.map(label=>speakerSummary(label,s.id)),...(s.specialGuests?[s.specialGuests]:[])].join(' · ')||(s.kind==='meal'?'':(s.speakerPlaceholder||'Speakers to be confirmed'));
   return `<li class="print-session" data-print-id="${s.id}"><div class="print-when"><strong>${escapeHTML(displayTime(s))}</strong><span>${escapeHTML(s.room)}</span></div><div class="print-content"><h3>${escapeHTML(s.title||'Session title not provided')}</h3>${people?`<p>${escapeHTML(people)}</p>`:''}</div></li>`;
  }).join('');
  return `<section class="print-day"><div class="print-heading"><strong>Imagine IF 2026</strong><h2>Day ${printDay} <span>${printDay===1?'Monday, October 5':'Tuesday, October 6'}</span></h2></div><ol>${rows}</ol></section>`;
 }).join('');
}
$('#print-agenda').addEventListener('click',async()=>{
 if(!data)return;
 await document.fonts.ready;
 window.print();
});

document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>{day=Number(b.dataset.day);render();}));['search','room'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',render));
function speakerHTML(label,sessionId){
 const person=speakerProfiles[label],{name,org:details}=speakerIdentity(label,sessionId);
 const initials=name.replace(/^(Dr\.|Sen\.|Secretary|General)\s*/,'').split(/\s+/).map(n=>n[0]).slice(0,2).join('');
 const links=person?['x','linkedin','officialProfile','authorProfile'].filter(k=>/^https:\/\//.test(person[k]||'')).map(k=>`<a href="${escapeHTML(person[k])}" target="_blank" rel="noopener noreferrer">${k==='x'?'X':k==='linkedin'?'LinkedIn':k==='authorProfile'?'Author Profile':(/^https:\/\/www\.energy\.gov\//.test(person[k])?'Official DOE Profile':'Official Profile')} ↗</a>`).join(''):'';
 return `<li class="speaker-person"><span class="portrait"><span class="initials" aria-hidden="true">${escapeHTML(initials)}</span>${person?.photo?`<img src="${escapeHTML(person.photo)}" alt="${escapeHTML(name)}" style="object-position:${escapeHTML(person.photoPos||'center')}" loading="lazy">`:''}</span><div><strong>${escapeHTML(name)}</strong><p>${escapeHTML(details)}</p>${links?`<nav aria-label="${escapeHTML(name)} links">${links}</nav>`:''}</div></li>`;
}
function menuHTML(s){return `<div class="menu">${s.menuTitle?`<h3>${escapeHTML(s.menuTitle)}</h3>`:''}${s.menu.map(sec=>`<section><h4>${escapeHTML(sec.heading)}</h4>${sec.items.map(i=>`<div class="menu-item"><strong>${escapeHTML(i.name)}</strong>${i.tags?`<em>${escapeHTML(i.tags)}</em>`:''}${i.details?`<p>${escapeHTML(i.details)}</p>`:''}</div>`).join('')}</section>`).join('')}</div>`;}
$('#schedule').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const s=data.items.find(x=>x.id===Number(b.dataset.id));
 $('#detail-body').innerHTML=`<p class="detail-time">${escapeHTML(displayTime(s))} / ${escapeHTML(s.room||'Room not specified')}</p><h2 id="detail-title">${escapeHTML(s.title||'Session title not provided')}</h2>${s.speakers.length?`<ul class="speaker-list">${s.speakers.map(label=>speakerHTML(label,s.id)).join('')}${s.specialGuests?`<li class="special-guests">${escapeHTML(s.specialGuests)}</li>`:''}</ul>`:s.kind==='meal'||s.production?'':`<p class="pending-speakers">${(s.speakerPlaceholder||(s.id===36?'Speakers to be announced':'Speakers to be confirmed'))}</p>`}<h3>${s.kind==='meal'?'Details':'Session description'}</h3>${s.menu?`<p class="abstract">${escapeHTML(s.abstract)}</p>${menuHTML(s)}`:`<p class="abstract">${escapeHTML(s.description||s.abstract||'Session details coming soon.')}</p>`}`;
 document.querySelectorAll('.portrait img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;}));
 $('#detail').showModal();});
$('#close-detail').addEventListener('click',()=>$('#detail').close());
Promise.all([fetch('agenda.json?v=42').then(r=>{if(!r.ok)throw Error('Agenda unavailable');return r.json();}),fetch('speakers.json?v=19').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(([d,profiles])=>{data=d;speakerProfiles=profiles;render();renderPrintAgenda();$('#print-agenda').disabled=false;}).catch(()=>{$('#schedule').innerHTML='<p>The agenda source could not load. Refresh the page or open the master agenda below.</p>';});
