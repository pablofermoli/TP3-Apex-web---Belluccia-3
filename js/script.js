/* =========================================================
   APEX SIM RACING ACADEMY — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar: solid background after scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll cue button ---------- */
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const target = document.getElementById('academia');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__q');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

});


/*=========================================
HISTORY GALLERY
=========================================*/

const historyMain=document.getElementById("historyMain");

const historyThumbs=document.querySelectorAll(".history-thumb");

let currentHistory=0;

function changeHistory(i){

historyMain.style.opacity=0;

setTimeout(()=>{

historyMain.src=historyThumbs[i].dataset.full;

historyThumbs.forEach(img=>img.classList.remove("active"));

historyThumbs[i].classList.add("active");

historyMain.style.opacity=1;

currentHistory=i;

},180);

}

historyThumbs.forEach((img,index)=>{

img.onclick=()=>changeHistory(index);

});

setInterval(()=>{

let next=currentHistory+1;

if(next>=historyThumbs.length){

next=0;

}

changeHistory(next);

},3500);


/*====================================
TESTIMONIOS
====================================*/

const slider = document.querySelector(".testimonials__track");

if (slider) {

  const cards = Array.from(slider.children);

  cards.forEach((card) => {
    slider.appendChild(card.cloneNode(true));
  });

  slider.addEventListener("mouseenter", () => {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseleave", () => {
    slider.style.animationPlayState = "running";
  });

}






/* =========================================================
   INSTRUCTORES INTERACTIVOS
========================================================= */

const instructorCards = document.querySelectorAll("[data-instructor-card]");

if (instructorCards.length > 0) {

  function closeInstructorCards(exceptCard = null) {

    instructorCards.forEach((card) => {

      if (card !== exceptCard) {
        card.classList.remove("is-open");
      }

    });

  }


  instructorCards.forEach((card) => {

    /* Abrir o cerrar al hacer clic */
    card.addEventListener("click", () => {

      const wasOpen = card.classList.contains("is-open");

      closeInstructorCards();

      if (!wasOpen) {
        card.classList.add("is-open");
      }

    });


    /* Accesibilidad con teclado */
    card.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        const wasOpen = card.classList.contains("is-open");

        closeInstructorCards();

        if (!wasOpen) {
          card.classList.add("is-open");
        }

      }

      if (event.key === "Escape") {
        card.classList.remove("is-open");
      }

    });

  });


  /* Cerrar al hacer clic fuera de las tarjetas */
  document.addEventListener("click", (event) => {

    const clickedInsideCard = event.target.closest("[data-instructor-card]");

    if (!clickedInsideCard) {
      closeInstructorCards();
    }

  });

}



/* =========================================================
   CIRCUITOS INTERACTIVOS
========================================================= */

const circuitCards = document.querySelectorAll("[data-circuit-card]");

if (circuitCards.length > 0) {

  function closeCircuitCards(exceptCard = null) {

    circuitCards.forEach((card) => {

      if (card !== exceptCard) {
        card.classList.remove("is-active");
        card.setAttribute("aria-expanded", "false");
      }

    });

  }


  function toggleCircuitCard(card) {

    const isOpen = card.classList.contains("is-active");

    closeCircuitCards();

    if (!isOpen) {
      card.classList.add("is-active");
      card.setAttribute("aria-expanded", "true");
    }

  }


  circuitCards.forEach((card) => {

    /* Clic o toque */
    card.addEventListener("click", () => {
      toggleCircuitCard(card);
    });


    /* Teclado */
    card.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCircuitCard(card);
      }

      if (event.key === "Escape") {
        card.classList.remove("is-active");
        card.setAttribute("aria-expanded", "false");
      }

    });

  });


  /* Cerrar al hacer clic fuera */
  document.addEventListener("click", (event) => {

    const clickedCard = event.target.closest("[data-circuit-card]");

    if (!clickedCard) {
      closeCircuitCards();
    }

  });

}






/* =========================================================
   PROGRAMA ROADMAP
========================================================= */

const roadmapCards = document.querySelectorAll("[data-roadmap-card]");
const roadmapNodes = document.querySelectorAll(".program-roadmap__node");

if (roadmapCards.length > 0) {

  function activateRoadmapCard(selectedCard) {

    const selectedIndex = Number(
      selectedCard.dataset.roadmapIndex
    );

    roadmapCards.forEach((card) => {
      card.classList.remove("is-active");
    });

    roadmapNodes.forEach((node) => {
      node.classList.remove("is-active");
    });

    selectedCard.classList.add("is-active");

    if (roadmapNodes[selectedIndex]) {
      roadmapNodes[selectedIndex].classList.add("is-active");
    }

  }


  roadmapCards.forEach((card) => {

    card.addEventListener("click", () => {
      activateRoadmapCard(card);
    });

    card.addEventListener("mouseenter", () => {
      activateRoadmapCard(card);
    });

    card.addEventListener("focus", () => {
      activateRoadmapCard(card);
    });

    card.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateRoadmapCard(card);
      }

    });

  });

}



const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader?.classList.add("is-hidden");
  }, 700);
});



document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener("click", () => {
    pageLoader?.classList.remove("is-hidden");
  });
});