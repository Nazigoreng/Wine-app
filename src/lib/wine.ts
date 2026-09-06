import { countries, type Region, type WineNote } from "@/data/countries";

export type LayerKey = "france" | "italySubs" | "italyRegions" | "wineries";

export type LayerState = Record<LayerKey, boolean>;

export type WineFeatureProps = {
  id?: string;
  name: string;
  region?: string;
  grapes?: string[];
  key_appellations?: string[];
  desc?: string;
  level?: string;
  original_region?: string;
};

export type AtlasRegion = Region & {
  countryName: string;
  countryId: string;
};

export const DEFAULT_LAYERS: LayerState = {
  france: true,
  italySubs: true,
  italyRegions: false,
  wineries: false,
};

/** Map fills — geographic encoding, not UI chrome. */
export const REGION_COLORS: Record<string, string> = {
  Bordeaux: "#722F37",
  Burgundy: "#9B1B30",
  Beaujolais: "#9B1B30",
  Champagne: "#6B5344",
  "Rhône": "#8B3A3A",
  Loire: "#3F6B54",
  Provence: "#A66A7A",
  "Languedoc-Roussillon": "#A05A3C",
  Alsace: "#4A7C59",
  "Southwest (Dordogne)": "#6B4423",
  Jura: "#6B5344",
  Savoie: "#5A6570",
  Bugey: "#5A6570",
  Corsica: "#3D7A74",
  France: "#722F37",
  Piedmont: "#7A1F2B",
  Tuscany: "#A05A3C",
  Veneto: "#3F6B54",
  Sicily: "#8A4A32",
  Campania: "#9B1B30",
  Lombardy: "#4A7C59",
  "Friuli-Venezia Giulia": "#5B8C5A",
  "Trentino-Alto Adige": "#5A6E3A",
  Puglia: "#8B3A3A",
  Abruzzo: "#8A5340",
  "Emilia-Romagna": "#9A5A5A",
  Marche: "#5F7A5F",
  Umbria: "#556B2F",
  Lazio: "#7A6540",
  Sardinia: "#3D7A74",
  Basilicata: "#6B4423",
  Calabria: "#A05A3C",
  Liguria: "#4A6B7A",
  "Valle d'Aosta": "#5A6570",
  Molise: "#8A6A6A",
};

export const INK = "#1C1412";
export const WINE = "#722F37";
export const PAPER = "#FBF8F2";

export const EUROPE_CENTER: [number, number] = [45.4, 7.2];
export const EUROPE_ZOOM = 5.2;

export const allRegions: AtlasRegion[] = countries.flatMap((c) =>
  c.regions.map((r) => ({
    ...r,
    countryName: c.name,
    countryId: c.id,
  })),
);

export const allGrapes: string[] = Array.from(
  new Set(allRegions.flatMap((r) => r.vines || [])),
).sort((a, b) => a.localeCompare(b));

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function findRegionMatch(name: string, parent?: string): AtlasRegion | undefined {
  const n = norm(name);
  const exact = allRegions.find((r) => norm(r.name) === n || norm(r.id) === n);
  if (exact) return exact;
  const contains = allRegions.find(
    (r) => n.includes(norm(r.name)) || norm(r.name).includes(n),
  );
  if (contains) return contains;
  if (parent) {
    const p = norm(parent);
    return allRegions.find((r) => norm(r.name) === p || r.countryName.toLowerCase() === parent.toLowerCase());
  }
  return undefined;
}

export function wineName(w: WineNote | string) {
  return typeof w === "string" ? w : w.name;
}

export function featureToRegion(props: WineFeatureProps): AtlasRegion {
  const matched = findRegionMatch(props.name, props.region);
  const parent = props.region ? findRegionMatch(props.region) : undefined;
  const grapes = Array.isArray(props.grapes) ? props.grapes : [];
  const apps = Array.isArray(props.key_appellations) ? props.key_appellations : [];
  const vines = grapes.length ? grapes : matched?.vines ?? parent?.vines ?? [];
  const wines: Array<WineNote | string> =
    matched?.wines?.length
      ? matched.wines
      : (apps.length ? apps : vines).slice(0, 8).map((g) => ({
          name: g,
          taste: `Key wine or variety from ${props.name}.`,
          quality: 4,
          price: 3,
        }));

  const FRANCE_PARENTS = new Set([
    "Bordeaux",
    "Burgundy",
    "Beaujolais",
    "Champagne",
    "Rhône",
    "Loire",
    "Provence",
    "Languedoc-Roussillon",
    "Alsace",
    "Southwest (Dordogne)",
    "Jura",
    "Savoie",
    "Bugey",
    "Corsica",
    "France",
  ]);
  const frenchParent = Boolean(props.region && FRANCE_PARENTS.has(props.region));

  return {
    id: props.id || matched?.id || norm(props.name).replace(/\s+/g, "-"),
    name: props.name,
    lat: matched?.lat ?? 0,
    lng: matched?.lng ?? 0,
    climate: matched?.climate || parent?.climate || "Climate varies across sites and expositions.",
    soil: matched?.soil || parent?.soil || "See the notes for typical soils and terroir.",
    water: matched?.water || parent?.water || "Varies by sub-zone and vintage.",
    vines,
    wines,
    desc: props.desc || matched?.desc || `${props.name}${props.region ? ` — ${props.region}` : ""}`,
    countryName: matched?.countryName || parent?.countryName || props.region || "Europe",
    countryId: matched?.countryId || parent?.countryId || (frenchParent ? "france" : "europe"),
  };
}

export const QUALITY_LABEL: Record<number, string> = {
  1: "Average",
  2: "Good",
  3: "Very good",
  4: "Excellent",
  5: "Outstanding",
};
