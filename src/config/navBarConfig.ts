import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: (NavBarLink | LinkPreset)[] = [
		// 主页
		LinkPreset.Home,

		// 归档
		LinkPreset.Archive,
	];

	// 根据配置决定是否添加友链，在siteConfig关闭pages.friends时导航栏不显示友链
	if (siteConfig.pages.friends) {
		links.push(LinkPreset.Friends);
	}

	// 根据配置决定是否添加留言板，在siteConfig关闭pages.guestbook时导航栏不显示留言板
	if (siteConfig.pages.guestbook) {
		links.push(LinkPreset.Guestbook);
	}

	// 我的及其子菜单
	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			// 根据配置决定是否添加相册，在siteConfig关闭pages.gallery时导航栏不显示相册
			...(siteConfig.pages.gallery ? [LinkPreset.Gallery] : []),

			// 根据配置决定是否添加番组计划，在siteConfig关闭pages.bangumi时导航栏不显示番组计划
			...(siteConfig.pages.bangumi ? [LinkPreset.Bangumi] : []),

		],
	});

	// // 根据配置决定是否添加编辑器，在siteConfig关闭pages.editor时不显示编辑器
	// if (siteConfig.pages.editor) {
	// 	links.push({
	// 		name: "编辑器",
	// 		url: "https://bwrite.youyer.top/",
	// 		external: true,
	// 		icon: "material-symbols:edit",
	// 	});
	// }

	// 根据配置决定是否添加工坊,在siteConfig关闭pages.workshop时不显示工坊
	links.push({
		name: "工坊",
		url: "/workshop/",
		icon: "material-symbols:shop",
		children: [
			{
				name: "编辑器",
				url: "https://bwrite.youyer.top/",
				external: true,
				icon: "material-symbols:edit",
			},
			{
				name: "User-Agent",
				url: "https://gua.youyer.top",
				external: true,
				icon: "material-symbols:link",
			},
			{
				name: "脚本猫脚本",
				url: "/scriptcat/",
				icon: "material-symbols:code",
				children: [
					{
						name: "User-Agent",
						url: "https://gua.youyer.top",
						external: true,
						icon: "material-symbols:link",
					},
					// 其他子项...
				],
			}


		]
	});

	// 关于及其子菜单
	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: [
			// 根据配置决定是否添加赞助，在siteConfig关闭pages.sponsor时导航栏不显示赞助
			...(siteConfig.pages.sponsor ? [LinkPreset.Sponsor] : []),

			// 关于页面
			LinkPreset.About,
		],
	});

	// 链接及其子菜单
	links.push({
		name: "链接",
		url: "/links/",
		icon: "material-symbols:link",
		children: [
			// 主题相关
			{
				name: "Firefly",
				url: "https://github.com/CuteLeaf/Firefly",
				external: true,
				icon: "fa7-brands:github",
			},
			{
				name: "Firefly",
				url: "https://gitee.com/CuteLeaf/Firefly",
				external: true,
				icon: "fa7-brands:gitee",
			},
			{
				name: "官方交流群",
				url: "https://qm.qq.com/q/ZGsFa8qX2G",
				external: true,
				icon: "fa7-brands:qq",
			},
		],
	});

	// 仅返回链接，其它导航搜索相关配置在模块顶层常量中独立导出
	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
