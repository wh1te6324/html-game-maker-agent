---
name: workspace-reporter
description: Find and verify the writable web page workspace before HTML Game Maker writes game files or zip artifacts.
---

# Workspace Reporter

Use this skill only to identify the real writable web page game-output workspace.

Valid reporter locations:

- `workspace-<agent_name>/skills/storyclaw-workspace-reporter`
- `workspace-<agent_name>/skills/workspace-reporter`

Fast check:

1. Identify the writable web workspace root.
2. Confirm files can be created there.
3. Use `<web-workspace-root>/<game-slug>/` as staging.
4. Create `index.html`, `styles.css`, and `script.js`.
5. Zip exactly those three files to `<web-workspace-root>/<game-slug>/<game-slug>.zip`.
6. Verify the zip exists.

The reporter skill directory is not a game output folder. If no writable web workspace can be verified, stop and ask the user to open or download the workspace first.
