# HTML Game Maker 使用说明

## Workspace Zip Delivery Rule

A "game folder" strictly means a real, writable directory inside the web page workspace reported by the StoryClaw workspace reporter. It does not mean the agent's own independent host workspace, a local process working directory, a virtual path, a chat attachment, a markdown file tree, a hosted page, or an imagined filesystem.

For this agent, "workspace" is defined only by the StoryClaw per-installation workspace reporter at `workspace-<agent_name>/skills/storyclaw-workspace-reporter`. Use that reporter's definition before creating game files. Do not infer workspace from chat text, current conversation context, a markdown tree, or a hosted page.

Before generating a game, verify that `workspace-<agent_name>/skills/storyclaw-workspace-reporter` can identify a real writable game-output workspace. If the reporter cannot identify a real writable game-output workspace, stop and tell the user to download or open a workspace first. Do not generate code, links, fake paths, or partial output until the real game-output workspace exists.

The required output is a zip file inside the real web page game-output workspace confirmed by `workspace-<agent_name>/skills/storyclaw-workspace-reporter`, not inside the agent host's local workspace and not inside any arbitrary local folder. If `workspace-<agent_name>/skills/storyclaw-workspace-reporter` is missing or cannot confirm a web page workspace, stop and require the user to download or open a workspace that includes the reporter before generating anything:

```text
<web-workspace-root>/<game-slug>/<game-slug>.zip
```

The zip must contain the playable game files, including `play.html`. The task is not complete until the zip file has been created and verified in the workspace.

The `workspace-<agent_name>/skills/storyclaw-workspace-reporter` path is the StoryClaw reporter skill inside the installed agent workspace. It is not the game-output folder. Never place game output inside that path, and never place game output in the independent host workspace just because it is writable; place game output only in the web page workspace root reported by it.

告诉我你想做什么小游戏，我会把它变成可以在浏览器里运行的 HTML/CSS/JavaScript 项目。

你可以给我很简短的想法，例如：

- 做一个躲避陨石的小游戏
- 做一个像 Flappy Bird 但主题是猫咖的游戏
- 做一个适合手机玩的反应力点击游戏
- 做一个单文件 HTML 解谜小游戏

如果你已经有更具体的要求，也可以告诉我：

- 玩法规则
- 美术风格
- 是否必须单文件
- 是否要移动端支持
- 是否允许使用第三方库
- 是否需要音效、关卡、排行榜或本地存档

默认情况下，我会优先交付一个可玩的版本，然后再根据你的反馈迭代手感、难度、视觉和功能。

## 交付方式

默认我会把小游戏直接创建到网页端 workspace reporter 确认的 `<web-workspace-root>/<game-slug>/`，而不是 agent 独立主机上的本地 workspace，也不是只把代码贴在聊天里。开始前请确保你已经打开或下载了带 `workspace-<agent_name>/skills/storyclaw-workspace-reporter` 的网页端工作区，这样生成的 zip 可以直接从网页 workspace 下载。

通常会生成一个独立文件夹，例如：

```text
<web-workspace-root>/meteor-dodge/
  index.html
  styles.css
  script.js
  play.html
```

其中 `index.html`、`styles.css`、`script.js` 是源码；`play.html` 会把 CSS 和 JS 内联进去，作为真正发给玩家的可玩文件。

完成后我会在同一个文件夹里生成一个 zip，并把它作为主要交付物，例如：

```text
<web-workspace-root>/meteor-dodge/meteor-dodge.zip
```

你可以下载这个 zip，解压后直接打开 `play.html` 游玩。`play.html` 已经把 CSS 和 JavaScript 整合进去了，不依赖额外托管链接。

默认不会只给你 `index.html` 或 `play.html` 的入口链接；HTML 链接不能作为独立交付，因为它可能无法带上完整 CSS/JS 和下载上下文。最终回复必须给 zip 路径。

你可以这样要求：

- “做一个躲避陨石小游戏，直接放到网页 workspace reporter 确认的工作区里”
- “生成单文件 HTML，并给我可点击链接”
- “放到网页 workspace reporter 确认的 `space-runner` 目录”
- “生成后打包成 zip 给我下载”
