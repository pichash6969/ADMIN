// Admin password (change before publishing)
const ADMIN_PASSWORD = "admin123"; // default password

function login() {
  const pass = document.getElementById("password").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("❌ Wrong Password!");
  }
}

function saveNumber() {
  const num2 = document.getElementById("fixedNumber2").value;
  const num3 = document.getElementById("fixedNumber3").value;
  let msg = [];
  if (num2 !== '') msg.push('Fixed 2-digit saved: ' + num2.padStart(2,'0'));
  if (num3 !== '') msg.push('Fixed 3-digit saved: ' + num3.toString().padStart(3,'0'));
  if (msg.length === 0) msg.push('No numbers entered.');
  document.getElementById("result").innerText = '✅ ' + msg.join(' | ');
}