let interval;
const display2D = document.getElementById("display2D");
const display3D = document.getElementById("display3D");
const statusBox = document.getElementById("status");

function getRandom2D() {
  return String(Math.floor(Math.random() * 100)).padStart(2, "0");
}
function getRandom3D() {
  return String(Math.floor(Math.random() * 1000)).padStart(3, "0");
}

function applySettings() {
  const settings = JSON.parse(localStorage.getItem("adminSettings")) || {};
  let speed = settings.speed ? parseInt(settings.speed) : 500;

  clearInterval(interval);

  interval = setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0,5);

    // Start/Stop logic
    if (settings.startTime && currentTime < settings.startTime) {
      statusBox.textContent = "⏳ Waiting to Start...";
      return;
    }
    if (settings.stopTime && currentTime >= settings.stopTime) {
      statusBox.textContent = "🛑 Stopped!";
      clearInterval(interval);
      return;
    }

    // Fixed numbers or random scroll
    display2D.textContent = settings.fixed2D || getRandom2D();
    display3D.textContent = settings.fixed3D || getRandom3D();

    statusBox.textContent = "🎲 Rolling...";
  }, speed);
}

applySettings();

// Refresh every 5s (in case admin changes settings)
setInterval(applySettings, 5000);
