var p_el = document.getElementById("player");
p_el.onclick = function () {
  if (!anim_checkbox.checked) {
    if (p_el.classList.contains("player__violet")) {
      p_el.classList = "player";
    } else {
      if (
        !p_el.classList.contains("player__lightgreen") &&
        !p_el.classList.contains("player__violet")
      ) {
        p_el.classList.add("player__lightgreen");
      } else {
        p_el.classList.replace("player__lightgreen", "player__violet");
      }
    }
  }
};

var hide = (to_hide) => {
  to_hide.style.visibility = "hidden";
  to_hide.style.position = "absolute";
};
var show = (to_show) => {
  to_show.style.visibility = "visible";
  to_show.style.position = "relative";
};

var anim_checkbox = document.getElementById("anim_checkbox");
var lightgreen = document.querySelector(".player.player__lightgreen");
var violet = document.querySelector(".player.player__violet");

hide(lightgreen);
hide(violet);

anim_checkbox.onchange = function () {
  if (anim_checkbox.checked) {
    p_el.classList = "player";
    show(lightgreen);
    show(violet);
    var anim = "thatbackfliptho 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite";
    p_el.style.animation = anim + " 1s";
    lightgreen.style.animation = anim + " 2s";
    violet.style.animation = anim + " 3s";

    p_el.children.item(2).style.animationTimingFunction = "cubic-bezier(.68,-0.55,.27,1.55)"; //dance
  } else {
    hide(lightgreen);
    hide(violet);
    p_el.style.animation = "squiggly-anim 0.9s ease-in-out infinite";
    p_el.children.item(2).style.animationTimingFunction = ""; //lets css one
  }
};