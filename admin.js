function startScrolling(){
    document.getElementById('scroll-2digit').style.animationPlayState='running';
    document.getElementById('scroll-3digit').style.animationPlayState='running';
    isPaused=false;
}

function stopScrolling(){
    document.getElementById('scroll-2digit').style.animationPlayState='paused';
    document.getElementById('scroll-3digit').style.animationPlayState='paused';
}

function showFixedNumbers(){
    const num2D = String(document.getElementById('fixed2D').value).padStart(2,'0');
    const num3D = String(document.getElementById('fixed3D').value).padStart(3,'0');
    document.getElementById('scroll-2digit').style.transform = `translateY(-${num2D*80}px)`;
    document.getElementById('scroll-3digit').style.transform = `translateY(-${num3D*80}px)`;
}

function updateSpeed(){
    const val = document.getElementById('speedControl').value;
    document.getElementById('scroll-2digit').style.animationDuration = `${val}s`;
    document.getElementById('scroll-3digit').style.animationDuration = `${val*1.5}s`;
}

function togglePauseResume(){
    if(isPaused){
        startScrolling();
    } else {
        stopScrolling();
        isPaused=true;
    }
}

document.getElementById('speedControl').addEventListener('input', updateSpeed);
document.getElementById('pauseResumeBtn').addEventListener('click', togglePauseResume);

// Real-time clock checking for start/stop
setInterval(()=>{
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    const current=`${h}:${m}:${s}`;

    if(current === document.getElementById('startTime').value){
        startScrolling();
    } else if(current === document.getElementById('stopTime').value){
        stopScrolling();
        showFixedNumbers();
    }
},1000);
