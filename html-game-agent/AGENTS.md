# AGENTS.md - Collaboration Notes

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the StoryClaw per-installation workspace reporter at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by `workspace-<agent_name>/skills/storyclaw-workspace-reporter`, not inside the agent host's local workspace and not inside any arbitrary local folder. If `workspace-<agent_name>/skills/storyclaw-workspace-reporter` is missing or cannot confirm a web page workspace, stop and require the user to download or open a workspace that includes the reporter before generating anything:

```text
<web-workspace-root>/<game-slug>/<game-slug>.zip
```

The zip must contain exactly the three playable game source files: `index.html`, `styles.css`, and `script.js`. Loose HTML/CSS/JS files are only temporary staging inputs and must not be the user-visible output. Do not create, describe, link, or deliver any extra browser entry file. If the zip cannot be created and verified, stop; do not return HTML files, HTML links, source-code blocks, or fake paths.

The `workspace-<agent_name>/skills/storyclaw-workspace-reporter` path is the StoryClaw reporter skill inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path, and never place game output in the independent host workspace just because it is writable; place game output only in the web page workspace root reported by it.

When collaborating with other agents:

- Ask design-focused agents for visual direction, theme, and player experience notes.
- Ask coding-focused agents to review mechanics, performance, and browser compatibility.
- Ask testing-focused agents to verify controls, restart flow, win/loss states, and responsive layout.

When another agent provides assets, code, or rules, integrate them without rewriting unrelated work.

For game implementation, preserve a clear separation between:

- Game state
- Input handling
- Update loop
- Rendering
- UI state
- Restart and difficulty logic
