// accordion logic
const accordionItems = document.querySelectorAll(".accordion-section");
let openSection = null;

accordionItems.forEach((item) => {
  const expandIcon = item.querySelector(".expand-icon");
  const accordContent = item.querySelector(".accordion-content");

  expandIcon.addEventListener("click", function () {
    // Close the previously open section
    if (openSection && openSection !== accordContent) {
      openSection.classList.remove("active");
      const prevExpandIcon =
        openSection.parentElement.querySelector(".expand-icon");
      prevExpandIcon.src = "images/expand_icon.svg";
    }

    // Toggle the current section
    accordContent.classList.toggle("active");
    
    // Fade in the accord-img if the section is now active
    if (accordContent.classList.contains("active")) {
      gsap.from(accordContent, {
        delay: .2,
        opacity: 0,
        duration: 0.4,
        ease: "sine.in",
      });
    }
    const newSrc = accordContent.classList.contains("active")
      ? "images/remove-icon.svg"
      : "images/expand_icon.svg";
    expandIcon.src = newSrc;


    // Update the open section
    openSection = accordContent.classList.contains("active")
      ? accordContent
      : null;
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
  // Update content
  aboutCopy.textContent =
    " Jemma has 10+ years in garden design and landscaping, during which time she has worked on a number of beautiful and prestigious sites including multiple gardens for the Duchy of Cornwall. Jemma loves being on site come rain or shine but also has a huge passion for the design process behind the scenes, and her passion for creativity and functionality has enabled  her to develop and craft her own original style that balances practicality and beauty.";
  aboutCopyP2.textContent = "";
  aboutImg.src = "images/viridis_jemma.jpg";
  aboutImg.alt = "jemma in garden";

  // Fade in new content
  gsap.to([aboutCopy, aboutCopyP2, aboutImg], { opacity: 1, duration: 0.2, ease: "sine.in" });
}

function updateContentTeam() {
  // Update content
  aboutCopy.textContent =
    "Our fully-equipped diverse team consists of some of the most reliable and hardworking professionals in the field. We prioritise respecting our clients and their living space and always strive to deliver beautiful results that exceed expectation.";
  aboutCopyP2.textContent =
    "Our resources are derived from our hand-picked repertoire of high-quality contacts, developed through years of experience in the field. These include local nurseries for stunning assortments of plants, reliable skip provision to take care of rubble and garden waste, and further afield contacts for more unusual varieties of stone or other materials needed for building work.";
  aboutImg.src = "images/viridis_team.jpg";
  aboutImg.alt = "multiple gardeners gloves";

  // Fade in new content
  gsap.to([aboutCopy, aboutCopyP2, aboutImg], { opacity: 1, duration: 0.2, ease: "sine.in" });
}

//cost calculator logic
function quoteCalc(length, width) {
  roundedNum = Math.floor(length * width * 200);
  return roundedNum.toLocaleString();
}

document
  .getElementById("quoteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let length = document.getElementById("length").value;
    let width = document.getElementById("width").value;
    let estimate = quoteCalc(length, width);
    document.getElementById("quote-result").textContent =
      "Estimate: £" + estimate;
  });

// Scroll link logic
const scrollLinks = document.querySelectorAll(".scroll-link");

function smoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  if (!targetSection) {
    console.error(`Target section with ID '${targetId}' not found.`);
    return;
  }

  const targetPosition = targetSection.offsetTop;
  const offset = 85; // Adjust the offset as needed
  const targetPositionWithOffset = targetPosition - offset;
  const startPosition = window.scrollY;
  const distance = targetPositionWithOffset - startPosition;
  const duration = 1500; // Adjust the scroll duration as needed
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
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

//on link-click show gallery images as well as use smooth scroll
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    smoothScroll(e);
  });
});

//form error handling...
const textArea = document.getElementById("message");

const requiredFields = document.querySelectorAll("required");

document
  .querySelector(".contact-submit")
  .addEventListener("click", function () {
    const emailInput = document.getElementById("email");
    const emailRequired = document.querySelector(".email-req");
    const nameInput = document.getElementById("name");
    const nameRequired = document.querySelector(".name-req");
    const textArea = document.getElementById("message");
    const textRequired = document.querySelector(".text-req");

    if (!emailInput.checkValidity()) {
      emailRequired.classList.add("error");
    } else {
      emailRequired.classList.remove("error");
    }

    if (!nameInput.checkValidity()) {
      nameRequired.classList.add("error");
    } else {
      nameRequired.classList.remove("error");
    }

    if (!textArea.checkValidity()) {
      textRequired.classList.add("error");
    } else {
      textRequired.classList.remove("error");
    }
  });

