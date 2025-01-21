function generateCell(parentContainer) {
	const newCell = document.createElement("div");
	newCell.classList.add("cell");

	parentContainer.appendChild(newCell);

}

function calculateTotalDays(year) {
	return (year % 4 === 0) ? 366 : 365;

}

function assignCellDate(parentContainer, year) {
	let startDate = new Date();
	startDate.setFullYear(year, 0, 1);

	for (let i = 0; i < parentContainer.length; i++) {
		let month = date.toLocaleString('default', { month: 'short' });

		console.log(`${month}-${startDate.getDate()}`);

		parentContainer[i].classList.add(`${month}-${startDate.getDate()}`);

		startDate.setDate(startDate.getDate() + 1);
	}
}


function generateAllCells(parentContainer, year) {
	let totalDays = calculateTotalDays(year);

	for (let i = 0; i < totalDays; i++) {
		generateCell(parentContainer);
	}
}



function generateHeatMap() {
	const heatmapCells = new DocumentFragment();

	generateAllCells(heatmapCells, 2025);
	assignCellDate(heatmapCells, 2025);


	const heatMap = document.querySelector(".heatmap-container");
	console.log(heatMap);
	console.log(heatmapCells);
	heatMap.appendChild(heatmapCells);
}

generateHeatMap();