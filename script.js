document.addEventListener('DOMContentLoaded', () => {
const needle = document.getElementById('needle');
const progressBar = document.getElementById('progressBar');
const bootStatus = document.getElementById('bootStatus');
const bootScreen = document.getElementById('bootScreen');
const ignitionScreen = document.getElementById('ignitionScreen');
const typeWriterElement = document.getElementById('typeWriter');
const startEngineBtn = document.getElementById('startEngineBtn');
const desktopScreen = document.getElementById('desktopScreen');
const bootPhases = [
"ECU MAPPINGGGGG...",
"SPOOLING TWIN TURBOSSSSS...",
"INJECTORS AT 100%%%%...",
"LAUNCH CONTROL ACTIVEEEE."
];
let progress = 0;
let phaseIndex = 0;
const bootInterval = setInterval(() => {
progress += Math.random() * 8;
let revBase = (progress / 100) * 180;
let revSpike = Math.random() > 0.5 ? (Math.random() * 50) : (Math.random() * -15);
let finalRev = Math.min(180, revBase + revSpike);
needle.style.transform = `rotate(${Math.max(0, finalRev)}deg)`;
if (progress >= 100) {
progress = 100;
clearInterval(bootInterval);
needle.style.transform = `rotate(185deg)`; 
needle.style.boxShadow = `0 0 40px #ff1a3d, 0 0 15px #fff`;
setTimeout(revealIgnitionScreen, 800);
}
progressBar.style.width = `${progress}%`;
const expectedPhase = Math.floor((progress / 100) * bootPhases.length);
if (expectedPhase > phaseIndex && expectedPhase < bootPhases.length) {
phaseIndex = expectedPhase;
bootStatus.innerText = bootPhases[phaseIndex];
}
}, 150);
function revealIgnitionScreen() {
bootScreen.style.opacity = '0';
setTimeout(() => {
bootScreen.style.display = 'none';
ignitionScreen.classList.remove('hidden');
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
startEngineBtn.addEventListener('click', () => {
ignitionScreen.style.opacity = '0';
ignitionScreen.style.transform = 'scale(1.1)'; // Zoom out effect
setTimeout(() => {
ignitionScreen.style.display = 'none';
desktopScreen.classList.remove('hidden');
}, 800);
});
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const ampmElement = document.getElementById('ampm');
const dateElement = document.getElementById('dateDisplay');
const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function updateClock() {
const now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();
let ampm = h >= 12 ? 'PM' : 'AM';
h = h % 12;
h = h ? h : 12; 
h = h < 10 ? '0' + h : h;
m = m < 10 ? '0' + m : m;
s = s < 10 ? '0' + s : s;
hoursElement.textContent = h;
minutesElement.textContent = m;
secondsElement.textContent = s;
ampmElement.textContent = ampm;
const dayName = days[now.getDay()];
const monthName = months[now.getMonth()];
const dateNum = now.getDate();
dateElement.textContent = `${dayName}, ${monthName} ${dateNum}`;
}
updateClock();
setInterval(updateClock, 1000);
const apps = document.querySelectorAll('.app-icon');
apps.forEach(app => {
app.addEventListener('click', () => {
const icon = app.querySelector('.icon-shape');
icon.style.transform = "scale(0.9) skewX(10deg)";
icon.style.borderColor = "#ff1a3d";
icon.style.boxShadow = "0 0 30px #ff1a3d";
setTimeout(() => {
icon.style.transform = "";
icon.style.borderColor = "";
icon.style.boxShadow = "";
}, 150);
});
});
});