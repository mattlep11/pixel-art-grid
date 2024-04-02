// grid root and drawable cells
const GRID = document.getElementById("grid-container");
let cellsList = document.querySelectorAll(".grid-cell");

// user inputs
const COLOR_PICKER = document.getElementById("color-picker");
const RANDOMIZER = document.getElementById("randomizer");
const SLIDER = document.getElementById("slider");
const CLEARER = document.getElementById("clear");
const SLIDER_SIZE_TEXT = document.getElementById("slider-size");

// control variables
const SLIDER_DEFAULT = 4;
let currentColour = COLOR_PICKER.value;
const DEFAULT_COLOR = "rgb(244,242,240)";
let randomize = false;
let drawing = false;

// set the current color to the user's choice
COLOR_PICKER.addEventListener("input", () => {
  currentColour = COLOR_PICKER.value;
});

// adjust the grid size based on slider input and update the size text
SLIDER.addEventListener("input", () => {
  SLIDER_SIZE_TEXT.innerText = SLIDER.value + " x " + SLIDER.value;
  populateGrid(SLIDER.value);
  initGrid(SLIDER.value);
  makeCellsDrawable();
});

// toggle randomizer
RANDOMIZER.addEventListener("click", () => {
  randomize = !randomize;
  RANDOMIZER.style.backgroundColor = randomize 
    ? 'var(--primary-activated)' 
    : 'var(--primary)';
});

// clear board
CLEARER.addEventListener("click", () => {
  CLEARER.animate(
    [
      { color: DEFAULT_COLOR }, 
      { color: "var(--primary)" }, 
      { color: DEFAULT_COLOR }
    ],
    { duration: 750, iterations: 1}
  );
  clearBoard(cellsList);
});

function clearBoard(cells) {
  cells.forEach(cell => cell.style.backgroundColor = DEFAULT_COLOR);
}

// generates a random rgba colour
function generateRandomColour() {
  let r = Math.floor(Math.random() * 260);
  let g = Math.floor(Math.random() * 260);
  let b = Math.floor(Math.random() * 260);
  let a = Math.random();

  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

// dynamically sets up the new grid arrangement based on the number of cells
function initGrid(nbCellsPerRow) {
  GRID.style.gridTemplateColumns = "repeat(" + nbCellsPerRow + ", 1fr)";
}

// populate the grid with all the cells to draw on
function populateGrid(nbCellsPerRow) {
  let necessaryCells = Math.pow(nbCellsPerRow, 2);

  if (necessaryCells === cellsList.length) return; // no changes necessary
  // removing necessary amount of cells
  else if (necessaryCells < cellsList.length) {
    for (let i = 0; i < cellsList.length - necessaryCells; i++) {
      GRID.removeChild(cellsList[cellsList.length - i - 1]);
    }
  }
  else {
  // adding necessary amount of cells
    for (let i = 0; i < necessaryCells - cellsList.length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        GRID.appendChild(cell);
    }
  }
  // reassign the reference to the new list of grid cells
  cellsList = document.querySelectorAll(".grid-cell")
}

// adds listeners to each cell to listen for mouse activity required to draw 
function makeCellsDrawable() {
  cellsList.forEach(cell => cell.addEventListener('mousedown', () => {
    draw(cell);
    drawing = true;
  }));
  cellsList.forEach(cell => cell.addEventListener('mouseenter', () => {
    if (drawing)
      draw(cell);
  }));
}

// draw to the grid canvas
function draw(cell) {
  if (randomize) 
    cell.style.backgroundColor = generateRandomColour();
  else 
    cell.style.backgroundColor = currentColour;
}

// SETUP
SLIDER.value = SLIDER_DEFAULT;
initGrid(Math.sqrt(cellsList.length));
makeCellsDrawable();
document.addEventListener('mouseup', () => drawing = false);