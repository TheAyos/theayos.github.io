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

/* Owl Carousel 2 All Settings. See the bottom for how to use equal heights with matchHeight  plugin */

jQuery(document).ready(function ($) {
    var owl = $(".brand-carousel");

    owl.owlCarousel({
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        items: 3,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
        lazyLoad: true,
        responsiveRefreshRate: 200,
        responsiveBaseElement: window,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
        autoHeight: false,
    });

    $(".next").click(function () {
        owl.trigger("owl.next");
    });
    $(".prev").click(function () {
        owl.trigger("owl.prev");
    });

    /* Equal Heights using javascript */
    // $('.latest-blog-posts .thumbnail.item').matchHeight();
});
