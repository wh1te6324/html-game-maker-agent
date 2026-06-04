# HTML Game Maker Agent

This repository contains a TalentHub-ready agent for generating polished, prompt-native HTML mini games.

## Current Version

`0.4.0` integrates a lightweight Claude-Code-Game-Studios-style generation pipeline:

- Prompt-driven requests are no longer narrowed into a default category pool.
- A compact studio pass runs before coding: Creative Director, Game Designer, Systems Designer, Level/UX Designer, Art Director, Gameplay Programmer, and QA Lead.
- Runtime structure is chosen from semantic player verbs, entities, state, HUD, fail pressure, and progression instead of fixed genre categories.
- Each game must include a mini art bible, prompt-specific entities, polished UI, responsive controls, and a reachable restart/end state.
- The StoryClaw workspace reporter and zip-only delivery rule remain mandatory.

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the installed StoryClaw workspace reporter. In current installs the reporter may be available at `workspace-<agent_name>/skills/storyclaw-workspace-reporter` or the legacy path `workspace-<agent_name>/skills/workspace-reporter`; use whichever path actually exists and can report a real writable web page workspace before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that the installed workspace reporter can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by the installed workspace reporter:

```text
<web-workspace-root>/<game-slug>/<game-slug>.zip
```

The zip must contain exactly the three playable game source files: `index.html`, `styles.css`, and `script.js`. Loose HTML/CSS/JS files are only temporary staging inputs and must not be the user-visible output. Do not create, describe, link, or deliver any extra browser entry file. If the zip cannot be created and verified, stop; do not return HTML files, HTML links, source-code blocks, or fake paths.

The workspace reporter skill is inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path, and never place game output in the independent host workspace just because it is writable; place game output only in the web page workspace root reported by it.

## Files

- `manifest.json` - TalentHub metadata.
- `IDENTITY.md` - Required core identity prompt.
- `STUDIO_WORKFLOW.md` - Studio-style prompt-to-game pipeline adapted from Claude Code Game Studios.
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

Before publishing a version update, run:

```bash
npm run prompt:test
npm run prompt:test:prompt-routing
npm run prompt:test:polish
npm run prompt:test:contract
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

The compiled prompt will be written to `tmp/semantic-studio.compiled.md`.

Add more scenarios by creating Markdown files in `test-prompts/`, then run:

```bash
node scripts/build-test-prompt.mjs your-case-name
```

## Package A Downloadable Game

The preferred delivery artifact is always a zip file in the generated game folder.

Package the three source files:

```bash
node html-game-agent/scripts/package-game.mjs <web-workspace-root>/<game-slug>
```

The package contains:

- `index.html`
- `styles.css`
- `script.js`

Give the user the generated zip path and tell them to download it, unzip it, then open `index.html`. Do not return an HTML entry link as the delivery artifact.
