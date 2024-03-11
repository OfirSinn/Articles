import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";
// import { IconFolderOptions } from "./quartz/plugins/components/FileIcons";
import { filterFn, sortFn } from "./quartz/util/function";

// components shared across all pages

// const iconsOptions: IconFolderOptions = {
// 	rootIconFolder: "content/_assets/icons",
// 	default: {
// 		file: "file",
// 	},
// };

export const secretPage: Set<string> =  new Set(["hidden"])

export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [
		Component.MobileOnly(
			Component.ExplorerBurger({
				folderDefaultState: "open",
				folderClickBehavior: "link",
				// iconSettings: iconsOptions,
				sortFn,
				filterFn
			}),
		),
		Component.MobileOnly(Component.PageTitle()),
		Component.MobileOnly(Component.Spacer()),
		Component.Search(),
		Component.Darkmode(),
	],
	footer: Component.Footer({
		links: {
			Github: "https://github.com/OfirSinn",
			Email: "https://www.ofirsinn.github.io/Articles/Email",
		},
	}),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [
		// Component.DesktopOnly(Component.Breadcrumbs()), //is bugged
		Component.ArticleTitle(),
		// Component.ArticleTitle(iconsOptions),
		Component.ContentMeta({ showReadingTime: false }),
		Component.TagList(),
	],
	left: [
		Component.DesktopOnly(Component.Graph()),
		Component.DesktopOnly(Component.TableOfContents()),
		Component.DesktopOnly(Component.Backlinks()),
	],
	right: [
		Component.DesktopOnly(Component.PageTitle()),
		Component.DesktopOnly(Component.Breadcrumbs()),
		Component.DesktopOnly(
			Component.ExplorerBurger({
				folderClickBehavior: "link",
				folderDefaultState: "collapsed",
				useSavedState: true,
				title: "",
				// iconSettings: iconsOptions,
				sortFn,
				filterFn
			}),
		),
	],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
	beforeBody: defaultContentPageLayout.beforeBody,
	left: defaultContentPageLayout.left,
	right: [],
};
