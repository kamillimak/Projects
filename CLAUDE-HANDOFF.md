# Portfolio update handoff for Claude

Date: 2026-06-12

## Completed changes

- Removed the URL field from the project details modal because the displayed addresses were placeholders.
- Added a persistent "Powrot do portfolio" bar to every project that can be opened.
- Added project variants:
  - BikeOn: v1, v2
  - Jacek Rakowski: v1, v2
  - MATIX Bike: v1, v2, v3
- Version links are available on the portfolio cards, in the project modal, and inside each version page.
- Added a scroll-to-top button to the main portfolio.
- Added local wrapper pages for the TEURGIUM and TIRFOX Claude Artifact embeds.
- Replaced the inactive "Twoj Mechanik" portfolio card with TEURGIUM.
- Normalized project metadata and added missing source metadata under `assets/html`.
- Empty placeholders (`radca`, `serwis`) remain non-clickable until real HTML projects are supplied.

## Navigation rule

Every project exposed through `data-preview` in the main `index.html` must include an obvious link back to:

`../../index.html#projects`

Projects with multiple variants must expose the same version switcher on the card, in the modal, and on every variant page.

## Important files

- Main portfolio: `index.html`
- Published projects: `projects/*`
- Source HTML variants: `assets/html/*`
- Portfolio rules: `PORTFOLIO-GUIDELINES.md`

## Embed sources

- TEURGIUM: `https://claude.site/public/artifacts/379c869b-3db9-48bd-8912-07f0cf398a29/embed`
- TIRFOX: `https://claude.site/public/artifacts/2c10358e-9d51-45c5-9b9c-1c578d4c0c48/embed`
