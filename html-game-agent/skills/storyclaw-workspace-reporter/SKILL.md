---
name: storyclaw-workspace-reporter
description: Defines and verifies the real writable game-output workspace for HTML Game Maker before any game files or zip artifacts are created.
---

# StoryClaw Workspace Reporter

For HTML Game Maker, "workspace" has one strict meaning: the real, writable game-output project directory reported by this bundled skill.

After installation, this reporter skill is referenced by path:

```text
workspace-<agent_name>/skills/storyclaw-workspace-reporter
```

That path is the reporter skill inside the agent's own installed workspace. It is not the folder where games are generated.

Do not infer the game-output workspace from chat text, a markdown tree, a hosted page, an attachment, the agent install directory, or an imagined filesystem. If you cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first.

## Required Check

Before generating a game:

1. Identify the current real writable game-output workspace root.
2. Verify that files and folders can be created there.
3. Create or use `published-games/<game-slug>/` under that workspace root.
4. Create the final zip at `published-games/<game-slug>/<game-slug>.zip`.
5. Verify the zip exists before claiming completion.

Never place game output inside `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. That directory only defines how to find and validate the real workspace.

If the workspace cannot be verified, do not generate game code, links, fake paths, or partial output. Ask the user to download or open the workspace first.
