// creates each individual cell
function createCell(parentContainer, isLogBool) {
  let newCell = document.createElement("div");
  newCell.style.backgroundColor = "red";

  newCell.classList.add("cell");

  parentContainer.appendChild(newCell);
  // add code for boolean logs. i.e if one give max colour, otherwise have ranges
  // with the mean!
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


// HELPER FUNCTION: calculates which day the year starts in to offset the grid
function calculateStartOffset(year) {
  let firstDay = generateFirstDate(year);

  firstDay = firstDay.getDay()

  return firstDay;
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
  const startOffset = calculateStartOffset(year);

  switch (startOffset) {
    case 0:
      firstCell.style.gridRowStart = 8;
      return 7; // <- all returns are useful for calculating month text position
    case 1:
      firstCell.style.gridRowStart = 2;
      return 1;
    case 2:
      firstCell.style.gridRowStart = 3;
      return 2;
    case 3:
      firstCell.style.gridRowStart = 4;
      return 3;
    case 4:
      firstCell.style.gridRowStart = 5;
      return 4;
    case 5:
      firstCell.style.gridRowStart = 6;
      return 5;
    case 6:
      firstCell.style.gridRowStart = 7;
      return 6;
  }
}

function alignMonthText(parentContainer, monthContainer) {
  // 1. find the position of each start date
  // 2. apply formula to relative text: Math.ceil(cellIndex / 7);
  const startDays = [
    "jan-1", "feb-1", "mar-1", "apr-1", "may-1", "jun-1", 
    "jul-1", "aug-1", "sep-1", "oct-1", "nov-1", "dec-1"
  ];

  const monthElements = monthContainer.children;

  for (let i = 0; i < 12; i++) {
    const selectedElement = parentContainer.querySelector(`.${startDays[i]}`);
    selectedElement.style.backgroundColor = "green";

    const gridRect = parentContainer.getBoundingClientRect();
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
  const cells = parentContainer.children;

  console.log(cells);
}


// main function that will generate the heatmap
function generateHeatMap() {
  // creates a temporary document fragment to store all cells in
  const cellContainer = new DocumentFragment();

  // cell formatting functions
  const currentYear = new Date().getFullYear();

  let dateOffset = generateCells(cellContainer, currentYear); // change to: no return
  assignDateClass(cellContainer.children, currentYear);
  

  const heatmapGrid = document.querySelector(".heatmap-grid");
  const heatmapMonths = document.querySelector(".heatmap-months");
  heatmapGrid.appendChild(cellContainer);
  alignMonthText(heatmapGrid,  heatmapMonths);
}

generateHeatMap();
