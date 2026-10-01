# Integrating GitHub Projects Into This Portfolio

## Rule of thumb

This repository is the publishing portfolio. External GitHub projects are working sources. After adaptation, only the static, portfolio-ready result should be committed under `projects/[slug]/`.

## Folder contract

Every published project must use this structure:

```text
projects/[slug]/
  index.html
  meta.json
  v2.html        # optional, only for real variants
  v3.html        # optional, only for real variants
  assets/        # optional, only if the project needs local static assets
```

Working source repositories should live outside the published output, preferably in `sources/[slug]/`. The `sources/*/` folders are ignored by git.

## Import workflow

### Plain HTML projects

1. Copy the final HTML into `projects/[slug]/index.html`.
2. Add or update `projects/[slug]/meta.json`.
3. Add a visible return link to `../../index.html#projects`.
4. Add a card in the portfolio pages that should expose it.
5. Test locally with a static server from the repository root.

### React, Vite, Next, or other app projects

1. Clone or copy the source into `sources/[slug]/` or another working folder outside `projects/`.
2. Adapt content, assets, routing, and build settings in the source.
3. Build/export a static result.
4. Copy only the static output into `projects/[slug]/`.
5. Add the same return navigation required by plain HTML projects.
6. Do not commit `node_modules`, framework caches, dev-server output, or secrets.

### Multiple versions

Use:

- `index.html` for the default version.
- `v2.html`, `v3.html`, etc. for real variants.
- `meta.json` field `versions` to list committed variants.
- Matching links on the portfolio card, modal, and inside every variant page.

### One project split into several tiles

When a project has too many variants for one card, split it into numbered tiles:

- One folder per tile: `projects/[slug]-1/`, `projects/[slug]-2/`, each with its own `meta.json`, `index.html`, `v2.html`, etc.
- Titles follow `[Name] 1`, `[Name] 2`; version labels restart at `v1` inside every tile.
- Each tile gets its own entry in `PROJECT_SOURCES` in `index.html` and its own previews in `assets/previews/[slug]-N-*.png`.
- Any switcher built into the project pages lists only the versions of its own tile.
- Heavy shared assets (video, 3D models) live once in tile 1 and are referenced from tile 2 as `../[slug]-1/assets/...`. Do not delete tile 1 without moving them.

Current split projects: `kwiaciarnia-1` / `kwiaciarnia-2` (4 + 4 versions), `twoj-mechanik-1` / `twoj-mechanik-2` (3 + 2 versions).

## Required project navigation

Any project reachable from a portfolio card must provide an obvious return path:

`../../index.html#projects`

For built app shells, insert a top return bar above the app root. For one-file HTML projects, a fixed or sticky top bar is preferred.

## Validation

Run before committing:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-portfolio.ps1
```

The validator checks:

- JSON validity for every `meta.json`.
- Every card `data-preview` target exists.
- Published project pages have return navigation.
- `meta.json` version entries exist as files.
- Card/modal version links point to existing files.

