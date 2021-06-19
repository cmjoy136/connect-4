let grid = document.querySelector(".grid");
let grid2 = document.querySelector(".grid2");
let restart = document.querySelector(".restart");
let restartButton = document.querySelector(".restart-button");
let player = document.querySelector(".player");
let currentPlayer = 1;
let spacesLeft = 42;

let boardArray = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const createColumn = (i) => {
  let col = document.createElement("div");
  col.classList.add("column");
  col.id = i;
  return col;
};

const createCell = (i, j) => {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = "cell" + i + " " + j;
  cell.dataset.x = i;
  cell.dataset.y = j;
  return cell;
};

const createGrid = (div) => {
  for (let i = 0; i <= boardArray.length; i++) {
    let col = createColumn(i);
    for (let j = 0; j < 6; j++) {
      let cell = createCell(i, j);
      col.appendChild(cell);
    }
    div.appendChild(col);
  }
};

const createRedToken = (parent) => {
  if (currentPlayer === 1 && parent !== undefined) {
    let tokenDiv = document.createElement("div");
    tokenDiv.className = "red-token";
    parent.appendChild(tokenDiv);
  }
};

const createBlackToken = (parent) => {
  if (currentPlayer === 2 && parent !== undefined) {
    let tokenDiv = document.createElement("div");
    tokenDiv.className = "black-token";
    parent.appendChild(tokenDiv);
  }
};

const checkForEmpty = (columnID) => {
  const column = parseInt(columnID);
  for (let i = boardArray.length - 1; i >= 0; i--) {
    //checks top array for empty spot, if a token is here, the column is full
    //breaks used to stop loop after viable move
    if (boardArray[0][column] !== null) {
      alert("column is full try again");
      break;
    } else if (boardArray[i][column] === null) {
      return [column, i];
    }
  }
};

const addToBoard = (column) => {
  const coords = checkForEmpty(column);
  //target cell by dataset
  const cell = document.querySelector(
    `[data-x="${coords[0]}"][data-y="${coords[1]}"]`
  );
  //update  board array
  boardArray[coords[1]][coords[0]] = currentPlayer;
  return cell;
};

const switchPlayer = () => {
    if (currentPlayer === 1) {
      currentPlayer = 2;
      player.innerHTML = currentPlayer;
    } else if (currentPlayer === 2) {
      currentPlayer = 1;
      player.innerHTML = currentPlayer;
    }
  };

const checkWins = () => {
  let b = boardArray;
  //verticalwin
  for (let i = 0; i < boardArray.length - 2; i++) {
    for (let j = 0; j < boardArray.length + 1; j++) {
      if (
        b[i][j] !== null &&
        b[i][j] === 1 &&
        b[i + 1][j] === 1 &&
        b[i + 2][j] === 1 &&
        b[i + 3][j] === 1
      ) {
        setTimeout(() => {
          alert("player 1 wins");
        }, 300);
      } else if (
        b[i][j] !== null &&
        b[i][j] === 2 &&
        b[i + 1][j] === 2 &&
        b[i + 2][j] === 2 &&
        b[i + 3][j] === 2
      ) {
        setTimeout(() => {
          alert(`player 2 wins`);
        }, 300);
      }
    }
  }
  //horizontal win
  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray.length - 2; j++) {
      if (
        b[i][j] !== null &&
        b[i][j] === 1 &&
        b[i][j + 1] === 1 &&
        b[i][j + 2] === 1 &&
        b[i][j + 3] === 1
      ) {
        setTimeout(() => {
          alert("player 1 wins");
        }, 300);
      } else if (
        b[i][j] !== null &&
        b[i][j] === 2 &&
        b[i][j + 1] === 2 &&
        b[i][j + 2] === 2 &&
        b[i][j + 3] === 2
      ) {
        setTimeout(() => {
          alert("player 2 wins");
        }, 300);
      }
    }
  }
  //diagonal down to the right win
  for (let i = 0; i < boardArray.length - 3; i++) {
    for (let j = 0; j < boardArray.length - 2; j++) {
      if (
        b[i][j] !== null &&
        b[i][j] === 1 &&
        b[i + 1][j + 1] === 1 &&
        b[i + 2][j + 2] === 1 &&
        b[i + 3][j + 3] === 1
      ) {
        setTimeout(() => {
          alert("player 1 wins");
        }, 300);
      } else if (
        b[i][j] !== null &&
        b[i][j] === 2 &&
        b[i + 1][j + 1] === 2 &&
        b[i + 2][j + 2] === 2 &&
        b[i + 3][j + 3] === 2
      ) {
        setTimeout(() => {
          alert("player 2 wins");
        }, 300);
      }
    }
  }

  //diagonal down to the left win
  for (let i = boardArray.length - 3; i < boardArray.length; i++) {
    for (let j = 0; j <= boardArray.length; j++) {
      if (
        b[i][j] !== null &&
        b[i][j] === 1 &&
        b[i - 1][j + 1] === 1 &&
        b[i - 2][j + 2] === 1 &&
        b[i - 3][j + 3] === 1
      ) {
        setTimeout(() => {
          alert("player 1 wins");
        }, 300);
      } else if (
        b[i][j] !== null &&
        b[i][j] === 2 &&
        b[i - 1][j + 1] === 2 &&
        b[i - 2][j + 2] === 2 &&
        b[i - 3][j + 3] === 2
      ) {
        setTimeout(() => {
          alert("player 2 wins");
        }, 300);
      }
    }
  }
};


const dropToColumn = (e) => {
  const column = e.currentTarget.id;
  let cell = addToBoard(column);
  createRedToken(cell);
  createBlackToken(cell);
  switchPlayer();
  checkWins(cell, currentPlayer);
  spacesLeft -= 1
  if (spacesLeft === 0) {
      alert("no moves left!")
      resetGame()
  }
};

const setClickForColumn = (cell) => {
  let columns = Array.from(document.querySelectorAll(".column"));
  columns.forEach((column) => {
    column.addEventListener("click", dropToColumn);
  });
};

const resetGame = () => {
  console.log("coming soon");
  location.reload();
};

const loadContent = () => {
  createGrid(grid);
  player.innerHTML = currentPlayer;
  setClickForColumn();
  restart.addEventListener("click", resetGame);
};

document.addEventListener("DOMContentLoaded", loadContent);
