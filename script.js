const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
let gameActive = true;
const restartButton = document.getElementById('restartButton');
const statusDisplay = document.querySelector('.game-status');

restartButton.addEventListener('click', restartGame);

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
        gameOver(false);
    } else if (checkDraw()) {
        gameOver(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatusDisplay();
    }
}

function checkWin() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningConditions.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function gameOver(draw) {
    if (draw) {
        statusDisplay.textContent = 'Ничья!';
    } else {
        statusDisplay.textContent = `${currentPlayer === 'X' ? 'Крестик' : 'Нолик'} выиграл!`;
    }
    gameActive = false;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    updateStatusDisplay();
}

function updateStatusDisplay() {
    statusDisplay.textContent = `${currentPlayer === 'X' ? "Ходят крестики" : "Ходят нолики"}`;
}
