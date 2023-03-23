let track = document.getElementById("scrollbar-thumb");
let height = document.body.scrollHeight - window.innerHeight;


window.onscroll = function () {
    let thumbHeight = window.pageYOffset / height * 100;
    track.style.height = thumbHeight + "%";
}