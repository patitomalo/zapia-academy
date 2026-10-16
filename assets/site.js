/* Zapia Academy · registro. Pegar la URL /exec del Web App de Google Apps Script en ENDPOINT (ver apps-script/SETUP.md). Vacío = modo prueba. */
(function(){
  var ENDPOINT = "";
  var EVENT = {
    id: "zapia-academy-1",
    title: "Zapia Academy #1 · 5 pasos para que tu asistente de IA empiece a trabajar por vos",
    startUTC: "2026-10-28T22:00:00Z", endUTC: "2026-10-28T22:30:00Z", tz: "America/Montevideo"
  };
  function $(id){return document.getElementById(id);}
  var dlg=$('regDialog'); if(!dlg) return;
  var form=$('regForm'), btn=$('regSubmit');
  // Abrir / cerrar
  document.querySelectorAll('[data-open-reg]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open();});});
  function open(){ if(typeof dlg.showModal==='function'){dlg.showModal();} else {dlg.setAttribute('open','');} setTimeout(function(){var f=$('r-name'); if(f && !$('regDone').hidden===false) f.focus();},50); }
  function close(){ if(dlg.open) dlg.close(); }
  $('regClose').addEventListener('click',close);
  dlg.addEventListener('click',function(e){ if(e.target===dlg) close(); });
  // Calendario
  var fmt=function(s){return s.replace(/[-:]/g,'').replace('.000','');};
  var cal='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(EVENT.title)+'&dates='+fmt(EVENT.startUTC)+'/'+fmt(EVENT.endUTC)+'&details='+encodeURIComponent('Webinar en vivo. El link de acceso llega por mail antes del evento.')+'&ctz='+EVENT.tz;
  document.querySelectorAll('[data-cal]').forEach(function(a){a.href=cal;});
  // Cuenta regresiva
  document.querySelectorAll('[data-countdown]').forEach(function(el){
    function tick(){var d=new Date(EVENT.startUTC)-new Date(); if(d<=0){el.textContent='Es hoy';return;} var days=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5); el.textContent=days>0?('Faltan '+days+(days===1?' día':' días')):('Faltan '+h+' h');}
    tick(); setInterval(tick,6e4);
  });
  // UTM
  var utm=''; try{var q=new URLSearchParams(location.search),u=[];['utm_source','utm_medium','utm_campaign','utm_content','ref'].forEach(function(k){if(q.get(k))u.push(k+'='+q.get(k));}); utm=u.join('&');}catch(e){}
  // Validación
  function setErr(k,msg){var e=$('e-'+k),i=$('r-'+k); if(e) e.textContent=msg||''; if(i) i.setAttribute('aria-invalid',msg?'true':'false');}
  function validate(){
    var ok=true, n=$('r-name').value.trim(), m=$('r-email').value.trim(), c=$('r-country').value;
    if(n.length<2){setErr('name','Escribí tu nombre.');ok=false;} else setErr('name');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)){setErr('email','Revisá el mail: ahí te mandamos el link.');ok=false;} else setErr('email');
    if(!c){setErr('country','Elegí tu país.');ok=false;} else setErr('country');
    return ok;
  }
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if($('r-company').value) return; // honeypot
    if(!validate()) return;
    btn.disabled=true; btn.textContent='Enviando…';
    var data={event:EVENT.id,name:$('r-name').value.trim(),email:$('r-email').value.trim(),country:$('r-country').value,utm:utm,page:location.href,ts:new Date().toISOString()};
    function done(){ $('regFormState').hidden=true; $('regDone').hidden=false; try{localStorage.setItem('za-reg-'+EVENT.id,'1');}catch(e){} }
    function fail(){ btn.disabled=false; btn.textContent='Registrarme'; setErr('email','No pudimos enviar el registro. Probá de nuevo en un momento.'); }
    if(!ENDPOINT){ console.log('Modo prueba, registro no enviado:',data); setTimeout(done,500); return; }
    fetch(ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)}).then(done).catch(fail);
  });
})();
