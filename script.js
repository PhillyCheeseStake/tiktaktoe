// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

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

function handleClick(event) {
    const index = event.target.dataset.index;
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            showResult(`${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell)) {
            showResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
}

function hideResult() {
    resultScreen.style.display = 'none';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', hideResult);
