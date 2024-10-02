import { defineConfig } from 'wxt';

export default defineConfig({
  imports: {
    presets: ['react'], 
  },
  manifest: {
    manifest_version: 3,
    name: "LinkedIn AI Reply",
    description: "A WXT extension with React, content and background scripts",
    version: "0.0.1",
    permissions: ["activeTab", "scripting"],
    host_permissions: [
      "https://www.linkedin.com/*"
    ],
    action: {
      default_popup: "popup/index.html",
    },
    content_scripts: [
      {
        matches: ['https://www.linkedin.com/*'],
        js: ['./content-scripts/content.js'], 
      },
    ],
    background: {
      service_worker: './background.ts',
    },
  },
});