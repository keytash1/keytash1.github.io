// ===== Calendar (September 2026 — Sept 1 is Tuesday) =====
(function(){
  const tbody = document.getElementById('cal-body');
  if(!tbody) return;
  const lead = 1, days = 30;
  const trail = (7 - ((lead + days) % 7)) % 7;
  const cells = lead + days + trail;
  let html = '';
  for(let i=0;i<cells;i+=7){
    html += '<tr>';
    for(let j=0;j<7;j++){
      const idx = i+j;
      const day = idx - lead + 1;
      if(day < 1 || day > days) html += '<td class="dim">·</td>';
      else if(day === 26) html += '<td class="special">'+day+'</td>';
      else html += '<td>'+day+'</td>';
    }
    html += '</tr>';
  }
  tbody.innerHTML = html;
})();

// ===== Countdown =====
(function(){
  const target = new Date('2026-09-26T14:00:00+03:00').getTime();
  const dEl=document.getElementById('cd-d'), hEl=document.getElementById('cd-h'), mEl=document.getElementById('cd-m');
  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){ dEl.textContent='0'; hEl.textContent='0'; mEl.textContent='0'; return; }
    dEl.textContent = Math.floor(diff/86400000);
    hEl.textContent = Math.floor(diff%86400000/3600000);
    mEl.textContent = Math.floor(diff%3600000/60000);
  }
  tick(); setInterval(tick, 30000);
})();

// ===== Reveal on scroll =====
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:0.18});
  els.forEach(el=>io.observe(el));
})();

// ===== Side nav active state =====
(function(){
  const links = document.querySelectorAll('.menu a');
  const map = {};
  links.forEach(a=>{ map[a.dataset.target] = a; });
  const sections = ['hero','invite','date','location','timeline','dress','chats','final']
    .map(id=>document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(a=>a.classList.remove('active'));
        const a = map[e.target.id];
        if(a) a.classList.add('active');
      }
    });
  },{threshold:0.5});
  sections.forEach(s=>io.observe(s));
})();
