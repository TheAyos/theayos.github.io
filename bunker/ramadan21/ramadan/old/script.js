FPPS.setup();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: undefined, y: undefined, radius: undefined };

onWindowResize();

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
  FPPS.start();
  ctx.globalCompositeOperation = "source-over"; // reset to default
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particles.length; i++) particles[i].update();

  //FIXME: debug
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, mouse.radius, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.stroke();

  Particle.web(particles);

  /*let w = canvas.width;
  let h = canvas.height;

  ctx.beginPath();
  ctx.arc(w / 2, h / 2 - 10, 70, Math.PI * 2, 0, true);
  ctx.fillStyle = "rgb(190, 130, 20)";

  ctx.fill();

  ctx.beginPath();
  ctx.arc(w / 2, h / 2 - 10, 70, Math.PI * 2, 0, true);
  ctx.fillStyle = "rgb(190, 130, 20)";
  ctx.fill();

  ctx.globalCompositeOperation = "source-atop";

  ctx.beginPath();
  ctx.arc(w / 2 + 10, h / 2 - 20, 70, Math.PI * 2, 0, true);
  ctx.fillStyle = "rgb(244, 216, 116)";
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(w / 2 + 20, h / 2 - 30, 65, Math.PI * 2, 0, true);
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fill();*/

  FPPS.end();
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
    e.preventDefault();
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
