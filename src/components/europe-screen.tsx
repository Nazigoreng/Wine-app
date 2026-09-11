import { ArrowLeft, ArrowUpRight } from "lucide-react";

const countries = [
  {
    id: "france",
    name: "France",
    image: "/countries/france.jpg",
    detail: "Bordeaux · Burgundy · Champagne · Rhône · Loire",
  },
  {
    id: "italy",
    name: "Italy",
    image: "/countries/italy.jpg",
    detail: "Piemonte · Toscana · Veneto · Sicilia · Puglia",
  },
  {
    id: "spain",
    name: "Spain",
    image: "/countries/spain.jpg",
    detail: "Rioja · Ribera del Duero · Priorat · Rías Baixas · Jerez",
  },
] as const;

type EuropeScreenProps = {
  onBack: () => void;
};

export function EuropeScreen({ onBack }: EuropeScreenProps) {
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
            type="button"
            className="country-card"
            style={{ "--country-delay": `${index * 90}ms` } as React.CSSProperties}
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
