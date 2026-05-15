# HTML Game Maker Agent

This repository contains a TalentHub-ready agent for generating polished HTML mini games.

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
