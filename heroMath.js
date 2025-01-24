const heroSection = document.getElementById("hero");

let xOne;
let xTwo;
let yOne;
let yTwo;
let dy;
let dx;


let isMouseDown = false;

heroSection.onmousedown = (event) => {
  isMouseDown = true;
  xOne = event.clientX;
  yOne = event.clientY;
}

// heroSection.onmousemove = (event) => {

//   if (isMouseDown) {
//     console.log(`Mouse moving! X: ${event.clientX} | Y: ${event.clientY}`);
//   }
  
// }


heroSection.onmouseup = (event) => {
  xTwo = event.clientX;
  yTwo = event.clientY;

  calculateChange(xOne, xTwo, yOne, yTwo);
}

function calculateChange(x1, x2, y1, y2) {
  dy = y2 - y1;
  dx = x2 - x1;
  console.log(`DY: ${dy} DX: ${dx}`);
  calculateAngle(dy, dx);
}


function calculateAngle(dyValue, dxValue) {
  let opposite;
  let adjacent;

  if (dyValue === 0 && dxValue >= 0) {
    return 90;
  } else if (dyValue === 0 && dxValue <= 0) {
    return -90;
  } else if (dxValue === 0 && dyValue >= 0) {
    return 0;
  } else if (dxValue === 0 && dyValue <= 0) {
    return 180;
  } else if (dyValue > 0) {
    opposite = dyValue;
    adjacent = dxValue;
  } else if (dyValue < 0) {
    opposite = dxValue;
    adjacent = dyValue;
  } else {
    return null;
  }

  const tanInv = Math.atan(opposite / adjacent) * (180 / Math.PI);
  console.log(tanInv)
  return tanInv;
}

