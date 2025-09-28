const ADMIN_PASSWORD = "admin123"; // Change this password

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
  const num = document.getElementById("fixedNumber").value;
  document.getElementById("result").innerText = `✅ Fixed Number Saved: ${num}`;
}