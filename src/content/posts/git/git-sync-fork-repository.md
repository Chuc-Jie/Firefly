---
title: Git同步Fork仓库实记&完整指南：以Firefly主题为例
published: 2026-03-19
pinned: false
description: "详细记录如何将Fork的GitHub仓库与原仓库同步，包括配置upstream、合并更新、解决冲突的完整流程。"
image: "api"
tags: ["Git", "GitHub", "Fork", "版本控制", "教程"]
category: 技术指南
draft: false
---


### 场景
我fork了 `CuteLeaf/Firefly` 仓库，原仓库有更新（比我的多9个提交，我的比原仓库多18个提交），想同步更新。

### 一、配置远程仓库（只需一次）
```bash
# 查看当前远程仓库
git remote -v

# 添加原仓库为 upstream
git remote add upstream https://github.com/CuteLeaf/Firefly.git

# 验证
git remote -v
# 应该显示 origin(你的) 和 upstream(原仓库)
```

### 二、获取原仓库更新
```bash
git fetch upstream
```

### 三、同步master分支（两种方法）

#### 方法A：使用 merge（推荐，最安全）
```bash
git checkout master
git merge upstream/master
```
- ✅ 保留完整合并历史
- ✅ 适合公共分支
- ❌ 会有合并提交记录

#### 方法B：使用 rebase（历史更干净）
```bash
git checkout master
git rebase upstream/master
```
- ✅ 线性历史，没有多余合并记录
- ✅ 适合个人分支
- ❌ 会改变提交ID

### 四、解决冲突（如果出现）

1. **查看冲突文件**
```bash
git status
```

2. **解决冲突的三种方式**
```bash
# 方式1：采用 upstream 版本
git checkout --theirs 冲突文件名
git add 冲突文件名

# 方式2：采用本地版本
git checkout --ours 冲突文件名
git add 冲突文件名

# 方式3：手动编辑
# 打开文件，删除 <<<<<<<、=======、>>>>>>> 标记
# 保留需要的代码
git add 冲突文件名
```

3. **完成合并**
```bash
git commit
# 或
git commit -m "Merge upstream/master: resolve conflicts"
```

### 五、推送到你的GitHub
```bash
git push origin master
```

### 六、更新其他分支（如果有）
```bash
git checkout 你的其他分支
git merge master
# 或
git rebase master
git push origin 你的其他分支
```

### 常用命令速查表

| 操作 | 命令 |
|------|------|
| 添加upstream | `git remote add upstream 仓库地址` |
| 获取更新 | `git fetch upstream` |
| 合并更新 | `git merge upstream/master` |
| 查看状态 | `git status` |
| 查看历史 | `git log --oneline --graph` |
| 取消合并 | `git merge --abort` |
| 采用他人版本 | `git checkout --theirs 文件名` |
| 采用自己版本 | `git checkout --ours 文件名` |
| 标记已解决 | `git add 文件名` |
| 推送更新 | `git push origin master` |

### 注意事项
1. **master分支**建议用 `merge`，保留合并记录
2. **个人特性分支**可以用 `rebase`，历史更整洁
3. 解决冲突时，看清楚代码再决定保留哪个版本
4. 推送前先 `git status` 确认状态
5. 以后想再次同步：`git fetch upstream` → `git merge upstream/master` → `git push origin master`

这样就完成了！以后原仓库再有更新，重复步骤二、三、五即可。