"use strict";
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
const setupView = document.getElementById("setup-view");
const gameView = document.getElementById("game-view");
const setupForm = document.getElementById("setup-form");
const playerXInput = document.getElementById("player-x-name");
const playerOInput = document.getElementById("player-o-name");
const boardElement = document.getElementById("game-board");
const cells = Array.from(boardElement.querySelectorAll(".cell"));
const turnToken = document.getElementById("turn-token");
const turnMessage = document.getElementById("turn-message");
const resultModal = document.getElementById("result-modal");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");
const scores = { X: 0, O: 0, draws: 0 };
let board = Array(9).fill("");
let currentPlayer = "X";
let playerNames = { X: "Player X", O: "Player O" };
let gameIsActive = false;
function startGame(event) {
	if (event) event.preventDefault();
	playerNames.X = playerXInput.value.trim() || "Player X";
	playerNames.O = playerOInput.value.trim() || "Player O";
	document.getElementById("score-name-x").textContent = playerNames.X;
	document.getElementById("score-name-o").textContent = playerNames.O;
	document.getElementById("score-x").setAttribute("aria-label", `${playerNames.X} score`);
	document.getElementById("score-o").setAttribute("aria-label", `${playerNames.O} score`);
	setupView.hidden = true;
	gameView.hidden = false;
	resetBoard();
	cells[0].focus();
}
function handleCellClick(event) {
	const index = Number(event.currentTarget.dataset.index);
	if (!gameIsActive || board[index] !== "") return;
	makeMove(currentPlayer, index);
}
function makeMove(player, index) {
	if (!gameIsActive || board[index] !== "") return;
	board[index] = player;
	updateBoard();
	const winningLine = checkWinner();
	if (winningLine) {
		winningLine.forEach((cellIndex) => cells[cellIndex].classList.add("winning-cell"));
		gameIsActive = false;
		updateTurn(`${playerNames[player]} wins!`);
		scores[player] += 1;
		updateScore();
		showResult("win", player);
		return;
	}
	if (checkDraw()) {
		gameIsActive = false;
		updateTurn("It's a Draw!");
		scores.draws += 1;
		updateScore();
		showResult("draw");
		return;
	}
	currentPlayer = player === "X" ? "O" : "X";
	updateTurn();
}
function checkWinner() {
	return winningCombinations.find((combination) => {
		const [first, second, third] = combination;
		return board[first] !== "" && board[first] === board[second] && board[first] === board[third];
	}) || null;
}
function checkDraw() {
	return board.every((cell) => cell !== "");
}
function updateBoard() {
	cells.forEach((cell, index) => {
		const mark = board[index];
		cell.textContent = mark;
		cell.classList.toggle("mark-x", mark === "X");
		cell.classList.toggle("mark-o", mark === "O");
		cell.setAttribute("aria-label", `Cell ${index + 1}, ${mark || "empty"}`);
		cell.disabled = !gameIsActive || mark !== "";
	});
}
function updateTurn(terminalMessage) {
	turnToken.textContent = currentPlayer;
	turnToken.classList.toggle("token-x", currentPlayer === "X");
	turnToken.classList.toggle("token-o", currentPlayer === "O");
	turnMessage.textContent = terminalMessage || `${playerNames[currentPlayer]}'s turn`;
	updateBoard();
}
function updateScore() {
	document.getElementById("score-x").textContent = String(scores.X);
	document.getElementById("score-o").textContent = String(scores.O);
	document.getElementById("score-draws").textContent = String(scores.draws);
}
function resetBoard() {
	board = Array(9).fill("");
	currentPlayer = "X";
	gameIsActive = true;
	cells.forEach((cell) => cell.classList.remove("winning-cell", "mark-x", "mark-o"));
	updateTurn();
}
function resetScore() {
	if (!window.confirm("Reset all scores to zero?")) return;
	scores.X = 0;
	scores.O = 0;
	scores.draws = 0;
	updateScore();
}
function showResult(result, winner) {
	if (result === "draw") {
		resultIcon.textContent = "🤝";
		resultTitle.textContent = "It's a Draw!";
		resultMessage.textContent = "Good game!";
	} else {
		resultIcon.textContent = "🎉";
		resultTitle.textContent = `${playerNames[winner]} wins!`;
		resultMessage.textContent = "Congratulations!";
	}
	resultModal.showModal();
	document.getElementById("modal-play-again-button").focus();
}
function hideResult() {
	if (resultModal.open) resultModal.close();
}
function returnToMenu() {
	gameIsActive = false;
	hideResult();
	gameView.hidden = true;
	setupView.hidden = false;
	playerXInput.value = playerNames.X;
	playerOInput.value = playerNames.O;
	document.getElementById("brand-link").focus();
}
setupForm.addEventListener("submit", startGame);
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
document.getElementById("play-again-button").addEventListener("click", resetBoard);
document.getElementById("modal-play-again-button").addEventListener("click", () => {
	hideResult();
	resetBoard();
	cells[0].focus();
});
document.getElementById("main-menu-button").addEventListener("click", returnToMenu);
document.getElementById("top-menu-button").addEventListener("click", returnToMenu);
document.getElementById("modal-menu-button").addEventListener("click", returnToMenu);
document.getElementById("reset-score-button").addEventListener("click", resetScore);
document.getElementById("brand-link").addEventListener("click", (event) => {
	event.preventDefault();
	if (!gameView.hidden) returnToMenu();
});
updateScore();