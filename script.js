const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} выиграл!`);
    } else if (isDraw()) {
        alert('Ничья!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function placeMark(cell, currentPlayer) {
    cell.textContent = currentPlayer;
}

function checkWin(currentPlayer) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}
