---
title: Minecraft物品ID获取指南
published: 2026-04-14
description: 介绍从Minecraft物品ID获取的方法探索
image: api
tags: [Minecraft, 游戏]
category: 经验分享
draft: true
---

# Minecraft物品ID获取指南：从游戏内查看到官方数据生成器

随着Minecraft Java版26.1（对应1.21.1左右）移除了代码混淆，很多依赖混淆映射表的工具和方法都变了。但好消息是，现在我们获取物品ID、方块ID的方式反而更直接、更官方了。

不过本文跟移除了代码混淆关系不大...嘻嘻,回过头来说说正文。⬇️

本文将总结我探索过的所有途径，并重点介绍如何用官方数据生成器批量导出ID清单。

## 一、快速获取ID的几种方法

### 1. 游戏内直接查看（最快捷）
按下 `F3 + H` 开启高级提示框，然后把鼠标悬停在物品栏里的任意物品上，提示框里就会直接显示它的ID，比如 `minecraft:stone`。这是零成本、零依赖的方式，适合偶尔查一两个ID。

### 2. 第三方网站
- **中文 Minecraft Wiki**（zh.minecraft.wiki）：每个物品/方块的页面都标注了ID。
- **MCID**（mcid.fastmirror.net）：支持搜索和过滤，非常高效。

### 3. 模组工具
- **JEI**：在物品列表界面直接显示ID。
- **Data ID Dumper**：自动导出所有注册ID到文本文件。

## 二、官方数据生成器：批量导出所有ID

如果你需要一份完整的、可编程处理的ID清单，官方内置的数据生成器是最佳选择。它可以把游戏注册表中的所有内容导出为结构化的JSON文件。

### 基本用法
你需要下载对应版本的服务端核心文件（server.jar），然后通过命令行运行数据生成器的主类。

**对于1.18及以上版本（包括26.1）**：
```bash
java -DbundlerMainClass="net.minecraft.data.Main" -jar server.jar --reports
```

**对于1.13至1.17.1版本**：
```bash
java -cp server.jar net.minecraft.data.Main --reports
```

**1.12.2及更早版本**没有这个数据生成器。

### 常用启动参数
- `--reports`：生成数据报告（blocks.json, items.json, registries.json等）
- `--server`：生成服务端数据（进度、配方、战利品表等）
- `--client`：生成客户端资源（模型、语言文件等）
- `--all`：一次性生成所有内容

### 输出目录结构
运行成功后，会在当前目录生成 `generated/reports/` 文件夹，里面包含：

| 文件 | 内容 |
|------|------|
| `blocks.json` | 所有方块的ID及协议号 |
| `items.json` | 所有物品的ID |
| `registries.json` | 完整的注册表（含生物群系、附魔、声音等） |
| `commands.json` | 原版命令的语法树（用于解析，不是命令列表） |
| `biome_parameters.json` | 生物群系生成参数 |
| `packets.json` | 网络协议包结构 |

另外还有一个非常细粒度的目录：`generated/reports/minecraft/components/item/`。里面每个JSON文件对应一个物品ID，文件名就是物品ID（冒号替换为下划线），例如 `minecraft_stone.json`。文件内容记录了该物品所有组件的默认值（最大堆叠数、耐久度、稀有度等）。

## 三、commands.json 到底是什么？

很多朋友误以为 `commands.json` 是一份命令名列表，其实它是**原版命令的语法解析树**。游戏用它来校验和补全命令，格式类似：
```json
"gamemode": {
    "type": "literal",
    "children": {
        "creative": { "type": "literal", "executable": true }
    }
}
```
它只包含原版命令，不包含任何数据包或模组添加的自定义命令。要获得完整的可用命令列表，推荐安装 `Command Extractor` 模组，或查阅Wiki。

## 四、一个实用Python脚本：将文件名还原为物品ID

由于 `components/item/` 目录下的文件名是下划线格式（如 `minecraft_heavy_weighted_pressure_plate.json`），我们可以用脚本批量转换成标准的命名空间ID（`minecraft:heavy_weighted_pressure_plate`）。

```python
import os
import sys

def filename_to_item_id(filename: str) -> str:
    if filename.endswith('.json'):
        name = filename[:-5]
    else:
        name = filename
    parts = name.split('_', 1)
    if len(parts) == 2:
        return f"{parts[0]}:{parts[1]}"
    return name

def main():
    if len(sys.argv) != 2:
        print("用法: python convert.py <目录路径>")
        sys.exit(1)
    dir_path = sys.argv[1]
    item_ids = []
    for f in os.listdir(dir_path):
        if f.endswith('.json'):
            item_ids.append(filename_to_item_id(f))
    item_ids.sort()
    with open("item_ids.txt", "w") as out:
        out.write("\n".join(item_ids))
    print(f"导出 {len(item_ids)} 个物品ID 到 item_ids.txt")

if __name__ == "__main__":
    main()
```

使用方法：
```bash
python convert.py "datagen/generated/reports/minecraft/components/item"
```

## 五、总结

移除混淆并没有让事情变复杂，反而让ID获取变得更透明。从游戏内 `F3+H` 到官方数据生成器，再到细粒度的组件报告，Mojang 提供了多种层次的工具。对于普通玩家，游戏内查看或Wiki就足够了；对于数据包作者和模组开发者，官方数据生成器导出的JSON文件是不可或缺的参考资源。

希望这篇总结能帮你快速上手。如果你在使用过程中遇到版本兼容问题，记得检查你的Minecraft版本是否在1.13以上，并正确选择 `-cp` 或 `-DbundlerMainClass` 命令。