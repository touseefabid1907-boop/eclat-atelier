/* Éclat Atelier script loader */
(function(){
  const load=s=>new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=s;el.onload=resolve;el.onerror=reject;document.body.appendChild(el);});
  load('legacy-script.js').then(()=>load('categories.js')).catch(err=>console.error('Éclat Atelier scripts failed to load',err));
})();
