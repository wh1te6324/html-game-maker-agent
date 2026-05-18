import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const gameDirArg = process.argv[2];

if (!gameDirArg) {
  console.error("Usage: node scripts/bundle-game.mjs <web-workspace-root>/<game-slug>");
  process.exit(1);
}

const gameDir = path.resolve(gameDirArg);
const indexPath = path.join(gameDir, "index.html");
const stylesPath = path.join(gameDir, "styles.css");
const scriptPath = path.join(gameDir, "script.js");
const playPath = path.join(gameDir, "play.html");

let html = await readFile(indexPath, "utf8");
const css = await readFile(stylesPath, "utf8").catch(() => "");
const js = await readFile(scriptPath, "utf8").catch(() => "");

if (css) {
  html = html.replace(/<link\s+[^>]*href=["']\.\/?styles\.css["'][^>]*>\s*/i, "");
}

if (js) {
  html = html.replace(/<script\s+[^>]*src=["']\.\/?script\.js["'][^>]*>\s*<\/script>\s*/i, "");
}

if (css && !html.includes("<style data-bundled=\"styles.css\">")) {
  html = html.replace(
    /<\/head>/i,
    `<style data-bundled="styles.css">\n${css}\n</style>\n</head>`
  );
}

if (js && !html.includes("<script data-bundled=\"script.js\">")) {
  html = html.replace(
    /<\/body>/i,
    `<script data-bundled="script.js">\n${js.replaceAll("</script>", "<\\/script>")}\n</script>\n</body>`
  );
}

await writeFile(playPath, html, "utf8");
console.log(`Bundled playable file: ${playPath}`);
