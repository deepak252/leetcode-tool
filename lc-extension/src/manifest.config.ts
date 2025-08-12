import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'My Vite React Extension',
  description:
    'A production-grade browser extension built with React, Vite, Tailwind, and TypeScript.',
  version: '1.0.0',
  action: {
    default_popup: 'popup.html',
    default_icon: {
      '16': 'icons/icon.png',
      '48': 'icons/icon.png',
      '128': 'icons/icon.png',
    },
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: [
        // '<all_urls>'
        'https://www.leetcode.com/*',
        'https://*.leetcode.com/*',
      ],
      js: ['src/content/index.ts'],
    },
  ],
  permissions: ['storage', 'tabs', 'scripting'],
  host_permissions: ['http://localhost:5173/*'],
})
