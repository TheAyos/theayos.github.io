function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  var rot = (Math.PI / 2) * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;

  ctx.strokeSyle = "#000";
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.lineWidth = 1;
  
  var grad = ctx.createLinearGradient(cx - outerRadius, cy - outerRadius, cx + outerRadius, cy + outerRadius);
  grad.addColorStop(0, "rgb(244, 216, 116)");
  grad.addColorStop(.5, "rgb(230, 200, 1)");
  grad.addColorStop(1, "rgb(190, 130, 20)");
  ctx.fillStyle = grad;
  ctx.strokeStyle = grad;

  /*ctx.strokeStyle = "rgb(180,125,16, .5)";
  //ctx.strokeStyle = "rgb(244,216,116, 0.5)";
  //ctx.fillStyle = "rgb(244,216,116)";
  ctx.fillStyle = "rgb(240,210,110)";*/
  
  ctx.stroke();
  ctx.fill();

}

class Particle {
  constructor(x, y, vX, vY, size, color, type) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.size = size;
    this.color = color;
    this.type = type;
  }

  draw() {
    //drawStar(this.x, this.y, 5, this.size, this.size / 2);
    if (this.type === 1) drawStar(this.x, this.y, 6, this.size / 3, this.size);
    else drawStar(this.x, this.y, 5, this.size, this.size / 2);
  }

  update() {
    // check if inside bounds
    if (this.x > canvas.width || this.x < 0) this.vX = -this.vX;
    if (this.y > canvas.height || this.y < 0) this.vY = -this.vY;

    // circle collision detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy); // pythagore wola !

    // il y a attouchement là
    if (distance < mouse.radius + this.size) {
      /* if mouse is on the left of the particle, and it's not too close to the edge, push to the right*/
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
      if (mouse.x > this.x && this.x > this.size) this.x -= 10;
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
      if (mouse.y > this.y && this.y > this.size) this.y -= 10;
    }
    this.x += this.vX;
    this.y += this.vY;
    this.draw();
  }

  static web(particles) {
    let opacity = 1;
    let webDist = (canvas.width / 8) * (canvas.height / 8);

    // every particle will check if it's close enough to every other particle to draw a line between them
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        let fParticle = particles[i];
        let sParticle = particles[j];
        let dist =
          (fParticle.x - sParticle.x) * (fParticle.x - sParticle.x) +
          (fParticle.y - sParticle.y) * (fParticle.y - sParticle.y);
        if (dist < webDist) {
          opacity = 1 - dist / webDist;
          var grad = ctx.createLinearGradient(fParticle.x, fParticle.y, sParticle.x, sParticle.y);
          grad.addColorStop(0, "rgb(244,216,116," + opacity + ")");
          grad.addColorStop(1, "rgb(190, 130, 20," + opacity + ")");
          ctx.strokeStyle = grad;
          //ctx.strokeStyle = "rgba(244,216,116," + opacity + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fParticle.x, fParticle.y);
          ctx.lineTo(sParticle.x, sParticle.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }
}
