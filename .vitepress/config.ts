import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Primmel',
  description: 'Executable standards modelling for SMART standards.',
  lang: 'en-US',
  lastUpdated: true,

  ignoreDeadLinks: [
    /\.(prl|prd|prm|pws|yaml|yml)$/,
    /^\/examples\/files\/.*\/$/,  // workspace directories
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1e3a8a' }],
    // Typography: Hanken Grotesk (display + body), Spline Sans Mono (code). No serif, no Fraunces, no IBM Plex, no JetBrains Mono.
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800&family=Spline+Sans+Mono:wght@400;500;600&display=swap'
    }],
  ],

  themeConfig: {
    logo: {
      light: '/primmel-logo-light.svg',
      dark: '/primmel-logo-dark.svg',
    },
    siteTitle: 'Primmel',

    nav: [
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Docs', link: '/docs/introduction' },
      { text: 'Specification', link: 'https://www.primmel.org/spec/' },
      { text: 'About', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/primmel' },
    ],

    editLink: {
      pattern: 'https://github.com/primmel/primmel.github.io/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2026 Ribose',
    },

    sidebar: {
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: '1. Define', link: '/architecture/define' },
            { text: '2. Implement', link: '/architecture/implement' },
            { text: '3. Adopt', link: '/architecture/adopt' },
            { text: '4. Operate', link: '/architecture/operate' },
            { text: '5. Audit', link: '/architecture/audit' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: '1. Minimal Model', link: '/examples/minimal-model' },
            { text: '2. Data & Registries', link: '/examples/data-and-registries' },
            { text: '3. Process Flow', link: '/examples/process-flow' },
            { text: '4. Compliance & Measurement', link: '/examples/compliance-and-measurement' },
            { text: '5. Approval Workflow', link: '/examples/approval-workflow' },
            { text: '6. Implementation Package', link: '/examples/implementation-package' },
          ],
        },
      ],
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/docs/introduction' },
            { text: 'A First Model', link: '/docs/first-model' },
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