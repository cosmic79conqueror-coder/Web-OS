document.addEventListener('DOMContentLoaded', function() {
    
    window.autoSettings = {
        boost: 14,
            tcs: false,
        launch: true,
            exhaust: true,
        drift: false
    };

    let needle = document.getElementById('needle')
          let progressBar = document.getElementById('progressBar')
      let bootStatus = document.getElementById('bootStatus')
    let bootScreen = document.getElementById('bootScreen')
        
      let ignitionScreen = document.getElementById('ignitionScreen')
    let typeWriterElement = document.getElementById('typeWriter')
          let startEngineBtn = document.getElementById('startEngineBtn')
    
      let desktopScreen = document.getElementById('desktopScreen')

        let bootPhases = [
      "ECU MAPPING...",
          "SPOOLING TWIN TURBOS...",
    "INJECTORS AT 100%...",
        "LAUNCH CONTROL ACTIVE."
      ]
    
    let progress = 0;
          let phaseIndex = 0;
    
      let bootInterval = setInterval(function() {
    progress += Math.random() * 8;
        
          let revBase = (progress / 100) * 180;
      let revSpike = Math.random() > 0.5 ? (Math.random() * 50) : (Math.random() * -15);
    let finalRev = Math.min(180, revBase + revSpike);
        
          needle.style.transform = `rotate(${Math.max(0, finalRev)}deg)`;

      if(progress >= 100) {
    progress = 100
            clearInterval(bootInterval)
        
      needle.style.transform = "rotate(185deg)"
          needle.style.boxShadow = "0 0 40px #ff1a3d, 0 0 15px #fff"
        
    setTimeout(revealIgnitionScreen, 800)
        }
      
          progressBar.style.width = progress + "%"
      
    let expectedPhase = Math.floor((progress / 100) * bootPhases.length)
          if(expectedPhase > phaseIndex && expectedPhase < bootPhases.length) {
      phaseIndex = expectedPhase
    bootStatus.innerText = bootPhases[phaseIndex]
          }
      
        }, 150)

    function revealIgnitionScreen() {
          bootScreen.style.opacity = '0'
      setTimeout(function() {
    bootScreen.style.display = 'none'
            ignitionScreen.classList.remove('hidden')
      typeWriterEffect("WITHOUT ANY FURTHER TURBOLAG")
    }, 800)
        }

      function typeWriterEffect(text) {
    let i = 0
          typeWriterElement.innerHTML = ""
      
      let typing = setInterval(function() {
            if(i < text.length) {
      typeWriterElement.innerHTML += text.charAt(i)
    i++
            } else {
      clearInterval(typing)
    }
          }, 70) 
    }

        startEngineBtn.addEventListener('click', function() {
      ignitionScreen.style.opacity = '0'
    ignitionScreen.style.transform = 'scale(1.1)' 
          setTimeout(() => {
      ignitionScreen.style.display = 'none'
    desktopScreen.classList.remove('hidden')
          }, 800)
    })


        let hEl = document.getElementById('hours')
      let mEl = document.getElementById('minutes')
    let sEl = document.getElementById('seconds')
          let ampmEl = document.getElementById('ampm')
      let dateEl = document.getElementById('dateDisplay')

    let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

      function updateClock() {
    let now = new Date()
          let h = now.getHours()
      let m = now.getMinutes()
    let s = now.getSeconds()
          let ampm = h >= 12 ? 'PM' : 'AM'

      h = h % 12
    if(h == 0) h = 12 

          if(h < 10) h = '0' + h
      if(m < 10) m = '0' + m
    if(s < 10) s = '0' + s

          hEl.textContent = h
      mEl.textContent = m
    sEl.textContent = s
        ampmEl.textContent = ampm

      let dayName = days[now.getDay()]
          let monthName = months[now.getMonth()]
    let dateNum = now.getDate()
      
        dateEl.textContent = dayName + ", " + monthName + " " + dateNum
    }

          updateClock()
    setInterval(updateClock, 1000)
    

    function getSettingsHTML() {
        return `<h3>ECU MAPPING & DYNAMICS</h3>
              <label>Boost Target (PSI): <span id="boost-val">${window.autoSettings.boost}</span></label>
            <input type="range" id="setting-boost" min="10" max="30" value="${window.autoSettings.boost}"><br>
          <div class="setting-row"><span>Traction Control (TCS)</span><input type="checkbox" id="setting-tcs" ${window.autoSettings.tcs ? 'checked' : ''}></div>
        <div class="setting-row"><span>Launch Control</span><input type="checkbox" id="setting-launch" ${window.autoSettings.launch ? 'checked' : ''}></div>
              <div class="setting-row"><span>Active Exhaust Valves</span><input type="checkbox" id="setting-exhaust" ${window.autoSettings.exhaust ? 'checked' : ''}></div>
          <div class="setting-row"><span>Drift Mode</span><input type="checkbox" id="setting-drift" ${window.autoSettings.drift ? 'checked' : ''}></div>
              <button class="flash-btn" id="flash-ecu-btn">FLASH ECU</button>`;
    }


      let appContentData = {
    'Telemetry': '<h3>LIVE DATA</h3><p>RPM: <span class="blink" style="color:var(--neon-red); font-size:1.5rem;">8450</span></p><p>Boost: 14.2 psi</p><p>Oil Temp: 104°C</p><p>Coolant: 90°C</p><p>Intake Temp: 35°C</p>',
      
      'Nav System': `<h3>SATELLITE LINK</h3>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.0645226495!2d73.045437!3d18.989401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8c71cc169b9%3A0x629b350415a77c38!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716382000000!5m2!1sen!2sin" width="100%" height="300" style="border:0; border-radius:5px; pointer-events:auto;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <p style="text-align:center; color:var(--neon-blue); font-size:0.8rem; margin-top:10px;">GPS LOCKED: PANVEL, MAHARASHTRA</p>`,
          
    'Media Deck': `<h3>SPOTIFY DECK</h3>
          <iframe style="border-radius:12px; pointer-events:auto;" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
          
      'Garage': `<h3>FILESYSTEM</h3>
    <ul style="max-height: 250px; overflow-y: auto;">
          <li><span>📁 logs_2026/</span></li>
      <li><span>📁 dyno_runs/</span></li>
    <li class="map-file" data-map="base"><span>📄 map_v1_base.bin (CLICK TO LOAD)</span> <span style="color:#666">2.0 MB</span></li>
          <li class="map-file" data-map="pops"><span>📄 map_v2_pops.bin (CLICK TO LOAD)</span> <span style="color:#666">2.1 MB</span></li>
      <li><span>📄 suspension_track.txt</span> <span style="color:#666">4 KB</span></li>
          <li><span>📄 datalog_13-09-2026.csv</span> <span style="color:#666">14.5 MB</span></li>
    <li><span>📄 telemetry_history.bak</span> <span style="color:#666">56.2 MB</span></li>
        </ul>`
    }

        let zIndexCounter = 100;
    let apps = document.querySelectorAll('.app-icon')
      
    apps.forEach(app => {
          app.addEventListener('click', () => {
      let icon = app.querySelector('.icon-shape')
    icon.style.transform = "scale(0.9) skewX(10deg)"
            icon.style.borderColor = "#ff1a3d"
      icon.style.boxShadow = "0 0 30px #ff1a3d"
        
    setTimeout(() => {
              icon.style.transform = ""
      icon.style.borderColor = ""
    icon.style.boxShadow = ""
            }, 150)

      let appName = app.getAttribute('data-name');
    if(appName) openAppWindow(appName);
          })
    })

      function openAppWindow(name) {
    if(document.getElementById('win-' + name.replace(/\s/g, ''))) return;

          let win = document.createElement('div')
      win.className = 'app-window'
    win.id = 'win-' + name.replace(/\s/g, '')
          win.style.zIndex = ++zIndexCounter
      win.style.left = (Math.random() * 150 + 100) + 'px'
    win.style.top = (Math.random() * 100 + 80) + 'px'

        let header = document.createElement('div')
    header.className = 'window-header'
          header.innerHTML = `<span>${name}</span><button class="win-close">X</button>`

      let body = document.createElement('div')
    body.className = 'window-body'
          
        let bHTML = '';
      if(name === 'Engine Control') {
    bHTML = getSettingsHTML();
          } else {
        bHTML = appContentData[name] || '<p>LOADING...</p>';
      }
    body.innerHTML = bHTML;

    win.appendChild(header)
        win.appendChild(body)
      document.body.appendChild(win)

          let closeBtn = header.querySelector('.win-close')
    closeBtn.addEventListener('click', () => {
        win.remove()
      })

          let isDragging = false
    let startX, startY, initialX, initialY

      header.addEventListener('mousedown', (e) => {
            if(e.target === closeBtn) return;
    isDragging = true
        startX = e.clientX
            startY = e.clientY
      initialX = win.offsetLeft
    initialY = win.offsetTop
          win.style.zIndex = ++zIndexCounter
      document.body.classList.add('is-dragging')
    })

      window.addEventListener('mousemove', (e) => {
          if(!isDragging) return
    win.style.left = (initialX + e.clientX - startX) + 'px'
        win.style.top = (initialY + e.clientY - startY) + 'px'
      })

    window.addEventListener('mouseup', () => {
          isDragging = false
      document.body.classList.remove('is-dragging')
    })
      
          closeBtn.addEventListener('mouseenter', () => { cursorRing.classList.add('hovered') })
    closeBtn.addEventListener('mouseleave', () => { 
        cursorRing.classList.remove('hovered'); 
            cursorRing.style.width='36px'; cursorRing.style.height='36px'; cursorRing.style.borderColor='var(--neon-blue)';
      })
    }

    document.addEventListener('input', (e) => {
        if(e.target.id === 'setting-boost') {
            window.autoSettings.boost = e.target.value;
            let val = document.getElementById('boost-val');
            if(val) val.innerText = e.target.value;
            
            let topBarBoost = document.getElementById('topBarBoost');
            if(topBarBoost) topBarBoost.innerText = e.target.value;
        }
    });

    document.addEventListener('change', (e) => {
        if(e.target.id === 'setting-tcs') window.autoSettings.tcs = e.target.checked;
        if(e.target.id === 'setting-launch') window.autoSettings.launch = e.target.checked;
        if(e.target.id === 'setting-exhaust') window.autoSettings.exhaust = e.target.checked;
        if(e.target.id === 'setting-drift') window.autoSettings.drift = e.target.checked;
    });

    document.addEventListener('click', (e) => {
        let mapFile = e.target.closest('.map-file');
        if(mapFile) {
            let type = mapFile.dataset.map;
            if(type === 'base') {
                window.autoSettings = { boost: 14, tcs: true, launch: true, exhaust: false, drift: false };
            } else if (type === 'pops') {
                window.autoSettings = { boost: 22, tcs: false, launch: true, exhaust: true, drift: true };
            }
            
            let topBarBoost = document.getElementById('topBarBoost');
            if(topBarBoost) topBarBoost.innerText = window.autoSettings.boost;
            
            let settingsBody = document.querySelector('#win-EngineControl .window-body');
            if(settingsBody) {
                settingsBody.innerHTML = getSettingsHTML();
                let win = document.getElementById('win-EngineControl');
                win.style.boxShadow = "0 0 40px var(--neon-blue)";
                setTimeout(() => { win.style.boxShadow = "0 20px 50px rgba(0,0,0,0.9), inset 0 0 15px rgba(0,240,255,0.15)"; }, 400);
            }
            
            mapFile.style.color = "var(--neon-red)";
            setTimeout(() => { mapFile.style.color = ""; }, 300);
        }
        
        if(e.target.id === 'flash-ecu-btn') {
            e.target.innerText = "FLASHING...";
            e.target.style.background = "var(--neon-red)";
            e.target.style.color = "#000";
            setTimeout(() => {
                e.target.innerText = "FLASH ECU";
                e.target.style.background = "transparent";
                e.target.style.color = "var(--neon-red)";
            }, 1000);
        }
    });

        let cursorDot = document.getElementById('cursorDot')
      let cursorRing = document.getElementById('cursorRing')
    
    let mx = window.innerWidth / 2
          let my = window.innerHeight / 2
    let rx = mx
      let ry = my

        window.addEventListener('mousemove', function(e) {
    mx = e.clientX
          my = e.clientY
      cursorDot.style.left = mx + "px"
    cursorDot.style.top = my + "px"
        })

    function animCursor() {
          rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
    cursorRing.style.left = rx + "px"
          cursorRing.style.top = ry + "px"
      requestAnimationFrame(animCursor)
    }
        animCursor()

    window.addEventListener('mousedown', () => {
          cursorRing.style.width = '24px'
      cursorRing.style.height = '24px'
    cursorRing.style.borderColor = 'var(--neon-red)'
        })
    
      window.addEventListener('mouseup', () => {
    let isHover = cursorRing.classList.contains('hovered')
          cursorRing.style.width = isHover ? '50px' : '36px'
      cursorRing.style.height = isHover ? '50px' : '36px'
    cursorRing.style.borderColor = isHover ? 'var(--neon-red)' : 'var(--neon-blue)'
        })

    let btns = document.querySelectorAll('button, .app-icon, .map-file')
          btns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
    cursorRing.classList.add('hovered')
        })
          btn.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('hovered')
    cursorRing.style.width = '36px'
            cursorRing.style.height = '36px'
      cursorRing.style.borderColor = 'var(--neon-blue)'
    })
        })

      })