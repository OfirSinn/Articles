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
        lightMode: { // iceberg light
          light: "#e8e9ec",           // Nord Snow Storm
          lightgray: "#ccceda",       // Nord Snow Storm Light
          gray: "#adb1c4",            // Soft gray
          darkgray: "#33374c",        // Nord Polar Night
          dark: "#262a3f",            // Nord Polar Night Darker
          secondary: "#2d539e",       // Nord Frost
          tertiary: "#88C0D0",        // Nord Frost Lighter
          highlight: "#ccceda", // Subtle blue overlay
          textHighlight: "#adb1c4", // Nord Aurora Yellow (translucent)
        },
        darkMode: { // iceberg dark
          light: "#161821",           // background color
          lightgray: "#232531",       // search box background
          gray: "#595e76",            // blobs connected in the graph
          darkgray: "#c6c8d1",        // Text
          dark: "#d2d4de",            // Headers
          secondary: "#84a0c6",       // color of Site Name, links, tags, and other elements
          tertiary: "#99D1DB",        // tags in graph view
          highlight: "#232531",       // the background of tags
          textHighlight: "#595e76",   // ==highlight== color
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
