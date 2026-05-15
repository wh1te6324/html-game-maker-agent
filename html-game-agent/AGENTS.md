# AGENTS.md - Collaboration Notes

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the user's current workspace. It does not mean a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the bundled reporter skill installed at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the workspace:

```text
published-games/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. The task is not complete until the zip file has been created and verified in the workspace.

The `workspace-<agent_name>/skills/storyclaw-workspace-reporter` path is the reporter skill inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path; place game output in the real writable workspace reported by it.

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
