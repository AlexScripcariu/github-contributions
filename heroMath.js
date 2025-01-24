const heroSection = document.getElementById("hero");

let prevX = 0;
let prevY = 0;

let isMouseDown = false;

heroSection.onmousedown = (event) => {
  isMouseDown = true;
  prevX = event.clientX;
  prevY = event.clientY;
}

heroSection.onmousemove = (event) => {

  if (isMouseDown) {
    console.log(`Mouse moving! X: ${event.clientX} | Y: ${event.clientY}`);
  }
  
}


heroSection.onmouseup = () => {
  isMouseDown = false;
}
