document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    let isMouseDown = false;
    let selectedBall = null;

    let playerSize = 30;
    let playerPositionX = 285;
    let playerPositionY = 185;
    let score = 0;

    player.style.width = `${playerSize}px`;
    player.style.height = `${playerSize}px`;
    player.style.left = `${playerPositionX}px`;
    player.style.top = `${playerPositionY}px`;

    document.addEventListener('keydown', (event) => {
        const step = 5;
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 37: // Left arrow
                playerPositionX -= step;
                break;
            case 38: // Up arrow
                playerPositionY -= step;
                break;
            case 39: // Right arrow
                playerPositionX += step;
                break;
            case 40: // Down arrow
                playerPositionY += step;
                break;
        }

        if (playerPositionX < 0) playerPositionX = 0;
        if (playerPositionX > gameContainer.offsetWidth - playerSize) playerPositionX = gameContainer.offsetWidth - playerSize;
        if (playerPositionY < 0) playerPositionY = 0;
        if (playerPositionY > gameContainer.offsetHeight - playerSize) playerPositionY = gameContainer.offsetHeight - playerSize;

        player.style.left = `${playerPositionX}px`;
        player.style.top = `${playerPositionY}px`;

        // Проверка столкновения игрока с границами игрового поля
        const playerRect = player.getBoundingClientRect();
        const gameRect = gameContainer.getBoundingClientRect();
        if (playerRect.left < gameRect.left ||
            playerRect.top < gameRect.top ||
            playerRect.right > gameRect.right ||
            playerRect.bottom > gameRect.bottom) {
            gameOver();
        }
    });

    function createBall() {
        const ball = document.createElement('div');
        const ballSize = Math.floor(Math.random() * 20) + 10; // случайный размер шарика от 10 до 30 пикселей
        const maxX = gameContainer.offsetWidth - ballSize;
        const randomX = Math.floor(Math.random() * maxX);

        ball.className = 'ball';
        ball.style.width = `${ballSize}px`;
        ball.style.height = `${ballSize}px`;
        ball.style.left = `${randomX}px`;
        ball.style.top = `0px`; // начальная позиция шарика - вверху игрового поля
        ball.style.backgroundColor = 'red'; // Цвет красного шарика
        ball.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            selectedBall = ball;
        });
        document.addEventListener('mousemove', moveBall);
        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            selectedBall = null;
        });
        gameContainer.appendChild(ball);

        // Анимация падения шарика
        setInterval(() => {
            const ballRect = ball.getBoundingClientRect();
            const gameRect = gameContainer.getBoundingClientRect();
            if (ballRect.bottom < gameRect.bottom) {
                ball.style.top = `${ballRect.top + 5}px`; // увеличиваем координату Y шарика на 5 пикселей
            }
        }, 100); // Обновление позиции шарика каждые 100 миллисекунд
    }

    // Создание новых шариков каждые 3 секунды
    setInterval(createBall, 3000);

    // Обработка конца игры
    function gameOver() {
        alert('Game Over! Your score: ' + score);
        window.location.reload(); // Перезагрузка страницы для новой игры
    }

    // Передвижение красного шарика мышью
    function moveBall(event) {
        if (isMouseDown && selectedBall) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const gameRect = gameContainer.getBoundingClientRect();
            const offsetX = mouseX - gameRect.left;
            const offsetY = mouseY - gameRect.top;
            selectedBall.style.left = `${offsetX}px`;
            selectedBall.style.top = `${offsetY}px`;
        }
    }
});
