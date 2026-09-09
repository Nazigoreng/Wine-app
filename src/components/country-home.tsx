import { ArrowRight } from "lucide-react";

type CountryHomeProps = {
  onSelect: (countryId: "france" | "spain" | "italy") => void;
};

const countryCards = [
  {
    id: "france",
    name: "France",
    subtitle: "Wine regions of France",
    image: "/art/countries/france.png",
  },
  {
    id: "spain",
    name: "Spain",
    subtitle: "Wine regions of Spain",
    image: "/art/countries/spain.png",
  },
  {
    id: "italy",
    name: "Italy",
    subtitle: "Wine regions of Italy",
    image: "/art/countries/italy.png",
  },
] as const;

export function CountryHome({ onSelect }: CountryHomeProps) {
  return (
    <main className="min-h-dvh overflow-y-auto bg-[#efe8dc] text-[#17232b]">
      <section className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <header className="mb-7 flex flex-col gap-2 border-b border-[#b9aa96] pb-5 sm:mb-9">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#6f6457] uppercase">
            Cru Atlas
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Choose a wine country
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#665f56] sm:text-base">
                Start with the illustrated country map, then explore its wine regions and appellations.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-3">
          {countryCards.map((country) => (
            <button
              key={country.id}
              type="button"
              onClick={() => onSelect(country.id)}
              className="group overflow-hidden rounded-xl border border-[#b9aa96] bg-[#f7f2e9] text-left shadow-[0_10px_30px_rgba(65,48,29,0.10)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(65,48,29,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f2c3d]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#e3d8c7]">
                <img
                  src={country.image}
                  alt={`${country.name} illustrated wine regions map`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.015]"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[#c9bba8] px-5 py-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold">{country.name}</h2>
                  <p className="mt-0.5 text-sm text-[#756b60]">{country.subtitle}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#9f8e7a] bg-[#efe5d7] transition group-hover:bg-[#7f2c3d] group-hover:text-white">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
