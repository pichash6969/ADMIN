function getAdminSettings(){
  return JSON.parse(localStorage.getItem('adminSettings') || '{}');
}

function applyTheme(){
  const s = getAdminSettings();
  document.documentElement.setAttribute('data-theme', s.theme || 'dark');
}

function startAutoScroll(){
  const s = getAdminSettings();
  const speed2 = (s.speedMs || 800)/1000;
  const speed3 = (s.speedMs || 800)*1.5/1000;
  document.getElementById('scroll-2digit').style.animationDuration = speed2+'s';
  document.getElementById('scroll-3digit').style.animationDuration = speed3+'s';
  document.getElementById('scroll-2digit').style.animationPlayState='running';
  document.getElementById('scroll-3digit').style.animationPlayState='running';
}

function stopAutoScroll(){
  document.getElementById('scroll-2digit').style.animationPlayState='paused';
  document.getElementById('scroll-3digit').style.animationPlayState='paused';
}

// Manual draw (use fixed numbers)
function runManualDraw(){
  stopAutoScroll();
  const s = getAdminSettings();
  const f2 = s.fixed2 || Math.floor(Math.random()*100).toString().padStart(2,'0');
  const f3 = s.fixed3 || Math.floor(Math.random()*1000).toString().padStart(3,'0');
  document.getElementById('scroll-2digit').textContent = f2;
  document.getElementById('scroll-3digit').textContent = f3;
  // Save history
  let hist = JSON.parse(localStorage.getItem('resultHistory')||'[]');
  hist.unshift({time:new Date().toLocaleString(), '2D':f2, '3D':f3});
  const max = s.historyMax || 20;
  hist = hist.slice(0,max);
  localStorage.setItem('resultHistory', JSON.stringify(hist));
}
