---
title: Vscode中三种鼠标中滚轮缩放
published: 2026-04-14
description: 介绍 Vscode 中 Ctrl+鼠标滚轮 进行缩放
image: ../images/firefly1.avif
tags: [Vscode, 编辑器]
category: 经验分享
draft: false
---

VSCode 有三种"缩放"：

1. **缩放编辑器代码字体** — 只放大/缩小代码编辑区的文字
2. **缩放终端字体** — 只影响集成终端的文字大小
3. **缩放整个界面** — 侧边栏、菜单、编辑器一起变大

下面分别给出最省事的开启方式。

## 1. Ctrl + 滚轮：缩放编辑器代码字体

启用后按住 `Ctrl`（macOS `Cmd`）滚轮即可改变编辑器字体大小。

**图形界面：**

`Ctrl + ,` 打开设置 → 搜索 `Mouse Wheel Zoom` → 勾选 **Editor: Mouse Wheel Zoom**

**直接改 settings.json：**

```json
{
  "editor.mouseWheelZoom": true
}
```

启用后，在代码区按住 `Ctrl` 再滚动滚轮，只会影响编辑器字体，不会把整个 UI 一起放大。

## 2. Ctrl + 滚轮：缩放集成终端字体

如果你希望终端也能 `Ctrl + 滚轮` 缩放：

```json
{
  "terminal.integrated.mouseWheelZoom": true
}
```

## 3. 快捷键：缩放整个界面（UI + 编辑器一起）

想让侧边栏、标题栏、菜单、编辑器等整体一起缩放：

- 菜单路径：**View → Appearance → Zoom In / Zoom Out / Reset Zoom**
- **放大**：`Ctrl + =`
- **缩小**：`Ctrl + -`
- **复位**：`Ctrl + Numpad0`

每次缩放步进 20%，缩放值会持久化到 `window.zoomLevel`。

也可以直接在配置里写一个默认缩放级别：

```json
{
  "window.zoomLevel": 1
}
```

（`0` 为默认，`1` 放大一档，`-1` 缩小一档，步进 20%。）

## 4. 推荐：三种缩放一次配齐

如果希望"编辑器 Ctrl+滚轮"和"终端 Ctrl+滚轮"都可用，同时保留整体 UI 缩放能力：

```json
{
  "editor.mouseWheelZoom": true,
  "terminal.integrated.mouseWheelZoom": true
}
```

## 5. 别把三种缩放搞混

- 只想看清代码 → 开 `editor.mouseWheelZoom`（最常用）
- 投屏/演示/眼睛疲劳 → 用整体 Zoom（快捷键 `Ctrl + =` / `Ctrl + -`）
- 终端输出太小 → 开 `terminal.integrated.mouseWheelZoom`
