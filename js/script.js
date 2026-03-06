// Hamburger menu + close
document.addEventListener("DOMContentLoaded", () => {
 const btn = document.getElementById("hamburgerBtn");
 const mobileNav = document.getElementById("mobileNav");

 // Close menu
 const closeNavMenu = () => {
  mobileNav.classList.remove("active");
  btn.classList.remove("active");
  btn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
 };

 btn.addEventListener("click", (e) => {
  e.stopPropagation();

  const menuIsOpen = mobileNav.classList.toggle("active");
  btn.classList.toggle("active");
  btn.setAttribute("aria-expanded", menuIsOpen);

  if (menuIsOpen) {
   document.body.classList.add("no-scroll");
  } else {
   document.body.classList.remove("no-scroll");
  }
 });

 mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" || e.target === mobileNav) {
   closeNavMenu();
  }
 });

 document.addEventListener("click", (e) => {
  const menuIsOpen = mobileNav.classList.contains("active");
  const clickOutsideNav = !mobileNav.contains(e.target);
  const clickOutSideBtn = !btn.contains(e.target);

  if (menuIsOpen && clickOutsideNav && clickOutSideBtn) {
   closeNavMenu();
  }
 });

 //Close hamburger menu with esc button
 document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav.classList.contains("active")) {
   closeNavMenu();
  }
 });
});

//CV Progress bar, fill color while scrolling
const cvTimeline = document.querySelector(".cvSection");
const timeProgress = document.querySelector(".cvProgress");

window.addEventListener("scroll", () => {
 const cvRect = cvTimeline.getBoundingClientRect();

 const cvWindowHeight = window.innerHeight;
 const cvTotalHeight = cvTimeline.offsetHeight;
 const cvVisible = cvWindowHeight - cvRect.top;

 let cvPercent = (cvVisible / cvTotalHeight) * 100;
 cvPercent = Math.max(0, Math.min(cvPercent, 100));

 timeProgress.style.height = cvPercent + "%";
});

//Change color on the circle while scrolling the CV
document.addEventListener("DOMContentLoaded", () => {
 const cvContents = document.querySelectorAll(".cvContent");

 //The row has to be in the middle of the screen
 const observerOpt = {
  root: null,
  rootMargin: "-40% 0px -40% 0px",
  threshold: 0,
 };
 const cvGuard = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
   if (entry.isIntersecting) {
    document.querySelectorAll(".edYear").forEach((year) => {
     year.classList.remove("active");
    });

    //Find year for a specific row and add active class
    const activeYears = entry.target.querySelector(".edYear");
    if (activeYears) {
     activeYears.classList.add("active");
    }
   }
  });
 }, observerOpt);

 //Check every row
 cvContents.forEach((row) => {
  cvGuard.observe(row);
 });
});

// About me carousel
document.addEventListener("DOMContentLoaded", () => {
 const carouselContent = document.querySelector(".carouselContent");
 const leftBtn = document.querySelector(".leftBtn");
 const rightBtn = document.querySelector(".rightBtn");
 const carouselContainer = document.querySelector(".carouselContainer");
 const flipCards = document.querySelectorAll(".flipCard");

 if (!carouselContent || flipCards.length === 0) return;

 let currentIndex = 0;
 const maxIndex = flipCards.length - 1;

 flipCards.forEach((card) => {
  card.addEventListener("click", () => {
   card.classList.toggle("is-flipped");
  });
 });

 const updateCarousel = () => {
  carouselContent.style.transform = `translateX(-${currentIndex * 100}%)`;
 };

 if (rightBtn && leftBtn) {
  rightBtn.addEventListener("click", () => {
   if (currentIndex < maxIndex) {
    currentIndex++;
   } else {
    currentIndex = 0;
   }
   updateCarousel();
  });

  leftBtn.addEventListener("click", () => {
   if (currentIndex > 0) {
    currentIndex--;
   } else {
    currentIndex = maxIndex;
   }
   updateCarousel();
  });
 }
 if (carouselContainer) {
  let startX = 0;
  let endX = 0;
  carouselContainer.addEventListener(
   "touchstart",
   (e) => {
    startX = e.touches[0].clientX;
   },
   { passive: true },
  );
  carouselContainer.addEventListener(
   "touchend",
   (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
   },
   { passive: true },
  );

  const handleSwipe = () => {
   const swipeTresh = 50;
   const diff = startX - endX;

   if (diff > swipeTresh) {
    if (currentIndex < maxIndex) {
     currentIndex++;
    } else {
     currentIndex = 0;
    }
    updateCarousel();
   } else if (diff < -swipeTresh) {
    if (currentIndex > 0) {
     currentIndex--;
    } else {
     currentIndex = maxIndex;
    }
    updateCarousel();
   }
  };
 }
});
