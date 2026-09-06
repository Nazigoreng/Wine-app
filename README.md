# Cru Atlas

Interactive wine atlas — click a region, zoom in, and read climate, soil, grapes and typical wines.

**Live source:** [https://github.com/Nazigoreng/Wine-app](https://github.com/Nazigoreng/Wine-app)

## What’s on the map

- **France** — named appellations (Bordeaux, Burgundy, Loire, Rhône, Champagne, Alsace, Provence, Languedoc…)
- **Italy** — 20 regions + DOC/DOCG polygons (Barolo, Brunello, Etna, Taurasi…)
- **Write-ups** for France, Italy, Spain, USA, Australia, Argentina, Germany, New Zealand, Chile, Portugal and South Africa

Click a polygon to fly to it. The header lists regions; the side panel shows climate, soil, water and signature wines.

## Run it locally

You need [Node.js 22+](https://nodejs.org/) and [Git](https://git-scm.com/).

```bash
git clone https://github.com/Nazigoreng/Wine-app.git
cd Wine-app
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). Stop with `Ctrl+C`.

```bash
npm run build      # production build
npm run typecheck
```

## Run inside GitHub (Codespaces)

1. Open [https://github.com/Nazigoreng/Wine-app](https://github.com/Nazigoreng/Wine-app)
2. Click the green **Code** button → **Codespaces** → **Create codespace on main**
3. In the terminal: `npm install` then `npm run dev`
4. Click **Open in Browser** on port 8080

## Put it on the web (Vercel)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Import **Nazigoreng/Wine-app**
4. Leave the defaults and click **Deploy**

GitHub Pages will **not** work — this is a Node/Vite app, not a static HTML folder.

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
