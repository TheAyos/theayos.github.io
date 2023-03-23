class Particle {
  constructor(x, y, vX, vY, size, color) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.size = size;
    this.color = color;

    this.t = Math.random();
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
    //if (this.x > canvas.width || this.x < 0) this.vX = -this.vX;
    //if (this.y > canvas.height || this.y < 0) this.vY = -this.vY;

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

    //this.x += this.vX;
    //this.y += this.vY;

    if (this.x < 0) this.x = innerWidth;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = innerHeight;
    if (this.y > canvas.height) this.y = 0;

    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
      return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };

    let pX = perlin.get(this.vX, this.t);
    let pY = perlin.get(this.vY, this.t);
    this.x += pX * 5;
    this.y += pY * 5;
    this.t += 0.001;

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
