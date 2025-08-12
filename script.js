const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let rat = {};
let score = 0;
let direction = 'right';
let gameOver = false;
let gameLoopTimeout;

// 🎵 Background music
const bgMusic = new Audio('flute-music-363036.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

function generateRat() {
    rat = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lime';
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    // Rat
    ctx.fillStyle = 'red';
    ctx.fillRect(rat.x * gridSize, rat.y * gridSize, gridSize, gridSize);
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function update() {
    if (gameOver) return;

    let head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // Wrap-around
    if (head.x < 0) head.x = (canvas.width / gridSize) - 1;
    else if (head.x >= canvas.width / gridSize) head.x = 0;
    if (head.y < 0) head.y = (canvas.height / gridSize) - 1;
    else if (head.y >= canvas.height / gridSize) head.y = 0;

    // Tail collision
    if (checkCollision(head)) {
        gameOver = true;
        alert(`Game Over! You touched your tail! Score: ${score}`);
        clearTimeout(gameLoopTimeout);
        bgMusic.pause();
        bgMusic.currentTime = 0;
        return;
    }

    snake.unshift(head);

    if (head.x === rat.x && head.y === rat.y) {
        score++;
        scoreElement.textContent = score;
        generateRat();
    } else {
        snake.pop();
    }

    draw();
}

function gameLoop() {
    update();
    gameLoopTimeout = setTimeout(gameLoop, 200);
}

function restartGame() {
    clearTimeout(gameLoopTimeout);
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    gameOver = false;
    scoreElement.textContent = score;
    generateRat();
    gameLoop();
    bgMusic.play();
}

restartBtn.addEventListener('click', restartGame);

// Start game
generateRat();
gameLoop();

// ===== MediaPipe Hands Setup =====
const videoElement = document.getElementById('input_video');
let lastFingerPos = null;
const fingerMoveThreshold = 15; // movement sensitivity

const hands = new Hands({
    locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480,
});
camera.start();

// Handle tracking results
function onResults(results) {
    if (gameOver) return;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const indexTip = landmarks[8];

        // Convert normalized coords to pixels
        const x = indexTip.x * videoElement.videoWidth;
        const y = indexTip.y * videoElement.videoHeight;

        if (lastFingerPos) {
            const dx = x - lastFingerPos.x;
            const dy = y - lastFingerPos.y;

            // Flip X-axis control to correct mirror effect
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx < -fingerMoveThreshold && direction !== 'left') {
                    direction = 'right';
                } else if (dx > fingerMoveThreshold && direction !== 'right') {
                    direction = 'left';
                }
            } else {
                if (dy > fingerMoveThreshold && direction !== 'up') {
                    direction = 'down';
                } else if (dy < -fingerMoveThreshold && direction !== 'down') {
                    direction = 'up';
                }
            }
        }

        lastFingerPos = { x, y };
    }
}

// Allow browser to start music after click
document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    }
}, { once: true });
