//handle mobile menu
const mobileIcon = document.querySelector(".mobile-icon");
const mobileMenuModal = document.querySelector(".mobile-menu-modal");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-item");
const tlMobMen = gsap.timeline({ paused: true });
const tlModelApear = gsap.timeline({ paused: true });

mobileIcon.addEventListener("click", () => {
  if (!mobileMenuModal.classList.contains("appear")) {
    mobileMenuModal.classList.add("appear");
    tlMobMen.play();
    tlModelApear.play();
  } else {
    tlModelApear.reverse();
    tlMobMen.reverse();
    setTimeout(() => {
      mobileMenuModal.classList.remove("appear");
    }, 500);
  }
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileMenuModal.classList.contains("appear")) {
      mobileMenuModal.classList.add("appear");
    } else {
      tlMobMen.reverse();
      tlModelApear.reverse();
      setTimeout(() => {
        mobileMenuModal.classList.remove("appear");
      }, 500);
    }
  });
});

const topL = document.getElementById("top");
const midL = document.getElementById("mid");
const botL = document.getElementById("bot");

tlMobMen.to(
  midL,
  {
    opacity: 0,
    duration: 0.3,
    ease: "sine.in",
  },
  0
);

tlMobMen.to(
  [botL],
  {
    y: -25,
    duration: 0.3,
    ease: "sine.in",
  },
  "-=0.3"
);
tlMobMen.to(
  [topL],
  {
    y: 25,
    duration: 0.3,
    ease: "sine.in",
  },
  "-=0.3"
);

tlMobMen.to(topL, {
  rotation: 45,
  transformOrigin: "50% 50%",
  duration: 0.3,
  ease: "power.in(4)",
});

tlMobMen.to(
  botL,
  {
    rotation: -45,
    transformOrigin: "50% 50%",
    duration: 0.3,
    ease: "power.in(4)",
  },
  "-=0.3"
);

tlModelApear.fromTo(
  mobileMenuModal,
  {
    y: "-100%",
  },
  {
    y: "0%",
    duration: 0.5,
    ease: "power.out(3)",
  }
);

//slideshow
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const slideShowImages = [
  "images/viridis-slide-1.jpg",
  "images/viridis-slide-2.jpg",
  "images/viridis-slide-3.jpg",
  "images/viridis-slide-4.jpg",
  "images/viridis-slide-5.jpg",
];
const mobileSlideShowImages = [
  "images/viridis-slide-1-mobile.jpg",
  "images/viridis-slide-2-mobile.jpg",
  "images/viridis-slide-3-mobile.jpg",
  "images/viridis-slide-4-mobile.jpg",
  "images/viridis-slide-5-mobile.jpg",
];

let currentImageIndex = 0;
const slideImage = document.querySelector(".slide-image");

function showImage(index, imagesArray) {
  slideImage.src = imagesArray[index];
}

function updateSlideShow() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 800) {
    showImage(currentImageIndex, mobileSlideShowImages);
  } else {
    showImage(currentImageIndex, slideShowImages);
  }
}

leftBtn.addEventListener("click", function () {
  currentImageIndex = (currentImageIndex - 1 + slideShowImages.length) % slideShowImages.length;
  updateSlideShow();
});

rightBtn.addEventListener("click", function () {
  currentImageIndex = (currentImageIndex + 1) % slideShowImages.length;
  updateSlideShow();
});

// Initial update based on screen width
updateSlideShow();

// Update on window resize
window.addEventListener("resize", updateSlideShow);

// Accordion logic
const accordionItems = document.querySelectorAll(".accordion-section");
let openSection = null;

accordionItems.forEach((item) => {
  const expandIcon = item.querySelector(".accord-icon");
  const accordContent = item.querySelector(".accordion-content");
  let tlAccordIcon = gsap.timeline({ paused: true });

  tlAccordIcon.to(expandIcon, {
    rotation: 180,
    transformOrigin: "50% 50%",
    duration: 0.3,
    ease: "power.in(3)",
  });

  expandIcon.addEventListener("click", function () {
    // Close the previously open section
    if (openSection && openSection !== accordContent) {
      const prevExpandIcon = openSection.parentElement.querySelector(
        ".accord-icon"
      );
      openSection.classList.remove("active");
      const prevTlAccordIcon = prevExpandIcon.timeline;
      prevTlAccordIcon.reverse();
    }

    // Toggle the current section
    accordContent.classList.toggle("active");

    // Fade in the accord-img if the section is now active
    if (accordContent.classList.contains("active")) {
      gsap.from(accordContent, {
        delay: 0.2,
        opacity: 0,
        duration: 0.4,
        ease: "sine.in",
      });
      tlAccordIcon.play();
    } else {
      tlAccordIcon.reverse();
    }

    const newSrc = accordContent.classList.contains("active")
    expandIcon.src = newSrc;

    // Update the open section
    openSection = accordContent.classList.contains("active")
      ? accordContent
      : null;
  });

  // Store the timeline in the expandIcon for later access
  expandIcon.timeline = tlAccordIcon;
});

//cost calculator logic
function quoteCalc(length, width) {
    roundedNum = Math.floor(length * width * 200);
    return roundedNum.toLocaleString();
  }
  
  document.getElementById("quoteForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let quoteResult = document.getElementById("quote-result");
    let length = document.getElementById("length").value;
    let width = document.getElementById("width").value;
    let estimate = "£" + quoteCalc(length, width);
  
    gsap.killTweensOf(quoteResult);
  
    quoteResult.textContent = ""; // Clear previous content
    estimate.split("").forEach((char) => {
      let span = document.createElement("span");
      span.textContent = char;
      quoteResult.appendChild(span);
    });
  
    // GSAP animation on each character
    gsap.from(quoteResult.childNodes, {
      delay: 0.2,
      opacity: 0,
      duration: 0.6,
      ease: "sine.in",
      stagger: { amount: 0.1 }
    });
  });


