// const header = document.getElementsByTagName("header");

const hamburgerIcon = document.querySelector(".hamburger-icon");
console.log(hamburgerIcon);

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle('hamburger-icon');
  hamburgerIcon.classList.toggle('hamburger-icon-clicked');
})