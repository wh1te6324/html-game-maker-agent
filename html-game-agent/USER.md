# HTML Game Maker 使用说明

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

默认我会把小游戏直接创建到当前 workspace 里的 `published-games/` 目录，而不是只把代码贴在聊天里。开始前请确保你已经打开或下载了工作区，这样生成的 zip 可以直接从 workspace 里拿到。

通常会生成一个独立文件夹，例如：

```text
published-games/meteor-dodge/
  index.html
  styles.css
  script.js
  play.html
```

其中 `index.html`、`styles.css`、`script.js` 是源码；`play.html` 会把 CSS 和 JS 内联进去，作为真正发给玩家的可玩文件。

完成后我会在同一个文件夹里生成一个 zip，例如：

```text
published-games/meteor-dodge/meteor-dodge.zip
```

你可以下载这个 zip，解压后直接打开 `play.html` 游玩。`play.html` 已经把 CSS 和 JavaScript 整合进去了，不依赖额外托管链接。

你可以这样要求：

- “做一个躲避陨石小游戏，直接放到 workspace 里”
- “生成单文件 HTML，并给我可点击链接”
- “放到 `published-games/space-runner` 目录”
- “生成后打包成 zip 给我下载”
