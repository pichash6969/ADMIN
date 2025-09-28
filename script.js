// helper
function getAdminSettings(){
  return JSON.parse(localStorage.getItem('adminSettings')||JSON.stringify({
    fixed2:"", fixed3:"", start:"", stop:"", speedMs:800, theme:"light", historyMax:20, drawTime:2000
  }));
}

// apply theme
function applyTheme(){
  const s = getAdminSettings();
  document.documentElement.setAttribute('data-theme', s.theme || 'light');
}

// start/stop checker (runs every 1 second)
let scheduledLock = false;
function scheduledChecker(){
  const s = getAdminSettings();
  if(!s.start || !s.stop) return;
  const now = new Date();
  const nowHM = now.toTimeString().slice(0,5); // "HH:MM"
  // compare as strings is OK for "HH:MM"
  if(nowHM >= s.start && nowHM <= s.stop){
    if(!scheduledLock){
      scheduledLock = true;
      runManualDraw(); // runs a draw, then unlocks after done
    }
  } else {
    scheduledLock = false;
  }
}

// scroll control using CSS animation duration
function startAutoScroll(){
  const s = getAdminSettings();
  const ms2 = (s.speedMs || 800) / 1000; // seconds
  const ms3 = (s.speedMs || 800) * 1.5 / 1000;
  const el2 = document.getElementById('scroll-2digit') || document.getElementById('lottery2D');
  const el3 = document.getElementById('scroll-3digit') || document.getElementById('lottery3D');
  if(el2) el2.style.animationDuration = ms2 + 's';
  if(el3) el3.style.animationDuration = ms3 + 's';
  // make sure animation running (if you use CSS animations)
  if(el2) el2.style.animationPlayState = 'running';
  if(el3) el3.style.animationPlayState = 'running';
}

function stopAutoScroll(){
  const el2 = document.getElementById('scroll-2digit') || document.getElementById('lottery2D');
  const el3 = document.getElementById('scroll-3digit') || document.getElementById('lottery3D');
  if(el2) el2.style.animationPlayState = 'paused';
  if(el3) el3.style.animationPlayState = 'paused';
}

// run a manual draw (stops scroll, shows admin fixed numbers or final random)
function runManualDraw(){
  stopAutoScroll();
  const s = getAdminSettings();
  const f2 = s.fixed2 || (Math.floor(Math.random()*100).toString().padStart(2,'0'));
  const f3 = s.fixed3 || (Math.floor(Math.random()*1000).toString().padStart(3,'0'));

  // quick flash animation (optional) then show fixed
  setTimeout(()=>{
    const el2 = document.getElementById('scroll-2digit') || document.getElementById('lottery2D');
    const el3 = document.getElementById('scroll-3digit') || document.getElementById('lottery3D');
    if(el2) el2.textContent = f2;
    if(el3) el3.textContent = f3;

    // save to resultHistory
    let hist = JSON.parse(localStorage.getItem('resultHistory')||'[]');
    hist.unshift({time:new Date().toLocaleString(), '2D':f2, '3D':f3});
    const max = parseInt(s.historyMax) || 20;
    hist = hist.slice(0, max);
    localStorage.setItem('resultHistory', JSON.stringify(hist));
    renderResults(); // function to update result history UI

    // call bets checker if you have it
    if(typeof checkAllBets === 'function') checkAllBets(f2,f3);

    // after drawTime, resume auto-scroll
    setTimeout(()=>{ startAutoScroll(); }, parseInt(s.drawTime || 2000));
  }, 300); // small delay to simulate stop
}

// render results UI function (call on load and after save)
function renderResults(){
  const ul = document.getElementById('resultsList');
  if(!ul) return;
  ul.innerHTML = '';
  const hist = JSON.parse(localStorage.getItem('resultHistory')||'[]');
  hist.forEach(r=>{
    const li = document.createElement('li');
    li.textContent = `${r.time} — 2D: ${r['2D']}  | 3D: ${r['3D']}`;
    ul.appendChild(li);
  });
}

// initialization
window.addEventListener('load', ()=>{
  applyTheme();
  renderResults();
  startAutoScroll();
  setInterval(scheduledChecker, 1000);
  // also poll settings occasionally so admin changes reflect quickly
  setInterval(()=>{ startAutoScroll(); applyTheme(); renderResults(); }, 3000);
});
