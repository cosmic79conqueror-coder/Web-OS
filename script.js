document.addEventListener('DOMContentLoaded', () => {
  const needle = document.getElementById('needle');
  const progressBar = document.getElementById('progressBar');
  const bootStatus = document.getElementById('bootStatus');
  const bootScreen = document.getElementById('bootScreen');
  const mainHero = document.getElementById('mainHero');
  const typeWriterElement = document.getElementById('typeWriter');
  
  const bootPhases = [
    "ECU MAPPING...",
    "SPOOLING TWIN TURBOS...",
    "INJECTORS AT 100%...",
    "LAUNCH CONTROL ACTIVE."
  ];
  
  let progress = 0;
  let phaseIndex = 0;
  
  // RPM Revving & Boot Sequence
  const bootInterval = setInterval(() => {
    progress += Math.random() * 8;
    
    // Needle bounce logic
    let revBase = (progress / 100) * 180;
    let revSpike = Math.random() > 0.5 ? (Math.random() * 50) : (Math.random() * -15);
    let finalRev = Math.min(180, revBase + revSpike);
    
    needle.style.transform = `rotate(${Math.max(0, finalRev)}deg)`;

    if (progress >= 100) {
      progress = 100;
      clearInterval(bootInterval);
      
      // Pin the needle at redline before load
      needle.style.transform = `rotate(185deg)`; 
      needle.style.boxShadow = `0 0 40px #ff1a3d, 0 0 15px #fff`;
      
      setTimeout(revealDesktop, 800);
    }
    
    progressBar.style.width = `${progress}%`;
    
    // Switch status text
    const expectedPhase = Math.floor((progress / 100) * bootPhases.length);
    if (expectedPhase > phaseIndex && expectedPhase < bootPhases.length) {
      phaseIndex = expectedPhase;
      bootStatus.innerText = bootPhases[phaseIndex];
    }
    
  }, 150);

  function revealDesktop() {
    bootScreen.style.opacity = '0';
    
    setTimeout(() => {
      bootScreen.style.display = 'none';
      mainHero.classList.remove('hidden');
      typeWriterEffect("WITHOUT ANY FURTHER TURBOLAG");
    }, 800);
  }

  function typeWriterEffect(text) {
    let i = 0;
    typeWriterElement.innerHTML = "";
    
    const typing = setInterval(() => {
      if (i < text.length) {
        typeWriterElement.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 70); 
  }
});