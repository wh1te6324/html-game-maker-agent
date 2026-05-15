# Test Prompt: Single File Clicker Game

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the user's current workspace. It does not mean a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

Before generating a game, verify that a writable workspace exists. If no writable workspace can be found, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the workspace exists.

The required output is a zip file inside the workspace:

```text
published-games/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. The task is not complete until the zip file has been created and verified in the workspace.

做一个单文件 HTML 小游戏，主题是“炼金术反应挑战”。

要求：

- 所有 HTML、CSS、JavaScript 都放在一个 `index.html` 里。
- 玩家需要在倒计时内点击正确的元素组合来完成配方。
- 至少 8 个配方。
- 有连击、倒计时、失败反馈、胜利反馈和重新开始。
- 支持手机屏幕。
- 不要使用任何外部 CDN 或图片。
- 直接把游戏写到当前 workspace 的 `published-games/alchemy-clicker/index.html`。
- 同时提供 `published-games/alchemy-clicker/play.html` 作为玩家打开的稳定文件。
- 完成后把文件打包成 `published-games/alchemy-clicker/alchemy-clicker.zip`。
- 告诉我下载 zip，解压后打开 `play.html` 游玩。
- 不要把 `index.html` 或 `play.html` 链接当成最终交付；最终必须给 zip 路径。
