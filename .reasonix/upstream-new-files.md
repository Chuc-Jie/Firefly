# 上游新增文件清单

以下文件是 upstream 合并后新增的，非 Firefly 原本附带，供仔细审阅。

---

## 构建/部署脚本

| 文件 | 用途 |
|------|------|
| `scripts/generate-lqips.ts` | 生成 LQIP（低质量图片占位符） |
| `scripts/subset-fonts.ts` | 字体子集化，减少字体文件体积 |
| `wrangler.jsonc` | Cloudflare Workers 部署配置 |

## 项目文档

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | AI 编码助手（Claude Code）的规则文件 |

## 图片/LQIP 数据

| 文件 | 用途 |
|------|------|
| `src/constants/lqips.json` | 图片 LQIP 占位符数据缓存 |

## 组件 (新增)

| 文件 | 用途 |
|------|------|
| `src/components/features/BackgroundPlayer.astro` | 背景视频/动画播放器组件 |
| `src/components/features/EncryptedContent.astro` | 加密内容展示组件（配合加密文章功能） |
| `src/components/widget/SiteInfo.astro` | 侧边栏站点信息组件（运行天数、总字数等） |
| `src/components/common/ClientPagination.svelte` | 客户端分页组件（替代旧的 .astro 版本） |

## 工具函数

| 文件 | 用途 |
|------|------|
| `src/utils/lqip-utils.ts` | LQIP 图片处理工具 |
| `src/utils/url-utils.ts` | URL 处理工具（主要用于外部链接判断） |

## 样式

| 文件 | 用途 |
|------|------|
| `src/styles/banner-title.css` | 横幅标题样式 |
| `src/styles/gallery.css` | 相册页面样式 |
| `src/styles/tags.css` | 标签页面样式 |

## 页面

| 文件 | 用途 |
|------|------|
| `src/pages/categories/index.astro` | 独立分类页面 |
| `src/pages/tags/index.astro` | 独立标签页面 |

## 组件重构 (Bangumi)

| 文件 | 用途 |
|------|------|
| `src/components/pages/bangumi/BangumiGrid.svelte` | 番组网格组件 (Svelte) |
| `src/components/pages/bangumi/BangumiSection.svelte` | 番组分区组件 (Svelte) |
| `src/components/pages/bangumi/Card.svelte` | 番组卡片 (Svelte) |
| `src/components/pages/bangumi/FilterControls.svelte` | 番组筛选控制 (Svelte) |
| `src/components/pages/bangumi/TabNav.svelte` | 番组标签导航 (Svelte) |

注：这些是新 Svelte 版本，替代了旧的 Astro 版本（已删除）。

## 类型文件拆分 (从统一 config.ts 拆出)

| 文件 | 用途 |
|------|------|
| `src/types/analyticsConfig.ts` | 统计分析配置类型 |
| `src/types/announcementConfig.ts` | 公告配置类型 |
| `src/types/backgroundWallpaper.ts` | 背景壁纸配置类型 |
| `src/types/commentConfig.ts` | 评论配置类型 |
| `src/types/coverImageConfig.ts` | 封面图配置类型 |
| `src/types/effectsConfig.ts` | 特效配置类型（樱花等） |
| `src/types/expressiveCodeConfig.ts` | 代码块样式配置类型 |
| `src/types/fontConfig.ts` | 字体配置类型 |
| `src/types/footerConfig.ts` | 页脚配置类型 |
| `src/types/friendsConfig.ts` | 友链配置类型 |
| `src/types/galleryConfig.ts` | 相册配置类型 |
| `src/types/licenseConfig.ts` | 许可配置类型 |
| `src/types/musicConfig.ts` | 音乐播放器配置类型 |
| `src/types/navBarConfig.ts` | 导航栏配置类型 |
| `src/types/pioConfig.ts` | 看板娘(pio)配置类型 |
| `src/types/plantumlConfig.ts` | PlantUML 配置类型 |
| `src/types/profileConfig.ts` | 个人资料配置类型 |
| `src/types/sidebarConfig.ts` | 侧边栏配置类型 |
| `src/types/siteConfig.ts` | 站点配置类型 |
| `src/types/sponsorConfig.ts` | 赞助配置类型 |

## 公共资源

| 文件 | 用途 |
|------|------|
| `public/assets/images/ad/ad1.webp` | 广告示例图片 |
| `public/gallery/encrypted-test/urls.txt` | 加密相册示例索引文件 |
| `public/gallery/firefly-2026/urls.txt` | 相册图片索引文件 |

---

## 和你相关的注意事项

### 头像移动
```
public/assets/images/{ => effects}/sakura.png
```
樱花特效图移到了 `effects/` 子目录，如果你启用了樱花特效，路径已自动适配。

### twikoo CSS 被删
- `public/assets/css/twikoo.css`
- `public/assets/js/twikoo.nocss.js`
你说没有开通，不用管。
