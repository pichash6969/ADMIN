const fixed2DInput = document.getElementById('fixed2D');
const fixed3DInput = document.getElementById('fixed3D');
const startTimeInput = document.getElementById('startTime');
const stopTimeInput = document.getElementById('stopTime');
const speedSlider = document.getElementById('speedSlider');

// Listen to changes
fixed2DInput.addEventListener('input', e => window.fixed2D = parseInt(e.target.value));
fixed3DInput.addEventListener('input', e => window.fixed3D = parseInt(e.target.value));
startTimeInput.addEventListener('input', e => window.startTime = e.target.value);
stopTimeInput.addEventListener('input', e => window.stopTime = e.target.value);
speedSlider.addEventListener('input', e => {
  window.currentSpeed2Digit = parseInt(e.target.value);
  window.currentSpeed3Digit = parseInt(e.target.value) * 1.5;
  if(window.isPlaying) window.startScroll();
});
