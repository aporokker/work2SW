const timer = document.getElementById("Timer");
const start = document.getElementById("Start");
const stop = document.getElementById("Stop");
const reset = document.getElementById("Reset");

let startTime;        //Startボタンクリック時の時刻
let timeoutid;        //ID
let elapsedTime = 0;  //StartからStopまでの経過時間

function countUp() {
  const d = new Date(Date.now() - startTime + elapsedTime);
  const h = Math.floor(d / 3600000).toString().padStart(2,"0");
  const m = String(d.getMinutes()).padStart(2,"0");
  const s = String(d.getSeconds()).padStart(2,"0");
  const ms = String(d.getMilliseconds()).padStart(3,"0");
  timer.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutid = setTimeout(() => {
    countUp();
  }, 10);
}

// 初期状態またはリセット後
function setButtonStateInitial() {
  start.classList.remove("inactive");
  stop.classList.add("inactive");
  reset.classList.add("inactive");
}

//タイマー動作中
function setButtonStateRunning() {
  start.classList.add("inactive");
  stop.classList.remove("inactive");
  reset.classList.add("inactive");
}

//タイマー停止中
function setButtonStateStopped() {
  start.classList.remove("inactive");
  stop.classList.add("inactive");
  reset.classList.remove("inactive");
}

//ボタンを初期状態に設定
setButtonStateInitial();

//Startボタン押下
function timerStart() {
  if (start.classList.contains("inactive") === true) {
    return;
  } else {
    setButtonStateRunning(); //タイマー動作中状態
    startTime = Date.now();
    countUp();
  }
}

//Stopボタン押下
function timerStop() {
  if (stop.classList.contains("inactive") === true) {
    return;
  } else {
    setButtonStateStopped(); //タイマー停止中
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  }
}

//Resetボタン押下
function allReset() {
  if (reset.classList.contains("inactive") === true) {
    return;
  } else {
    setButtonStateInitial();
    timer.textContent = "00:00:00.000";
    elapsedTime = 0;
  }
}