const hamburgerIcon = document.querySelector(".hamburger-icon") 

let clicked = 0;
hamburgerIcon.addEventListener('click', () => {
  console.log(hamburgerIcon.classList);
  
  hamburgerIcon.style.transform = "rotate(180deg)";
  
});

hamburgerIcon.addEventListener('mouseleave', () => {
})