// logo animation
window.addEventListener("DOMContentLoaded", () => {
  function logoAnimation() {
    const tl = gsap.timeline();

    tl.from(".logo-letter", {
      delay: 0.2,
      opacity: 0,
      duration: 0.4,
      ease: "sine.in",
      stagger: { amount: 0.4 },
    });

    tl.from(
      "#leafs-top",
      {
        delay: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "sine.in",
      },
      0
    );
    tl.from(
      "#leafs-top",
      {
        delay: 1,
        y: 500,
        duration: 0.5,
        ease: "back.out(3)",
      },
      0
    );
    tl.from(
      "#leafs-bottom",
      {
        delay: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "sine.in",
      },
      0
    );
    tl.from(
      "#leafs-bottom",
      {
        delay: 0.8,
        y: 1000,
        duration: 0.5,
        ease: "back.out(4)",
      },
      0
    );
  }

  logoAnimation();
});

gsap.utils.toArray('.text-appear').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "sine.in",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });
  });

//handle about section nav
const aboutCopy = document.querySelector(".about-copy");
const aboutCopyP2 = document.querySelector(".about-copy-p2");
const aboutImg = document.querySelector(".about-img");
const jemmaLink = document.querySelector(".jemma-nav-link");
const teamLink = document.querySelector(".team-nav-link");

jemmaLink.addEventListener("click", function () {
  // Toggle active link instantly
  jemmaLink.classList.add("active-section-link");
  teamLink.classList.remove("active-section-link");

  // Fade out existing content
  gsap.to([aboutCopy, aboutCopyP2, aboutImg], { opacity: 0, duration: 0.2, ease: "sine.out", onComplete: updateContentJemma });
});

teamLink.addEventListener("click", function () {
  // Toggle active link instantly
  jemmaLink.classList.remove("active-section-link");
  teamLink.classList.add("active-section-link");

  // Fade out existing content
  gsap.to([aboutCopy, aboutCopyP2, aboutImg], { opacity: 0, duration: 0.2, ease: "sine.out", onComplete: updateContentTeam });
});

function updateContentJemma() {
  // Clear existing content
  aboutCopy.textContent = '';

  // Create and append new elements
  const paragraphs = [
    "Jemma Smallman \u00A0 | \u00A0 Director",
    "Jemma has over 10 years of experience in horticulture. During this time, she has worked on beautiful and prestigious sites in and around Bath. This includes multiple gardens for the Duchy of Cornwall, listed city centre properties, and large estate gardens.",
    "After training as a skilled gardener and designer in her previous role, working alongside another highly decorated garden designer, Jemma wanted to expand on her passion for the build side of projects. In 2020, she formed Viridis Landscapes.",
    "Jemma loves being on site come rain or shine, but she also has a huge passion for the design process behind the scenes. Her enthusiasm for creativity and functionality has enabled her to develop and craft her own original style that balances practicality and beauty."
  ];

  paragraphs.forEach((paragraphText, index) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(paragraphText));

    // Add line break except for the last paragraph
    if (index < paragraphs.length - 1) {
      paragraph.appendChild(document.createElement('br'));
      paragraph.appendChild(document.createElement('br'));
    }

    aboutCopy.appendChild(paragraph);
  });

  // Update image source and alt
  aboutImg.src = "images/jemma.jpg";
  aboutImg.alt = "jemma in garden";

  // Fade in new content
  gsap.to([aboutCopy, aboutImg], { opacity: 1, duration: 0.2, ease: "sine.in" });
}


function updateContentTeam() {

    aboutCopy.textContent = '';

    const paragraphs = [
      "Team Viridis",
      "Our fully equipped diverse team consists of some of the most reliable and hardworking professionals in the field. We prioritise respecting our clients and their living space and always strive to deliver beautiful results that exceed expectation.",
      "Our resources are derived from our hand-picked repertoire of high-quality contacts, developed through years of experience in the field. These include local nurseries for stunning assortments of plants, reliable skip provision to take care of rubble and garden waste, and further afield contacts for more unusual varieties of stone or other materials needed for building work.",
    ];
  
    paragraphs.forEach((paragraphText, index) => {
      const paragraph = document.createElement('p');
      paragraph.appendChild(document.createTextNode(paragraphText));
  
      // Add line break except for the last paragraph
      if (index < paragraphs.length - 1) {
        paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(document.createElement('br'));
      }
  
      aboutCopy.appendChild(paragraph);
    });
  
    aboutImg.src = "images/team.jpg";
    aboutImg.alt = "multiple gardeners gloves";
  
    // Fade in new content
    gsap.to([aboutCopy, aboutImg], { opacity: 1, duration: 0.2, ease: "sine.in" });
  }
  
  // Scroll link logic
const scrollLinks = document.querySelectorAll(".scroll-link");

function smoothScroll(e) {
  e.preventDefault();

  const targetId = e.currentTarget.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  if (!targetSection) {
    console.error(`Target section with ID '${targetId}' not found.`);
    return;
  }

  const targetPosition = targetSection.offsetTop;
  const offset = 110; // Adjust the offset as needed
  const targetPositionWithOffset = targetPosition - offset;
  const startPosition = window.scrollY;
  const distance = targetPositionWithOffset - startPosition;
  const duration = 200; // Adjust the scroll duration as needed
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

scrollLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});
