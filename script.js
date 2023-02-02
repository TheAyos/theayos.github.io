function navFx() {
    const x = document.querySelector(".nav__container");
    if (x.className === "nav__container") x.className += " responsive";
    else x.className = "nav__container";
}

// *** Scrollbar ***
const track = document.getElementById("scrollbar-thumb");
let height = document.body.scrollHeight - window.innerHeight;
setInterval(() => {
    let thumbHeight = (window.pageYOffset / height) * 100;
    track.style.height = thumbHeight + "%";
}, 35);

// *** Carousel ***
const buttons = document.querySelectorAll("[data-carousel-button]");
buttons.forEach((b) => {
    b.addEventListener("click", () => {
        const offset = b.dataset.carouselButton === "next" ? 1 : -1;
        const slides = b.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        newIndex = newIndex < 0 ? slides.children.length - 1 : newIndex >= slides.children.length ? 0 : newIndex;
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

$(".brand-carousel").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
});
