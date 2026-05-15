# Test Prompt: Canvas Dodge Game

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the user's current workspace. It does not mean a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the bundled skill at `skills/workspace-reporter`. Use that reporter's definition before creating files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `skills/workspace-reporter` can identify a writable workspace. If the reporter cannot identify a writable workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the workspace exists.

The required output is a zip file inside the workspace:

```text
published-games/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. The task is not complete until the zip file has been created and verified in the workspace.

The `skills/workspace-reporter` directory is a reporter definition only. Never place game output inside `skills/workspace-reporter`; place game output in the workspace reported by it.

做一个浏览器小游戏：玩家控制一个发光的小飞船躲避从上方落下的陨石。

要求：

- 使用 `index.html`、`styles.css`、`script.js` 三个文件。
- 使用 Canvas。
- 支持键盘方向键和手机触摸拖动。
- 有分数、最高分、生命值、开始、暂停、重新开始。
- 难度会随着时间慢慢增加。
- 视觉风格要像霓虹街机，但不要依赖外部图片。
- 直接把游戏文件写到当前 workspace 的 `published-games/meteor-dodge/` 文件夹。
- 生成 `index.html`、`styles.css`、`script.js`，再打包出内联版 `play.html`。
- 完成后把 `index.html`、`styles.css`、`script.js`、`play.html` 打包成 `published-games/meteor-dodge/meteor-dodge.zip`。
- 告诉我下载 zip，解压后打开 `play.html` 游玩。
- 不要把 `index.html` 或 `play.html` 链接当成最终交付；最终必须给 zip 路径。
