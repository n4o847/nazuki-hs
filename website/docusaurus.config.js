// @ts-check

const path = require("node:path");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nazuki",
  tagline: "A language that compiles into Brainfuck",

  url: "https://n4o847.github.io",
  baseUrl: "/nazuki-hs/",

  trailingSlash: false,

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/n4o847/nazuki-hs/tree/main/website/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Nazuki",
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Docs",
          },
          {
            to: "playground",
            label: "Playground",
            position: "left",
          },
          {
            href: "https://github.com/n4o847/nazuki-hs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `© ${new Date().getFullYear()} n4o847`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    path.resolve(__dirname, "plugins/docusaurus-plugin-ignore-wasmer-wasm"),
  ],
};

module.exports = config;
