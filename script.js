import {
  buildAgentRequest,
  callOpenAICompatible,
  createMockGame,
  formatAgentResponse
} from "./agent-plugin.js";

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const scoreValue = document.querySelector("#scoreValue");
const bestValue = document.querySelector("#bestValue");
const speedValue = document.querySelector("#speedValue");
const generateButton = document.querySelector("#generateButton");
const mockButton = document.querySelector("#mockButton");
const copyContextButton = document.querySelector("#copyContextButton");
const resetPreviewButton = document.querySelector("#resetPreviewButton");
const gamePreview = document.querySelector("#gamePreview");
const gamePrompt = document.querySelector("#gamePrompt");
const apiEndpoint = document.querySelector("#apiEndpoint");
const apiKey = document.querySelector("#apiKey");
const modelName = document.querySelector("#modelName");
const agentLog = document.querySelector("#agentLog");
const stageLabel = document.querySelector("#stageLabel");
const stageTitle = document.querySelector("#stageTitle");

const state = {
  playerY: 0,
  velocity: 0,
  gravity: 0.58,
  jump: -10.8,
  score: 0,
  best: Number(localStorage.getItem("neonDashBest") || 0),
  speed: 4.4,
  obstacles: [],
  particles: [],
  gameOver: false,
  lastTime: 0,
  jumpsUsed: 0
};

const floorY = () => canvas.height - 74;
const player = {
  x: 118,
  size: 34
};

const setLog = (message) => {
  agentLog.textContent = message;
};

const resetGame = () => {
  state.playerY = floorY() - player.size;
  state.velocity = 0;
  state.score = 0;
  state.speed = 4.4;
  state.obstacles = [
    { x: canvas.width + 80, width: 34, height: 76 },
    { x: canvas.width + 430, width: 48, height: 112 }
  ];
  state.particles = [];
  state.gameOver = false;
  state.lastTime = performance.now();
  state.jumpsUsed = 0;
};

const jump = () => {
  if (gamePreview.hidden === false) return;

  if (state.gameOver) {
    resetGame();
    return;
  }

  if (state.jumpsUsed < 2) {
    state.velocity = state.jump;
    state.jumpsUsed += 1;
  }
};

const drawGrid = (time) => {
  ctx.strokeStyle = "rgba(201, 255, 47, 0.12)";
  ctx.lineWidth = 1;

  for (let x = -80; x < canvas.width + 80; x += 54) {
    const offset = (time * 0.04) % 54;
    ctx.beginPath();
    ctx.moveTo(x - offset, 0);
    ctx.lineTo(x - offset - 180, canvas.height);
    ctx.stroke();
  }

  for (let y = 70; y < canvas.height; y += 70) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
};

const drawPlayer = () => {
  const x = player.x;
  const y = state.playerY;
  const size = player.size;

  ctx.shadowColor = "#c9ff2f";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "#c9ff2f";
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#061005";
  ctx.fillRect(x + 9, y + 9, 6, 6);
  ctx.fillRect(x + 22, y + 9, 6, 6);
};

const drawObstacle = (obstacle) => {
  const y = floorY() - obstacle.height;
  ctx.shadowColor = "#5dff8a";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#5dff8a";
  ctx.fillRect(obstacle.x, y, obstacle.width, obstacle.height);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(6, 16, 5, 0.64)";
  ctx.fillRect(obstacle.x + 8, y + 10, obstacle.width - 16, obstacle.height - 20);
};

