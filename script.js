document.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('bootScreen');
  const homeScreen = document.getElementById('homeScreen');
  const progressFill = document.getElementById('progressFill');
  const bootStatus = document.getElementById('bootStatus');
  const clockDisplay = document.getElementById('clockDisplay');
  
  const boostRange = document.getElementById('boostRange');
  const boostVal = document.getElementById('topBoost');
  const flashBtn = document.getElementById('flashBtn');

  const arcadeBtn = document.getElementById('arcadeBtn');
  const scoreVal = document.getElementById('scoreVal');
  const timerVal = document.getElementById('timerVal');
  const highScoreVal = document.getElementById('highScoreVal');

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let currentProgress = 0;
  const bootPhases = ["MAPPING ECU...", "SPOOFING SENSORS...", "INITIALIZING TELEMETRY...", "SYSTEM READY."];
  
  const bootInterval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 15) + 5;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(bootInterval);
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
      }, 500);
    }
    progressFill.style.width = currentProgress + '%';
    const phaseIndex = Math.min(Math.floor((currentProgress / 100) * bootPhases.length), bootPhases.length - 1);
    bootStatus.textContent = bootPhases[phaseIndex];
  }, 120);

  setInterval(() => {
    const now = new Date();
    clockDisplay.textContent = now.toTimeString().split(' ')[0];
  }, 1000);

  boostRange.addEventListener('input', (e) => {
    boostVal.textContent = e.target.value;
  });

  flashBtn.addEventListener('click', () => {
    flashBtn.textContent = "FLASHING...";
    setTimeout(() => {
      flashBtn.textContent = "FLASH ECU";
    }, 800);
  });

  let arcadeActive = false;
  let score = 0;
  let timeLeft = 15;
  let arcadeTimer = null;
  let highScore = localStorage.getItem('turboHighScore') || 0;
  highScoreVal.textContent = highScore;

  arcadeBtn.addEventListener('click', () => {
    if (!arcadeActive) {
      arcadeActive = true;
      score = 0;
      timeLeft = 15;
      scoreVal.textContent = score;
      timerVal.textContent = timeLeft;
      arcadeBtn.textContent = "JAM THROTTLE";

      arcadeTimer = setInterval(() => {
        timeLeft--;
        timerVal.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(arcadeTimer);
          arcadeActive = false;
          arcadeBtn.textContent = "RESTART RUN";
          if (score > highScore) {
            highScore = score;
            localStorage.setItem('turboHighScore', highScore);
            highScoreVal.textContent = highScore;
          }
        }
      }, 1000);
    }

    if (arcadeActive) {
      score += Math.floor(Math.random() * 300) + 100;
      scoreVal.textContent = score;
    }
  });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  document.querySelectorAll('button, input').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
});