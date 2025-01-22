// creates each individual cell
function createCell(parentContainer) {
  let newCell = document.createElement("div");

  newCell.classList.add("cell");

  newCell.setAttribute("data-amount", "0");


  parentContainer.appendChild(newCell);
}

// HELPER FUNCTION: checks if the year is a leap year or not
function calculateLeapYear(year) {
  return (year % 4 === 0) ? 366 : 365;
}

// HELPER FUNCTION: generates the date: Jan 1st xxxx
function generateFirstDate(year) {
  let firstDay = new Date();
  firstDay.setFullYear(year, 0, 1);
  return firstDay
}

// gives each element a date class e.g. 'feb-1'
function assignDateClass(parentContainer, year) {
  let firstDay = generateFirstDate(year);

  for (let child of parentContainer) {
    let shortMonth = firstDay.toLocaleString("en-GB", { month: "short" }).slice(0, 3);
    let classDate = `${shortMonth}-${firstDay.getDate()}`.toLocaleLowerCase();

    child.classList.add(classDate);

    firstDay.setDate(firstDay.getDate() + 1); // increment to move onto next day
  }

} 

// generates all 365/366 cells to add to the document fragment
function generateCells(parentContainer, year) {
  const totalDays = calculateLeapYear(year);


  for (let i = 0; i < totalDays; i++) {
    createCell(parentContainer);
  }

  const firstCell = parentContainer.firstElementChild;
  const startOffset = generateFirstDate(year).getDay();

  const rowStart = [8, 2, 3, 4, 5, 6, 7];

  firstCell.style.gridRowStart = rowStart[startOffset];
}

function alignMonthText(parentContainer, monthContainer) {
  const startDays = [
    "jan-1", "feb-1", "mar-1", "apr-1", "may-1", "jun-1", 
    "jul-1", "aug-1", "sep-1", "oct-1", "nov-1", "dec-1"
  ];

  const monthElements = monthContainer.children;
  const gridRect = parentContainer.getBoundingClientRect();

  for (let i = 0; i < 12; i++) {
    const selectedElement = parentContainer.querySelector(`.${startDays[i]}`);    
    const elementRect = selectedElement.getBoundingClientRect();

    // Calculate the row and column based on positions
    const row = Math.round((elementRect.top - gridRect.top) / 12); // 10px row height + 2px gap
    let column = Math.round((elementRect.left - gridRect.left) / 12) + 1; // 10px column width + 2px gap
    
    if (row != 2 && column != 1) {
      column++;
    }


    const monthElement = monthElements[i];
    monthElement.style.gridColumnStart = column;
  }
}

function applyColour(parentContainer) {
  let totalCellValues = 0;

  const cellValues = Array.from(parentContainer).map(cell => {
    const amount = Number(cell.dataset.amount);
    totalCellValues += amount;
    return amount;
  });

  const cellAmountMean = totalCellValues / parentContainer.length;

  for (let cell of parentContainer) {
    let cellAmount = cell.dataset.amount;
    if (cellAmount === "0") {
      cell.classList.add("unlogged"); 
    } else if (cellAmount >= cellAmountMean * 1.8) {
      cell.classList.add("stage-1");
    } else if (cellAmount >= cellAmountMean * 1.3) {
      cell.classList.add("stage-2");
    } else if (cellAmount >= cellAmountMean * 0.7) {
      cell.classList.add("stage-3");
    } else {
      cell.classList.add("stage-4");
    }

  }
}

// DEBUG FUNCTION: helps generate random numbers.
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// DEBUG FUNCTION: generates random cell values to create a 'standard' heatmap
function assignRandomAmount(parentContainer) {
  for (let cell of parentContainer) {
    cell.dataset.amount = randomIntFromInterval(0, 4);
  }
}


// main function that will generate the heatmap
function generateHeatMap(habitName) {
  // creates a temporary document fragment to store all cells in
  const cellContainer = new DocumentFragment();

  // cell formatting functions
  const currentYear = new Date().getFullYear();

  generateCells(cellContainer, currentYear); // change to: no return
  const cells = cellContainer.children;

  assignDateClass(cells, currentYear);
  assignRandomAmount(cells);
  applyColour(cells);

  const heatmapGridQuery = `.${habitName} .heatmap-grid`;
  const heatmapGrid = document.querySelector(heatmapGridQuery);
  const heatmapMonths = document.querySelector(`${heatmapGridQuery} > .heatmap-months`);
  heatmapGrid.appendChild(cellContainer);
  alignMonthText(heatmapGrid, heatmapMonths);
}

generateHeatMap("reading");
generateHeatMap("exercise");
generateHeatMap("programming");