const canvas = document.getElementById("fancy-audio");
const ctx = canvas.getContext("2d");

var meter = new FPSMeter(); // DEBUG // DEBUG // DEBUG // DEBUG // DEBUG

const audioElement = document.getElementById("source");
audioElement.crossOrigin = "anonymous";
let context = new(AudioContext || webkitAudioContext)(); //audio context to create useful audio nodes
let analyser = context.createAnalyser(); //analyser node to get frequency data
analyser.fftSize = 2048;

let source = context.createMediaElementSource(audioElement); //source node

var gainNode = context.createGain()
gainNode.gain.value = 0.1 // 10 %

//source.connect(gainNode);

//gainNode.connect(analyser)

source.connect(context.destination); //this connects the music back to the default output

let data = new Uint8Array(analyser.frequencyBinCount);

function draw() {
    meter.tickStart(); // DEBUG // DEBUG // DEBUG // DEBUG // DEBUG
    analyser.getByteFrequencyData(data);

    visualize(data);
    meter.tick(); // DEBUG // DEBUG // DEBUG // DEBUG // DEBUG
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);


function visualize(data) {
    //data = [...data]; //convert to proper array
    let bars = canvas.width / 15;
    let space = canvas.width / bars; // //space between each bar
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight / 1.5;
    // Draw Background
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(144,238,253)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    for (var i = 0; i < bars; i++) {
        value = data[i] * 1;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(144,238,253, .8)";
        ctx.fillStyle = "transparent";
        ctx.beginPath();
        ctx.moveTo(space * i + 3, canvas.height / 2 - value / 2);
        ctx.lineTo(space * i + 3, canvas.height / 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(144,238,253, .4)";
        ctx.beginPath();
        ctx.moveTo(space * i + 3, canvas.height / 2);
        ctx.lineTo(space * i + 3, canvas.height / 2 + value / 2);
        ctx.stroke();
    }

    for (var i = 0; i < bars; i++) {
        value = data[i] * 1; // + 5 spicy ;)
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgb(144,238,253)";
        ctx.beginPath();

        ctx.moveTo(space * i + 3, canvas.height / 2 - value / 2);

        //ctx.lineTo(space * i + space / 3, canvas.height / 2);
        //ctx.lineTo(space * i + 2 * space / 3, canvas.height / 2);

        let diff = data[i + 1] - value;
        /*if ((diff) < 0) diff = -diff;
        if (diff < 90) {
            ctx.lineTo(space * (i + 2) + 3, canvas.height / 2 - (data[i + 2] * .5 / 2));
        } else {
            ctx.lineTo(space * (i + 1) + 3, canvas.height / 2 - (data[i + 1] * .5 / 2));
        }*/
        ctx.lineTo(space * (i + 1) + 3, canvas.height / 2 - (data[i + 1] * 1 / 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(space * i + 3, canvas.height / 2 + value / 2);

        ctx.strokeStyle = "rgba(144,238,253, .4)";
        ctx.lineTo(space * (i + 1) + 3, canvas.height / 2 + (data[i + 1] * 1 / 2));
        ctx.stroke();
    }
}


//to play when user interacts with page
audioElement.onplay = () => {
    context.resume();
}