/**
    single line if-else statement
    (condition) ? (true block) : (else block)
*/

function quote() {

    fetch('./quotes.json')
        .then(response => response.json())
        .then(function (json) {
            json = json[Math.floor(Math.random() * json.length)];
            document.getElementById('quote').innerHTML = json.text
            json.author === null ? document.getElementById('tooltiptext').innerHTML = '*Unknown*' :
                document.getElementById('tooltiptext').innerHTML = json.author;

        });

    /*fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("quote").innerHTML = data[Math.floor(Math.random() * data.length)].text;
        });*/
}
quote();

var tooltipSpan = document.getElementById('tooltiptext');

window.onmousemove = function (e) {
    var tooltip_rect = tooltipSpan.getBoundingClientRect();
    var x = e.clientX,
        y = e.clientY;
    var tipX = (x + 20),
        tipY = (y / 2.5 + 10);
    tooltipSpan.style.top = tipY + 'px';
    tooltipSpan.style.left = tipX + 'px';
    /*if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) {
        tipX = window.innerWidth - tooltip_rect.width - 5; // right: ; alike

    } // if out on the right
    if (tooltip_rect.y < 0) // if out on the top of page
        tipY = tipY - tooltip_rect.y; // align on the top
    tooltipSpan.style.top = tipY + 'px';
    tooltipSpan.style.left = tipX + 'px';*/
};

//** || Clock Function || */
function botime() {
    var d = new Date();
    document.getElementById("clock").innerHTML = [
        ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours()),
        ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes())
    ].join(':');
    document.getElementById("secs").innerHTML = ":" +
        ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds());

    //gotime();
    //an anonymous self-calling function ? :o :D
    (function () {
        setTimeout('botime()', 1000);
    })();
}

botime();
//** || End Clock Function || */

//** || Bg Function || */
document.getElementById("set-grad-1").onclick = grad1;
document.getElementById("set-grad-2").onclick = grad2;
document.getElementById("set-grad-3").onclick = grad3;
document.getElementById("set-grad-4").onclick = grad4;

function grad1() {
    document.body.className = "grad-1-bg";
    localStorage.setItem("theme", 'grad-1-bg');
}

function grad2() {
    document.body.className = "grad-2-bg";
    localStorage.setItem("theme", 'grad-2-bg');
}

function grad3() {
    document.body.className = "grad-3-bg";
    localStorage.setItem("theme", 'grad-3-bg');
}

function grad4() {
    document.body.className = "grad-4-bg";
    localStorage.setItem("theme", 'grad-4-bg');
}
//** || End Bg Function || */

//** || Saving Function || */
document.body.onload = () => {
    var theme = localStorage.getItem("theme") || (localStorage.setItem("theme", 'grad-1-bg'), 'grad-1-bg');
    if (theme != 'grad-1-bg' && theme != 'grad-2-bg' && theme != 'grad-3-bg' && theme != 'grad-4-bg') {
        theme = 'grad-1-bg';
        localStorage.setItem("theme", theme);
    }
    document.body.className = theme;
};
//** || End Saving Function || */


//** || Options Function || */
document.getElementById("options-button").onclick = expand
var optionned = 0;

function expand() {
    if (!optionned) {
        document.getElementById("options-button").style.background = 'none';
        document.getElementById("options-card").style.transform = 'scale(1)';
        optionned = 1;
    } else {
        document.getElementById("options-button").style.background = 'var(--transparent-bg)';
        document.getElementById("options-card").style.transform = 'scale(0)';
        optionned = 0;
    }
}
//** || End Options Function || */


//** || Emojis Function || */
function randomoji() {
    const emojis = ["🎨", "💖", "💥", "☄️", "🧵", "🍧", "🎨"];
    const generateRandomNumber = (min, max) => { // max not included
        return Math.floor(Math.random() * (max - min) + min);
    };
    const theChosenOne = emojis[generateRandomNumber(0, 7)];
    document.getElementById("options-button").innerHTML = theChosenOne;
}
randomoji();
//** || End Emojis Function || */