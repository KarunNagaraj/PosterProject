# Poster Studio

A React-based smart event poster generator with 10 layout templates, live preview, dark/light mode, QR code support, and PNG export.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

## Project Structure

```
src/
├── constants/index.js          ← All data: gradients, accents, themes, defaults
├── hooks/
│   ├── usePosterState.js       ← Central state: poster + design
│   └── useTheme.js             ← Dark/light toggle
├── utils/index.js              ← Formatters, background builder, QR, download
├── components/
│   ├── UI.jsx + UI.module.css  ← Shared primitives
│   ├── LeftPanel.jsx           ← Sidebar with tab navigation
│   ├── RightPanel.jsx          ← Preview + toolbar
│   ├── tabs/
│   │   ├── HeaderTab.jsx       ← Logo, institution info
│   │   ├── EventTab.jsx        ← Category, date/time, QR toggle
│   │   ├── SpeakerTab.jsx      ← Up to 2 speakers
│   │   └── DesignTab.jsx       ← Layout, background, colours, fonts
│   └── poster/
│       ├── PosterCanvas.jsx    ← Renders active layout at correct size
│       ├── PosterParts.jsx     ← SpeakerCard, InfoRow, QRBlock, TaglineBar
│       └── layouts/index.jsx   ← All 10 layout components (L0-L9)
└── App.jsx                     ← Root component
```

## Features

- 10 poster layouts: Classic, Editorial, Split, Band, Overlay, Minimal, Diagonal, Frame, Timeline, Typographic
- Full randomize shuffles gradient, accent, layout, font and background type
- Per-category theme presets
- Dark / Light mode via CSS variables
- QR code generation from registration URL
- PNG export via html2canvas at 2.5x resolution
- 4 poster sizes: A4 portrait/landscape, Square, Story/Reel
- Image uploads: logo, speaker photos, background

## Adding a New Layout

1. Write your component in `src/components/poster/layouts/index.jsx`
2. Add it to the `LAYOUTS` array in `PosterCanvas.jsx`
3. Add its name to `LAYOUT_NAMES` in `constants/index.js`