const drawParticles = () => {
  state.particles.forEach((particle) => {
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  ctx.globalAlpha = 1;
};

const checkCollision = (obstacle) => {
  const playerRight = player.x + player.size;
  const playerBottom = state.playerY + player.size;
  const obstacleTop = floorY() - obstacle.height;

  return (
    player.x < obstacle.x + obstacle.width &&
    playerRight > obstacle.x &&
    state.playerY < floorY() &&
    playerBottom > obstacleTop
  );
};

const updateGame = (time) => {
  const delta = Math.min((time - state.lastTime) / 16.67, 2);
  state.lastTime = time;

  if (!state.gameOver) {
    state.velocity += state.gravity * delta;
    state.playerY += state.velocity * delta;

    if (state.playerY > floorY() - player.size) {
      state.playerY = floorY() - player.size;
      state.velocity = 0;
      state.jumpsUsed = 0;
    }

    state.speed += 0.0026 * delta;
    state.score += Math.round(delta);

    state.obstacles.forEach((obstacle) => {
      obstacle.x -= state.speed * delta;
      if (checkCollision(obstacle)) {
        state.gameOver = true;
        state.best = Math.max(state.best, state.score);
        localStorage.setItem("neonDashBest", String(state.best));
      }
    });

    state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -20);

    if (state.obstacles.length < 3) {
      const lastX = state.obstacles.length ? state.obstacles[state.obstacles.length - 1].x : canvas.width;
      state.obstacles.push({
        x: Math.max(canvas.width + 80, lastX + 260 + Math.random() * 190),
        width: 30 + Math.random() * 30,
        height: 58 + Math.random() * 90
      });
    }

    state.particles.push({
      x: player.x - 12,
      y: state.playerY + player.size - 5,
      size: 4 + Math.random() * 5,
      life: 1,
      color: Math.random() > 0.5 ? "#c9ff2f" : "#5dff8a"
    });
  }

  state.particles.forEach((particle) => {
    particle.x -= (state.speed + 2) * delta;
    particle.life -= 0.036 * delta;
  });
  state.particles = state.particles.filter((particle) => particle.life > 0);
};

const drawGame = (time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#020302");
  gradient.addColorStop(0.58, "#071009");
  gradient.addColorStop(1, "#020302");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid(time);

  ctx.fillStyle = "rgba(201, 255, 47, 0.92)";
  ctx.fillRect(0, floorY(), canvas.width, 4);
  ctx.fillStyle = "rgba(201, 255, 47, 0.08)";
  ctx.fillRect(0, floorY() + 4, canvas.width, canvas.height - floorY());

  drawParticles();
  state.obstacles.forEach(drawObstacle);
  drawPlayer();

  if (state.gameOver) {
    ctx.fillStyle = "rgba(2, 3, 2, 0.68)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c9ff2f";
    ctx.font = "900 56px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 18);
    ctx.fillStyle = "#f2f8ef";
    ctx.font = "700 22px Inter, sans-serif";
    ctx.fillText("Click or press Space to restart", canvas.width / 2, canvas.height / 2 + 28);
    ctx.textAlign = "left";
  }

  scoreValue.textContent = state.score;
  bestValue.textContent = state.best;
  speedValue.textContent = `${(state.speed / 4.4).toFixed(1)}x`;
};

const loop = (time) => {
  if (gamePreview.hidden) {
    updateGame(time);
    drawGame(time);
  }
  requestAnimationFrame(loop);
};

const renderGeneratedHtml = (html, title = "Generated Game") => {
  gamePreview.srcdoc = html;
  gamePreview.hidden = false;
  canvas.hidden = true;
  stageLabel.textContent = "Generated by agent";
  stageTitle.textContent = title;
};

const renderAgentResponse = (modelText) => {
  gamePreview.srcdoc = formatAgentResponse(modelText);
  gamePreview.hidden = false;
  canvas.hidden = true;
  stageLabel.textContent = "Agent zip response";
  stageTitle.textContent = "Zip Delivery";
};

const showDemo = () => {
  gamePreview.hidden = true;
  gamePreview.srcdoc = "";
  canvas.hidden = false;
  stageLabel.textContent = "Agent preview";
  stageTitle.textContent = "Neon Dash";
  setLog("Demo reset. Enter a prompt and generate again.");
  resetGame();
};

const runMock = () => {
  const html = createMockGame(gamePrompt.value);
  renderGeneratedHtml(html, "Mock Game");
  setLog("Rendered local mock. This verifies the website-to-game-area plugin flow without calling an API.");
};

const generateWithAgent = async () => {
  const endpoint = apiEndpoint.value.trim();
  const key = apiKey.value.trim();
  const model = modelName.value.trim();
  const prompt = gamePrompt.value.trim();

  if (!prompt) {
    setLog("Please enter a game prompt first.");
    return;
  }

  if (!endpoint || !key) {
    runMock();
    return;
  }

  generateButton.disabled = true;
  generateButton.textContent = "Generating...";
  setLog("Calling model with zip-only HTML Game Maker context...");

  try {
    localStorage.setItem("gameAgentEndpoint", endpoint);
    localStorage.setItem("gameAgentModel", model);
    localStorage.setItem("gameAgentKey", key);
    const modelText = await callOpenAICompatible({ endpoint, apiKey: key, model, prompt });
    renderAgentResponse(modelText);
    setLog("Agent response received. Use the returned zip path; standalone HTML is not a valid delivery artifact.");
  } catch (error) {
    console.error(error);
    setLog(error.message);
  } finally {
    generateButton.disabled = false;
    generateButton.textContent = "Request zip package";
  }
};

const copyAgentRequest = async () => {
  const request = buildAgentRequest(gamePrompt.value);
  await navigator.clipboard.writeText(request);
  setLog("Agent request copied. You can still paste it into any external model if needed.");
};

const restoreSavedSettings = () => {
  apiEndpoint.value = localStorage.getItem("gameAgentEndpoint") || "";
  modelName.value = localStorage.getItem("gameAgentModel") || modelName.value;
  apiKey.value = localStorage.getItem("gameAgentKey") || "";
};

canvas.addEventListener("pointerdown", jump);
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    jump();
  }
});
generateButton.addEventListener("click", generateWithAgent);
mockButton.addEventListener("click", runMock);
copyContextButton.addEventListener("click", copyAgentRequest);
resetPreviewButton.addEventListener("click", showDemo);

restoreSavedSettings();
resetGame();
requestAnimationFrame(loop);
