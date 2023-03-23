class Particle {
  constructor(x, y, vX, vY, size, color) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
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
          ctx.strokeStyle = "rgba(220, 220, 220," + opacity + ")";
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
