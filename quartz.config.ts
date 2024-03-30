import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
	configuration: {
		pageTitle: "עט לכתוב",
		enableSPA: true,
		locale: "he-IL",
		enablePopovers: true,
		analytics: {
			provider: "plausible",
		},
		baseUrl: "ofirsinn.github.io/Articles",
		ogImageDir: "_assets/img",
		ignorePatterns: ["private", "templates", ".obsidian"],
		defaultDateType: "modified",
		theme: {
			cdnCaching: true,
			typography: {
				header: "Noto Serif Hebrew",
				body: "Source Sans Pro",
				code: "IBM Plex Mono",
			},
			colors: {
				lightMode: {
					light: "#FBF7EE",
					lightgray: "#e0dcd3",
					gray: "#b8b8b8",
					darkgray: "#2A354B",
					dark: "#08142C",
					secondary: "#274B75",
					tertiary: "#84a59d",
					highlight: "rgba(143, 159, 169, 0.15)",
					},
				darkMode: {
					light: "#101520",
					lightgray: "#1D232D",
					gray: "#2A354B",
					darkgray: "#d4d4d4",
					dark: "#ebebec",
					secondary: "#7188A9",
					tertiary: "#84a59d",
					highlight: "rgba(143, 159, 169, 0.15)",
				},
			},
		},
	},
	plugins: {
		transformers: [
			Plugin.FrontMatter(),
			Plugin.CreatedModifiedDate({
				priority: ["frontmatter", "git", "filesystem"],
			}),
			Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
			Plugin.Latex({ renderEngine: "katex" }),
			Plugin.SyntaxHighlighting({
				theme: {
					light: "github-light",
					dark: "github-dark",
				},
				keepBackground: false,
			}),
			// Plugin.poetry(),
			Plugin.GitHubFlavoredMarkdown(),
			Plugin.TableOfContents(),
			Plugin.CrawlLinks({ markdownLinkResolution: "relative" }),
			Plugin.Description(),
			Plugin.HardLineBreaks(),
		],
		filters: [Plugin.RemoveDrafts()],
		emitters: [
			Plugin.AliasRedirects(),
			Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
			Plugin.ContentPage(),
			Plugin.FolderPage(),
			Plugin.TagPage(),
			Plugin.ContentIndex({
				enableSiteMap: true,
				enableRSS: true,
			}),
			Plugin.Assets(),
			Plugin.Static(),
			Plugin.NotFoundPage(),
		],
	},
};

export default config;
