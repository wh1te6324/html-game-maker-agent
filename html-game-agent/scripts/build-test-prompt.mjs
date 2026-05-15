import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const caseName = process.argv[2] ?? "canvas-dodge";
const casePath = path.join(root, "test-prompts", `${caseName}.md`);
const outDir = path.join(root, "tmp");
const outPath = path.join(outDir, `${caseName}.compiled.md`);

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

const sections = [
  ["IDENTITY", await read("IDENTITY.md")],
  ["SOUL", await read("SOUL.md")],
  ["USER GUIDE", await read("USER.md")],
  ["COLLABORATION", await read("AGENTS.md")],
  ["TEST USER PROMPT", await readFile(casePath, "utf8")]
];

const compiled = [
  "# HTML Game Maker Agent Test Prompt",
  "",
  "Use the following agent instructions, then answer the test user prompt as the agent.",
  "",
  ...sections.flatMap(([title, content]) => [
    `## ${title}`,
    "",
    content.trim(),
    ""
  ])
].join("\n");

await mkdir(outDir, { recursive: true });
await writeFile(outPath, compiled, "utf8");

console.log(`Compiled test prompt: ${outPath}`);
