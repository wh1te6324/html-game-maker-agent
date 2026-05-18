# Test Prompt: Single File Clicker Game

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the StoryClaw per-installation workspace reporter at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by `workspace-<agent_name>/skills/storyclaw-workspace-reporter`, not inside the agent host's local workspace and not inside any arbitrary local folder. If `workspace-<agent_name>/skills/storyclaw-workspace-reporter` is missing or cannot confirm a web page workspace, stop and require the user to download or open a workspace that includes the reporter before generating anything:

```text
<web-workspace-root>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. Loose HTML/CSS/JS files are only temporary staging inputs and must not be the user-visible output. If the zip cannot be created and verified, stop; do not return HTML files, HTML links, source-code blocks, or fake paths.

The `workspace-<agent_name>/skills/storyclaw-workspace-reporter` path is the StoryClaw reporter skill inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path, and never place game output in the independent host workspace just because it is writable; place game output only in the web page workspace root reported by it.

做一个单文件 HTML 小游戏，主题是“炼金术反应挑战”。

要求：

- 所有 HTML、CSS、JavaScript 都放在一个 `index.html` 里。
- 玩家需要在倒计时内点击正确的元素组合来完成配方。
- 至少 8 个配方。
- 有连击、倒计时、失败反馈、胜利反馈和重新开始。
- 支持手机屏幕。
- 不要使用任何外部 CDN 或图片。
- 直接把游戏写到网页端 workspace reporter 确认的 `<web-workspace-root>/alchemy-clicker/index.html`。
- 同时提供 `<web-workspace-root>/alchemy-clicker/play.html` 作为 zip 内的稳定入口文件。
- 完成后把文件打包成 `<web-workspace-root>/alchemy-clicker.zip`。
- 告诉我下载 zip，解压后打开 `play.html` 游玩。
- 不要把 `index.html` 或 `play.html` 链接当成最终交付；HTML 链接没法保证独立可玩，最终必须给 zip 路径。
