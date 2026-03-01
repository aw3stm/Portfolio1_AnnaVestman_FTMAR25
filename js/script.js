// Hamburger menu + close

const btn = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");

btn.addEventListener("click", () => {
 const openMenu = mobileNav.classList.toggle("active");
 btn.classList.toggle("active");
 btn.setAttribute("aria-expanded", openMenu);
});

// Close menu

mobileNav.addEventListener("click", (e) => {
 if (e.target.tagName === "A") {
  mobileNav.classList.remove("active");
  btn.classList.remove("active");
  btn.setAttribute("aria-expanded", "false");
 }
});

//Close hamburger menu with esc button

document.addEventListener("keydown", (e) => {
 if (e.key === "Escape") {
  mobileNav.classList.remove("active");
  btn.classList.remove("active");
  btn.setAttribute("aria-expanded", "false");
 }
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
