// Scroll Numbers Generation
function generateNumbers(containerId, maxNum, digits) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let cycle = 0; cycle < 10; cycle++) {
    for (let i = 0; i <= maxNum; i++) {
      const div = document.createElement('div');
      div.className = 'number-item';
      div.textContent = i.toString().padStart(digits, '0');
      container.appendChild(div);
    }
  }
}

let isPlaying = false;
let currentSpeed2Digit = 20;
let currentSpeed3Digit = 30;
let fixed2D = 0;
let fixed3D = 0;
let startTime = null;
let stopTime = null;

// Real-Time Clock
function updateClock() {
  const now = new Date();
  const clock = document.getElementById('realClock');
  const timeStr = now.toTimeString().split(' ')[0];
  clock.textContent = timeStr;

  // Auto Start/Stop Scroll
  if (startTime && stopTime) {
    if (timeStr === startTime) startScroll();
    if (timeStr === stopTime) stopScroll();
  }
  requestAnimationFrame(updateClock);
}

// Scroll Controls
function startScroll() {
  document.getElementById('scroll-2digit').style.animation = `scrollTwoDigit ${currentSpeed2Digit}s linear infinite`;
  document.getElementById('scroll-3digit').style.animation = `scrollThreeDigit ${currentSpeed3Digit}s linear infinite`;
  isPlaying = true;
}

function stopScroll() {
  const scroll2 = document.getElementById('scroll-2digit');
  const scroll3 = document.getElementById('scroll-3digit');

  scroll2.style.animation = 'none';
  scroll3.style.animation = 'none';

  scroll2.style.transform = `translateY(-${fixed2D*80}px)`;
  scroll3.style.transform = `translateY(-${fixed3D*80}px)`;

  isPlaying = false;
}

// Initialize
window.addEventListener('load', () => {
  generateNumbers('scroll-2digit', 99, 2);
  generateNumbers('scroll-3digit', 999, 3);
  updateClock();
});

// Dynamic Animation Keyframes
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes scrollTwoDigit { from { transform: translateY(0);} to { transform: translateY(-8000px); } }
@keyframes scrollThreeDigit { from { transform: translateY(0);} to { transform: translateY(-80000px); } }
`;
document.head.appendChild(styleSheet);
