# Test Prompt: Canvas Dodge Game

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the StoryClaw per-installation workspace reporter at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by `workspace-<agent_name>/skills/storyclaw-workspace-reporter`, not inside the agent host's local workspace and not inside any arbitrary local folder. If `workspace-<agent_name>/skills/storyclaw-workspace-reporter` is missing or cannot confirm a web page workspace, stop and require the user to download or open a workspace that includes the reporter before generating anything:

```text
<web-workspace-root>/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. Loose HTML/CSS/JS files are only temporary staging inputs and must not be the user-visible output. If the zip cannot be created and verified, stop; do not return HTML files, HTML links, source-code blocks, or fake paths.

## User Request

做一个浏览器小游戏：玩家控制一个发光的小飞船躲避从上方落下的陨石。

要求：

- 使用 Canvas。
- 支持键盘方向键和手机触摸拖动。
- 有分数、最高分、生命值、开始、暂停、重新开始。
- 难度会随着时间慢慢增加。
- 视觉风格要像霓虹街机，但不要依赖外部图片。
- 在 `<web-workspace-root>/meteor-dodge/` 中只临时准备 `index.html`、`styles.css`、`script.js` 和 `play.html`。
- 必须把这些文件打包成 `<web-workspace-root>/meteor-dodge/meteor-dodge.zip`。
- 最终只输出 zip 路径。不要输出 HTML 文件、HTML 链接、源码块或散文件路径。
