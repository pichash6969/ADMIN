// ======= Real-Time Clock =======
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock(); // initialize immediately

// ======= Generate 2D Numbers (00-99) =======
function generateTwoDigitNumbers() {
    const container = document.getElementById('scroll-2digit');
    container.innerHTML = '';
    for (let cycle=0; cycle<10; cycle++){
        for (let i=0; i<=99; i++){
            const div = document.createElement('div');
            div.className = 'number-item';
            div.textContent = i.toString().padStart(2,'0');
            container.appendChild(div);
        }
    }
}

// ======= Generate 3D Numbers (000-999) =======
function generateThreeDigitNumbers() {
    const container = document.getElementById('scroll-3digit');
    container.innerHTML = '';
    for (let cycle=0; cycle<10; cycle++){
        for (let i=0; i<=999; i++){
            const div = document.createElement('div');
            div.className = 'number-item';
            div.textContent = i.toString().padStart(3,'0');
            container.appendChild(div);
        }
    }
}

// ======= Animation Controls =======
let isPlaying = true;
let speed2D = 20;
let speed3D = 30;

function playAnimation(){
    document.getElementById('scroll-2digit').style.animationPlayState='running';
    document.getElementById('scroll-3digit').style.animationPlayState='running';
    isPlaying=true;
}
function pauseAnimation(){
    document.getElementById('scroll-2digit').style.animationPlayState='paused';
    document.getElementById('scroll-3digit').style.animationPlayState='paused';
    isPlaying=false;
}

// ======= Initialize =======
window.addEventListener('load', () => {
    generateTwoDigitNumbers();
    generateThreeDigitNumbers();
    setTimeout(() => playAnimation(), 500);
});
