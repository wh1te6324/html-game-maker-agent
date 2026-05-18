export const agentSystemPrompt = `You are HTML Game Maker, a creative coding agent that turns rough game ideas into playable browser mini games.

Mandatory delivery contract:
- Create the actual playable experience, not a landing page.
- Think briefly, then build. Do not produce long planning text before writing files.
- Use vanilla HTML, CSS, and JavaScript.
- Create only index.html, styles.css, and script.js as temporary staging files.
- The only user-facing deliverable is a verified zip file in the real web page workspace.
- Zip path: <web-workspace-root>/<game-slug>/<game-slug>.zip.
- The zip must contain exactly index.html, styles.css, and script.js.
- Confirm the writable web page workspace through the installed StoryClaw workspace reporter.
- If the reporter is missing, no writable workspace is available, or the zip cannot be verified, stop and report that blocker.
- Do not fall back to a standalone HTML document, HTML link, code fence, loose source files, hosted preview, or fake path.
- Final response must point to the zip path, tell the user to download/unzip/open index.html, and briefly note controls.`;

export function buildAgentRequest(userPrompt) {
  return [
    agentSystemPrompt,
    "",
    "User game request:",
    userPrompt.trim(),
    "",
    "Delivery target:",
    "Create and verify the required zip in the real web page workspace. Return the zip path as the primary artifact. If no writable web workspace is available, stop instead of returning HTML."
  ].join("\n");
}

export async function callOpenAICompatible({ endpoint, apiKey, model, prompt }) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: agentSystemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`API request failed: ${response.status} ${detail.slice(0, 240)}`);
  }

  const data = await response.json();
  return (
    data.choices?.[0]?.message?.content ??
    data.output_text ??
    data.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("\n") ??
    ""
  );
}

export function formatAgentResponse(modelText) {
  const candidate = modelText.trim() || "The agent returned an empty response.";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Agent Zip Response</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #090d0b; color: #f2f8ef; font: 16px system-ui; }
    pre { white-space: pre-wrap; max-width: 82ch; padding: 24px; border: 1px solid rgba(201,255,47,.25); border-radius: 8px; }
  </style>
</head>
<body>
  <pre>${escapeHtml(candidate)}</pre>
</body>
</html>`;
}

export function createMockGame(prompt) {
  const cleanPrompt = escapeHtml(prompt.trim() || "HTML mini game");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mock Generated Game</title>
  <style>
    :root { color-scheme: dark; --neon: #c9ff2f; --cyan: #75f4ff; --pink: #ff4fd8; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: radial-gradient(circle at 50% 0%, #17302a, #030403 62%); color: #f4fff4; font-family: Inter, system-ui, sans-serif; overflow: hidden; }
    .hud { position: fixed; inset: 18px 18px auto; display: flex; justify-content: space-between; gap: 12px; z-index: 2; font-weight: 900; }
    .hud span, button { border: 1px solid rgba(201,255,47,.34); border-radius: 8px; background: rgba(5,10,7,.72); color: #f4fff4; padding: 10px 12px; }
    button { cursor: pointer; color: #061005; background: var(--neon); }
    canvas { display: block; width: 100vw; height: 100vh; }
    .brief { position: fixed; left: 18px; right: 18px; bottom: 16px; color: rgba(244,255,244,.76); font-size: 13px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="hud">
    <span>Score <b id="score">0</b></span>
    <span>Lives <b id="lives">3</b></span>
    <button id="restart">Restart</button>
  </div>
  <canvas id="c"></canvas>
  <div class="brief">Mock preview generated from prompt: ${cleanPrompt}</div>
  <script>
    const canvas = document.querySelector("#c");
    const ctx = canvas.getContext("2d");
    const scoreEl = document.querySelector("#score");
    const livesEl = document.querySelector("#lives");
    const ship = { x: 120, y: 220, r: 18 };
    const state = { score: 0, lives: 3, speed: 2.8, rocks: [], keys: new Set(), over: false };
    function resize(){ canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); ship.y = Math.min(ship.y, innerHeight - 80); }
    function reset(){ state.score = 0; state.lives = 3; state.speed = 2.8; state.rocks = []; state.over = false; ship.x = Math.min(140, innerWidth * .28); ship.y = innerHeight / 2; }
    function spawn(){ state.rocks.push({ x: innerWidth + 40, y: 80 + Math.random() * (innerHeight - 160), r: 16 + Math.random() * 28, hue: Math.random() > .5 ? "#75f4ff" : "#ff4fd8" }); }
    function hit(a,b){ return Math.hypot(a.x-b.x,a.y-b.y) < a.r + b.r; }
    function update(){
      if (!state.over) {
        if (state.keys.has("ArrowUp")) ship.y -= 6;
        if (state.keys.has("ArrowDown")) ship.y += 6;
        if (state.keys.has("ArrowLeft")) ship.x -= 6;
        if (state.keys.has("ArrowRight")) ship.x += 6;
        ship.x = Math.max(24, Math.min(innerWidth - 24, ship.x));
        ship.y = Math.max(70, Math.min(innerHeight - 48, ship.y));
        if (Math.random() < .026) spawn();
        state.speed += .0015;
        state.score += 1;
        for (const rock of state.rocks) {
          rock.x -= state.speed;
          if (hit(ship, rock)) { rock.x = -999; state.lives -= 1; if (state.lives <= 0) state.over = true; }
        }
        state.rocks = state.rocks.filter((rock) => rock.x > -90);
      }
      scoreEl.textContent = state.score;
      livesEl.textContent = state.lives;
    }
    function draw(t){
      ctx.clearRect(0,0,innerWidth,innerHeight);
      ctx.fillStyle = "rgba(201,255,47,.08)";
      for(let y=80; y<innerHeight; y+=54){ ctx.fillRect(0, y + Math.sin(t/700+y)*4, innerWidth, 1); }
      ctx.shadowBlur = 22; ctx.shadowColor = "#c9ff2f"; ctx.fillStyle = "#c9ff2f";
      ctx.beginPath(); ctx.moveTo(ship.x+24, ship.y); ctx.lineTo(ship.x-18, ship.y-16); ctx.lineTo(ship.x-8, ship.y); ctx.lineTo(ship.x-18, ship.y+16); ctx.closePath(); ctx.fill();
      for (const rock of state.rocks) { ctx.shadowColor = rock.hue; ctx.fillStyle = rock.hue; ctx.beginPath(); ctx.arc(rock.x, rock.y, rock.r, 0, Math.PI*2); ctx.fill(); }
      ctx.shadowBlur = 0;
      if (state.over) { ctx.fillStyle = "rgba(0,0,0,.62)"; ctx.fillRect(0,0,innerWidth,innerHeight); ctx.fillStyle = "#c9ff2f"; ctx.font = "900 54px system-ui"; ctx.textAlign = "center"; ctx.fillText("GAME OVER", innerWidth/2, innerHeight/2); }
    }
    function loop(t){ update(); draw(t); requestAnimationFrame(loop); }
    addEventListener("resize", resize);
    addEventListener("keydown", (e) => state.keys.add(e.code));
    addEventListener("keyup", (e) => state.keys.delete(e.code));
    addEventListener("pointermove", (e) => { if (e.buttons || e.pointerType === "touch") { ship.x = e.clientX; ship.y = e.clientY; } });
    document.querySelector("#restart").onclick = reset;
    resize(); reset(); requestAnimationFrame(loop);
  <\/script>
</body>
</html>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
