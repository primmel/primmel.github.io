import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Primmel',
  description: 'Executable standards modelling for SMART standards.',
  lang: 'en-US',
  lastUpdated: true,

  ignoreDeadLinks: [
    /\.(prl|prd|prm|pws|yaml|yml)$/,
    /^\/docs\/examples\/files\/.*\/$/,  // workspace directories
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.svg' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1e3a8a' }],
  ],

  themeConfig: {
    logo: {
      light: '/primmel-logo-full-light.svg',
      dark: '/primmel-logo-full-dark.svg',
    },
    siteTitle: false,

    nav: [
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Specification', link: 'https://www.primmel.org/spec/' },
      { text: 'Examples', link: '/docs/examples/' },
      { text: 'About', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/primmel' },
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2026 Ribose',
    },

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/docs/introduction' },
            { text: 'A First Model', link: '/docs/first-model' },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/docs/architecture/' },
            { text: '1. Define', link: '/docs/architecture/define' },
            { text: '2. Implement', link: '/docs/architecture/implement' },
            { text: '3. Adopt', link: '/docs/architecture/adopt' },
            { text: '4. Operate', link: '/docs/architecture/operate' },
            { text: '5. Audit', link: '/docs/architecture/audit' },
          ],
        },
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/docs/examples/' },
            { text: '1. Minimal Model', link: '/docs/examples/minimal-model' },
            { text: '2. Data & Registries', link: '/docs/examples/data-and-registries' },
            { text: '3. Process Flow', link: '/docs/examples/process-flow' },
            { text: '4. Compliance & Measurement', link: '/docs/examples/compliance-and-measurement' },
            { text: '5. Approval Workflow', link: '/docs/examples/approval-workflow' },
            { text: '6. Implementation Package', link: '/docs/examples/implementation-package' },
          ],
        },
        {
          text: 'Language Reference',
          items: [
            { text: 'Data Model', link: '/docs/data-model' },
            { text: 'Process Model', link: '/docs/process-model' },
            { text: 'Compliance', link: '/docs/compliance' },
            { text: 'Measurement', link: '/docs/measurement' },
            { text: 'Mapping', link: '/docs/mapping' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },
})