# Signet Industrial Robotics Website

Source for the Signet Industrial Robotics website.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Project structure

- `dist/index.html` — homepage and service content.
- `dist/styles.css` — responsive layout and styling.
- `dist/site.js` — navigation and animation controls.
- `dist/engineering-scene.mjs` — animated engineering scene.
- `dist/favicon.svg` — site icon.
- `vite.config.js` — local development server configuration.
- `.openai/hosting.json` — existing Sites deployment configuration.

This is a static site. Despite its name, `dist/` contains the editable source files and must remain tracked. No build step is required to serve that directory.

## Current services

- Subsea Positioning Services, including inertial metrology and dimensional control.
- Subsea IMR.
- AI-Native Digital Business Platforms.
- Industrial Remote Operations.
- Industrial Robotics.

## Published website

https://signet-industrial-robotics.harry05.chatgpt.site

This repository contains a snapshot of the published website. Pushing to GitHub does not automatically update the Sites publication; no GitHub deployment workflow is configured.
