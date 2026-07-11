export const SITE = {
  title: 'Primmel',
  description: 'Executable standards modelling for SMART standards.',
  url: 'https://www.primmel.org',
  github: 'https://github.com/primmel',
  author: 'Ribose',
  nav: [
    { text: 'Architecture', href: '/architecture/' },
    { text: 'Audiences', href: '/audiences/' },
    { text: 'Examples', href: '/examples/' },
    { text: 'Docs', href: '/docs/introduction' },
    { text: 'Specification', href: '/spec/' },
    { text: 'About', href: '/about' },
  ],
} as const;

export const FEATURES = [
  { num: '01', title: 'Executable standards', body: 'Process requirements and data requirements expressed in a language a computer can read and run — not just a document humans have to interpret.' },
  { num: '02', title: 'Single source of truth', body: 'One canonical model per standard. Auditors, implementers, and certifiers all read from the same artifact.' },
  { num: '03', title: 'Mapping and extension',  body: 'Map your own processes and controls onto any Primmel-modelled standard. Reuse, extend, and specialise without forking the source.' },
  { num: '04', title: 'Process and data primitives', body: 'Built-in primitives for classes, processes, gateways, provisions, and measurements.' },
  { num: '05', title: 'Evidence built in', body: 'Every requirement carries evidential hooks. Auditors locate compliance evidence by following the model.' },
  { num: '06', title: 'Open and vendor-neutral', body: 'A public language, available for any standards organisation to adopt.' },
] as const;