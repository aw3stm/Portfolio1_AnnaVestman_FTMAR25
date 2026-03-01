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

//CV Progress bar
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
