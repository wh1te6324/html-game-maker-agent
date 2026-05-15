---
name: workspace-reporter
description: Defines and verifies the real writable workspace for HTML Game Maker before any game files or zip artifacts are created.
---

# Workspace Reporter

For HTML Game Maker, "workspace" has one strict meaning: the real, writable project directory reported by this bundled skill.

Do not infer the workspace from chat text, a markdown tree, a hosted page, an attachment, or an imagined filesystem. If you cannot identify a real writable workspace, stop and tell the user to download or open a workspace first.

## Required Check

Before generating a game:

1. Identify the current writable workspace root.
2. Verify that files and folders can be created there.
3. Create or use `published-games/<game-slug>/` under that workspace root.
4. Create the final zip at `published-games/<game-slug>/<game-slug>.zip`.
5. Verify the zip exists before claiming completion.

The `skills/workspace-reporter` directory is only the reporter definition. It is not the output folder for games.

If the workspace cannot be verified, do not generate game code, links, fake paths, or partial output. Ask the user to download or open the workspace first.