document.querySelector(".quote-submit").addEventListener("click", function () {
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const lengthRequired = document.querySelector(".length-req");
  const widthRequired = document.querySelector(".width-req");

  if (!lengthInput.checkValidity()) {
    lengthRequired.classList.add("error");
  } else {
    lengthRequired.classList.remove("error");
  }

  if (!widthInput.checkValidity()) {
    widthRequired.classList.add("error");
  } else {
    widthRequired.classList.remove("error");
  }
});

//handle mobile menu
const mobileIcon = document.querySelector(".mobile-icon");
const mobileMenuModal = document.querySelector(".mobile-menu-modal");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-item");

mobileIcon.addEventListener("click", () => {
  if (mobileIcon.src.includes("images/menu-icon.svg")) {
    mobileIcon.src = "images/close_icon.svg";
    mobileMenuModal.classList.add("appear");
  } else {
    mobileIcon.src = "images/menu-icon.svg";
    mobileMenuModal.classList.remove("appear");
  }
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileIcon.src.includes("images/menu-icon.svg")) {
      mobileIcon.src = "images/close-icon.svg";
      mobileMenuModal.classList.add("appear");
    } else {
      mobileIcon.src = "images/menu-icon.svg";
      mobileMenuModal.classList.remove("appear");
    }
  });
});


//GSAP ANIMATION PLAY

window.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger)

  const splitText = new SplitType('#split-text');
  const tl = gsap.timeline();
  const leafTop = document.getElementById("leafs-top")
  const leafBottom = document.getElementById("leafs-bottom")

  tl.from('.char', {
    delay: 0.2,
    opacity: 0,
    duration: 0.6, 
    ease: "sine.in", 
    stagger: { amount: 0.6 }
  });

  // tl.from('.logo-letter', {
  //   delay: 0.2,
  //   opacity: 0,
  //   duration: 0.4, 
  //   ease: "sine.in", 
  //   stagger: { amount: 0.4 }
  // }, 0.4);

  tl.from(leafTop, {
    delay: 1.4,
    opacity: 0,
    duration: 0.5,
    ease: "sine.in",
  }, 0);
  tl.from(leafTop, {
    delay: 1.5,
    y: 500,
    duration: 0.5,
    ease: "back.out(3)", 
  }, 0); 
  tl.from(leafBottom, {
    delay: 1.2,
    opacity: 0,
    duration: 0.5,
    ease: "sine.in",
  }, 0);
  tl.from(leafBottom, {
    delay: 1.3,
    y: 1000,
    duration: 0.5,
    ease: "back.out(4)", 
  }, 0); 

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

  gsap.utils.toArray('.portfolio-img').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "sine.in",
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none",
        start: "top 90%",
      }
    });
  });

  function footerAnimation() { 
  const tlFoot = gsap.timeline();

  tlFoot.from('.logo-letter-foot', {
    delay: 0.2,
    opacity: 0,
    duration: 0.4, 
    ease: "sine.in", 
    stagger: { amount: 0.4 }
  });

  tlFoot.from('#leafs-top-foot', {
    delay: 0.9,
    opacity: 0,
    duration: 0.4,
    ease: "sine.in",
  }, 0);
  tlFoot.from('#leafs-top-foot', {
    delay: 1,
    y: 500,
    duration: 0.5,
    ease: "back.out(3)", 
  }, 0); 
  tlFoot.from('#leafs-bottom-foot', {
    delay: 0.9,
    opacity: 0,
    duration: 0.4,
    ease: "sine.in",
  }, 0);
  tlFoot.from('#leafs-bottom-foot', {
    delay: 0.8,
    y: 1000,
    duration: 0.5,
    ease: "back.out(4)", 
  }, 0); 
}

  gsap.from('.logo-foot', {
    scrollTrigger: {
      trigger: '.logo-foot',
      toggleActions: 'play none none none',
      onEnter: () => footerAnimation(),
    },
  });



})