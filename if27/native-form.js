(() => {
 const form=document.getElementById('application'),button=form.querySelector('button[type="submit"]');
 const feedback=document.getElementById('feedback'),id=document.getElementById('request-id');
 const endpoint=window.IF27_SUBMISSION_ENDPOINT;let pending=false,timer;const original=button.innerHTML;
 id.value=crypto.randomUUID();
 function show(message,error){feedback.textContent=message;feedback.hidden=false;feedback.classList.toggle('error',error);feedback.focus();}
 if(!endpoint){button.disabled=true;show('Applications are being connected. Please check back shortly.',true);return;}
 form.action=endpoint;
 form.addEventListener('submit',event=>{
  if(pending){event.preventDefault();return;}
  pending=true;button.disabled=true;button.textContent='Sending…';feedback.hidden=true;
  timer=setTimeout(()=>{pending=false;button.disabled=false;button.innerHTML=original;show('We couldn’t confirm receipt. Your answers are still here. Please try again; retrying this submission won’t create a duplicate.',true);},45000);
 });
 window.addEventListener('message',event=>{
  if(!/^https:\/\/[a-z0-9.-]*googleusercontent\.com$/.test(event.origin)&&event.origin!=='https://script.google.com')return;
  const result=event.data;
  if(!result||result.type!=='if27-submission'||result.requestId!==id.value)return;
  clearTimeout(timer);pending=false;button.disabled=false;button.innerHTML=original;
  if(result.ok){form.reset();id.value=crypto.randomUUID();show('Thank you — your submission has been received. The Imagine IF team will review it and follow up by email.',false);}
  else show(result.message||'We couldn’t save your submission. Please try again.',true);
 });
})();
