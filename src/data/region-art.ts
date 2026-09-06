/** Imagine-painted atlas portraits, keyed by wine family. */

export const REGION_ART_FILES = {
  bordeaux: "/art/regions/bordeaux.jpg",
  burgundy: "/art/regions/burgundy.jpg",
  champagne: "/art/regions/champagne.jpg",
  loire: "/art/regions/loire.jpg",
  rhone: "/art/regions/rhone.jpg",
  alsace: "/art/regions/alsace.jpg",
  provence: "/art/regions/provence.jpg",
  languedoc: "/art/regions/languedoc.jpg",
  piedmont: "/art/regions/piedmont.jpg",
  tuscany: "/art/regions/tuscany.jpg",
  veneto: "/art/regions/veneto.jpg",
  sicily: "/art/regions/sicily.jpg",
  default: "/art/regions/default.jpg",
} as const;

type ArtKey = keyof typeof REGION_ART_FILES;

const RULES: Array<{ key: ArtKey; needles: string[] }> = [
  {
    key: "bordeaux",
    needles: [
      "bordeaux",
      "medoc",
      "médoc",
      "pauillac",
      "margaux",
      "saint-julien",
      "st-julien",
      "saint-estephe",
      "st-estephe",
      "graves",
      "sauternes",
      "pomerol",
      "saint-emilion",
      "st-emilion",
      "fronsac",
      "cadillac",
      "entre-deux",
      "barsac",
      "pessac",
    ],
  },
  {
    key: "burgundy",
    needles: [
      "burgundy",
      "bourgogne",
      "chablis",
      "nuits",
      "beaune",
      "meursault",
      "puligny",
      "montrachet",
      "gevrey",
      "vosne",
      "pommard",
      "volnay",
      "macon",
      "mâcon",
      "pouilly-fuisse",
      "beaujolais",
      "cote d'or",
      "côte d'or",
    ],
  },
  {
    key: "champagne",
    needles: ["champagne", "reims", "epernay", "ay", "côte des blancs", "montagne de reims"],
  },
  {
    key: "loire",
    needles: [
      "loire",
      "sancerre",
      "pouilly-fume",
      "vouvray",
      "chinon",
      "bourgueil",
      "muscadet",
      "anjou",
      "saumur",
      "touraine",
      "quincy",
      "menetou",
    ],
  },
  {
    key: "rhone",
    needles: [
      "rhone",
      "rhône",
      "cote-rotie",
      "côte-rôtie",
      "hermitage",
      "cornas",
      "saint-joseph",
      "chateauneuf",
      "châteauneuf",
      "gigondas",
      "vacqueyras",
      "condrieu",
      "crozes",
      "tavel",
      "lirac",
      "cotes du rhone",
    ],
  },
  {
    key: "alsace",
    needles: ["alsace", "colmar", "ribeauvillé", "riquewihr", "gewurz"],
  },
  {
    key: "provence",
    needles: ["provence", "bandol", "cassis", "palette", "côtes de provence", "cotes de provence"],
  },
  {
    key: "languedoc",
    needles: [
      "languedoc",
      "roussillon",
      "minervois",
      "corbieres",
      "corbières",
      "fitou",
      "faugeres",
      "picpoul",
      "pic saint",
      "banyuls",
      "collioure",
    ],
  },
  {
    key: "piedmont",
    needles: [
      "piedmont",
      "piemonte",
      "barolo",
      "barbaresco",
      "langhe",
      "roero",
      "gavi",
      "asti",
      "barbera d'alba",
      "barbera d'asti",
      "dolcetto",
      "gattinara",
      "ghemme",
    ],
  },
  {
    key: "tuscany",
    needles: [
      "tuscany",
      "toscana",
      "chianti",
      "brunello",
      "montalcino",
      "bolgheri",
      "montepulciano",
      "vernaccia",
      "morellino",
      "super tuscan",
      "maremma",
    ],
  },
  {
    key: "veneto",
    needles: [
      "veneto",
      "valpolicella",
      "amarone",
      "soave",
      "prosecco",
      "bardolino",
      "recioto",
      "conegliano",
      "valdobbiadene",
    ],
  },
  {
    key: "sicily",
    needles: ["sicily", "sicilia", "etna", "marsala", "pantelleria", "nero d'avola", "vittoria", "custoza"],
  },
];

function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function artKeyFor(parts: Array<string | undefined | null>): ArtKey {
  const hay = fold(parts.filter(Boolean).join(" • "));
  for (const rule of RULES) {
    if (rule.needles.some((n) => hay.includes(fold(n)))) return rule.key;
  }
  if (hay.includes("campania") || hay.includes("taurasi") || hay.includes("fiano") || hay.includes("greco di tufo")) {
    return "sicily";
  }
  if (hay.includes("france")) return "bordeaux";
  if (hay.includes("italy") || hay.includes("italia")) return "tuscany";
  return "default";
}

export function artForRegion(region: {
  id?: string;
  name?: string;
  parent?: string;
  countryName?: string;
  countryId?: string;
}): string {
  const key = artKeyFor([region.parent, region.name, region.id, region.countryName, region.countryId]);
  return REGION_ART_FILES[key];
}
