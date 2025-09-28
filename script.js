const scroll2 = document.getElementById("scroll-2digit");
const scroll3 = document.getElementById("scroll-3digit");
const statusText = document.getElementById("statusText");

let fixed2D = null;
let fixed3D = null;
let startTime = null;
let stopTime = null;
let scrollSpeed = 20;
let interval;

function generateNumbers() {
  scroll2.innerHTML = '';
  scroll3.innerHTML = '';
  for (let i=0;i<=99;i++){
    const div = document.createElement("div");
    div.className="number-item";
    div.textContent = i.toString().padStart(2,'0');
    scroll2.appendChild(div);
  }
  for (let i=0;i<=999;i++){
    const div = document.createElement("div");
    div.className="number-item";
    div.textContent = i.toString().padStart(3,'0');
    scroll3.appendChild(div);
  }
}

function updateClock() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2,'0');
  const mm = now.getMinutes().toString().padStart(2,'0');
  const ss = now.getSeconds().toString().padStart(2,'0');
  document.getElementById("clock").textContent = `${hh}:${mm}:${ss}`;

  if(startTime && stopTime){
    const nowSec = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    const startSec = parseInt(startTime.split(":")[0])*3600 + parseInt(startTime.split(":")[1])*60 + parseInt(startTime.split(":")[2]);
    const stopSec = parseInt(stopTime.split(":")[0])*3600 + parseInt(stopTime.split(":")[1])*60 + parseInt(stopTime.split(":")[2]);

    if(nowSec>=startSec && nowSec<=stopSec){
      startScroll();
    } else {
      stopScroll();
    }
  }
}

function startScroll(){
  if(interval) return;
  interval = setInterval(()=>{
    scroll2.scrollTop += 1;
    scroll3.scrollTop += 1.5;
  }, 100/scrollSpeed);
  statusText.textContent = `Scrolling...`;
}

function stopScroll(){
  clearInterval(interval);
  interval=null;
  // Set fixed numbers
  if(fixed2D !== null) scroll2.scrollTop = fixed2D*80;
  if(fixed3D !== null) scroll3.scrollTop = fixed3D*80;
  statusText.textContent = `Stopped`;
}

window.addEventListener("message",(e)=>{
  const data = e.data;
  fixed2D = data.fixed2D !== "" ? parseInt(data.fixed2D) : null;
  fixed3D = data.fixed3D !== "" ? parseInt(data.fixed3D) : null;
  startTime = data.startTime;
  stopTime = data.stopTime;
  scrollSpeed = parseInt(data.scrollSpeed) || 20;
  stopScroll();
});
setInterval(updateClock,1000);
generateNumbers();
