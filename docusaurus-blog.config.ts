import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Druid Blog",
  tagline: "Druid Blog",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://blog.druid.gg",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "highcard-dev", // Usually your GitHub org/user name.
  projectName: "blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    path: "./i18n-blog",
    defaultLocale: "en",
    //locales: ["en"],
    locales: ["en", "de"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          showReadingTime: true,
          //set path to /
          routeBasePath: "/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: "img/logo.svg",
    navbar: {
      title: "Druid Blog",
      logo: {
        alt: "Druid Blog Logo",
        src: "img/logo.svg",
      },
      items: [
        //        {
        //          type: "docSidebar",
        //          sidebarId: "tutorialSidebar",
        //          position: "left",
        //          label: "Docs",
        //        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          to: "https://docs.druid.gg/",
          label: "Docs",
          position: "left",
        },
        {
          to: "https://blog.druid.gg/",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://app.druid.gg/",
          label: "Go to App",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Links",
          items: [
            {
              label: "Druid App",
              to: "https://app.druid.gg",
            },
            {
              label: "Druid Website",
              to: "https://druid.gg",
            },
            {
              label: "Druid Docs",
              to: "https://docs.druid.gg",
            },

            {
              label: "Druid Blog",
              to: "https://blog.druid.gg",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/druid",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/druid_gg",
            },
            {
              label: "Reddit",
              href: "https://www.reddit.com/r/druid_gg/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/highcard-dev/docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Highcard.`,
      logo: { src: "img/logo.svg", height: 30, width: 30 },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "yaml"],
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
