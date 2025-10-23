"use strict";

const reset = document.querySelector(".btn");
let boxes = document.querySelectorAll(".box");
const result = document.querySelector(".result");
const xTurn = "X";
const oTurn = "O";
let currentTurn = true;
const gameboard = {
  arr: [],
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

let player1, player2;
let arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function placeMark(box, currTurn) {
  box.innerText = currTurn;
  currentTurn = !currentTurn;
}

function endGame(winner) {
  if (winner === "X" || winner === "O")
    result.textContent = `Player ${winner} wins the game`;
  else result.textContent = "Draw";
  boxes.forEach((box) => {
    box.classList.add("disabled");
  });
}

function isDraw() {
  let dCheck = [...boxes].every((box) => {
    return box.classList.contains("disabled");
  });
  return dCheck;
}

function checkWinner() {
  for (let combo of winningCombos) {
    let pos0 = boxes[combo[0]].innerText;
    let pos1 = boxes[combo[1]].innerText;
    let pos2 = boxes[combo[2]].innerText;
    if (pos0 !== "" && pos1 !== "" && pos2 !== "") {
      if (pos0 === pos1 && pos1 === pos2) {
        endGame(pos0);
        return;
      }
    }
  }
  if (isDraw()) {
    endGame("Draw");
    return;
  }
}

function handleCick(e) {
  const box = e.target;
  const currTurn = currentTurn ? oTurn : xTurn;
  placeMark(box, currTurn);
  box.classList.add("disabled");
  checkWinner();
}

boxes.forEach((box) => {
  box.addEventListener("click", handleCick);
});

function resetBoard() {
  result.textContent = "Player O begins game";
  currentTurn = true;
  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("disabled");
  });
}

reset.addEventListener("click", resetBoard);
