# Cru Atlas

Interactive wine atlas — click a region, zoom in, and read climate, soil, grapes and typical wines.

Built as a TanStack Start app with Leaflet + MapLibre. France is mapped at appellation (AOC) level; Italy at PDO subregion level, with larger regional outlines optional.

## What’s on the map

- **France** — 288 named appellations (Bordeaux, Burgundy, Loire, Rhône, Champagne, Alsace, Provence, Languedoc…)
- **Italy** — 20 regions + 390 DOC/DOCG polygons (Barolo, Brunello, Etna, Taurasi…)
- **Write-ups** for France, Italy, Spain, USA, Australia, Argentina, Germany, New Zealand, Chile, Portugal and South Africa

Click a polygon to fly to it. The header lists regions; the side panel shows climate, soil, water and signature wines.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

```bash
npm run build      # production build
npm run typecheck
```

## Project layout

```
src/components/     atlas UI, map, detail panel
src/data/           region write-ups (climate, soil, grapes)
src/lib/wine.ts     map helpers and region matching
public/data/        GeoJSON layers (France AOC, Italy PDO)
```

## Data

French and Italian polygons come from EU wine PDO geometry (Candiago et al., CC0) with names aligned to the atlas write-ups. This is a reference atlas, not a legal register of every village cru.

## Stack

React 19 · TanStack Start / Router · Tailwind CSS v4 · Leaflet · MapLibre GL
