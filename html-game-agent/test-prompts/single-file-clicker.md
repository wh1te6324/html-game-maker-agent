# Test Prompt: Single File Clicker Game

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the installed StoryClaw workspace reporter. In current installs the reporter may be available at `workspace-<agent_name>/skills/storyclaw-workspace-reporter` or the legacy path `workspace-<agent_name>/skills/workspace-reporter`; use whichever path actually exists and can report a real writable web page workspace before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that the installed workspace reporter can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by the installed workspace reporter, not inside the agent host's local workspace and not inside any arbitrary local folder:

```text
<web-workspace-root>/<game-slug>/<game-slug>.zip
```

The zip must contain exactly `index.html`, `styles.css`, and `script.js`. Do not return HTML files, HTML links, source-code blocks, loose file paths, or fake paths.

## User Request

Create a small browser game with the theme "alchemy reaction challenge".

Requirements:

- The game may be implemented as a self-contained `index.html`, but the final artifact must still be a zip.
- Also create `styles.css` and `script.js` as package files, even if they are minimal.
- The player clicks the correct ingredient combinations before the timer ends.
- Include at least 8 recipes.
- Include combo, countdown, failure feedback, win feedback, and restart behavior.
- Support mobile screens.
- Do not use any external CDN or images.
- Temporarily prepare only `index.html`, `styles.css`, and `script.js` in `<web-workspace-root>/alchemy-clicker/`.
- Package those three files into `<web-workspace-root>/alchemy-clicker/alchemy-clicker.zip`.
- Final response must output only the zip path plus a short download/unzip/open instruction.
