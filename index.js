const mainGrid = document.getElementById("main-grid");
const score = document.getElementById("score-number");
const defaultRows = 4, defaultCols = 4;
let rows = defaultRows, cols = defaultCols;

const displayColorGrid = (r, c) => {
  const ans = randomDivPicker(r, c);
  const colors = generateRandomColors(r, c);
  for (let i = 1; i <= c * r; i++) {
    const div = document.createElement("div");
    if (ans === i) {
      div.addEventListener("click", rightAnsChosen);
      div.style.backgroundColor = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]},0.8)`;
      div.style.cursor = "pointer";
    } else {
      div.addEventListener("click", wrongAnsChosen);
      div.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
      div.style.cursor = "pointer";
    }
    mainGrid.appendChild(div);
  }
};

function generateRandomColors() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return [r, g, b];
}

function rightAnsChosen() {
  rows = rows + 1;
  cols = cols + 1;
  mainGrid.innerHTML = "";
  mainGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  mainGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  displayColorGrid(rows, cols);
  updateScore(true);
}
function wrongAnsChosen() {
  mainGrid.classList.add("animation");
  rows = defaultRows;
  cols = defaultCols;
  setTimeout(() => {
    mainGrid.innerHTML = "";
    mainGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
    mainGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    displayColorGrid(rows, cols);
    updateScore(false);
    mainGrid.classList.remove("animation");
  }, 500);
}

function updateScore(value) {
  curScore = +score.textContent;
  if (value) {
    score.textContent = curScore + 1;
  } else {
    score.textContent = 0;
  }
}

function randomDivPicker(r, c) {
  return Math.ceil(Math.random() * (r * c));
}
