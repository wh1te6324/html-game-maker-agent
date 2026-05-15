import { execFileSync } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";

const gameDirArg = process.argv[2];

if (!gameDirArg) {
  console.error("Usage: node scripts/build-play-link.mjs published-games/<game-slug>");
  process.exit(1);
}

const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const gameDir = path.resolve(repoRoot, gameDirArg);
const indexPath = path.join(gameDir, "index.html");
const bundledPath = path.join(gameDir, "play.html");

await access(indexPath);
let playablePath = bundledPath;

try {
  await access(bundledPath);
} catch {
  playablePath = indexPath;
}

const relativeIndex = path.relative(repoRoot, playablePath).replaceAll(path.sep, "/");
const remote = execFileSync("git", ["remote", "get-url", "origin"], { encoding: "utf8" }).trim();
const match = remote.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/i);

if (!match) {
  console.log(`Local file: ${indexPath}`);
  process.exit(0);
}

const owner = match[1];
const repo = match[2];
const encodedPath = relativeIndex.split("/").map(encodeURIComponent).join("/");

console.log(`Player link: https://raw.githack.com/${owner}/${repo}/${commit}/${encodedPath}`);
console.log(`GitHub file: https://github.com/${owner}/${repo}/blob/${commit}/${encodedPath}`);
