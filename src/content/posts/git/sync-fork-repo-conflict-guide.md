---
title: 同步 Fork 仓库并优雅处理冲突——实用指南
published: 2026-04-04
pinned: false
description: 保持 Fork 仓库与上游同步，同时保留自己的修改，是每个开发者都会遇到的场景。本文从首次配置、日常同步流程、冲突解决实战、提交消息修改到网络错误处理，提供一份完整且可操作的 Git 同步指南。
tags: [Git, GitHub, Fork, 合并冲突, 开源协作]
category: 技术指南
draft: false
image: api
---

> 保持你的 Fork 仓库与上游同步，同时保留自己的修改——这是每个开发者都会遇到的场景。本文将带你走完完整流程，包括首次配置、日常同步、冲突解决、提交消息修改以及网络问题处理。

## 背景

假设你 Fork 了一个开源项目仓库，并在自己的副本上做了一些个性化修改。一段时间后，原项目（上游）有了更新，你想把这些更新拉取到自己的 Fork 中，同时保留自己的改动。

这就是典型的“领先若干提交（你的修改），落后若干提交（官方更新）”的状态。本文将教你如何安全、高效地完成同步。



## 一、首次配置：添加上游仓库

只需要在第一次同步前执行一次。

```bash
# 查看当前已配置的远程仓库
git remote -v

# 添加原项目仓库，命名为 upstream（上游）
git remote add upstream https://github.com/原作者/项目名.git

# 验证配置成功
git remote -v
# 应显示 origin（你自己的 Fork）和 upstream（原仓库）
```



## 二、日常同步标准流程

每次上游有更新时，按以下三步操作：

```bash
# 1. 获取上游的所有更新（不会自动合并）
git fetch upstream

# 2. 将上游的更新合并到你当前分支（通常是 master 或 main）
git merge upstream/master

# 3. 将合并后的结果推送到你的 GitHub Fork
git push origin master
```

如果第二步没有冲突，同步就完成了。如果有冲突，请看下一节。



## 三、冲突解决实战

冲突通常发生在两种场景：**内容冲突**和**文件删除/修改冲突**。

### 3.1 内容冲突

Git 会提示 `CONFLICT (content)`，并在文件中标记出冲突区域：

```
<<<<<<< HEAD
你的修改内容
=======
上游的更新内容
>>>>>>> upstream/master
```

**解决步骤：**

1. 打开冲突文件，手动合并两边的代码，保留你需要的部分。
2. 删除 Git 添加的 `<<<<<<<`、`=======`、`>>>>>>>` 标记。
3. 保存文件，然后执行：

```bash
git add 文件名
git commit -m "Merge upstream: resolve conflict in xxx"
```

### 3.2 文件删除与修改冲突

例如：你在本地删除了一个文件（如 `wechat.png`），但上游修改了它。Git 会提示 `deleted by us` 和 `modified by upstream`。

**两种解决方案：**

- **保留上游的版本**：`git checkout --theirs 文件` → `git add 文件`
- **确认删除**：`git rm 文件`

### 3.3 快速采用官方版本（谨慎使用）

如果你想完全放弃自己的修改，直接用上游的版本来覆盖冲突文件：

```bash
git checkout --theirs 冲突文件
git add 冲突文件
```

### 3.4 取消合并（后悔药）

如果合并过程出现混乱，可以随时中止：

```bash
git merge --abort
```



## 四、修改提交消息（补救操作）

### 修改最近一次提交的消息（尚未推送或已推送）

```bash
# 本地修改
git commit --amend -m "新的提交消息"

# 如果已经推送到远程，需要强制推送（仅限个人 Fork 仓库）
git push --force-with-lease origin master
```

> ⚠️ 注意：强制推送会覆盖远程历史，不要在多人协作的主分支上使用。

### 分支名是 master 还是 main？

许多老项目仍使用 `master` 作为主分支名。用 `git branch` 查看你的默认分支名称，相应调整命令中的分支名。



## 五、常见网络错误处理

执行 `git fetch` 或 `git push` 时遇到 `RPC failed; curl 56 Recv failure`？

**解决方案：**

- 增加 Git 缓冲区大小：`git config --global http.postBuffer 524288000`
- 关闭代理或调整代理设置
- 改用 SSH 协议替代 HTTPS（推荐）
- 重试命令



## 六、查看状态与确认同步结果

```bash
# 查看工作区状态
git status

# 查看提交历史图形化显示
git log --oneline --graph -10
```

在 GitHub 仓库页面上，你会看到类似提示：  
`This branch is X commits ahead, Y commits behind ...`  
当 `Y` 变为 0 时，说明同步完成。



## 七、完整命令备忘（速查表）

```bash
# 首次配置
git remote add upstream https://github.com/原作者/项目名.git

# 日常同步
git fetch upstream
git merge upstream/master
git push origin master

# 冲突处理流程
git status                     # 查看哪些文件冲突
# 手动编辑解决冲突
git add .
git commit -m "Merge upstream"
git push origin master

# 修改已推送的提交消息（个人仓库）
git commit --amend -m "新消息"
git push --force-with-lease origin master
```



## 八、一个成功的同步案例

- 执行 `git fetch upstream` 获取上游 5 个新提交
- `git merge upstream/master` 自动合并成功（无冲突）
- `git push origin master` 推送成功
- 最终状态：领先 68 个提交（你的修改），落后 0 个提交（完全同步）



## 结语

同步 Fork 仓库是 Git 协作中的基础技能。掌握了 `fetch` + `merge` 流程以及冲突解决方法，你就能在保持自己修改的同时，不断跟上原项目的演进。

记住：遇到冲突不要慌，`git status` 和 `git merge --abort` 是你的好帮手。多练习几次，你就会发现这其实并不复杂。

**你的 Fork，你做主。** 🚀



*如果你觉得这篇指南有用，欢迎收藏或分享给其他需要的朋友。*