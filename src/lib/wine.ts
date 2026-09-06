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
  parent?: string;
};

export const DEFAULT_LAYERS: LayerState = {
  france: true,
  italySubs: true,
  italyRegions: false,
  wineries: false,
};

/** Map fills — De Long-style print pastels, not UI chrome. */
export const REGION_COLORS: Record<string, string> = {
  Bordeaux: "#C46B74",
  Burgundy: "#B5524A",
  Beaujolais: "#C46B6B",
  Champagne: "#D4C07A",
  "Rhône": "#C57A52",
  Loire: "#7A9A72",
  Provence: "#D4A3B0",
  "Languedoc-Roussillon": "#C9A06A",
  Alsace: "#6B8F6E",
  "Southwest (Dordogne)": "#B8895A",
  Jura: "#A8946A",
  Savoie: "#8A9AA8",
  Bugey: "#8A9AA8",
  Corsica: "#5E8F8A",
  France: "#C46B74",
  Piedmont: "#C45C68",
  Tuscany: "#D4A05C",
  Veneto: "#5E9A8E",
  Sicily: "#E0C56A",
  Campania: "#D4A07A",
  Lombardy: "#7A9A7A",
  "Friuli-Venezia Giulia": "#6B9A78",
  "Trentino-Alto Adige": "#6A7A4A",
  Puglia: "#D4B85C",
  Abruzzo: "#C48A62",
  "Emilia-Romagna": "#C47A7A",
  Marche: "#7A8F6A",
  Umbria: "#6A7B48",
  Lazio: "#A8945A",
  Sardinia: "#5E8F8A",
  Basilicata: "#A07048",
  Calabria: "#C48A5A",
  Liguria: "#6A8A96",
  "Valle d'Aosta": "#8A929C",
  Molise: "#B8948A",
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
    parent: props.region || parent?.name,
  };
}

export const QUALITY_LABEL: Record<number, string> = {
  1: "Average",
  2: "Good",
  3: "Very good",
  4: "Excellent",
  5: "Outstanding",
};
