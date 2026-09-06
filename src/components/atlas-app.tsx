import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Globe, Grape, Layers, Search, Wine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailPanel, ExplorePanel } from "@/components/detail-panel";
import { WineMap, type MapFocus } from "@/components/wine-map";
import { countries } from "@/data/countries";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LAYERS,
  allGrapes,
  allRegions,
  wineName,
  type AtlasRegion,
  type LayerState,
} from "@/lib/wine";

type SearchHit = {
  kind: "Region" | "Country" | "Wine" | "Grape";
  title: string;
  sub: string;
  region?: AtlasRegion;
  countryId?: string;
  grape?: string;
};

function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function usePresence(open: boolean, ms = 250) {
  const [shown, setShown] = useState(open);
  const [on, setOn] = useState(open);

  useEffect(() => {
    if (open) {
      setShown(true);
      const id = window.requestAnimationFrame(() => setOn(true));
      return () => window.cancelAnimationFrame(id);
    }
    setOn(false);
    const t = window.setTimeout(() => setShown(false), ms);
    return () => window.clearTimeout(t);
  }, [open, ms]);

  return { shown, on };
}

export function AtlasApp() {
  const [layers, setLayers] = useState<LayerState>(DEFAULT_LAYERS);
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [activeGrape, setActiveGrape] = useState<string | null>(null);
  const [selected, setSelected] = useState<AtlasRegion | null>(null);
  const lastSelected = useRef<AtlasRegion | null>(null);
  if (selected) lastSelected.current = selected;
  const railRegion = selected ?? lastSelected.current;
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [grapeOpen, setGrapeOpen] = useState(false);
  const [layerOpen, setLayerOpen] = useState(false);
  const [ready, setReady] = useState<{ france: number; italySubs: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ id: number; spec: MapFocus }>({
    id: 0,
    spec: { kind: "world" },
  });
  const mobileSheet = usePresence(Boolean(selected));
  const searchMenu = usePresence(searchOpen, 150);

  const fly = (spec: MapFocus) => setFocus((f) => ({ id: f.id + 1, spec }));
  const activeCountry = countries.find((c) => c.id === activeCountryId) ?? null;
  const countryRegions = useMemo(
    () => allRegions.filter((r) => r.countryId === activeCountryId),
    [activeCountryId],
  );

  const markers = useMemo(() => {
    if (activeGrape) {
      return allRegions.filter((r) => r.vines.includes(activeGrape));
    }
    if (activeCountryId && activeCountryId !== "france" && activeCountryId !== "italy") {
      return allRegions.filter((r) => r.countryId === activeCountryId);
    }
    return [];
  }, [activeCountryId, activeGrape]);

  const hits: SearchHit[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: SearchHit[] = [];
    for (const r of allRegions) {
      if (r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)) {
        out.push({ kind: "Region", title: r.name, sub: r.countryName, region: r });
      }
    }
    for (const c of countries) {
      if (c.name.toLowerCase().includes(q)) {
        out.push({
          kind: "Country",
          title: c.name,
          sub: `${c.regions.length} regions`,
          countryId: c.id,
        });
      }
    }
    for (const r of allRegions) {
      for (const w of r.wines) {
        const name = wineName(w);
        if (name.toLowerCase().includes(q)) {
          out.push({ kind: "Wine", title: name, sub: `${r.name}, ${r.countryName}`, region: r });
        }
      }
    }
    for (const g of allGrapes) {
      if (g.toLowerCase().includes(q)) {
        out.push({ kind: "Grape", title: g, sub: "Grape variety", grape: g });
      }
    }
    return out.slice(0, 18);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectCountry = (id: string) => {
    const country = countries.find((c) => c.id === id);
    if (!country) return;
    setActiveCountryId(id);
    setActiveGrape(null);
    setSelected(null);
    fly({ kind: "view", center: country.center, zoom: country.zoom });
  };

  const selectRegion = (region: AtlasRegion) => {
    setActiveCountryId(region.countryId);
    setActiveGrape(null);
    setSelected(region);
    fly({ kind: "point", lat: region.lat, lng: region.lng, zoom: 8 });
  };

  const pickRegionById = (id: string) => {
    const region = allRegions.find((r) => r.id === id);
    if (region) selectRegion(region);
  };

  const selectGrape = (grape: string) => {
    const next = activeGrape === grape ? null : grape;
    setActiveGrape(next);
    setActiveCountryId(null);
    setSelected(null);
    if (next) {
      const matching = allRegions.filter((r) => r.vines.includes(next));
      if (matching.length === 1) {
        fly({ kind: "point", lat: matching[0].lat, lng: matching[0].lng, zoom: 7 });
      } else if (matching.length > 1) {
        fly({ kind: "world" });
      }
    }
  };

  const reset = () => {
    setActiveCountryId(null);
    setActiveGrape(null);
    setSelected(null);
    setQuery("");
    fly({ kind: "world" });
  };

  const applyHit = (hit: SearchHit) => {
    setQuery("");
    setSearchOpen(false);
    if (hit.kind === "Country" && hit.countryId) {
      selectCountry(hit.countryId);
      setSearchOpen(true);
    } else if (hit.kind === "Grape" && hit.grape) {
      selectGrape(hit.grape);
    } else if (hit.region) {
      selectRegion(hit.region);
    }
  };

  const popLast = () => {
    if (selected && activeCountryId) {
      selectCountry(activeCountryId);
      setSearchOpen(true);
      return;
    }
    if (activeCountryId) reset();
  };

  const menuItems = (() => {
    const q = fold(query);
    const items: { kind: string; title: string; sub: string; pick: () => void }[] = [];
    if (!activeCountryId) {
      for (const c of countries) {
        items.push({
          kind: "Country",
          title: c.name,
          sub: `${c.regions.length} regions`,
          pick: () => {
            setQuery("");
            selectCountry(c.id);
            setSearchOpen(true);
          },
        });
      }
    } else {
      for (const r of countryRegions) {
        items.push({
          kind: "Region",
          title: r.name,
          sub: r.countryName,
          pick: () => {
            setQuery("");
            selectRegion(r);
            setSearchOpen(false);
          },
        });
      }
    }
    const scoped = q ? items.filter((i) => fold(i.title).includes(q)) : items;
    if (q.length < 2) return scoped;
    const seen = new Set(scoped.map((i) => fold(i.title)));
    const extra = hits
      .filter((h) => !seen.has(fold(h.title)))
      .map((h) => ({
        kind: h.kind,
        title: h.title,
        sub: h.sub,
        pick: () => applyHit(h),
      }));
    return [...scoped, ...extra];
  })();

  const pathHint = !activeCountryId
    ? "Search or pick a country"
    : selected
      ? "Search an appellation…"
      : "Pick a region…";

  const toggleLayer = (key: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background">
      <header className="relative z-20 shrink-0 border-b border-border bg-card">
        <div className="h-0.5 w-full bg-primary" />
        <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4">
          <div className="flex min-h-11 items-center gap-3 px-1">
            <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Wine className="size-4" strokeWidth={1.75} />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg font-medium tracking-tight">Cru Atlas</p>
              <p className="hidden text-xs tracking-widest text-muted-foreground uppercase sm:block">
                {ready
                  ? `${ready.france} French · ${ready.italySubs} Italian appellations`
                  : "Europe · appellations"}
              </p>
            </div>
          </div>

          <div className="relative min-w-0 flex-1 sm:max-w-2xl">
            <label className="sr-only" htmlFor="atlas-search">
              Search regions, wines, grapes
            </label>
            <div
              className={cn(
                "flex min-h-11 w-full items-center gap-1 rounded-md border border-border bg-background py-1 pr-10 pl-2",
                searchOpen && "ring-2 ring-ring",
              )}
            >
              <Search className="mx-1 size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto scrollbar-none">
                {activeCountry && (
                  <>
                    <button
                      type="button"
                      className="inline-flex h-8 shrink-0 items-center rounded-sm bg-accent px-2.5 text-xs font-medium tracking-wide text-accent-foreground uppercase"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        selectCountry(activeCountry.id);
                        setSearchOpen(true);
                      }}
                    >
                      {activeCountry.name}
                    </button>
                    {selected && (
                      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </>
                )}
                {selected && (
                  <button
                    type="button"
                    className="inline-flex h-8 shrink-0 items-center rounded-sm bg-primary px-2.5 text-xs font-medium text-primary-foreground"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setSearchOpen(true)}
                  >
                    {selected.name}
                  </button>
                )}
                <input
                  id="atlas-search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => window.setTimeout(() => setSearchOpen(false), 180)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && menuItems[0]) {
                      e.preventDefault();
                      menuItems[0].pick();
                    }
                    if (e.key === "Backspace" && !query) {
                      e.preventDefault();
                      popLast();
                    }
                  }}
                  placeholder={pathHint}
                  className="h-9 min-w-32 flex-1 bg-transparent px-1.5 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            {(query || activeCountryId || selected) && (
              <button
                type="button"
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (query) {
                    setQuery("");
                    setSearchOpen(true);
                    return;
                  }
                  popLast();
                }}
                aria-label={query ? "Clear search" : "Go back"}
              >
                <X className="size-4" />
              </button>
            )}
            {searchMenu.shown && (
              <ul
                className={cn(
                  "atlas-menu absolute top-full z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-border bg-card py-1 shadow-panel",
                  searchMenu.on && "is-open",
                )}
              >
                {menuItems.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-muted-foreground">No matches</li>
                ) : (
                  menuItems.map((item, i) => (
                    <li key={`${item.kind}-${item.title}-${i}`}>
                      <button
                        type="button"
                        className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-accent"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => item.pick()}
                      >
                        <span className="flex items-center gap-2 text-sm">
                          <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            {item.kind}
                          </span>
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.sub}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <Button variant="outline" size="icon" onClick={reset} aria-label="Reset map">
            <Globe className="size-5" strokeWidth={1.75} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setGrapeOpen((v) => !v);
              setLayerOpen(false);
            }}
            aria-label="Filter by grape"
            className={cn((grapeOpen || activeGrape) && "bg-accent")}
          >
            <Grape className="size-5" strokeWidth={1.75} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setLayerOpen((v) => !v);
              setGrapeOpen(false);
            }}
            aria-label="Map layers"
            className={cn(layerOpen && "bg-accent")}
          >
            <Layers className="size-5" strokeWidth={1.75} />
          </Button>
        </div>

        <div className={cn("atlas-fold", grapeOpen && "is-open")}>
          <div>
            <div className="flex max-w-full gap-2 overflow-x-auto border-t border-border px-3 py-2 sm:px-4 scrollbar-none">
              {allGrapes.map((g) => (
                <Button
                  key={g}
                  variant="chip"
                  size="sm"
                  className="rounded-full"
                  data-active={activeGrape === g}
                  onClick={() => selectGrape(g)}
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={cn("atlas-fold", layerOpen && "is-open")}>
          <div>
            <div className="space-y-1 border-t border-border px-3 py-2 sm:px-4">
              {(
                [
                  ["france", "France appellations"],
                  ["italySubs", "Italy appellations"],
                  ["italyRegions", "Italy regions (large)"],
                  ["wineries", "Wineries (close zoom)"],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex h-11 cursor-pointer items-center gap-3 rounded-md px-2 hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={layers[key]}
                    onChange={() => toggleLayer(key)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div className="relative min-h-0 min-w-0 flex-1">
          <WineMap
            layers={layers}
            focus={focus}
            markers={markers}
            selectedName={selected?.name ?? null}
            onSelect={(region) => {
              setSelected(region);
              if (region.countryId && region.countryId !== "europe") {
                setActiveCountryId(region.countryId);
              }
            }}
            onBackgroundClick={() => setSelected(null)}
            onReady={setReady}
            onError={setError}
          />

          {!ready && !error && (
            <div className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-card px-4 py-2 text-sm text-muted-foreground shadow-panel">
              Loading regions…
            </div>
          )}

          {error && (
            <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
              <p className="rounded-md bg-card px-4 py-3 text-sm text-primary shadow-panel">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="relative hidden h-full w-96 shrink-0 border-l border-border bg-card md:block">
          <div
            className={cn(
              "atlas-rail-pane absolute inset-0 flex flex-col",
              selected && "is-hidden",
            )}
          >
            <ExplorePanel
              country={activeCountry}
              counts={ready}
              onPickRegion={pickRegionById}
            />
          </div>
          <div
            className={cn(
              "atlas-rail-pane absolute inset-0 flex flex-col",
              !selected && "is-hidden",
            )}
          >
            {railRegion ? (
              <DetailPanel
                region={railRegion}
                onClose={() => setSelected(null)}
                docked
              />
            ) : null}
          </div>
        </div>
      </div>

      {mobileSheet.shown && railRegion && (
        <div className="relative z-20 md:hidden">
          <DetailPanel
            region={railRegion}
            onClose={() => setSelected(null)}
            leaving={!mobileSheet.on}
          />
        </div>
      )}
    </div>
  );
}
