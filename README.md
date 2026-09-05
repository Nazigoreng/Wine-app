# Cru Atlas

Interactive wine atlas — click a region, zoom in, and read climate, soil, grapes and typical wines.

**GitHub repo:** [https://github.com/Nazigoreng/Wine-app](https://github.com/Nazigoreng/Wine-app)

GitHub holds the source. To **run** it, pick one of the three options below.

## 1. Run on your computer (simplest)

You need [Node.js 22+](https://nodejs.org/) and [Git](https://git-scm.com/).

```bash
git clone https://github.com/Nazigoreng/Wine-app.git
cd Wine-app
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

Stop the server with `Ctrl+C`.

## 2. Run inside GitHub (Codespaces)

This runs the app in a cloud VS Code in your browser — no install on your laptop.

1. Open [https://github.com/Nazigoreng/Wine-app](https://github.com/Nazigoreng/Wine-app)
2. Click the green **Code** button
3. Open the **Codespaces** tab
4. Click **Create codespace on main**
5. When the terminal is ready:

```bash
npm install
npm run dev
```

6. Codespaces will show a popup: **Open in Browser** (port 8080). Click it.

Free accounts get a limited hours/month of Codespaces.

## 3. Put it on the web (Vercel)

This gives you a public URL like `cru-atlas.vercel.app`.

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Import **Nazigoreng/Wine-app**
4. Leave the defaults (Vite / Node) and click **Deploy**

Every push to `main` will rebuild the site.

GitHub Pages will **not** work here — this app is a Node/Vite server, not a static HTML folder.

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
