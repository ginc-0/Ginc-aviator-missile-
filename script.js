let interval;
let multiplier = 1.00;
let isGameOver = false;
let shotTime;
let allowWin = false;

function toggleForm() {
  const login = document.getElementById("loginForm");
  const signup = document.getElementById("signupForm");
  if (login.style.display === "none") {
    login.style.display = "block";
    signup.style.display = "none";
  } else {
    login.style.display = "none";
    signup.style.display = "block";
  }
}

function signup() {
  const user = document.getElementById("signupUsername").value;
  const pass = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!user || !pass || pass !== confirm) {
    alert("Invalid or mismatched fields.");
    return;
  }

  localStorage.setItem(user, pass);
  alert("Account created. Now login.");
  toggleForm();
}

function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  const storedPass = localStorage.getItem(user);

  if (storedPass && storedPass === pass) {
    startGame();
  } else {
    alert("Wrong credentials.");
  }
}

function startGame() {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  multiplier = 1.00;
  document.getElementById("counter").innerText = multiplier.toFixed(2) + "x";
  document.getElementById("missile").classList.remove("explode");
  document.getElementById("result").innerText = "";
  isGameOver = false;

  allowWin = Math.random() < 0.20; // 20% chance to win

  shotTime = allowWin
    ? 5000 + Math.random() * 2000  // Win: longer flight
    : 1500 + Math.random() * 1500; // Lose: short flight

  interval = setInterval(() => {
    multiplier += 0.01;
    document.getElementById("counter").innerText = multiplier.toFixed(2) + "x";
  }, 100);

  setTimeout(() => {
    if (!isGameOver) {
      document.getElementById("missile").classList.add("explode");
      document.getElementById("result").innerText = "💥 Shot down! You lost.";
      clearInterval(interval);
      isGameOver = true;
    }
  }, shotTime);
}

function cashOut() {
  if (isGameOver) return;
  if (!allowWin) {
    document.getElementById("missile").classList.add("explode");
    document.getElementById("result").innerText = "💥 Too late! You lost.";
  } else {
    clearInterval(interval);
    document.getElementById("result").innerText = `✅ You cashed out at ${multiplier.toFixed(2)}x`;
  }
  isGameOver = true;
}
