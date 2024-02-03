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
const counter = document.querySelector(".counter")
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

let firstLoad = true;

function showImage(index, imagesArray) {
  if (!firstLoad) {
    gsap.to(slideImage, { opacity: 0, duration: 0.2, ease: "sine.out", onComplete: function () {
      slideImage.src = imagesArray[index];
      gsap.to(slideImage, { opacity: 1, duration: 0.1, ease: "sine.in" });
    } });
  } else {
    // If it's the first load, set the image source without animation
    slideImage.src = imagesArray[index];
    firstLoad = false;
  }
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
  counter.textContent = "0" + (currentImageIndex+1)
});

rightBtn.addEventListener("click", function () {
  currentImageIndex = (currentImageIndex + 1) % slideShowImages.length;
  updateSlideShow();
  counter.textContent = "0" + (currentImageIndex+1)
});

// Initial update based on screen width
updateSlideShow();

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

  gsap.utils.toArray('.text-appear').forEach((element) => {
    gsap.to(element, {
      opacity: 1,
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
  gsap.to([aboutCopy, aboutImg], { opacity: 1, duration: 0.1, ease: "sine.in" });
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
    gsap.to([aboutCopy, aboutImg], { opacity: 1, duration: 0.1, ease: "sine.in" });
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


const items = document.querySelectorAll(".bg-img");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const gallery = horizontalLoop(items, {
  paused: true, 
  paddingRight: 60
});

leftButton.addEventListener("click", () => {
  // Move to the previous element by a fixed distance with ease
  gallery.previous({ ease: 'power2.inOut', duration: 0.8});
});

rightButton.addEventListener("click", () => {
  // Move to the next element by a fixed distance with ease
  gallery.next({ ease: 'power2.inOut',  duration: 0.8});
});



/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}


document.addEventListener('DOMContentLoaded', function () {
  // Get the nav element
  const nav = document.querySelector('nav');

  // Add a scroll event listener
  window.addEventListener('scroll', function () {
    // Check the scroll position
    if (window.scrollY > 10) {
      // Update the padding when the user scrolls
      nav.style.padding = '1vw 2.1vw';
      nav.style.borderBottom = 'solid .07vw var(--feta)'
    } else {
      // Reset the padding when the user is at the top
      nav.style.padding = '3.5vw 2.1vw';
      nav.style.borderBottom = 'solid .07vw var(--forest)'
    }
  });
});