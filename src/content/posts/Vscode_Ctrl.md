---
title: Vscode中三种鼠标中滚轮缩放
published: 2026-04-14
description: 介绍Vscode中 Ctrl+鼠标中滚轮 进行缩放
image: api
tags: [Vscode,编辑器]
category: 经验分享
draft: true
---


三种“缩放”：
1）只放大/缩小 代码编辑器里的字体；2）放大/缩小 终端字体；3）放大/缩小 整个 VS Code 界面（侧边栏/菜单/编辑器一起变大）。下面分别给出最省事的开启方式。

1. Ctrl + 鼠标滚轮：缩放「编辑器 代码字体」
VS Code 支持用 Ctrl + 鼠标滚轮 来调大/调小编辑器字体 ，只需要打开设置项 editor.mouseWheelZoom。这个能力在 VS Code 的更新日志里有明确说明：启用后按住 Ctrl（macOS 是 Cmd ）滚轮即可改变编辑器字体大小。(Visual Studio Code)

做法（任选一种）：

图形界面：
Ctrl + , 打开设置 → 搜索 Mouse Wheel Zoom → 勾选 Editor: Mouse Wheel Zoom（本质就是开启 editor.mouseWheelZoom）。(Stack Overflow)

直接改 settings.json：

{
  "editor.mouseWheelZoom": true
}
AI写代码
启用后：在代码区 按住 Ctrl 再滚动滚轮，只会影响编辑器字体，不会把整个 UI  一起放大。(Visual Studio Code)

2. Ctrl + 鼠标滚轮：缩放「集成终端字体」
如果你希望终端也能 Ctrl+滚轮缩放，开启 terminal.integrated.mouseWheelZoom 即可。VS Code 的版本更新日志中也直接给出了这个设置项示例。(Visual Studio Code)

{
  "terminal.integrated.mouseWheelZoom": true
}
AI写代码
3. 快捷键：缩放「整个 VS Code 界面」（UI + 编辑器一起变大）
当你想让 侧边栏、标题栏、菜单、编辑器等整体一起缩放，用 VS Code 自带的“界面缩放”即可：

菜单路径：View → Appearance → Zoom In / Zoom Out / Reset Zoom

常用快捷键（Windows/Linux）：

放大：Ctrl+=

缩小：Ctrl+-

复位：Ctrl+Numpad0

并且每次缩放步进是 20%，缩放值会持久化到 window.zoomLevel。(Visual Studio Code)

你也可以直接在配置里写一个默认缩放级别，例如：

{
  "window.zoomLevel": 1
}
AI写代码
（0 为默认，1 表示放大一档，-1 表示缩小一档，步进同样是 20%。）(Visual Studio Code)

4. 推荐：把三种缩放一次配齐
如果你希望“编辑器 Ctrl+滚轮”和“终端 Ctrl+滚轮”都可用，同时保留整体 UI 缩放能力，可以直接这样配：

{
  "editor.mouseWheelZoom": true,
  "terminal.integrated.mouseWheelZoom": true
}
AI写代码
5. 小提示：别把三种缩放搞混
只想看清代码：优先开 editor.mouseWheelZoom（最常用）。(Visual Studio Code)

投屏/演示/眼睛疲劳：用整体 Zoom（快捷键 Ctrl+= / Ctrl+-）。(Visual Studio Code)

终端输出太小：开 terminal.integrated.mouseWheelZoom。(Visual Studio Code)