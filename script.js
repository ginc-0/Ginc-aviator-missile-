let interval;
let multiplier = 1.00;
let isGameOver = false;
let shotTime;
let allowWin = false;

function toggleForm() {
  const login = document.getElementById("loginForm");
  const signup = document.getElementById("signupForm");
  login.style.display = login.style.display === "none" ? "block" : "none";
  signup.style.display = signup.style.display === "none" ? "block" : "none";
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
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
  } else {
    alert("Wrong credentials.");
  }
}

function startGame() {
  const bet = document.getElementById("betAmount").value;
  if (!bet || bet <= 0) {
    alert("Please enter a valid bet amount.");
    return;
  }

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  multiplier = 1.00;
  document.getElementById("counter").innerText = multiplier.toFixed(2) + "x";
  document.getElementById("missile").classList.remove("explode");
  document.getElementById("result").innerText = "";
  document.getElementById("tryAgainBtn").style.display = "none";
  isGameOver = false;

  allowWin = Math.random() < 0.20;

  shotTime = allowWin
    ? 5000 + Math.random() * 2000
    : 1500 + Math.random() * 1500;

  interval = setInterval(() => {
    multiplier += 0.01;
    document.getElementById("counter").innerText = multiplier.toFixed(2) + "x";
  }, 100);

  setTimeout(() => {
    if (!isGameOver) {
      document.getElementById("missile").classList.add("explode");
      document.getElementById("result").innerText = "💥 Shot down! You lost.";
      document.getElementById("tryAgainBtn").style.display = "inline-block";
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
  document.getElementById("tryAgainBtn").style.display = "inline-block";
  isGameOver = true;
}

function resetGame() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "block";
}
