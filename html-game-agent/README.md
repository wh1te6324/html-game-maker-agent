# HTML Game Maker Agent

This repository contains a TalentHub-ready agent for generating polished HTML mini games.

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the user's current workspace. It does not mean a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the StoryClaw per-installation workspace reporter at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the workspace:

```text
published-games/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. The task is not complete until the zip file has been created and verified in the workspace.

The `workspace-<agent_name>/skills/storyclaw-workspace-reporter` path is the StoryClaw reporter skill inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path; place game output in the real writable workspace reported by it.

## Files

- `manifest.json` - TalentHub metadata.
- `IDENTITY.md` - Required core identity prompt.
- `USER.md` - User-facing usage guide.
- `SOUL.md` - Personality, principles, and boundaries.
- `AGENTS.md` - Collaboration guidance for multi-agent workflows.

## Publish

Install and log in to the TalentHub CLI first:

```bash
npm install -g @storyclaw/talenthub
talenthub login
```

Then publish from this directory:

```bash
talenthub agent publish --dir .
```

If you run the command from the parent repository:

```bash
talenthub agent publish --dir ./html-game-agent
```

## Test The Prompt

Build a compiled prompt that combines the agent instructions with a sample user request:

```bash
npm run prompt:test
```

If npm is not available, run the script directly:

```bash
node scripts/build-test-prompt.mjs
```

The compiled prompt will be written to `tmp/canvas-dodge.compiled.md`.

Other included cases:

```bash
npm run prompt:test:single-file
npm run prompt:test:canvas
```

Paste the compiled prompt into the model or agent runtime you want to evaluate. Add more scenarios by creating Markdown files in `test-prompts/`, then run:

```bash
node scripts/build-test-prompt.mjs your-case-name
```

## Package A Downloadable Game

The preferred delivery artifact is now a zip file in the generated game folder.

Create `play.html` and package the source files:

```bash
node html-game-agent/scripts/package-game.mjs published-games/meteor-dodge
```

The package contains:

- `index.html`
- `styles.css`
- `script.js`
- `play.html`

Give the user the generated zip path and tell them to unzip it, then open `play.html`.
