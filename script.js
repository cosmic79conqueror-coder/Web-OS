document.addEventListener('DOMContentLoaded', () => {
  const state = {
    settings: { boost: 14, tcs: false, launch: true, exhaust: true, drift: false },
    arcade: { score: 0, high: parseInt(localStorage.getItem('turboOsHighScore') || 0, 10), time: 15, active: false, timer: null },
    zIndex: 100
  };

  const BOOT_PHASES = ["ECU MAPPING...", "SPOOLING TWIN TURBOS...", "INJECTORS AT 100%...", "LAUNCH CONTROL ACTIVE."];
  const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const el = {
    needle: document.getElementById('needle'),
    progressBar: document.getElementById('progressBar'),
    bootStatus: document.getElementById('bootStatus'),
    bootScreen: document.getElementById('bootScreen'),
    ignitionScreen: document.getElementById('ignitionScreen'),
    typeWriter: document.getElementById('typeWriter'),
    startEngineBtn: document.getElementById('startEngineBtn'),
    desktopScreen: document.getElementById('desktopScreen'),
    cursorDot: document.getElementById('cursorDot'),
    cursorRing: document.getElementById('cursorRing'),
    gsDrawer: document.getElementById('gsDrawer'),
    highScoreVal: document.getElementById('highScoreVal'),
    timerVal: document.getElementById('timerVal'),
    turboCount: document.getElementById('turboCount'),
    revArcadeBtn: document.getElementById('revArcadeBtn'),
    quickPsi: document.getElementById('quickPsi'),
    clock: {
      h: document.getElementById('hours'),
      m: document.getElementById('minutes'),
      s: document.getElementById('seconds'),
      ampm: document.getElementById('ampm'),
      date: document.getElementById('dateDisplay'),
    }
  };

  let progress = 0, phaseIndex = 0;
  const bootInterval = setInterval(() => {
    progress += Math.random() * 8;
    const revBase = (progress / 100) * 180;
    const revSpike = Math.random() > 0.5 ? Math.random() * 50 : Math.random() * -15;
    el.needle.style.transform = `rotate(${Math.max(0, Math.min(180, revBase + revSpike))}deg)`;

    if (progress >= 100) {
      progress = 100;
      clearInterval(bootInterval);
      el.needle.style.transform = "rotate(185deg)";
      el.needle.style.boxShadow = "0 0 40px #ff1a3d, 0 0 15px #fff";
      setTimeout(transitionToIgnition, 800);
    }
    el.progressBar.style.width = `${progress}%`;
    const expectedPhase = Math.floor((progress / 100) * BOOT_PHASES.length);
    if (expectedPhase > phaseIndex && expectedPhase < BOOT_PHASES.length) {
      el.bootStatus.innerText = BOOT_PHASES[phaseIndex = expectedPhase];
    }
  }, 150);

  function transitionToIgnition() {
    el.bootScreen.style.opacity = '0';
    setTimeout(() => {
      el.bootScreen.style.display = 'none';
      el.ignitionScreen.classList.remove('hidden');
      runTypeWriter("WITHOUT ANY FURTHER TURBOLAG");
    }, 800);
  }

  function runTypeWriter(text, i = 0) {
    if (i === 0) el.typeWriter.innerHTML = "";
    if (i < text.length) {
      el.typeWriter.innerHTML += text.charAt(i);
      setTimeout(() => runTypeWriter(text, i + 1), 70);
    }
  }

  el.startEngineBtn.addEventListener('click', () => {
    el.ignitionScreen.style.opacity = '0';
    el.ignitionScreen.style.transform = 'scale(1.1)';
    setTimeout(() => {
      el.ignitionScreen.style.display = 'none';
      el.desktopScreen.classList.remove('hidden');
    }, 800);
  });

  if (el.highScoreVal) el.highScoreVal.innerText = state.arcade.high;
  document.getElementById('gsTrigger')?.addEventListener('click', () => el.gsDrawer.classList.toggle('hidden'));
  document.getElementById('gsClose')?.addEventListener('click', () => el.gsDrawer.classList.add('hidden'));

  el.revArcadeBtn?.addEventListener('click', () => {
    if (!state.arcade.active) {
      state.arcade.active = true;
      state.arcade.score = 0;
      state.arcade.time = 15;
      if (el.timerVal) el.timerVal.innerText = state.arcade.time;
      if (el.turboCount) el.turboCount.innerText = "0 RPM";
      el.revArcadeBtn.innerText = "JAM THROTTLE";

      state.arcade.timer = setInterval(() => {
        state.arcade.time--;
        if (el.timerVal) el.timerVal.innerText = state.arcade.time;
        if (state.arcade.time <= 0) {
          clearInterval(state.arcade.timer);
          state.arcade.active = false;
          el.revArcadeBtn.innerText = "RESTART RUN";
          if (state.arcade.score > state.arcade.high) {
            state.arcade.high = state.arcade.score;
            localStorage.setItem('turboOsHighScore', state.arcade.high);
            if (el.highScoreVal) el.highScoreVal.innerText = state.arcade.high;
          }
        }
      }, 1000);
    }
    if (state.arcade.active) {
      state.arcade.score += Math.floor(Math.random() * 450 + 150);
      if (el.turboCount) el.turboCount.innerText = `${state.arcade.score} RPM`;
      if (el.quickPsi) el.quickPsi.innerText = `BOOST: ${state.arcade.score > 8000 ? '26.4' : '16.8'} PSI`;
    }
  });

  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.clock.h.textContent = String(h).padStart(2, '0');
    el.clock.m.textContent = String(now.getMinutes()).padStart(2, '0');
    el.clock.s.textContent = String(now.getSeconds()).padStart(2, '0');
    el.clock.ampm.textContent = ampm;
    el.clock.date.textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  const consoleLogs = ["BOOT SEQUENCE OK", "CAN-BUS SYNCED", "OIL PRESSURE NOMINAL", "TURBO SPOOL READY"];
  const templates = {
    'Engine Control': () => `
      <h3>ECU MAPPING & DYNAMICS</h3>
      <label>Boost Target (PSI): <span id="boost-val">${state.settings.boost}</span></label>
      <input type="range" id="setting-boost" min="10" max="30" value="${state.settings.boost}">
      <div class="setting-row"><span>Traction Control (TCS)</span><input type="checkbox" id="setting-tcs" ${state.settings.tcs ? 'checked' : ''}></div>
      <div class="setting-row"><span>Launch Control</span><input type="checkbox" id="setting-launch" ${state.settings.launch ? 'checked' : ''}></div>
      <div class="setting-row"><span>Active Exhaust Valves</span><input type="checkbox" id="setting-exhaust" ${state.settings.exhaust ? 'checked' : ''}></div>
      <div class="setting-row"><span>Drift Mode</span><input type="checkbox" id="setting-drift" ${state.settings.drift ? 'checked' : ''}></div>
      <button class="flash-btn" id="flash-ecu-btn">FLASH ECU</button>
    `,
    'Telemetry': '<h3>LIVE DATA</h3><p>RPM: <span class="blink text-red" style="font-size:1.5rem;">8450</span></p><p>Boost: 14.2 psi</p><p>Oil Temp: 104°C</p><p>Coolant: 90°C</p>',
    'Nav System': `<h3>SATELLITE LINK</h3><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.0645226495!2d73.045437!3d18.989401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8c71cc169b9%3A0x629b350415a77c38!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716382000000!5m2!1sen!2sin" width="100%" height="260" style="border:0;border-radius:5px;" allowfullscreen="" loading="lazy"></iframe><p style="text-align:center;color:var(--neon-blue);font-size:0.8rem;margin-top:8px;">GPS LOCKED: PANVEL, MAHARASHTRA</p>`,
    'Media Deck': `<h3>SPOTIFY DECK</h3><iframe style="border-radius:12px;" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" width="100%" height="320" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    'Garage': `<h3>FILESYSTEM</h3><ul style="max-height:220px;overflow-y:auto;"><li><span>logs_2026/</span></li><li><span>dyno_runs/</span></li><li class="map-file" data-map="base"><span>map_v1_base.bin (LOAD)</span> <span class="muted">2.0 MB</span></li><li class="map-file" data-map="pops"><span>map_v2_pops.bin (LOAD)</span> <span class="muted">2.1 MB</span></li></ul>`,
    'Calendar': `<h3>SCHEDULER</h3><input type="date" id="cal-date" min="2026-01-01" max="2100-12-31"><input type="text" id="rem-text" placeholder="Reminder..."><button class="flash-btn" id="add-rem-btn">ADD</button><ul id="reminder-list"><li><span>2026-09-15: Track day</span></li></ul>`,
    'Console': `<h3>TTY CONSOLE</h3><div id="tty-out" style="font-family:monospace;font-size:0.75rem;height:180px;overflow-y:auto;background:#000;padding:10px;border:1px solid #222;">${consoleLogs.map(l => '> ' + l).join('<br>')}</div><input type="text" id="tty-in" placeholder="type cmd (help/clear/boost)...">`
  };

  function openAppWindow(name) {
    const winId = 'win-' + name.replace(/\s/g, '');
    if (document.getElementById(winId)) return;

    const win = document.createElement('div');
    win.className = 'app-window';
    win.id = winId;
    win.style.zIndex = ++state.zIndex;
    win.style.left = `${Math.random() * 120 + 80}px`;
    win.style.top = `${Math.random() * 80 + 70}px`;

    const htmlContent = typeof templates[name] === 'function' ? templates[name]() : (templates[name] || '<p>LOADING...</p>');
    win.innerHTML = `
      <div class="window-header"><span>${name}</span><button class="icon-btn win-close">X</button></div>
      <div class="window-body">${htmlContent}</div>
    `;
    document.body.appendChild(win);

    win.querySelector('.win-close').addEventListener('click', () => win.remove());

    const header = win.querySelector('.window-header');
    let isDragging = false, startX, startY, initX, initY;
    header.addEventListener('mousedown', e => {
      if (e.target.classList.contains('win-close')) return;
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      initX = win.offsetLeft; initY = win.offsetTop;
      win.style.zIndex = ++state.zIndex;
      document.body.classList.add('is-dragging');
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      win.style.left = `${initX + e.clientX - startX}px`;
      win.style.top = `${initY + e.clientY - startY}px`;
    });
    window.addEventListener('mouseup', () => { isDragging = false; document.body.classList.remove('is-dragging'); });

    if (name === 'Console') {
      const ttyIn = win.querySelector('#tty-in'), ttyOut = win.querySelector('#tty-out');
      ttyIn.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const cmd = ttyIn.value.trim().toLowerCase();
          ttyOut.innerHTML += `<br>> ${ttyIn.value}`;
          if (cmd === 'clear') ttyOut.innerHTML = '';
          else if (cmd === 'boost') ttyOut.innerHTML += `<br>CURRENT BOOST: ${state.settings.boost} PSI`;
          else if (cmd === 'help') ttyOut.innerHTML += `<br>CMDS: clear, boost, help`;
          else ttyOut.innerHTML += `<br>UNKNOWN CMD`;
          ttyIn.value = '';
          ttyOut.scrollTop = ttyOut.scrollHeight;
        }
      });
    }
  }

  document.querySelectorAll('.app-icon').forEach(app => {
    app.addEventListener('click', () => {
      const icon = app.querySelector('.icon-shape');
      icon.style.transform = "scale(0.9) skewX(10deg)";
      setTimeout(() => icon.style.transform = "", 150);
      const appName = app.getAttribute('data-app');
      if (appName) openAppWindow(appName);
    });
  });

  document.addEventListener('input', e => {
    if (e.target.id === 'setting-boost') {
      state.settings.boost = e.target.value;
      const boostVal = document.getElementById('boost-val');
      const topBarBoost = document.getElementById('topBarBoost');
      if (boostVal) boostVal.innerText = state.settings.boost;
      if (topBarBoost) topBarBoost.innerText = state.settings.boost;
    }
  });

  document.addEventListener('change', e => {
    const idMap = { 'setting-tcs': 'tcs', 'setting-launch': 'launch', 'setting-exhaust': 'exhaust', 'setting-drift': 'drift' };
    if (idMap[e.target.id]) {
      state.settings[idMap[e.target.id]] = e.target.checked;
    }
  });

  document.addEventListener('click', e => {
    const mapFile = e.target.closest('.map-file');
    if (mapFile) {
      state.settings = mapFile.dataset.map === 'base'
        ? { boost: 14, tcs: true, launch: true, exhaust: false, drift: false }
        : { boost: 22, tcs: false, launch: true, exhaust: true, drift: true };
      const topBarBoost = document.getElementById('topBarBoost');
      if (topBarBoost) topBarBoost.innerText = state.settings.boost;
      const settingsBody = document.querySelector('#win-EngineControl .window-body');
      if (settingsBody) settingsBody.innerHTML = templates['Engine Control']();
    }

    if (e.target.id === 'flash-ecu-btn') {
      e.target.innerText = "FLASHING...";
      setTimeout(() => e.target.innerText = "FLASH ECU", 1000);
    }

    if (e.target.id === 'add-rem-btn') {
      const dateVal = document.getElementById('cal-date')?.value;
      const textVal = document.getElementById('rem-text')?.value;
      const list = document.getElementById('reminder-list');
      if (dateVal && textVal && list) {
        list.innerHTML += `<li><span>${dateVal}: ${textVal}</span></li>`;
        document.getElementById('rem-text').value = '';
      }
    }
  });

  let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    el.cursorDot.style.left = `${mx}px`;
    el.cursorDot.style.top = `${my}px`;
  });

  function animCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    el.cursorRing.style.left = `${rx}px`;
    el.cursorRing.style.top = `${ry}px`;
    requestAnimationFrame(animCursor);
  }
  animCursor();

  window.addEventListener('mousedown', () => Object.assign(el.cursorRing.style, { width: '24px', height: '24px', borderColor: 'var(--neon-red)' }));
  window.addEventListener('mouseup', () => {
    const isHover = el.cursorRing.classList.contains('hovered');
    Object.assign(el.cursorRing.style, { width: isHover ? '50px' : '36px', height: isHover ? '50px' : '36px', borderColor: isHover ? 'var(--neon-red)' : 'var(--neon-blue)' });
  });

  document.querySelectorAll('button, .app-icon, .map-file').forEach(elTarget => {
    elTarget.addEventListener('mouseenter', () => el.cursorRing.classList.add('hovered'));
    elTarget.addEventListener('mouseleave', () => el.cursorRing.classList.remove('hovered'));
  });
});