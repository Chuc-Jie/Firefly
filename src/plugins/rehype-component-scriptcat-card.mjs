// src/plugins/rehype-component-scriptcat-card.mjs
// Rehype plugin: 将 <scriptcat> 自定义元素渲染为卡片

import { h } from "hastscript";
import { visit, SKIP } from "unist-util-visit";

export function ScriptCatCardComponent(properties, children) {
  // 1. 校验：短代码必须为空内容
  if (Array.isArray(children) && children.length !== 0) {
    return h("div", { class: "hidden" }, [
      'Invalid directive. ("scriptcat" directive must be leaf type ::scriptcat{id="5676"})',
    ]);
  }

  // 2. 获取参数
  const scriptId = properties.id;
  if (!scriptId || !/^\d+$/.test(scriptId)) {
    return h("div", { class: "hidden" }, [
      'Invalid script ID. ("id" attribute must be a number, e.g., id="5676")',
    ]);
  }

  // 获取可选的 name 参数，如果没提供则用默认文本
  const fallbackName = properties.name || `ScriptCat 脚本 #${scriptId}`;
  const url = `https://scriptcat.org/zh-CN/script-show-page/${scriptId}`;

  // 3. 生成唯一 ID（防止多个卡片 ID 冲突）
  const cardUuid = `SC${Math.random().toString(36).slice(-6)}`;

  // 4. 构建卡片结构（类似 GitHub 卡片布局）
  // 标题栏：左侧脚本名 + 右侧图标
  const titleBar = h("div", { class: "sc-titlebar" }, [
    h("div", { class: "sc-titlebar-left" }, [
      h("div", { class: "sc-title" }, fallbackName),
    ]),
    h("div", { class: "sc-logo" }, "📜"),
  ]);

  const description = h("div", { class: "sc-description" }, "点击查看脚本详情 →");

  // 5. 返回可点击的卡片（a 标签）
  return h(
    `a#${cardUuid}-card`,
    {
      class: "card-scriptcat no-styling",
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      "data-script-id": scriptId,
    },
    [titleBar, description]
  );
}

/**
 * Rehype plugin: 遍历 hast 树，将 <scriptcat> 元素替换为卡片
 */
export default function rehypeScriptCatCard() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (node.tagName === "scriptcat" && parent && index != null) {
        const card = ScriptCatCardComponent(node.properties || {}, node.children);
        parent.children.splice(index, 1, card);
        return [SKIP, index];
      }
    });
  };
}
