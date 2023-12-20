const GRID = document.getElementById("grid-container");
let cellsList = document.querySelectorAll(".grid-cell");
const COLOR_PICKER = document.getElementById("color-picker");
const RANDOMIZER = document.getElementById("randomizer");
const SHADER = document.getElementById("shader");
const SLIDER = document.getElementById("slider");
const SLIDER_SIZE_TEXT = document.getElementById("slider-size");
const SLIDER_DEFAULT = 4;
let currentColour = COLOR_PICKER.value;
let randomize = false;
let shading = false;
let drawing = false;

COLOR_PICKER.addEventListener("input", () => {
  currentColour = COLOR_PICKER.value;
});

SLIDER.addEventListener("input", () => {
  SLIDER_SIZE_TEXT.innerText = `${SLIDER.value} x ${SLIDER.value}`;
  populateGrid(SLIDER.value);
  initGrid(SLIDER.value);
  makeCellsDrawable();
});

RANDOMIZER.addEventListener("click", () => {
  randomize = !randomize;
  RANDOMIZER.style.backgroundColor = randomize 
    ? 'var(--primary-activated)' 
    : 'var(--primary)';
});

SHADER.addEventListener("click", () => {
  shading = !shading;
  SHADER.style.backgroundColor = shading 
  ? 'var(--primary-activated)' 
  : 'var(--primary)';
});

// generates a random rgb colour
function generateRandomColour() {
  let r = Math.floor(Math.random() * 260);
  let g = Math.floor(Math.random() * 260);
  let b = Math.floor(Math.random() * 260);

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// dynamically sets up the new grid arrangement based on the number of cells
function initGrid(nbCellsPerRow) {
  GRID.style.gridTemplateColumns = `repeat(${nbCellsPerRow}, 1fr)`;
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
  // adding necessary amount of cells {
    for (let i = 0; i < necessaryCells - cellsList.length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        GRID.appendChild(cell);
    }
  }
  // reassign the reference to the new list of grid cells
  cellsList = document.querySelectorAll(".grid-cell")
}

function makeCellsDrawable() {
  cellsList.forEach(c => c.addEventListener('mousedown', () => {
    if (randomize) 
      c.style.backgroundColor = generateRandomColour();
    else 
      c.style.backgroundColor = currentColour;

    drawing = true;
  }));
  cellsList.forEach(c => c.addEventListener('mousemove', () => {
    if (drawing)
      if (randomize) 
        c.style.backgroundColor = generateRandomColour();
      else 
        c.style.backgroundColor = currentColour;
  }));
}

// SETUP
SLIDER.value = SLIDER_DEFAULT;
initGrid(Math.sqrt(cellsList.length));
makeCellsDrawable();
document.addEventListener('mouseup', () => drawing = false)