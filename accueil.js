
/* ========================================
   1. EN-TÊTE AU DÉFILEMENT
======================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ========================================
   2. APPARITION DES CATÉGORIES
======================================== */

const categories = document.querySelectorAll(".category-card");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(25px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 650,
                    easing: "ease-out",
                    fill: "forwards"
                }
            );

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


categories.forEach(function (category) {
    observer.observe(category);
});
