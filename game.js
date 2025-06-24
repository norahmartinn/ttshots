const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

let ball, hoop, score, timeLeft, gameOver, playing;

function initGame() {
  ball = {
    x: 200,
    y: 500,
    radius: 15,
    velocity: 0,
    gravity: 0.5,
    boost: -10
  };

  hoop = {
    x: Math.random() * 300 + 50,
    y: Math.random() * 300 + 100,
    width: 60,
    height: 10
  };

  score = 0;
  timeLeft = 3;
  gameOver = false;
  playing = true;
  scoreDiv.textContent = "Score: 0";
}

function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  scoreDiv.style.display = "block";
  gameOverScreen.style.display = "none";
  initGame();
}

function restartGame() {
  gameOverScreen.style.display = "none";
  canvas.style.display = "block";
  scoreDiv.style.display = "block";
  initGame();
}

canvas.addEventListener("click", () => {
  if (!gameOver && playing) {
    ball.velocity = ball.boost;
  }
});

function update() {
  if (!playing) return;

  ball.velocity += ball.gravity;
  ball.y += ball.velocity;

  // Encesta
  if (
    ball.x > hoop.x &&
    ball.x < hoop.x + hoop.width &&
    Math.abs(ball.y - hoop.y) < 5 &&
    ball.velocity > 0
  ) {
    score++;
    scoreDiv.textContent = "Score: " + score;
    hoop.x = Math.random() * 300 + 50;
    hoop.y = Math.random() * 300 + 100;
    ball.y = 500;
    ball.velocity = 0;
    timeLeft = 3;
  }

  // Fuera de la pantalla o tiempo agotado
  if (ball.y > canvas.height || timeLeft <= 0) {
    playing = false;
    gameOver = true;
    finalScore.textContent = "Puntuación: " + score;
    canvas.style.display = "none";
    scoreDiv.style.display = "none";
    gameOverScreen.style.display = "flex";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aro
  ctx.fillStyle = "orange";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

  // Pelota
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function countdown() {
  if (!gameOver && playing) {
    timeLeft -= 1;
  }
}

setInterval(countdown, 1000);

function loop() {
  if (playing) {
    update();
  }
  if (playing || gameOver) {
    draw();
  }
  requestAnimationFrame(loop);
}

loop();
