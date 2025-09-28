let isPaused=false;

function startScrolling(){
    document.getElementById('scroll-2digit').style.animationPlayState='running';
    document.getElementById('scroll-3digit').style.animationPlayState='running';
    isPaused=false;
}

function stopScrolling(){
    document.getElementById('scroll-2digit').style.animationPlayState='paused';
    document.getElementById('scroll-3digit').style.animationPlayState='paused';
    isPaused=true;
}

// Show fixed numbers
function showFixedNumbers(){
    let n2=parseInt(document.getElementById('fixed2D').value);
    let n3=parseInt(document.getElementById('fixed3D').value);
    if(isNaN(n2)||n2<0)n2=0; if(n2>99)n2=99;
    if(isNaN(n3)||n3<0)n3=0; if(n3>999)n3=999;
    document.getElementById('fixed2D').value=n2;
    document.getElementById('fixed3D').value=n3;
    document.getElementById('scroll-2digit').style.transform=`translateY(-${n2*80}px)`;
    document.getElementById('scroll-3digit').style.transform=`translateY(-${n3*80}px)`;
}

// Update speed
function updateSpeed(){
    const val=document.getElementById('speedControl').value;
    document.getElementById('scroll-2digit').style.animationDuration=`${val}s`;
    document.getElementById('scroll-3digit').style.animationDuration=`${val*1.5}s`;
}

// Pause/resume toggle
document.getElementById('pauseResumeBtn').addEventListener('click',()=>{
    if(isPaused)startScrolling(); else stopScrolling();
});

// Input events
document.getElementById('speedControl').addEventListener('input',updateSpeed);
document.getElementById('fixed2D').addEventListener('change',showFixedNumbers);
document.getElementById('fixed3D').addEventListener('change',showFixedNumbers);

// Real-time start/stop
setInterval(()=>{
    const now=new Date();
    const h=String(now.getHours()).padStart(2,'0');
    const m=String(now.getMinutes()).padStart(2,'0');
    const s=String(now.getSeconds()).padStart(2,'0');
    const current=`${h}:${m}:${s}`;
    if(current===document.getElementById('startTime').value)startScrolling();
    if(current===document.getElementById('stopTime').value){stopScrolling(); showFixedNumbers();}
},1000);
