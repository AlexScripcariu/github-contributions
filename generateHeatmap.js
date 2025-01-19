// Create a doc frag to put in all items 

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Creates each cell div
function createCell(counter, amountValue=0) {
  let newCell = document.createElement("div");
  newCell.classList += `cell day-${counter}`;

  newCell.dataset.amount = amountValue;

  return newCell;
}

// Find the day name of the first day of a given year 
// e.g. 2025 = wednesday
function findFirstDate(year) {
  const date = new Date();
  date.setFullYear(year, 0, 1);
  
  return date.getDay();
}

// This calculates the offset from the start of the grid of the date.

function calcStart(items, startDate=1){
  items.firstElementChild.classList.add(`start-date-${startDate}`);
}

// Finds the average contribution/frequency/amount of habit
function findMeanValues(cellContainer) {
  let totalValue = 0;

  for (let cell of cellContainer) {
    totalValue += Number(cell.dataset.amount);
  }
 
  let avgMean = totalValue / cellArr.length;

  return avgMean;
}

// APPLY CELL COLOUR????? TODO??? if you were to add a single
// cell that would take a lot of performance so it would be
// easier to calc one cell in relation to rest?

function applyColour(cellContainer) {
  const meanVal = findMeanValues(cellContainer);
  for (let cell of cellContainer) {
    let cellAmount = Number(cell.dataset.amount);
    console.log(`Cell value: ${cellAmount} | mean: ${meanVal}`);
    if (cellAmount === 0) {
      cell.classList.add('unlogged');
    } else if (cellAmount >= 2 * meanVal) {
      console.log("Hello");
      cell.classList.add('full');
    } else if (cellAmount >= 1.4 * meanVal) {
      cell.classList.add('three-q');
    } else if (cellAmount >= 0.6 * meanVal) {
      cell.classList.add('half');
    } else {
      cell.classList.add('one-q');
    }
  }
}




// this adds each cell to the doc frag.
const docFrag = new DocumentFragment();

let cellAttrValue = 1;

for (let i = 0; i < 365; i++) {
  cellAttrValue = randomInt(0, 4);
  docFrag.appendChild(createCell(i + 1, cellAttrValue));

  
}


let currentYear = new Date().getFullYear();

calcStart(docFrag, findFirstDate(currentYear));

const cellArr = Array.from(docFrag.children);
applyColour(cellArr);


// adds the doc frag. to the DOM
const heatmapDiv = document.querySelector(".heatmap-container");
heatmapDiv.appendChild(docFrag);
