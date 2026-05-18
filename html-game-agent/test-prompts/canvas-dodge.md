# Test Prompt: Canvas Dodge Game

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

Create a browser mini game: the player controls a glowing small ship and dodges meteors falling from above.

Requirements:

- Use Canvas.
- Support keyboard arrow keys and mobile drag controls.
- Include score, high score, lives, start, pause, restart, and game-over states.
- Difficulty should gradually increase over time.
- Visual style should feel like a neon arcade street without external images.
- Temporarily prepare only `index.html`, `styles.css`, and `script.js` in `<web-workspace-root>/meteor-dodge/`.
- Package those three files into `<web-workspace-root>/meteor-dodge/meteor-dodge.zip`.
- Final response must output only the zip path plus a short download/unzip/open instruction.
