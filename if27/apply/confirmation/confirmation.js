(() => {
 let receipt;try{receipt=JSON.parse(sessionStorage.getItem('if27-application-receipt'));}catch(_){}
 if(receipt && Date.now()-receipt.time<3600000){
  if(receipt.receiptSent)document.getElementById('receipt-copy').textContent='Thanks for applying to Frontier Days 2027. We’ve sent a receipt to '+receipt.email+'.';
 }else{document.getElementById('confirmation-title').textContent='Apply to Attend';document.getElementById('receipt-copy').textContent='Applications for Frontier Days 2027 are open.';}
 document.getElementById('copy-link').addEventListener('click',async()=>{
  const url='https://www.imagineifnashville.com/if27/apply/';const feedback=document.getElementById('copy-feedback');
  try{await navigator.clipboard.writeText(url);feedback.textContent='Application link copied.';}
  catch(_){feedback.textContent='Copy this link: '+url;}
  feedback.hidden=false;
 });
})();
