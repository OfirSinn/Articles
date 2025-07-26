import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "הדיון שלא נגמר",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "he-IL",
    baseUrl: "ofirsinn.github.io/Articles/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ECEFF4",           // Nord Snow Storm
          lightgray: "#D8DEE9",       // Nord Snow Storm Light
          gray: "#B0BEC5",            // Soft gray
          darkgray: "#4C566A",        // Nord Polar Night
          dark: "#2E3440",            // Nord Polar Night Darker
          secondary: "#5E81AC",       // Nord Frost
          tertiary: "#88C0D0",        // Nord Frost Lighter
          highlight: "rgba(136, 192, 208, 0.15)", // Subtle blue overlay
          textHighlight: "#EBCB8B88", // Nord Aurora Yellow (translucent)
        },
        darkMode: {
          light: "#303446",           // Frappe Base
          lightgray: "#414559",       // Frappe Surface0
          gray: "#626880",            // Frappe Overlay0
          darkgray: "#C6D0F5",        // Frappe Text
          dark: "#F2D5CF",            // Frappe Rosewater
          secondary: "#8CAAEE",       // Frappe Blue
          tertiary: "#99D1DB",        // Frappe Teal
          highlight: "rgba(140, 170, 238, 0.15)", // Subtle blue overlay
          textHighlight: "#E5C89088", // Frappe Yellow (translucent)
        },
      }
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
