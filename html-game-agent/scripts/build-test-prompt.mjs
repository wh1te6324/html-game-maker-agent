import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const caseName = process.argv[2] ?? "semantic-studio";
const casePath = path.join(root, "test-prompts", `${caseName}.md`);
const outDir = path.join(root, "tmp");
const outPath = path.join(outDir, `${caseName}.compiled.md`);

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function readOptional(relativePath) {
  try {
    return await read(relativePath);
  } catch {
    return "";
  }
}

const subagentFiles = [
  ".claude/agents/producer.md",
  ".claude/agents/creative-director.md",
  ".claude/agents/game-designer.md",
  ".claude/agents/systems-designer.md",
  ".claude/agents/ux-designer.md",
  ".claude/agents/art-director.md",
  ".claude/agents/visual-development-artist.md",
  ".claude/agents/asset-designer.md",
  ".claude/agents/vfx-artist.md",
  ".claude/agents/ui-hud-artist.md",
  ".claude/agents/technical-artist.md",
  ".claude/agents/gameplay-programmer.md",
  ".claude/agents/qa-playtester.md"
];

const subagentContext = (await Promise.all(subagentFiles.map(async (filePath) => {
  const content = await readOptional(filePath);
  return content ? `--- ${filePath} ---\n${content.trim()}` : "";
}))).filter(Boolean).join("\n\n");

const sections = [
  ["IDENTITY", await read("IDENTITY.md")],
  ["STUDIO WORKFLOW", await read("STUDIO_WORKFLOW.md")],
  ["SUBAGENT ARCHITECTURE", await read("SUBAGENT_ARCHITECTURE.md")],
  ["VIRTUAL SUBAGENTS", subagentContext],
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
