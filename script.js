let interval = null;
let targetTime = null;
let isRunning = false;

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const eventInput = document.getElementById("eventName");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const inputs = document.getElementById("inputs");
const errorEl = document.getElementById("error");
const messageEl = document.getElementById("message");
const eventLabel = document.getElementById("eventLabel");
const timerEl = document.querySelector(".timer");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

/* THEME TOGGLE */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* RESTORE ON LOAD */
window.addEventListener("load", () => {
  const savedTarget = localStorage.getItem("targetTime");
  const savedRunning = localStorage.getItem("isRunning");
  const savedDate = localStorage.getItem("savedDate");
  const savedTime = localStorage.getItem("savedTime");
  const savedEvent = localStorage.getItem("eventName");

  if (savedDate) dateInput.value = savedDate;
  if (savedTime) timeInput.value = savedTime;

  if (savedEvent) {
    eventInput.value = savedEvent;
    eventLabel.innerText = savedEvent;
    eventLabel.classList.add("show");
  }

  if (savedTarget) {
    targetTime = Number(savedTarget);
    render();

    if (savedRunning === "true") {
      startCountdown(true);
    } else {
      startBtn.disabled = false;
      resetBtn.disabled = false;
      inputs.classList.remove("hidden");
    }
  }
});

/* INPUT VALIDATION */
dateInput.addEventListener("input", validateInput);
timeInput.addEventListener("input", validateInput);

function validateInput() {
  if (!dateInput.value || !timeInput.value) {
    startBtn.disabled = true;
    return;
  }

  const selected = new Date(`${dateInput.value} ${timeInput.value}`).getTime();
  startBtn.disabled = selected <= Date.now();
}

/* BUTTON EVENTS */
startBtn.addEventListener("click", () => startCountdown(false));
stopBtn.addEventListener("click", stopCountdown);
resetBtn.addEventListener("click", resetCountdown);

/* START COUNTDOWN */
function startCountdown(fromStorage) {
  if (isRunning) return;

  messageEl.classList.remove("show");
  timerEl.classList.remove("finished");

  if (!fromStorage && !targetTime) {
    targetTime = new Date(`${dateInput.value} ${timeInput.value}`).getTime();
    localStorage.setItem("targetTime", targetTime);
    localStorage.setItem("savedDate", dateInput.value);
    localStorage.setItem("savedTime", timeInput.value);
  }

  const eventName = eventInput.value.trim();

  if (eventName) {
    eventLabel.innerText = eventName;
    eventLabel.classList.add("show");
    localStorage.setItem("eventName", eventName);
  } else {
    eventLabel.innerText = "";
    eventLabel.classList.remove("show");
    localStorage.removeItem("eventName");
  }

  isRunning = true;
  localStorage.setItem("isRunning", "true");

  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;

  inputs.classList.add("hidden");

  interval = setInterval(render, 1000);
  render();
}

/* UPDATE TIMER */
function render() {
  const remaining = targetTime - Date.now();

  if (remaining <= 0) {
    clearInterval(interval);
    update(0, 0, 0, 0);

    timerEl.classList.add("finished");
    messageEl.innerText = eventLabel.innerText
      ? `Time’s up — ${eventLabel.innerText}`
      : "Time’s up";

    messageEl.classList.add("show");
    resetStorage();
    return;
  }

  update(
    Math.floor(remaining / (1000 * 60 * 60 * 24)),
    Math.floor((remaining / (1000 * 60 * 60)) % 24),
    Math.floor((remaining / (1000 * 60)) % 60),
    Math.floor((remaining / 1000) % 60)
  );
}

/* STOP COUNTDOWN */
function stopCountdown() {
  clearInterval(interval);
  isRunning = false;
  localStorage.setItem("isRunning", "false");

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
  inputs.classList.remove("hidden");
}

/* RESET COUNTDOWN */
function resetCountdown() {
  clearInterval(interval);
  targetTime = null;
  isRunning = false;
  resetStorage();

  update(0, 0, 0, 0);
  dateInput.value = "";
  timeInput.value = "";
  eventInput.value = "";

  eventLabel.innerText = "";
  eventLabel.classList.remove("show");
  messageEl.classList.remove("show");
  timerEl.classList.remove("finished");

  startBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  inputs.classList.remove("hidden");
}

/* STORAGE */
function resetStorage() {
  localStorage.removeItem("targetTime");
  localStorage.removeItem("savedDate");
  localStorage.removeItem("savedTime");
  localStorage.removeItem("eventName");
  localStorage.removeItem("isRunning");
}

/* UI HELPERS + TICk */
function update(d, h, m, s) {
  applyTick(days, d);
  applyTick(hours, h);
  applyTick(minutes, m);
  applyTick(seconds, s);
}

function applyTick(el, value) {
  const padded = pad(value);
  if (el.innerText !== padded) {
    el.classList.remove("tick");
    void el.offsetWidth;
    el.classList.add("tick");
    el.innerText = padded;
  }
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

/* KEYBOARD SHORTCUTS */
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;

  if (e.key === "Enter" && !startBtn.disabled) startBtn.click();
  if (e.key === " " && !stopBtn.disabled) {
    e.preventDefault();
    stopBtn.click();
  }
  if (e.key.toLowerCase() === "r" && !resetBtn.disabled) resetBtn.click();
});
