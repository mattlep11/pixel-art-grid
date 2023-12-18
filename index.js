const GRID = document.getElementById("grid-container");
const CELLS = document.querySelectorAll(".grid-cell");
let currentColour = "black";
let drawing = false;

CELLS.forEach(c => c.addEventListener('mousedown', () => {
  c.style.backgroundColor = currentColour;
  drawing = true;
}));
CELLS.forEach(c => c.addEventListener('mousemove', () => {
  if (drawing)
    c.style.backgroundColor = currentColour;
}));
CELLS.forEach(c => c.addEventListener('mouseup', () => {
  drawing = false;
}));

// dynamically sets up the new grid arrangement based on the number of cells
function initGrid(nbCellsPerRow = 4) {
  GRID.style.gridTemplateColumns = `repeat(${nbCellsPerRow}, 1fr)`;
}

initGrid(Math.sqrt(CELLS.length));