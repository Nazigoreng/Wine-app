import { useEffect, useRef, useState, type CSSProperties } from "react";
import { allRegions } from "@/lib/wine";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FRANCE_IMAGE } from "@/data/france-image";
import { ITALY_IMAGE } from "@/data/italy-image";
import { SPAIN_IMAGE } from "@/data/spain-image";
import "@/europe.css";

const countries = [
  {
    id: "france",
    name: "France",
    image: FRANCE_IMAGE,
    detail: "Bordeaux · Burgundy · Champagne · Rhône · Loire",
  },
  {
    id: "italy",
    name: "Italy",
    image: ITALY_IMAGE,
    detail: "Piemonte · Toscana · Veneto · Sicilia · Puglia",
  },
  {
    id: "spain",
    name: "Spain",
    image: SPAIN_IMAGE,
    detail: "Rioja · Ribera del Duero · Priorat · Rías Baixas · Jerez",
  },
] as const;

type EuropeScreenProps = {
  onBack: () => void;
};

export function EuropeScreen({ onBack }: EuropeScreenProps) {
  const [countryId, setCountryId] = useState<string | null>(null);
  const [regionId, setRegionId] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const country = countries.find((item) => item.id === countryId);
  const regions = allRegions.filter((region) => region.countryId === countryId);
  const region = regions.find((item) => item.id === regionId);
  const showChampagneZoom = country?.id === "france" && region?.id === "champagne";

  useEffect(() => {
    if (countryId) heading.current?.focus();
  }, [countryId]);

  const backToCountries = () => {
    const previousCountry = countryId;
    setRegionId("");
    setCountryId(null);
    window.requestAnimationFrame(() => document.getElementById(`country-${previousCountry}`)?.focus());
  };

  if (country) {
    return (
      <main className="europe-screen" onKeyDown={(event) => {
        if (event.key === "Escape") backToCountries();
      }}>
        <header className="europe-screen__header">
          <button type="button" className="europe-back" onClick={backToCountries}>
            <ArrowLeft size={17} strokeWidth={1.7} /> Europe
          </button>
          <p className="continent-home__eyebrow">Europe</p>
          <h1 ref={heading} tabIndex={-1}>{country.name}</h1>
        </header>
        <div className="country-explorer">
          <div
            className={`country-explorer__map-stage${showChampagneZoom ? " is-champagne-zoom" : ""}`}
            aria-label={showChampagneZoom ? "Animated map zooming from France into Champagne" : undefined}
          >
            <img className="country-explorer__map" src={country.image} alt={`${country.name} wine regions map`} />
            {showChampagneZoom ? (
              <div className="country-explorer__zoom-caption" aria-hidden="true">
                <span>France</span>
                <strong>Champagne</strong>
              </div>
            ) : null}
          </div>
          <section className="country-explorer__regions" aria-label={`${country.name} regions`}>
            <label htmlFor="country-region">Choose a region</label>
            <select id="country-region" value={regionId} onChange={(event) => setRegionId(event.target.value)}>
              <option value="">Select a region</option>
              {regions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            {region ? (
              <article aria-live="polite">
                <h2>{region.name}</h2>
                <h3>Climate</h3><p>{region.climate}</p>
                <h3>Soil</h3><p>{region.soil}</p>
                <h3>Water</h3><p>{region.water}</p>
                <h3>Grape varieties</h3><p>{region.vines.join(", ")}</p>
              </article>
            ) : <p>Select a region to explore its climate, soil and grape varieties.</p>}
          </section>
        </div>
      </main>
    );
  }
  return (
    <main className="europe-screen">
      <header className="europe-screen__header">
        <button type="button" className="europe-back" onClick={onBack}>
          <ArrowLeft size={17} strokeWidth={1.7} />
          Continents
        </button>
        <p className="continent-home__eyebrow">Europe</p>
        <h1>Choose a wine country</h1>
        <p className="continent-home__sub">
          Begin with France, Italy or Spain and explore their wine regions.
        </p>
      </header>

      <section className="country-grid" aria-label="European wine countries">
        {countries.map((country, index) => (
          <button
            key={country.id}
            id={`country-${country.id}`}
            onClick={() => { setRegionId(""); setCountryId(country.id); }}
            type="button"
            className="country-card"
            style={{ "--country-delay": `${index * 90}ms` } as CSSProperties}
            aria-label={`Open ${country.name}`}
          >
            <span className="country-card__image-wrap">
              <img
                className="country-card__image"
                src={country.image}
                alt={`${country.name} wine regions map`}
              />
            </span>
            <span className="country-card__panel">
              <span>
                <span className="country-card__name">{country.name}</span>
                <span className="country-card__detail">{country.detail}</span>
              </span>
              <span className="country-card__action" aria-hidden="true">
                Explore <ArrowUpRight size={17} strokeWidth={1.7} />
              </span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
