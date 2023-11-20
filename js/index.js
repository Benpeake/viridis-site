// accordion logic
const accordionItems = document.querySelectorAll('.accordion-section');

accordionItems.forEach(item => {
    const expandIcon = item.querySelector('.expand-icon');
    const accordContent = item.querySelector('.accordion-content');

    expandIcon.addEventListener('click', function () {
        accordContent.classList.toggle('active');
        const newSrc = accordContent.classList.contains('active')
            ? 'images/remove_icon.svg'
            : 'images/expand_icon.svg';
        expandIcon.src = newSrc;
    });
});

//image fade in effect
const fadeObjects = document.querySelectorAll(".portfolio-img");

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


function checkSlide() {
    fadeObjects.forEach((image) => {
        const slideInAt = window.scrollY + window.innerHeight;
        const imageTop = image.offsetTop; // Use the exact offset top of the image
        const isTopShown = slideInAt > imageTop;
        const isNotScrolledPast = window.scrollY < imageTop;

        const hasFadedIn = image.classList.contains("fade-in");

        if (isTopShown && isNotScrolledPast && !hasFadedIn) {
            image.style.opacity = 0.85;
            image.classList.add("fade-in");
        }
    });
}


document.addEventListener("scroll", debounce(checkSlide));
