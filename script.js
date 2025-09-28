let fixed2D = null, fixed3D = null;
let startTime = null, stopTime = null;
let scrollSpeed = 500; // ms interval

// Real-time Clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Random Numbers
function getRandom2D(){ return Math.floor(Math.random()*100).toString().padStart(2,'0'); }
function getRandom3D(){ return Math.floor(Math.random()*1000).toString().padStart(3,'0'); }

// Scroll Numbers based on Admin Settings
function updateNumbers(){
    const now = new Date();
    let run = true;

    if(startTime && stopTime){
        const today = now.toISOString().split('T')[0];
        const start = new Date(today+'T'+startTime);
        const stop = new Date(today+'T'+stopTime);
        run = now >= start && now <= stop;
    }

    if(run){
        document.getElementById('scroll-2digit').textContent = fixed2D || getRandom2D();
        document.getElementById('scroll-3digit').textContent = fixed3D || getRandom3D();
    }
}
setInterval(updateNumbers, scrollSpeed);

// Listen for settings from admin.js
window.addEventListener('message', (e)=>{
    if(e.data.fixed2D !== undefined) fixed2D = e.data.fixed2D;
    if(e.data.fixed3D !== undefined) fixed3D = e.data.fixed3D;
    if(e.data.startTime) startTime = e.data.startTime;
    if(e.data.stopTime) stopTime = e.data.stopTime;
    if(e.data.scrollSpeed) scrollSpeed = e.data.scrollSpeed;
});
