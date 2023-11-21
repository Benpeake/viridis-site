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
        const imageTop = image.offsetTop; 
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

//handle about section nav

const aboutCopy = document.querySelector('.about-copy')
const aboutCopyP2 = document.querySelector('.about-copy-p2')
const aboutImg = document.querySelector('.about-img')
const jemmaLink = document.querySelector('.jemma-nav-link')
const teamLink = document.querySelector('.team-nav-link')

jemmaLink.addEventListener('click', function(){
    aboutCopy.textContent = ' Jemma has 10+ years in garden design and landscaping, during which time she has worked on a number of beautiful and prestigious sites including multiple gardens for the Duchy of Cornwall. Jemma loves being on site come rain or shine but also has a huge passion for the design process behind the scenes, and her passion for creativity and functionality has enabled  her to develop and craft her own original style that balances practicality and beauty.'
    aboutCopyP2.textContent = ''
    aboutImg.src = 'images/viridis_jemma.jpg'
    aboutImg.alt = 'jemma in garden'
    jemmaLink.classList.add('active-section-link')
    teamLink.classList.remove('active-section-link')
})

teamLink.addEventListener('click', function(){
    aboutCopy.textContent = 'Our fully-equipped diverse team consists of some of the most reliable and hardworking professionals in the field. We prioritise respecting our clients and their living space and always strive to deliver beautiful results that exceed expectation.'
    aboutCopyP2.textContent = 'Our resources are derived from our hand-picked repertoire of high-quality contacts, developed through years of experience in the field. These include local nurseries for stunning assortments of plants, reliable skip provision to take care of rubble and garden waste, and further afield contacts for more unusual varieties of stone or other materials needed for building work.'
    aboutImg.src = 'images/viridis_team.jpg'
    aboutImg.alt = 'multiple gardeners gloves'
    jemmaLink.classList.remove('active-section-link')
    teamLink.classList.add('active-section-link')
})

