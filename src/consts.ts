export const SITE = {
  title: 'Primmel',
  description: 'Executable standards modelling for SMART standards.',
  url: 'https://www.primmel.org',
  github: 'https://github.com/primmel',
  author: 'Ribose',
  nav: [
    { text: 'Architecture', href: '/architecture/' },
    { text: 'Examples', href: '/examples/' },
    { text: 'Docs', href: '/docs/introduction' },
    { text: 'Specification', href: 'https://www.primmel.org/spec/' },
    { text: 'About', href: '/about' },
  ],
} as const;

export const PILLARS = [
  { num: '01', name: 'Define',    href: '/architecture/define',    desc: 'A reference publisher authors a reference model and publishes it for others to consume.' },
  { num: '02', name: 'Reference', href: '/architecture/reference', desc: 'Readers consume the published model: navigate the standard, run test procedures, check dimensional and formula requirements.' },
  { num: '03', name: 'Implement', href: '/architecture/implement', desc: 'Maintain the digital twin, take up a reference, customize to satisfy it, declare mappings. Close when every reference element maps to >=1 impl element.' },
  { num: '04', name: 'Operate',   href: '/architecture/operate',   desc: 'Operators run the implementation in production. Each process execution produces records — the evidence of conformance.' },
  { num: '05', name: 'Audit',     href: '/architecture/audit',     desc: 'An auditor navigates the standard like readers, correlates through mappings, views evidence like operators. A structural compliance verdict.' },
] as const;

export const FEATURES = [
  { num: '01', title: 'Executable standards', body: 'Process requirements and data requirements expressed in a language a computer can read and run — not just a document humans have to interpret.' },
  { num: '02', title: 'Single source of truth', body: 'One canonical model per standard. Auditors, implementers, and certifiers all read from the same artifact.' },
  { num: '03', title: 'Mapping and extension',  body: 'Map your own processes and controls onto any Primmel-modelled standard. Reuse, extend, and specialise without forking the source.' },
  { num: '04', title: 'Process and data primitives', body: 'Built-in primitives for classes, processes, gateways, provisions, and measurements.' },
  { num: '05', title: 'Evidence built in', body: 'Every requirement carries evidential hooks. Auditors locate compliance evidence by following the model.' },
  { num: '06', title: 'Open and vendor-neutral', body: 'A public language, available for any standards organisation to adopt.' },
] as const;

export const EXTENSIONS = {
  prl: { name: 'Primmel Model',          ext: '.prl',  kind: 'File' },
  prd: { name: 'Primmel Document',       ext: '.prd',  kind: 'File' },
  prm: { name: 'Primmel Map',            ext: '.prm',  kind: 'File' },
  pws: { name: 'Primmel Workspace',      ext: '.pws',  kind: 'Directory' },
} as const;