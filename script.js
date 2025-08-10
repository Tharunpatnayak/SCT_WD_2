let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function timeToString(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return (
    `${hrs.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(3, '0')}`
  );
}

function startPause() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = timeToString(elapsedTime);
    }, 10);
    startPauseBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(interval);
    startPauseBtn.textContent = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  elapsedTime = 0;
  running = false;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  lapsList.innerHTML = "";
}

function lap() {
  if (running) {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
