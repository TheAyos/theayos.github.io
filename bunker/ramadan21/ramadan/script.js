let debug = false;

if (Math.floor(Math.random() * 2)) {
  document.getElementsByClassName("fr-2")[0].textContent = "Moubarak";
  document.getElementsByClassName("fr-2-s")[0].textContent = "Moubarak";
  document.getElementsByClassName("ar-2")[0].textContent = "مبارك";
  document.getElementsByClassName("ar-2-s")[0].textContent = "مبارك";
}

if (debug) FPPS.setup();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: undefined, y: undefined, radius: undefined };

onWindowResize();

//FIXME: hotfix 20:27, tue 13 apr

let today = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
  weekday: "long",
}).format(Date.now());

const hijri = document.getElementsByClassName("hijri")[0];
hijri.textContent = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
}).format(Date.now());

// just tinkered
const hijri1 = document.getElementsByClassName("hijri+1")[0];
let a = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
})
  .format(Date.now() - 86400000)
  .split("،")
  .pop();
hijri1.textContent = [today, a].join("،");

function setup() {
  particles = [];
  let nP = (canvas.height * canvas.width) / 10000;
  for (let i = 0; i < nP; i++) {
    let size = Math.random() * 7 + 1; // random between 1 & 7
    let x = Math.random() * (innerWidth - size * 4) + size * 2;
    let y = Math.random() * (innerHeight - size * 4) + size * 2;
    let vX = Math.random() * 5 - 2.5; // random between +-2.5
    let vY = Math.random() * 5 - 2.5; // random between +-2.5
    let color = "#0cfa32";

    let type = Math.floor(Math.random() * 7) + 1;
    particles.push(new Particle(x, y, vX, vY, size, color, type));
  }
}

function loop() {
  if (debug) FPPS.start();
  ctx.globalCompositeOperation = "source-over"; // reset to default
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particles.length; i++) particles[i].update();

  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, mouse.radius, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.stroke();

  Particle.web(particles);

  if (debug) FPPS.end();
  requestAnimationFrame(loop);
}

// setup(); called in resize();
loop();

/** ***Utility*** */
window.addEventListener("resize", onWindowResize, false);

document.addEventListener("touchstart", touchHandler, { passive: false });
document.addEventListener("touchmove", touchHandler, { passive: false });
function touchHandler(e) {
  if (e.touches) {
    mouse.x = e.touches[0].pageX - canvas.offsetLeft;
    mouse.y = e.touches[0].pageY - canvas.offsetTop;
    if (e.type != "touchstart") e.preventDefault(); //to let buttons work
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = Math.min((canvas.height / 80) * (canvas.width / 80), 100);
  setup();
}

var styles = `
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
