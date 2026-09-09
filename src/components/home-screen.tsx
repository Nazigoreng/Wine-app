import { ArrowUpRight } from "lucide-react";

const continents = [
  {
    id: "north-america",
    name: "North America",
    image: "/continents/north-america.jpg",
  },
  {
    id: "south-america",
    name: "South America",
    image: "/continents/south-america.jpg",
  },
  {
    id: "europe",
    name: "Europe",
    image: "/continents/europe.jpg",
  },
  {
    id: "australia",
    name: "Australia",
    image: "/continents/australia.jpg",
  },
] as const;

export function HomeScreen() {
  return (
    <main className="continent-home">
      <section className="continent-home__intro">
        <p className="continent-home__eyebrow">Wine regions of the world</p>
        <h1>Choose a continent</h1>
        <p className="continent-home__sub">
          Explore wine countries, regions and appellations by continent.
        </p>
      </section>

      <section className="continent-grid" aria-label="Continents">
        {continents.map((continent, index) => (
          <button
            key={continent.id}
            type="button"
            className="continent-card"
            style={{
              "--continent-image": `url("${continent.image}")`,
              "--continent-delay": `${index * 70}ms`,
            } as React.CSSProperties}
            aria-label={`Open ${continent.name}`}
          >
            <span className="continent-card__wash" />
            <span className="continent-card__content">
              <span className="continent-card__number">0{index + 1}</span>
              <span className="continent-card__name">{continent.name}</span>
              <span className="continent-card__action">
                Explore
                <ArrowUpRight size={18} strokeWidth={1.7} />
              </span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
