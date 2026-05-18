---
name: workspace-reporter
description: Defines and verifies the real writable web page workspace before HTML Game Maker creates game files or zip artifacts.
---

# Workspace Reporter

For HTML Game Maker, "workspace" means the real, writable web page game-output workspace reported by the installed StoryClaw workspace reporter. It never means the agent host working directory, a markdown file tree, a chat attachment, a hosted page, or an imagined filesystem.

The reporter may be installed as either:

- `workspace-<agent_name>/skills/storyclaw-workspace-reporter`
- `workspace-<agent_name>/skills/workspace-reporter`

Use whichever reporter path exists in the installed agent workspace. Do not invent a path.

## Required Check

Before generating a game:

1. Identify the writable web page workspace root through the installed reporter.
2. Verify that files and folders can be created there.
3. Create or use `<web-workspace-root>/<game-slug>/` only as temporary staging.
4. Create exactly `index.html`, `styles.css`, and `script.js` in that folder.
5. Package those three files into `<web-workspace-root>/<game-slug>/<game-slug>.zip`.
6. Verify the zip exists before claiming completion.

The reporter skill directory is only a reporter definition. It is not the output folder for games.

If the workspace cannot be verified, do not generate game code, links, fake paths, or partial output. Ask the user to download or open the workspace first.
