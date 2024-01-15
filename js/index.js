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
      ? "open-icon-src"
      : "closed-icon-src";
    expandIcon.src = newSrc;

    // Update the open section
    openSection = accordContent.classList.contains("active")
      ? accordContent
      : null;
  });

  // Store the timeline in the expandIcon for later access
  expandIcon.timeline = tlAccordIcon;
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
  aboutCopyP2.textContent = '';

  // Create and append new elements
  const smallPrint = document.createElement('span');
  smallPrint.className = 'small-print';
  smallPrint.appendChild(document.createTextNode('Jemma Smallman \u00A0 | \u00A0 Director '));
  aboutCopy.appendChild(smallPrint);

  const paragraphs = [
    "Jemma has over 10 years of experience in horticulture. During this time, she has worked on beautiful and prestigious sites in and around Bath. This includes multiple gardens for the Duchy of Cornwall, listed city centre properties, and large estate gardens.",
    "After training as a skilled gardener and designer in her previous role, working alongside another highly decorated garden designer, Jemma wanted to expand on her passion for the build side of projects. In 2020, she formed Viridis Landscapes.",
    "Jemma loves being on site come rain or shine, but she also has a huge passion for the design process behind the scenes. Her enthusiasm for creativity and functionality has enabled her to develop and craft her own original style that balances practicality and beauty."
  ];

  paragraphs.forEach((paragraphText) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(paragraphText));
    aboutCopy.appendChild(paragraph);
  });

  // Update image source and alt
  aboutImg.src = "images/viridis_jemma.jpg";
  aboutImg.alt = "jemma in garden";

  // Fade in new content
  gsap.to([aboutCopy, aboutCopyP2, aboutImg], { opacity: 1, duration: 0.2, ease: "sine.in" });
}


function updateContentTeam() {
  // Update content
  aboutCopy.textContent =
    "Our fully equipped diverse team consists of some of the most reliable and hardworking professionals in the field. We prioritise respecting our clients and their living space and always strive to deliver beautiful results that exceed expectation.";
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
  const offset = 80; // Adjust the offset as needed
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

//GSAP ANIMATION PLAY
window.addEventListener("DOMContentLoaded", () => {

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

//handle mobile menu
const mobileIcon = document.querySelector(".mobile-icon");
const mobileMenuModal = document.querySelector(".mobile-menu-modal");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-item");
const tlMobMen = gsap.timeline({ paused: true });
const tlModelApear = gsap.timeline({ paused: true });

mobileIcon.addEventListener("click", () => {
  if (!mobileMenuModal.classList.contains("appear")) {
    mobileMenuModal.classList.add("appear");
    tlMobMen.play()
    tlModelApear.play()
  } else {
    tlModelApear.reverse()
    tlMobMen.reverse()
    setTimeout(() =>{
      mobileMenuModal.classList.remove("appear");
    }, 500)
  }
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileMenuModal.classList.contains("appear")) {
      mobileMenuModal.classList.add("appear");
    } else {
      tlMobMen.reverse();
      tlModelApear.reverse();
      setTimeout(() =>{
        mobileMenuModal.classList.remove("appear");
      }, 500)
    }
  });
});

  const topL = document.getElementById("top");
  const midL = document.getElementById("mid");
  const botL = document.getElementById("bot");

  tlMobMen.to(midL, {
    opacity: 0,
    duration: 0.3,
    ease: "sine.in",
  }, 0);

  tlMobMen.to([botL], {
    y: -25,
    duration: 0.3,
    ease: "sine.in",
  }, "-=0.3");
  tlMobMen.to([topL], {
    y: 25,
    duration: 0.3,
    ease: "sine.in",
  }, "-=0.3");

  tlMobMen.to(topL, {
    rotation: 45,
    transformOrigin: "50% 50%",
    duration: 0.3,
    ease: "power.in(4)",
  });

  tlMobMen.to(botL, {
    rotation: -45,
    transformOrigin: "50% 50%",
    duration: 0.3,
    ease: "power.in(4)",
  }, "-=0.3");

  tlModelApear.fromTo(
    mobileMenuModal,
    {
      y: "-100%", // Start from above the screen
    },
    {
      y: "0%", // End at the top of the screen
      duration: 0.5,
      ease: "power.out(3)",
    }
  );
