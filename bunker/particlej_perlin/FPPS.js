class FPPS {
  constructor() {}

  static setup() {
    this.startT = 0;
    this.endT = 0;
    this.infoDiv = null;
    this.isConsole = false;
    this.justDoIt = 1;

    document.body.appendChild(document.createElement("canvas"));
    this.infoDiv = document.createElement("div");
    this.infoDiv.id = "fps";
    this.infoDiv.style = `
      width: auto; height: auto; padding: .5vmax;
      position: fixed; top: 16px; left: 16px; color: white; background: #1e1e1eaa;
      font-family: sans-serif; font-size: calc(.3vmax + .7rem);
      `;
    document.body.appendChild(this.infoDiv);
  }

  static start() {
    this.startT = Date.now();
  }

  static end() {
    if (this.justDoIt === 1) {
      this.endT = Date.now();
      this.infoDiv.textContent =
        "Fps: " + (1000 / (this.endT - this.startT)).toFixed(0) + " - " + (this.endT - this.startT) + " ms";
      if (this.isConsole) {
        console.log(
          "Rendered in " +
            (this.endT - this.startT) +
            " ms" +
            " - " +
            (1000 / (this.endT - this.startT)).toFixed(1) +
            " fps",
        );
      }
      this.justDoIt = -this.justDoIt;
      // compute FPS every 2 frames
    } else this.justDoIt = -this.justDoIt;
  }

  static setConsole(bool) {
    this.isConsole = bool;
  }
}
