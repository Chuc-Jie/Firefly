// src/plugins/rehype-component-scriptcat-card.mjs
// Rehype plugin: 将 <scriptcat> 自定义元素渲染为卡片（对齐 GitHub 卡片架构）
//
// 与 GitHub 卡片的关键差异：
//   - 纯静态（无需客户端 fetch API）
//   - 无 infobar / avatar / 加载态
//   - 图标使用 CSS mask（与 github-logo 相同方案）
//   - registered as standalone rehype plugin (visit tree directly)

import { h } from "hastscript";
import { visit, SKIP } from "unist-util-visit";

export function ScriptCatCardComponent(properties, children) {
  // 1. 校验（leaf directive 不应有子内容）
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

  const name = properties.name || `ScriptCat 脚本 #${scriptId}`;
  const url = `https://scriptcat.org/zh-CN/script-show-page/${scriptId}`;
  const cardUuid = `SC${Math.random().toString(36).slice(-6)}`;

  // 3. 构建卡片（对齐 GitHub 卡片的三层结构）
  // 标题栏（flex space-between，同 gc-titlebar）
  const nTitleBar = h("div", { class: "sc-titlebar" }, [
    // 左侧：图标 + 脚本名（同 gc-titlebar-left）
    h("div", { class: "sc-titlebar-left" }, [
      // 代码图标（CSS mask，同 github-logo 方案）
      h("div", { class: "sc-logo" }),
      // 脚本名称（bold，同 gc-repo）
      h("div", { class: "sc-title" }, name),
    ]),
  ]);

  // 描述（同 gc-description）
  const nDescription = h("div", { class: "sc-description" }, "点击查看脚本详情 →");

  // 4. 外层 a 标签（同 card-github）
  return h(
    `a#${cardUuid}-card`,
    {
      class: "card-scriptcat no-styling",
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      "data-script-id": scriptId,
    },
    [nTitleBar, nDescription]
  );
}

/**
 * Rehype plugin: 遍历 hast 树，将 <scriptcat> 元素替换为 card-scriptcat 卡片
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
