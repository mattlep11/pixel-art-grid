const GRID = document.getElementById("grid-container");
const CELLS = document.querySelectorAll(".grid-cell");

// dynamically sets up the new grid arrangement based on the number of cells
function initGrid(nbCellsPerRow = 4) {
  GRID.style.gridTemplateColumns = `repeat(${nbCellsPerRow}, 1fr)`;
}

initGrid(Math.sqrt(CELLS.length));