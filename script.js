// Get settings from admin
let fixed2D = localStorage.getItem('fixed2D') || '00';
let fixed3D = localStorage.getItem('fixed3D') || '000';
let startTime = localStorage.getItem('startTime') || '00:00:00';
let stopTime = localStorage.getItem('stopTime') || '23:59:59';
let scrollSpeed = parseInt(localStorage.getItem('scrollSpeed')) || 20;

const scroll2D = document.getElementById('scroll2D');
const scroll3D = document.getElementById('scroll3D');

// Real-time clock
function updateClock(){
    const now = new Date();
    const h=String(now.getHours()).padStart(2,'0');
    const m=String(now.getMinutes()).padStart(2,'0');
    const s=String(now.getSeconds()).padStart(2,'0');
    document.getElementById('clock').textContent=`${h}:${m}:${s}`;

    const currentTime = `${h}:${m}:${s}`;
    // Auto start / stop based on time
    if(currentTime>=startTime && currentTime<=stopTime){
        startScroll();
    }else{
        pauseScroll();
    }
}
setInterval(updateClock,1000);

// Generate numbers
function generate2D(){ scroll2D.innerHTML = `<div class="number-item">${fixed2D}</div>`.repeat(50); }
function generate3D(){ scroll3D.innerHTML = `<div class="number-item">${fixed3D}</div>`.repeat(50); }

// Scroll animations
let scrollInterval;
function startScroll(){
    clearInterval(scrollInterval);
    let pos2=0,pos3=0;
    scrollInterval=setInterval(()=>{
        pos2 = (pos2+1)%scroll2D.scrollHeight;
        pos3 = (pos3+1)%scroll3D.scrollHeight;
        scroll2D.scrollTop=pos2;
        scroll3D.scrollTop=pos3;
    }, 100/scrollSpeed);
}
function pauseScroll(){ clearInterval(scrollInterval); }

// Initialize
generate2D();
generate3D();
startScroll();
