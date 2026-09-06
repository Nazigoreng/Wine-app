import { useEffect, useRef, useState, type ReactNode } from "react";
import { Droplets, Mountain, Sun, X, Grape, Wine, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUALITY_LABEL, wineName, type AtlasRegion } from "@/lib/wine";
import type { Country, WineNote } from "@/data/countries";
import { cn } from "@/lib/utils";

function Meter({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={label}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn("size-2 rounded-full", i < value ? "bg-primary" : "bg-border")}
        />
      ))}
    </span>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="flex items-center gap-2 font-sans text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

function SoftCopy({
  swapKey,
  children,
}: {
  swapKey: string;
  children: ReactNode;
}) {
  const pending = useRef(children);
  pending.current = children;
  const shownKey = useRef(swapKey);
  const [view, setView] = useState(children);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (swapKey === shownKey.current) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    shownKey.current = swapKey;

    if (reduce) {
      setView(pending.current);
      setOut(false);
      return;
    }

    setOut(true);
    const t = window.setTimeout(() => {
      setView(pending.current);
      setOut(false);
    }, 160);
    return () => window.clearTimeout(t);
  }, [swapKey]);

  useEffect(() => {
    if (swapKey !== shownKey.current) return;
    setView(children);
  }, [children, swapKey]);

  return <div className={cn("atlas-copy", out && "is-out")}>{view}</div>;
}

const shell =
  "pointer-events-auto flex w-full flex-col overflow-hidden bg-card atlas-panel";

export function DetailPanel({
  region,
  onClose,
  docked = false,
  leaving = false,
}: {
  region: AtlasRegion;
  onClose: () => void;
  docked?: boolean;
  leaving?: boolean;
}) {
  const vines = region.vines ?? [];
  const wines = region.wines ?? [];
  return (
    <aside
      className={cn(
        shell,
        docked
          ? "h-full rounded-none"
          : "atlas-sheet max-h-sheet rounded-t-2xl shadow-panel md:max-h-none md:w-96 md:rounded-2xl",
        leaving && "is-out",
      )}
      aria-label={`${region.name} details`}
    >
      <SoftCopy swapKey={region.id}>
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {region.countryName}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium leading-tight text-foreground">
              {region.name}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 shrink-0 rounded-lg"
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="size-5" strokeWidth={1.75} />
          </Button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-foreground">{region.desc}</p>

          <Section icon={<Sun className="size-3.5" strokeWidth={1.75} />} title="Climate">
            <p>{region.climate}</p>
          </Section>

          <Section icon={<Mountain className="size-3.5" strokeWidth={1.75} />} title="Soil">
            <p>{region.soil}</p>
          </Section>

          <Section icon={<Droplets className="size-3.5" strokeWidth={1.75} />} title="Water">
            <p>{region.water}</p>
          </Section>

          {vines.length > 0 && (
            <Section icon={<Grape className="size-3.5" strokeWidth={1.75} />} title="Grapes">
              <div className="flex flex-wrap gap-1.5">
                {vines.map((v) => (
                  <span
                    key={v}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {wines.length > 0 && (
            <Section icon={<Wine className="size-3.5" strokeWidth={1.75} />} title="Wines">
              <ul className="space-y-2">
                {wines.map((w) => {
                  const name = wineName(w);
                  const note: WineNote | null = typeof w === "string" ? null : w;
                  return (
                    <li key={name} className="rounded-lg bg-accent px-3 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-sm font-medium leading-snug">{name}</p>
                        {note && (
                          <span className="flex shrink-0 items-center gap-2 pt-0.5">
                            <Meter
                              value={note.quality}
                              label={QUALITY_LABEL[note.quality] || "Quality"}
                            />
                            <span className="font-sans text-xs tabular-nums text-muted-foreground">
                              {"$".repeat(note.price)}
                            </span>
                          </span>
                        )}
                      </div>
                      {note?.taste && (
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {note.taste}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}
        </div>
      </SoftCopy>
    </aside>
  );
}

export function ExplorePanel({
  country,
  counts,
  onPickRegion,
}: {
  country: Country | null;
  counts: { france: number; italySubs: number } | null;
  onPickRegion: (regionId: string) => void;
}) {
  const regions = country?.regions ?? [];
  return (
    <aside className={cn(shell, "h-full rounded-none")} aria-label="Region information">
      <SoftCopy swapKey={country?.id ?? "world"}>
        <div className="border-b border-border px-5 py-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {country ? country.name : "Wine atlas"}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-medium leading-tight text-foreground">
            {country ? `${country.name} regions` : "Explore"}
          </h2>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-foreground">
            {country
              ? `Pick a region below, or click a coloured appellation on the map.`
              : "Choose a country above, then click a coloured appellation. Terroir, grapes and wines open here."}
          </p>

          {counts && (
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {counts.france} French appellations · {counts.italySubs} Italian appellations
            </p>
          )}

          {regions.length > 0 ? (
            <Section icon={<MapPinned className="size-3.5" strokeWidth={1.75} />} title="Regions">
              <ul className="space-y-1">
                {regions.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm hover:bg-accent"
                      onClick={() => onPickRegion(r.id)}
                    >
                      {r.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Section>
          ) : (
            <Section icon={<MapPinned className="size-3.5" strokeWidth={1.75} />} title="Start with">
              <ul className="space-y-1">
                {[
                  ["pauillac", "Pauillac"],
                  ["champagne", "Champagne"],
                  ["chablis", "Chablis"],
                  ["tuscany", "Tuscany"],
                  ["piedmont", "Piedmont"],
                  ["veneto", "Veneto"],
                ].map(([id, name]) => (
                  <li key={id}>
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm hover:bg-accent"
                      onClick={() => onPickRegion(id)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </SoftCopy>
    </aside>
  );
}
