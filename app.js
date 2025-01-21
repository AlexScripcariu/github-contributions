function generateCell(parentContainer) {
	const newCell = document.createElement("div");
	newCell.classList.add("cell");

	parentContainer.appendChild(newCell);

}

function calculateTotalDays(year) {
	return year % 4 === 0 ? 366 : 365;

}

function generateAllCells(parentContainer, year) {
	let totalLeapYears = calculateTotalDays(year);

	for (let i = 0; i < calculateTotalDays; i++) {
		generateCell(parentContainer);
	}
}



function generateHeatMap() {
	const documentFragment = new DocumentFragment();

	
	const heatMap = document.querySelector(".heatmap-conatiner");
	heatMap.appendChild(documentFragment);
}