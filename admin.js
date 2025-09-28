// ======= Admin Controls =======
let isPlaying = true;
let speed2D = 20;
let speed3D = 30;

// Play / Pause / Reset / Random Stop functions
function playAnimation() {
    document.getElementById('scroll-2digit').style.animationPlayState = 'running';
    document.getElementById('scroll-3digit').style.animationPlayState = 'running';
    isPlaying = true;
}

function pauseAnimation() {
    document.getElementById('scroll-2digit').style.animationPlayState = 'paused';
    document.getElementById('scroll-3digit').style.animationPlayState = 'paused';
    isPlaying = false;
}

function resetAnimation() {
    const scroll2 = document.getElementById('scroll-2digit');
    const scroll3 = document.getElementById('scroll-3digit');
    scroll2.style.animation = 'none';
    scroll3.style.animation = 'none';
    scroll2.style.transform = 'translateY(0)';
    scroll3.style.transform = 'translateY(0)';
    setTimeout(()=>{
        scroll2.style.animation = `scrollTwoDigit ${speed2D}s linear infinite`;
        scroll3.style.animation = `scrollThreeDigit ${speed3D}s linear infinite`;
        isPlaying ? playAnimation() : pauseAnimation();
    },50);
}

function randomStop() {
    pauseAnimation();
    const random2 = Math.random() * -8000;
    const random3 = Math.random() * -80000;
    document.getElementById('scroll-2digit').style.transform = `translateY(${random2}px)`;
    document.getElementById('scroll-3digit').style.transform = `translateY(${random3}px)`;
}

// ======= Apply Settings Function =======
document.getElementById('applyBtn').addEventListener('click', ()=>{
    const fixed2D = document.getElementById('fixed2D').value.padStart(2,'0');
    const fixed3D = document.getElementById('fixed3D').value.padStart(3,'0');
    const startTime = document.getElementById('startTime').value;
    const stopTime = document.getElementById('stopTime').value;
    const speedVal = document.getElementById('speedSlider').value;

    // Scroll Speed Apply
    speed2D = parseInt(speedVal);
    speed3D = parseInt(speedVal) * 1.5;
    document.getElementById('scroll-2digit').style.animationDuration = `${speed2D}s`;
    document.getElementById('scroll-3digit').style.animationDuration = `${speed3D}s`;

    // Fixed Numbers Apply
    const scroll2 = document.getElementById('scroll-2digit');
    const scroll3 = document.getElementById('scroll-3digit');
    scroll2.innerHTML = `<div class="number-item">${fixed2D}</div>`;
    scroll3.innerHTML = `<div class="number-item">${fixed3D}</div>`;

    // Start/Stop Timer Logic
    if(startTime && stopTime){
        const interval = setInterval(()=>{
            const now = new Date();
            const current = now.toTimeString().slice(0,8);
            if(current >= startTime && current <= stopTime){
                playAnimation();
            } else {
                pauseAnimation();
            }
        },1000);
    }

    alert('Settings Applied!');
});

// Event Listeners for other buttons
document.getElementById('playBtn').addEventListener('click', playAnimation);
document.getElementById('pauseBtn').addEventListener('click', pauseAnimation);
document.getElementById('resetBtn').addEventListener('click', resetAnimation);
document.getElementById('randomBtn').addEventListener('click', randomStop);

// Scroll speed control
document.getElementById('speedSlider').addEventListener('input', ()=>{
    speed2D = parseInt(document.getElementById('speedSlider').value);
    speed3D = speed2D * 1.5;
    document.getElementById('scroll-2digit').style.animationDuration = `${speed2D}s`;
    document.getElementById('scroll-3digit').style.animationDuration = `${speed3D}s`;
});
