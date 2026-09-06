export type WineNote = {
  name: string
  taste: string
  quality: number
  price: number
}

export type Region = {
  id: string
  name: string
  lat: number
  lng: number
  climate: string
  soil: string
  water: string
  vines: string[]
  wines: Array<WineNote | string>
  desc: string
}

export type Country = {
  id: string
  name: string
  flag: string
  center: [number, number]
  zoom: number
  regions: Region[]
}

export const countries: Country[] = [
  // ==================== FRANCE ====================
  
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    center: [46.6, 2.3],
    zoom: 6,
    regions: [
      // ========== BORDEAUX LEFT BANK ==========
      {
        id: "medoc",
        name: "Médoc / Haut-Médoc",
        lat: 45.15,
        lng: -0.75,
        climate: "Maritime. Moderated by the Gironde and Atlantic. Cooler and more humid than the Right Bank.",
        soil: "Deep gravel over clay and limestone. Excellent drainage and heat retention – ideal for Cabernet Sauvignon.",
        water: "Good natural drainage on gravel. Gironde estuary moderates extremes.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        wines: [
        { name: "Médoc / Haut-Médoc", taste: "Blackcurrant, cedar, pencil lead and firm tannins. Classic Left Bank structure.", quality: 3, price: 2 },
        { name: "Cru Bourgeois", taste: "More refinement – dark fruit, spice, graphite and balanced tannins. Excellent value.", quality: 4, price: 3 }
      ],
        desc: "The Left Bank heartland. Gravel soils and Cabernet Sauvignon define the classic Médoc style."
      },
      {
        id: "pauillac",
        name: "Pauillac",
        lat: 45.20,
        lng: -0.75,
        climate: "Maritime, moderated by the Gironde. Slightly warmer and more sheltered than northern Médoc.",
        soil: "Deep gravel terraces over clay. Outstanding drainage and heat retention.",
        water: "Excellent drainage. Gironde influence.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        wines: [
        {
          name: "Pauillac (generic / Cru Bourgeois)",
          taste: "Cassius, blackcurrant, cedar, pencil lead and tobacco. Firm tannins, structured and age-worthy.",
          quality: 4,
          price: 3
        },
        {
          name: "Classified Growth Pauillac",
          taste: "Deep black fruit, graphite, cedar, cigar box and mineral notes. Powerful structure with remarkable elegance and decades of ageing potential.",
          quality: 5,
          price: 5
        },
        {
          name: "First Growth (Lafite, Latour, Mouton)",
          taste: "Iconic. Layered blackcurrant, violet, graphite, tobacco and spice. Perfect balance of power and finesse. Can age 40–100 years.",
          quality: 5,
          price: 5
        }
      ],
        desc: "Home to three of the five First Growths. Powerful, age-worthy Cabernet Sauvignon."
      },
      {
        id: "margaux",
        name: "Margaux",
        lat: 45.04,
        lng: -0.68,
        climate: "Maritime. Slightly warmer and more elegant expression than northern Médoc communes.",
        soil: "Fine gravel with more sand and clay variations. Produces the most fragrant Left Bank wines.",
        water: "Good drainage on the gravel rises.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        wines: [
        {
          name: "Margaux",
          taste: "The most fragrant Médoc – violet, red and black berries, rose petal, silky tannins and elegant structure. More perfume than power.",
          quality: 4,
          price: 4
        },
        {
          name: "Château Margaux",
          taste: "Ethereal elegance. Red and black fruit, rose, violet, graphite and seamless texture. One of the most refined wines in the world.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The most elegant and aromatic of the Médoc communal appellations."
      },
      {
        id: "saint-julien",
        name: "Saint-Julien",
        lat: 45.16,
        lng: -0.75,
        climate: "Maritime, classic Médoc conditions.",
        soil: "Deep gravel. Very consistent quality across the appellation.",
        water: "Excellent drainage.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        wines: [
        {
          name: "Saint-Julien",
          taste: "Refined blackcurrant, cedar, violet and silky yet firm tannins. Very consistent and balanced.",
          quality: 4,
          price: 4
        },
        {
          name: "Classified Growth Saint-Julien",
          taste: "Greater depth and polish – dense fruit, graphite, tobacco and long elegant finish.",
          quality: 5,
          price: 5
        }
      ],
        desc: "Highest concentration of classified growths. Consistent, refined Left Bank style."
      },
      {
        id: "saint-estephe",
        name: "Saint-Estèphe",
        lat: 45.26,
        lng: -0.77,
        climate: "Maritime. Cooler and more exposed than southern Médoc communes.",
        soil: "Gravel with more clay than Pauillac or Margaux. Firmer structure.",
        water: "Good drainage, though clay retains more moisture.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        wines: [
        {
          name: "Saint-Estèphe",
          taste: "Powerful and structured – black fruit, earth, cedar and firm tannins. Needs time.",
          quality: 4,
          price: 3
        },
        {
          name: "Top Saint-Estèphe",
          taste: "Dense cassis, graphite, spice and impressive ageing capacity. More muscle than Margaux.",
          quality: 5,
          price: 4
        }
      ],
        desc: "Northernmost major Médoc commune. Historically firm and structured wines."
      },
      {
        id: "pessac-leognan",
        name: "Pessac-Léognan",
        lat: 44.78,
        lng: -0.65,
        climate: "Maritime. Slightly warmer than the Médoc. Good for both red and white.",
        soil: "Gravel over limestone and clay. Excellent for both Cabernet and white varieties.",
        water: "Good drainage. Closer to the city of Bordeaux.",
        vines: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Sémillon", "Sauvignon Blanc"],
        wines: [
        {
          name: "Pessac-Léognan Rouge",
          taste: "Black fruit, smoke, tobacco and mineral notes. Often more savoury than pure Médoc.",
          quality: 4,
          price: 3
        },
        {
          name: "Pessac-Léognan Blanc",
          taste: "Complex dry white – citrus, grapefruit, smoke, beeswax and excellent ageing potential.",
          quality: 4,
          price: 3
        },
        {
          name: "Haut-Brion & top estates",
          taste: "Legendary complexity and balance in both red and white. Among the greatest wines of Bordeaux.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The finest part of Graves. Home of Haut-Brion and outstanding dry whites."
      },
      {
        id: "sauternes",
        name: "Sauternes & Barsac",
        lat: 44.53,
        lng: -0.34,
        climate: "Maritime with morning mists from the Ciron river that encourage noble rot (Botrytis).",
        soil: "Gravel, sand and clay over limestone. Varied across the communes.",
        water: "The Ciron and Garonne create the humidity needed for Botrytis cinerea.",
        vines: ["Sémillon", "Sauvignon Blanc", "Muscadelle"],
        wines: [
        {
          name: "Sauternes / Barsac",
          taste: "Honey, apricot, orange marmalade, pineapple and saffron with vibrant acidity. Luscious yet never cloying.",
          quality: 4,
          price: 3
        },
        {
          name: "Top Sauternes (Yquem and equivalents)",
          taste: "Extraordinary complexity – roasted pineapple, honey, spice, beeswax and endless length. Can age a century.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The world’s greatest sweet white wine region, created by noble rot."
      },

      // ========== BORDEAUX RIGHT BANK ==========
      {
        id: "saint-emilion",
        name: "Saint-Émilion",
        lat: 44.89,
        lng: -0.16,
        climate: "Maritime with slightly more continental influence than the Left Bank.",
        soil: "Clay-limestone plateau and slopes, plus sandy and gravelly areas. Ideal for Merlot.",
        water: "Good drainage on the plateau and côtes.",
        vines: ["Merlot", "Cabernet Franc", "Cabernet Sauvignon"],
        wines: [
        {
          name: "Saint-Émilion",
          taste: "Merlot-driven – ripe plum, black cherry, chocolate, soft tannins and warm spice. Approachable yet capable of ageing.",
          quality: 4,
          price: 3
        },
        {
          name: "Saint-Émilion Grand Cru / Classé",
          taste: "Greater depth – dark fruit, liquorice, truffle, cedar and fine tannins. Excellent balance and longevity.",
          quality: 4,
          price: 4
        },
        {
          name: "Premier Grand Cru Classé",
          taste: "Opulent yet structured. Black fruit, violet, espresso, mineral and silky power. World-class ageing potential.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The heart of the Right Bank. Merlot-dominant wines of great elegance and power."
      },
      {
        id: "pomerol",
        name: "Pomerol",
        lat: 44.93,
        lng: -0.20,
        climate: "Maritime, similar to Saint-Émilion but slightly cooler in places.",
        soil: "Clay (especially the famous blue clay of Pétrus), gravel and sand. Unique and highly prized.",
        water: "Clay retains moisture; excellent for Merlot in dry years.",
        vines: ["Merlot", "Cabernet Franc"],
        wines: [
        {
          name: "Pomerol",
          taste: "Lush Merlot – plum, black cherry, truffle, chocolate and velvety texture. Opulent yet fresh.",
          quality: 5,
          price: 4
        },
        {
          name: "Top Pomerol (Pétrus, Le Pin, etc.)",
          taste: "Exotic concentration – black fruit, violet, truffle, spice and incredible silkiness. Among the most sought-after wines on earth.",
          quality: 5,
          price: 5
        }
      ],
        desc: "Tiny appellation with no official classification, yet home to some of the world’s most expensive wines."
      },
      {
        id: "fronsac",
        name: "Fronsac & Canon-Fronsac",
        lat: 44.92,
        lng: -0.27,
        climate: "Maritime, classic Right Bank conditions.",
        soil: "Limestone and clay slopes. Excellent for Merlot and Cabernet Franc.",
        water: "Good drainage on the slopes.",
        vines: ["Merlot", "Cabernet Franc", "Cabernet Sauvignon"],
        wines: [
        {
          name: "Fronsac / Canon-Fronsac",
          taste: "Merlot-driven with firm structure – dark fruit, spice, liquorice and good ageing. Excellent value Right Bank.",
          quality: 3,
          price: 2
        }
      ],
        desc: "Historic Right Bank area producing structured Merlot-based wines, often great value."
      },
      {
        id: "graves",
        name: "Graves",
        lat: 44.65,
        lng: -0.50,
        climate: "Maritime, slightly warmer and drier than the Médoc.",
        soil: "Gravel over sand, clay and limestone — the graves that give the region its name.",
        water: "Excellent drainage on the gravel terraces.",
        vines: ["Cabernet Sauvignon", "Merlot", "Sémillon", "Sauvignon Blanc"],
        wines: [
          { name: "Graves Rouge", taste: "Cedar, blackcurrant and a smoky gravel note. Firmer than generic Bordeaux.", quality: 3, price: 2 },
          { name: "Graves Blanc", taste: "Sémillon-Sauvignon – citrus, wax, wet stones. Ages toward honey and toast.", quality: 4, price: 2 }
        ],
        desc: "The historic gravel banks south of Bordeaux city. Pessac-Léognan sits at the northern end; Graves and Cérons run south toward Sauternes."
      },
      {
        id: "entre-deux-mers",
        name: "Entre-Deux-Mers",
        lat: 44.70,
        lng: -0.25,
        climate: "Maritime, between the Garonne and Dordogne.",
        soil: "Clay-limestone plateaux, boulbènes and gravel on the river terraces.",
        water: "Two rivers moderate heat and frost.",
        vines: ["Sauvignon Blanc", "Sémillon", "Muscadelle", "Merlot"],
        wines: [
          { name: "Entre-Deux-Mers Blanc", taste: "Crisp dry white – citrus, boxwood and a light grassy edge.", quality: 3, price: 1 },
          { name: "Cadillac / Loupiac / Sainte-Croix-du-Mont", taste: "Sweet wines of the Garonne – honey, apricot and saffron, the quieter cousins of Sauternes.", quality: 4, price: 2 }
        ],
        desc: "The wedge between the two seas (tidal rivers). Dry whites plus the sweet AOCs Cadillac, Loupiac and Sainte-Croix-du-Mont."
      },
      {
        id: "bourg-blaye",
        name: "Bourg & Blaye",
        lat: 45.13,
        lng: -0.66,
        climate: "Maritime, facing the Médoc across the Gironde.",
        soil: "Clay-limestone côtes and some gravel.",
        water: "Gironde estuary moderates extremes.",
        vines: ["Merlot", "Cabernet Sauvignon", "Cabernet Franc", "Malbec"],
        wines: [
          { name: "Côtes de Bourg", taste: "Merlot-led, dark fruit and liquorice with a Right-Bank firmness. Strong value.", quality: 3, price: 1 },
          { name: "Blaye / Côtes de Blaye", taste: "Supple reds and a little fresh white from the northern côtes.", quality: 3, price: 1 }
        ],
        desc: "The Right Bank côtes looking across the Gironde. Listed on the vineyards.com Bordeaux map under Rive Droite."
      },

      // ========== BURGUNDY ==========
      {
        id: "chablis",
        name: "Chablis",
        lat: 47.81,
        lng: 3.80,
        climate: "Cool continental. One of the coolest parts of Burgundy. Risk of spring frost.",
        soil: "Kimmeridgian limestone (the key) with Portlandian limestone higher up. Classic fossil-rich marl.",
        water: "Good drainage on the slopes. Cool climate preserves high acidity.",
        vines: ["Chardonnay"],
        wines: [
        {
          name: "Petit Chablis",
          taste: "Light, crisp and zesty with green apple, citrus and chalky notes. Simple, refreshing and best drunk young.",
          quality: 3,
          price: 2
        },
        {
          name: "Chablis",
          taste: "Classic steely Chardonnay – lemon, green apple, white flowers and a distinctive chalky / oyster-shell minerality. High acidity, dry and precise.",
          quality: 4,
          price: 2
        },
        {
          name: "Chablis Premier Cru",
          taste: "More concentration and complexity than village Chablis. Ripe citrus, white peach, wet stone and subtle hazelnut with age. Excellent balance and ageing potential (5–12 years).",
          quality: 4,
          price: 3
        },
        {
          name: "Chablis Grand Cru",
          taste: "The pinnacle. Powerful yet steely – concentrated citrus, orchard fruit, flint, smoke and profound chalky minerality. Can age 15–30+ years into honeyed, nutty complexity while keeping tension.",
          quality: 5,
          price: 4
        }
      ],
        desc: "The purest expression of Chardonnay on Kimmeridgian limestone. Steely, mineral, age-worthy."
      },
      {
        id: "irancy-saint-bris",
        name: "Irancy & Saint-Bris",
        lat: 47.72,
        lng: 3.67,
        climate: "Cool continental, same Chablisien basin. Spring frost is a real risk.",
        soil: "Kimmeridgian and Portlandian limestone, shared with Chablis.",
        water: "Good drainage on the hills above the Yonne.",
        vines: ["Pinot Noir", "Sauvignon Blanc", "César"],
        wines: [
          { name: "Irancy", taste: "Pale, fragrant Pinot with a local César bite – cherry, stone and a cool finish.", quality: 3, price: 2 },
          { name: "Saint-Bris", taste: "The only Sauvignon Blanc AOC in Burgundy – citrus, flint and a Chablis-like minerality.", quality: 3, price: 2 }
        ],
        desc: "Chablis satellites on the vineyards.com Chablis Chatillonais map: Irancy for red, Saint-Bris for Sauvignon Blanc, plus Petit Chablis on the Portlandian plateau."
      },
      {
        id: "cote-de-nuits",
        name: "Côte de Nuits",
        lat: 47.20,
        lng: 4.95,
        climate: "Cool continental. Slightly cooler than the Côte de Beaune.",
        soil: "Limestone and marl. The famous Comblanchien and Prémeaux limestones.",
        water: "Excellent drainage on the mid-slope. Mostly dry-farmed.",
        vines: ["Pinot Noir", "Chardonnay (minor)"],
        wines: [
        {
          name: "Village Côte de Nuits",
          taste: "Red cherry, strawberry, earth, rose and fine tannins. Elegant and transparent.",
          quality: 4,
          price: 3
        },
        {
          name: "Premier Cru",
          taste: "Greater density – red and black fruit, spice, mineral and refined structure. Excellent ageing.",
          quality: 5,
          price: 4
        },
        {
          name: "Grand Cru (Chambertin, Musigny, Romanée-Conti…)",
          taste: "The pinnacle of Pinot Noir – ethereal perfume, layered fruit, silk and profound complexity. Can age decades.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The spiritual home of Pinot Noir. Home to the majority of Burgundy’s red Grand Crus."
      },
      {
        id: "cote-de-beaune",
        name: "Côte de Beaune",
        lat: 46.95,
        lng: 4.80,
        climate: "Cool continental, slightly warmer than the Côte de Nuits.",
        soil: "Limestone and clay-limestone. More varied than the Côte de Nuits.",
        water: "Good drainage on the slopes.",
        vines: ["Chardonnay", "Pinot Noir"],
        wines: [
        {
          name: "Village white (Meursault, Puligny, Chassagne)",
          taste: "Citrus, orchard fruit, hazelnut, butter and mineral. Rich yet fresh.",
          quality: 4,
          price: 3
        },
        {
          name: "Premier Cru white",
          taste: "More concentration and length – lemon curd, white peach, toast and striking minerality.",
          quality: 5,
          price: 4
        },
        {
          name: "Grand Cru (Montrachet, Corton-Charlemagne…)",
          taste: "Powerful and profound – concentrated fruit, spice, smoke and endless mineral finish. Legendary ageing.",
          quality: 5,
          price: 5
        },
        {
          name: "Red Côte de Beaune (Pommard, Volnay, Corton)",
          taste: "From elegant Volnay (red fruit, silk) to structured Pommard and powerful Corton.",
          quality: 4,
          price: 4
        }
      ],
        desc: "Home of the world’s greatest white Burgundies and excellent reds (Pommard, Volnay, Corton)."
      },
      {
        id: "cote-chalonnaise",
        name: "Côte Chalonnaise",
        lat: 46.80,
        lng: 4.73,
        climate: "Cool continental, a touch warmer and more open than the Côte d'Or.",
        soil: "Limestone and clay-limestone, continuation of the Côte d'Or geology.",
        water: "Good drainage on the east-facing slopes.",
        vines: ["Pinot Noir", "Chardonnay", "Aligoté"],
        wines: [
          { name: "Mercurey", taste: "The fullest red of the Chalonnaise – red fruit, spice and a firm tannic frame.", quality: 4, price: 2 },
          { name: "Rully / Givry", taste: "Bright Pinot and generous Chardonnay. Rully also makes fine Crémant.", quality: 3, price: 2 },
          { name: "Montagny / Bouzeron", taste: "White specialists – Montagny for Chardonnay, Bouzeron for Aligoté.", quality: 4, price: 2 }
        ],
        desc: "Bouzeron, Rully, Mercurey, Givry and Montagny — Burgundy’s value Côte, listed as a distinct zone on the vineyards.com Burgundy map."
      },
      {
        id: "maconnais",
        name: "Mâconnais",
        lat: 46.40,
        lng: 4.75,
        climate: "Warmer, more southern Burgundy. Rolling hills with a hint of the Mediterranean.",
        soil: "Limestone, clay and the famous Roche de Solutré around Pouilly-Fuissé.",
        water: "Good drainage on the limestone slopes.",
        vines: ["Chardonnay", "Pinot Noir", "Gamay"],
        wines: [
          { name: "Mâcon / Mâcon-Villages", taste: "Sunny Chardonnay – apple, citrus, white flowers. Approachable and generous.", quality: 3, price: 2 },
          { name: "Pouilly-Fuissé / Saint-Véran", taste: "Richer, more mineral Chardonnay from the best southern slopes. Age-worthy.", quality: 4, price: 3 },
          { name: "Viré-Clessé / Pouilly-Vinzelles / Pouilly-Loché", taste: "Precise village whites with orchard fruit and limestone bite.", quality: 4, price: 2 }
        ],
        desc: "Southern Burgundy white country. Saint-Véran, Pouilly-Fuissé, Viré-Clessé, Pouilly-Loché and Pouilly-Vinzelles."
      },

      // ========== CHAMPAGNE ==========
      {
        id: "champagne",
        name: "Champagne",
        lat: 49.05,
        lng: 4.0,
        climate: "Cool continental. Marginal ripening conditions historically. High natural acidity.",
        soil: "Chalk (Belemnite and Micraster) over limestone. Exceptional water regulation.",
        water: "Chalk stores and slowly releases water – crucial in a cool climate.",
        vines: ["Chardonnay", "Pinot Noir", "Pinot Meunier"],
        wines: [
        {
          name: "Non-Vintage Champagne",
          taste: "Citrus, green apple, brioche, toast and fine bubbles. Fresh, balanced house style.",
          quality: 4,
          price: 3
        },
        {
          name: "Vintage Champagne",
          taste: "Greater depth and complexity – ripe fruit, nuts, honey and long ageing potential.",
          quality: 5,
          price: 4
        },
        {
          name: "Prestige Cuvée / Top Grower",
          taste: "Extraordinary finesse and complexity. Layered fruit, toast, chalk and endless length.",
          quality: 5,
          price: 5
        }
      ],
        desc: "The world’s most prestigious sparkling wine. Vineyards.com maps Vallée de la Vesle, Vallée de l'Ardre, Montagne de Reims, Vallée de la Marne, Côte des Blancs, Côte de Sézanne, Côte de l'Aube and Rosé des Riceys."
      },

      // ========== RHÔNE ==========
      {
        id: "northern-rhone",
        name: "Northern Rhône",
        lat: 45.25,
        lng: 4.80,
        climate: "Continental with Mediterranean influence. Steep slopes, mistral wind. Cooler than the south.",
        soil: "Granite, schist and mica on steep terraces. Excellent drainage and heat retention.",
        water: "Steep slopes drain well. Limited irrigation.",
        vines: ["Syrah", "Viognier", "Marsanne", "Roussanne"],
        wines: [
        {
          name: "Crozes-Hermitage / Saint-Joseph",
          taste: "Black pepper, blackberry, olive and smoked meat. Medium-bodied and spicy.",
          quality: 4,
          price: 2
        },
        {
          name: "Hermitage / Côte-Rôtie / Cornas",
          taste: "Dense black fruit, violet, bacon fat, pepper and powerful structure. Can age 20–40 years.",
          quality: 5,
          price: 4
        },
        {
          name: "Condrieu",
          taste: "Viognier – apricot, peach, honeysuckle, ginger and rich texture with fresh acidity.",
          quality: 4,
          price: 4
        }
      ],
        desc: "Steep granite slopes and pure Syrah. Home of Côte-Rôtie, Hermitage and Condrieu."
      },
      {
        id: "chateauneuf",
        name: "Châteauneuf-du-Pape & Southern Rhône",
        lat: 44.05,
        lng: 4.83,
        climate: "Warm Mediterranean. Hot summers, mistral wind, high sunshine.",
        soil: "Famous galets roulés (large rounded stones), clay, sand and limestone.",
        water: "Low rainfall. Galets retain heat; mistral keeps vines healthy.",
        vines: ["Grenache", "Syrah", "Mourvèdre", "Cinsault", "Counoise", "Clairette", "Roussanne"],
        wines: [
        {
          name: "Côtes du Rhône / Villages",
          taste: "Ripe red and black fruit, garrigue herbs, spice and soft tannins. Generous and approachable.",
          quality: 3,
          price: 2
        },
        {
          name: "Gigondas / Vacqueyras / Cairanne",
          taste: "More structure and concentration – dark fruit, herbs, pepper and good ageing potential.",
          quality: 4,
          price: 3
        },
        {
          name: "Châteauneuf-du-Pape",
          taste: "Powerful Grenache blends – kirsch, garrigue, spice, leather and warmth. Can be monumental.",
          quality: 5,
          price: 4
        }
      ],
        desc: "The heart of the Southern Rhône. Powerful Grenache-based blends and the famous galets."
      },

      // ========== LOIRE ==========
      {
        id: "sancerre",
        name: "Sancerre & Pouilly-Fumé",
        lat: 47.33,
        lng: 2.84,
        climate: "Cool continental / Loire influence. Good diurnal range.",
        soil: "Limestone (caillottes), clay-limestone (terres blanches) and flint (silex).",
        water: "Good drainage. Loire River moderates.",
        vines: ["Sauvignon Blanc", "Pinot Noir (minor)"],
        wines: [
        {
          name: "Sancerre",
          taste: "Zesty citrus, gooseberry, flint and chalky minerality. Crisp, dry and aromatic.",
          quality: 4,
          price: 3
        },
        {
          name: "Pouilly-Fumé",
          taste: "Similar to Sancerre but often more smoky / gunflint character. Precise and mineral.",
          quality: 4,
          price: 3
        },
        {
          name: "Top single-vineyard Sancerre / Pouilly",
          taste: "Greater depth and complexity – concentrated fruit, profound minerality and ageing potential.",
          quality: 5,
          price: 4
        }
      ],
        desc: "The benchmark for Loire Sauvignon Blanc – steely, mineral and aromatic."
      },
      {
        id: "vouvray",
        name: "Vouvray & Central Loire",
        lat: 47.41,
        lng: 0.80,
        climate: "Cool maritime to continental. Varied microclimates.",
        soil: "Tuffeau limestone (the famous soft limestone of the Loire).",
        water: "Good drainage on the tuffeau slopes.",
        vines: ["Chenin Blanc", "Cabernet Franc"],
        wines: [
        {
          name: "Vouvray Sec / Demi-Sec",
          taste: "Chenin Blanc – apple, quince, honey, chamomile and bright acidity. Can be dry or off-dry.",
          quality: 4,
          price: 2
        },
        {
          name: "Vouvray Moelleux / Sweet",
          taste: "Honeyed quince, apricot and beeswax with vibrant acidity. Ages beautifully.",
          quality: 4,
          price: 3
        },
        {
          name: "Chinon / Bourgueil",
          taste: "Cabernet Franc – red fruit, pencil shavings, herbal notes and fresh tannins.",
          quality: 4,
          price: 2
        }
      ],
        desc: "Home of great Chenin Blanc in all styles and classic Cabernet Franc reds (Chinon, Bourgueil)."
      },
      {
        id: "muscadet",
        name: "Muscadet (Nantais)",
        lat: 47.15,
        lng: -1.55,
        climate: "Cool maritime. Atlantic influence, high rainfall.",
        soil: "Gabbro, gneiss, granite and schist. Very varied.",
        water: "High rainfall but good drainage on the best sites.",
        vines: ["Melon de Bourgogne"],
        wines: [
        {
          name: "Muscadet Sèvre-et-Maine Sur Lie",
          taste: "Crisp lemon, green apple, saline and yeasty notes from lees ageing. Perfect with seafood.",
          quality: 3,
          price: 1
        },
        {
          name: "Top cru Muscadet",
          taste: "More concentration and mineral depth. Some can age surprisingly well.",
          quality: 4,
          price: 2
        }
      ],
        desc: "The western Loire. Crisp, saline Melon de Bourgogne – perfect with oysters."
      },
      {
        id: "anjou-saumur",
        name: "Anjou-Saumur",
        lat: 47.25,
        lng: -0.55,
        climate: "Mild Loire maritime, a touch drier as you move east into Saumur.",
        soil: "Schist and carboniferous rock in Anjou; tuffeau limestone around Saumur.",
        water: "Loire and Layon rivers; noble rot in the Coteaux du Layon in good years.",
        vines: ["Chenin Blanc", "Cabernet Franc", "Cabernet Sauvignon", "Grolleau"],
        wines: [
          { name: "Savennières / Quarts-de-Chaume / Bonnezeaux", taste: "Chenin at full stretch – dry, off-dry or luscious, with quince, honey and a taut acid line.", quality: 5, price: 3 },
          { name: "Saumur-Champigny", taste: "Cabernet Franc – raspberry, graphite and a silky Loire tannin.", quality: 4, price: 2 },
          { name: "Coteaux du Layon / Aubance", taste: "Sweet Chenin with citrus peel, acacia and a racy finish.", quality: 4, price: 2 }
        ],
        desc: "The vineyards.com Loire map’s Anjou–Saumur cluster: Savennières, Quarts-de-Chaume, Coteaux du Layon, Bonnezeaux, Saumur and Saumur-Champigny."
      },
      {
        id: "chinon-bourgueil",
        name: "Chinon & Bourgueil",
        lat: 47.18,
        lng: 0.25,
        climate: "Temperate Loire. Warmer gravel terraces and cooler limestone côtes.",
        soil: "Gravel near the Vienne; tuffeau and clay on the slopes.",
        water: "Vienne and Loire drain the best sites.",
        vines: ["Cabernet Franc", "Chenin Blanc"],
        wines: [
          { name: "Chinon", taste: "Cabernet Franc – red currant, pencil shavings, violets. Gravel cuvées drink young; tuffeau ages.", quality: 4, price: 2 },
          { name: "Bourgueil / Saint-Nicolas-de-Bourgueil", taste: "Slightly firmer Cabernet Franc, with a herbal edge and fine tannin.", quality: 4, price: 2 }
        ],
        desc: "Touraine’s Cabernet Franc heartland, listed beside Chinon, Bourgueil and Saint-Nicolas-de-Bourgueil on the western Loire map."
      },

      // ========== OTHER MAJOR ==========
      {
        id: "alsace",
        name: "Alsace",
        lat: 48.2,
        lng: 7.35,
        climate: "Cool continental, protected by the Vosges. Dry and sunny with strong diurnal range.",
        soil: "Extremely varied – granite, limestone, sandstone, clay, volcanic (13 major soil types).",
        water: "One of the driest regions in France (rain shadow of the Vosges).",
        vines: ["Riesling", "Gewurztraminer", "Pinot Gris", "Pinot Noir", "Auxerrois", "Sylvaner", "Muscat", "Chasselas"],
        wines: [
        {
          name: "Alsace Riesling",
          taste: "Dry, steely, citrus and petrol notes with high acidity. Can age for decades.",
          quality: 4,
          price: 2
        },
        {
          name: "Alsace Gewurztraminer",
          taste: "Aromatic – lychee, rose, spice and full body. Often off-dry.",
          quality: 4,
          price: 2
        },
        {
          name: "Alsace Grand Cru",
          taste: "Greater concentration and complexity from the best sites. Outstanding ageing potential.",
          quality: 5,
          price: 3
        },
        {
          name: "Crémant d’Alsace",
          taste: "Fresh, citrusy traditional-method sparkling. Excellent value.",
          quality: 3,
          price: 2
        }
      ],
        desc: "A narrow east-facing strip between the Vosges and the Rhine. The mountains keep oceanic rain off the 16 000 hectares of vineyard. Varietally labelled — unique in France."
      },
      {
        id: "beaujolais",
        name: "Beaujolais",
        lat: 46.1,
        lng: 4.7,
        climate: "Semi-continental with some Mediterranean influence. Warmer than the Côte d’Or.",
        soil: "Granite in the north (Crus), clay and limestone in the south.",
        water: "Good drainage on the granite slopes of the ten Crus.",
        vines: ["Gamay", "Chardonnay"],
        wines: [
        {
          name: "Beaujolais / Beaujolais-Villages",
          taste: "Light, juicy red fruit, banana and bubblegum notes (carbonic). Easy and fresh.",
          quality: 2,
          price: 1
        },
        {
          name: "Beaujolais Crus (Saint-Amour, Juliénas, Chénas, Moulin-à-Vent, Fleurie, Chiroubles, Morgon, Régnié, Côte de Brouilly, Brouilly)",
          taste: "The ten crus from the vineyards.com map — floral Fleurie, structured Moulin-à-Vent and Morgon, granite minerality and real ageing.",
          quality: 4,
          price: 2
        }
      ],
        desc: "Home of Gamay. The ten Crus produce serious, age-worthy wines far beyond Nouveau."
      },
      {
        id: "bandol",
        name: "Bandol",
        lat: 43.14,
        lng: 5.75,
        climate: "Hot, windy Mediterranean. Terraces above the sea, mistral-swept.",
        soil: "Limestone, sandstone and clay on restanques (terraces).",
        water: "Very dry summers. Old Mourvèdre is dry-farmed.",
        vines: ["Mourvèdre", "Grenache", "Cinsault"],
        wines: [
          { name: "Bandol Rouge", taste: "Mourvèdre at 50%+ — dark fruit, liquorice, garrigue and firm tannin. Built to age.", quality: 4, price: 3 },
          { name: "Bandol Rosé", taste: "The serious rosé of Provence – pale yet structured, with citrus, stone fruit and a saline finish.", quality: 4, price: 3 }
        ],
        desc: "The standout communal AOC on the vineyards.com Provence map. Mourvèdre on coastal terraces."
      },
      {
        id: "cassis",
        name: "Cassis",
        lat: 43.22,
        lng: 5.54,
        climate: "Coastal Mediterranean, cooled by the sea.",
        soil: "Limestone calanques and clay-limestone.",
        water: "Sea influence keeps nights cooler.",
        vines: ["Clairette", "Marsanne", "Ugni Blanc", "Sauvignon Blanc"],
        wines: [
          { name: "Cassis Blanc", taste: "Full, herbal white – fennel, citrus peel, white peach and a salty edge. Made for bouillabaisse.", quality: 4, price: 3 }
        ],
        desc: "Tiny coastal AOC listed beside Palette, Bellet and Bandol. One of Provence’s historic white-wine villages."
      },
      {
        id: "provence",
        name: "Provence",
        lat: 43.5,
        lng: 6.0,
        climate: "Mediterranean – hot dry summers, mild winters, high sunshine, mistral.",
        soil: "Limestone, clay, schist, sandstone and crystalline soils.",
        water: "Low summer rainfall. Mistral helps keep vines healthy.",
        vines: ["Grenache", "Cinsault", "Mourvèdre", "Syrah", "Rolle (Vermentino)"],
        wines: [
        {
          name: "Côtes de Provence Rosé",
          taste: "Pale, dry, citrus, red berry and herbal notes. Fresh and elegant.",
          quality: 3,
          price: 2
        },
        {
          name: "Bandol Rouge",
          taste: "Powerful Mourvèdre – dark fruit, liquorice, herbs and firm tannins. Ages well.",
          quality: 4,
          price: 3
        },
        {
          name: "Bandol Rosé / top Provence",
          taste: "More structured and complex rosé with ageing potential.",
          quality: 4,
          price: 3
        }
      ],
        desc: "The spiritual home of dry rosé. Bandol produces serious Mourvèdre reds."
      },
      {
        id: "languedoc",
        name: "Languedoc",
        lat: 43.5,
        lng: 3.2,
        climate: "Warm Mediterranean. Hot dry summers.",
        soil: "Extremely diverse – limestone, schist, clay, sandstone, alluvial.",
        water: "Low rainfall. Many old vines dry-farmed.",
        vines: ["Grenache", "Syrah", "Mourvèdre", "Carignan", "Cinsault", "Picpoul"],
        wines: [
        {
          name: "Languedoc / Corbières / Minervois",
          taste: "Ripe dark fruit, garrigue herbs, spice and warmth. Generous and good value.",
          quality: 3,
          price: 1
        },
        {
          name: "Pic Saint-Loup / Terrasses du Larzac / Faugères",
          taste: "More elegance and freshness – dark fruit, herbs, mineral and better balance.",
          quality: 4,
          price: 2
        },
        {
          name: "Picpoul de Pinet",
          taste: "Crisp, lemony white with saline notes. Perfect with oysters.",
          quality: 3,
          price: 1
        }
      ],
        desc: "Coteaux du Languedoc through Minervois, Cabardès, Corbières, Fitou, Limoux and Picpoul — the vineyards.com Languedoc-Roussillon map."
      },
      {
        id: "roussillon",
        name: "Roussillon",
        lat: 42.7,
        lng: 2.8,
        climate: "Hot, dry Mediterranean with strong winds (Tramontane).",
        soil: "Schist, granite, clay and limestone. Dramatic terraced vineyards.",
        water: "Very low rainfall. Old vines are deeply rooted.",
        vines: ["Grenache", "Grenache Blanc", "Grenache Gris", "Carignan", "Syrah", "Macabeu"],
        wines: [
        {
          name: "Côtes du Roussillon / Collioure",
          taste: "Powerful dry reds – dark fruit, herbs, schist minerality and warmth.",
          quality: 3,
          price: 2
        },
        {
          name: "Banyuls / Maury (vin doux naturel)",
          taste: "Fortified – dried fruit, chocolate, coffee and nuts. Rich and complex.",
          quality: 4,
          price: 3
        }
      ],
        desc: "Dramatic landscape and the great fortifieds: Côtes du Roussillon Villages, Maury, Collioure and Banyuls."
      },
      {
        id: "southwest",
        name: "Southwest (Sud-Ouest)",
        lat: 44.0,
        lng: 1.0,
        climate: "Varied – maritime near Bordeaux, more continental inland. Hot summers in Cahors and Madiran.",
        soil: "Diverse – limestone, clay, gravel and the iron-rich soils of Cahors.",
        water: "Variable according to river systems (Lot, Garonne, etc.).",
        vines: ["Malbec (Côt)", "Tannat", "Merlot", "Cabernet Franc", "Manseng", "Sémillon"],
        wines: [
        {
          name: "Cahors",
          taste: "Malbec – dark fruit, violet, firm tannins and earthy notes. Can be powerful.",
          quality: 3,
          price: 2
        },
        {
          name: "Madiran",
          taste: "Tannat – very structured, black fruit, spice and massive tannins. Needs ageing.",
          quality: 4,
          price: 2
        },
        {
          name: "Jurançon",
          taste: "Sweet or dry – exotic fruit, honey, spice and vibrant acidity.",
          quality: 4,
          price: 2
        }
      ],
        desc: "Home of powerful Malbec (Cahors) and Tannat (Madiran), plus sweet Jurançon."
      },
      {
        id: "jura",
        name: "Jura",
        lat: 46.7,
        lng: 5.6,
        climate: "Cool continental. Cold winters, warm summers.",
        soil: "Limestone and marl.",
        water: "Moderate. Good drainage on slopes.",
        vines: ["Savagnin", "Chardonnay", "Poulsard", "Trousseau", "Pinot Noir"],
        wines: [
        {
          name: "Côtes du Jura / Arbois",
          taste: "Oxidative or fresh styles – walnut, curry, apple and unique character.",
          quality: 3,
          price: 2
        },
        {
          name: "Vin Jaune",
          taste: "Iconic oxidative wine – walnut, curry, dried fruit and intense salinity. Ages forever.",
          quality: 5,
          price: 4
        },
        {
          name: "Crémant du Jura",
          taste: "Fresh traditional-method sparkling, often excellent value.",
          quality: 3,
          price: 2
        }
      ],
        desc: "Tiny mountain region famous for oxidative Vin Jaune and unique local varieties."
      },
      {
        id: "savoie",
        name: "Savoie",
        lat: 45.7,
        lng: 5.95,
        climate: "Alpine continental. Cool, with altitude and lake influence.",
        soil: "Limestone, moraine and glacial deposits.",
        water: "Good Alpine water resources.",
        vines: ["Jacquère", "Roussanne", "Altesse", "Gringet", "Mondeuse"],
        wines: [
        {
          name: "Vin de Savoie (Jacquère, Altesse, Gringet)",
          taste: "Light, crisp alpine whites – citrus, white flowers and mountain freshness. Crépy and Seyssel are historic names.",
          quality: 3,
          price: 2
        },
        {
          name: "Mondeuse",
          taste: "Local red – dark fruit, pepper, violet and lively acidity.",
          quality: 3,
          price: 2
        }
      ],
        desc: "From the Savoy Alps — Jacquère, Roussanne, Altesse and Gringet, as listed on the vineyards.com Bugey Savoie map."
      },
      {
        id: "bugey",
        name: "Bugey",
        lat: 45.90,
        lng: 5.60,
        climate: "Cool alpine-continental, between Savoie and the Jura.",
        soil: "Limestone and marl on the southern Jura foothills.",
        water: "Good drainage on the côtes.",
        vines: ["Altesse", "Chardonnay", "Gamay", "Pinot Noir", "Mondeuse"],
        wines: [
          { name: "Bugey / Roussette du Bugey", taste: "Aromatic Altesse – citrus, white peach and a mountain-fresh finish. Also lively Méthode Traditionnelle.", quality: 3, price: 2 }
        ],
        desc: "Aromatic Altesse from the Bugey, mapped with Vin de Savoie, Crépy and Seyssel on vineyards.com."
      },
      {
        id: "corse",
        name: "Corsica",
        lat: 42.0,
        lng: 9.0,
        climate: "Mediterranean with mountain influence. Hot dry summers, strong winds.",
        soil: "Granite, schist, limestone and alluvial – very diverse.",
        water: "Low summer rainfall. Mountain streams help.",
        vines: ["Niellucciu", "Sciaccarellu", "Vermentinu"],
        wines: [
        {
          name: "Patrimonio / Ajaccio",
          taste: "Niellucciu and Sciaccarellu – red fruit, herbs, spice and Mediterranean character.",
          quality: 3,
          price: 2
        },
        {
          name: "Vermentinu",
          taste: "Fresh, aromatic white – citrus, peach, herbs and saline notes.",
          quality: 3,
          price: 2
        }
      ],
        desc: "Island of unique indigenous grapes – Niellucciu and Sciaccarellu. Vineyards.com lists Patrimonio, Ajaccio, Sartène, Figari, Porto-Vecchio, Calvi and Vin de Corse."
      }
    ]
  },


  // ==================== ITALY ====================
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    center: [42.5, 12.5],
    zoom: 6,
    
    regions: [
      {
        id: "tuscany",
        name: "Tuscany",
        lat: 43.4,
        lng: 11.2,
        climate: "Mediterranean with continental influences inland. Hot dry summers, mild wetter winters. Strong diurnal shifts on the hills.",
        soil: "Galestro (friable schistous clay) and Alberese (hard limestone) in Chianti Classico and Montalcino. Sandier soils near the coast.",
        water: "Mostly dry-farmed. Winter rains recharge soils. Higher elevations prevent waterlogging.",
        vines: ["Sangiovese", "Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Canaiolo", "Vermentino"],
        wines: [
        { name: "Chianti Classico", taste: "Sangiovese – red cherry, violet, herbs, earth and firm acidity. Medium body with savoury character.", quality: 4, price: 2 },
        { name: "Brunello di Montalcino", taste: "Powerful pure Sangiovese – dark cherry, leather, tobacco and long ageing potential (10–30 years).", quality: 5, price: 4 },
        { name: "Vino Nobile di Montepulciano", taste: "Elegant Sangiovese with red fruit, spice and floral notes. Often more approachable than Brunello.", quality: 4, price: 3 },
        { name: "Super Tuscans", taste: "Cabernet/Merlot/Sangiovese blends – rich black fruit, oak, power and international style.", quality: 5, price: 4 }
      ],
        desc: "Rolling hills and the spiritual home of Sangiovese. From elegant Chianti to powerful Brunello."
      },
      {
        id: "piedmont",
        name: "Piedmont",
        lat: 44.7,
        lng: 8.0,
        climate: "Continental with Alpine influence. Cold winters, warm summers, large diurnal range. Autumn fog (nebbia) is common.",
        soil: "Calcareous marls in the Langhe (Barolo & Barbaresco). Clay, sand and limestone mixes elsewhere.",
        water: "Good natural drainage on the hills. Vines generally dry-farmed.",
        vines: ["Nebbiolo", "Barbera", "Dolcetto", "Moscato", "Arneis", "Cortese"],
        wines: [
        { name: "Barolo", taste: "Nebbiolo – rose, tar, red cherry, liquorice and powerful tannins. Needs age to reveal complexity.", quality: 5, price: 4 },
        { name: "Barbaresco", taste: "Similar to Barolo but often more elegant and approachable earlier. Floral and refined.", quality: 5, price: 4 },
        { name: "Barbera d’Alba / d’Asti", taste: "Juicy red fruit, high acidity, low tannin. Versatile and food-friendly.", quality: 3, price: 2 },
        { name: "Moscato d’Asti", taste: "Lightly sparkling, sweet, peach, orange blossom and low alcohol. Delicious and refreshing.", quality: 3, price: 2 }
      ],
        desc: "Home of majestic Nebbiolo. Barolo and Barbaresco rank among the world’s greatest reds."
      },
      {
        id: "veneto",
        name: "Veneto",
        lat: 45.5,
        lng: 11.5,
        climate: "Varied – alpine influence in the north, more Mediterranean near the coast and Lake Garda. Moderate overall.",
        soil: "Volcanic in Soave, alluvial and morainic near Valpolicella, limestone and clay in Prosecco hills.",
        water: "Good rainfall in many areas. Lake Garda moderates temperatures.",
        vines: ["Glera", "Corvina", "Rondinella", "Molinara", "Garganega", "Trebbiano"],
        wines: [
        { name: "Prosecco", taste: "Light, fruity, pear, apple and floral. Fresh and easy sparkling.", quality: 3, price: 1 },
        { name: "Amarone della Valpolicella", taste: "Dried grape power – raisin, dark cherry, chocolate, spice and high alcohol. Rich and intense.", quality: 5, price: 4 },
        { name: "Valpolicella Ripasso", taste: "Mid-way style – red fruit with some dried-fruit richness from the Amarone skins.", quality: 3, price: 2 },
        { name: "Soave", taste: "Garganega – citrus, almond, white flowers and mineral. Can be simple or complex.", quality: 3, price: 2 }
      ],
        desc: "Italy’s largest producer by volume. Home of Prosecco and the powerful Amarone."
      },
      {
        id: "sicily",
        name: "Sicily",
        lat: 37.6,
        lng: 14.0,
        climate: "Warm Mediterranean, moderated by altitude (especially on Etna) and sea breezes. Hot summers, mild winters.",
        soil: "Volcanic on Mount Etna (basalt, ash). Varied elsewhere – limestone, clay, sand.",
        water: "Low rainfall in many areas. Etna benefits from altitude and orographic rainfall. Irrigation used in hotter zones.",
        vines: ["Nero d’Avola", "Nerello Mascalese", "Carricante", "Catarratto", "Grillo", "Frappato"],
        wines: [
        { name: "Etna Rosso", taste: "Nerello Mascalese – red fruit, smoke, herbs and volcanic minerality. Elegant and fresh.", quality: 4, price: 3 },
        { name: "Etna Bianco", taste: "Carricante – citrus, herbs, saline and steely. One of Italy’s most exciting whites.", quality: 4, price: 3 },
        { name: "Nero d’Avola", taste: "Ripe dark fruit, spice and Mediterranean warmth. Can be simple or serious.", quality: 3, price: 2 },
        { name: "Cerasuolo di Vittoria", taste: "Nero d’Avola + Frappato – red fruit, floral and lively. Only DOCG of Sicily.", quality: 4, price: 2 }
      ],
        desc: "Exciting volcanic wines from Etna and powerful reds from Nero d’Avola. One of Italy’s most dynamic regions."
      },
      {
        id: "puglia",
        name: "Puglia",
        lat: 40.8,
        lng: 16.8,
        climate: "Hot Mediterranean. Long, dry, sunny growing season. One of Italy’s warmest regions.",
        soil: "Mostly limestone and clay, with red terra rossa in places. Generally fertile and deep.",
        water: "Low rainfall. Irrigation is common and important for consistent quality.",
        vines: ["Primitivo", "Negroamaro", "Nero di Troia", "Bombino Nero", "Verdeca"],
        wines: [
        { name: "Primitivo di Manduria", taste: "Ripe blackberry, plum, chocolate and spice. Full-bodied and warm.", quality: 3, price: 2 },
        { name: "Salice Salentino / Negroamaro", taste: "Dark fruit, herbs, earth and firm structure. Classic Puglian red.", quality: 3, price: 1 }
      ],
        desc: "The heel of Italy. Powerful, ripe reds from Primitivo and Negroamaro. Great value."
      },
      {
        id: "campania",
        name: "Campania",
        lat: 40.8,
        lng: 14.8,
        climate: "Mediterranean with significant altitude variation. Hot coastal areas, cooler inland and mountain sites.",
        soil: "Volcanic (especially around Vesuvius and inland), limestone and clay.",
        water: "Variable. Higher rainfall in the mountains; irrigation used in hotter zones.",
        vines: ["Aglianico", "Fiano", "Greco", "Falanghina", "Piedirosso"],
        wines: [
        { name: "Taurasi", taste: "Aglianico – dark fruit, tar, leather and massive tannins. The ‘Barolo of the South’.", quality: 5, price: 3 },
        { name: "Fiano di Avellino", taste: "Complex white – hazelnut, honey, citrus and mineral. Ages well.", quality: 4, price: 2 },
        { name: "Greco di Tufo", taste: "Citrus, peach, almond and volcanic minerality. Fresh and structured.", quality: 4, price: 2 }
      ],
        desc: "The ‘Barolo of the South’ (Taurasi) and outstanding volcanic whites from Fiano and Greco."
      },
      {
        id: "abruzzo",
        name: "Abruzzo",
        lat: 42.3,
        lng: 13.8,
        climate: "Mediterranean on the coast, more continental inland toward the Apennines. Significant altitude.",
        soil: "Clay, limestone and sand. Varied from coastal plains to mountain foothills.",
        water: "Moderate. Mountain influence helps retain freshness.",
        vines: ["Montepulciano", "Trebbiano", "Pecorino", "Passerina"],
        wines: [
        { name: "Montepulciano d’Abruzzo", taste: "Juicy dark fruit, spice and soft tannins. Generous and great value.", quality: 3, price: 1 },
        { name: "Pecorino", taste: "Aromatic white – citrus, herbs and good body. Increasingly popular.", quality: 3, price: 2 }
      ],
        desc: "Home of the generous Montepulciano grape and increasingly exciting white varieties like Pecorino."
      },
      {
        id: "marche",
        name: "Marche",
        lat: 43.5,
        lng: 13.5,
        climate: "Mediterranean with continental influences inland. Balanced and suitable for both reds and whites.",
        soil: "Clay, limestone and sand. The Verdicchio zones have distinctive soils.",
        water: "Moderate rainfall. Good conditions for quality viticulture.",
        vines: ["Verdicchio", "Montepulciano", "Sangiovese", "Pecorino"],
        wines: [
        { name: "Verdicchio dei Castelli di Jesi", taste: "Citrus, almond, herbs and saline notes. One of Italy’s best value whites.", quality: 4, price: 2 },
        { name: "Conero", taste: "Montepulciano-based red – dark fruit, structure and Mediterranean character.", quality: 3, price: 2 }
      ],
        desc: "Best known for outstanding Verdicchio whites and increasingly fine reds from Conero."
      },
      {
        id: "friuli",
        name: "Friuli-Venezia Giulia",
        lat: 46.0,
        lng: 13.2,
        climate: "Cool continental with some Mediterranean influence near the coast. Significant diurnal range.",
        soil: "‘Ponca’ (marl and sandstone) in the Collio and Colli Orientali. Alluvial in the plains.",
        water: "Good rainfall. Excellent drainage on the hills.",
        vines: ["Friulano", "Sauvignon Blanc", "Pinot Grigio", "Ribolla Gialla", "Refosco", "Schioppettino"],
        wines: [
        { name: "Collio / Colli Orientali whites", taste: "Precise, aromatic – citrus, stone fruit, herbs and mineral. World-class whites.", quality: 4, price: 3 },
        { name: "Friulano", taste: "Almond, white peach and subtle bitterness. Classic local variety.", quality: 3, price: 2 },
        { name: "Orange / skin-contact wines", taste: "Textural, tannic whites with dried fruit, tea and spice notes.", quality: 4, price: 3 }
      ],
        desc: "One of Italy’s greatest white wine regions and a pioneer of skin-contact (orange) wines."
      },
      {
        id: "trentino",
        name: "Trentino-Alto Adige",
        lat: 46.4,
        lng: 11.3,
        climate: "Alpine continental. Cool, with strong diurnal shifts. High altitude vineyards.",
        soil: "Varied – porphyry, limestone, glacial deposits and sandy soils depending on the valley.",
        water: "Mountain climate with good water availability from Alpine sources.",
        vines: ["Pinot Grigio", "Chardonnay", "Gewürztraminer", "Schiava", "Lagrein", "Pinot Noir"],
        wines: [
        { name: "Alto Adige Pinot Grigio / whites", taste: "Crisp, aromatic, alpine freshness. Far better than basic Pinot Grigio.", quality: 3, price: 2 },
        { name: "Gewürztraminer", taste: "Lychee, rose, spice and full body. Excellent examples from Alto Adige.", quality: 4, price: 2 },
        { name: "Lagrein", taste: "Dark fruit, chocolate, violet and firm structure. Distinctive local red.", quality: 3, price: 2 }
      ],
        desc: "Alpine region producing precise, aromatic whites and distinctive local reds (Lagrein, Schiava)."
      },
      {
        id: "lombardy",
        name: "Lombardy",
        lat: 45.5,
        lng: 9.8,
        climate: "Varied – cooler Alpine influence in Valtellina, more moderate around Franciacorta and Oltrepò.",
        soil: "Morainic and glacial in Franciacorta, sandy and rocky in Valtellina, diverse elsewhere.",
        water: "Good water availability from lakes and Alpine rivers.",
        vines: ["Chardonnay", "Pinot Nero", "Pinot Bianco", "Nebbiolo (Chiavennasca)", "Croatina"],
        wines: [
        { name: "Franciacorta", taste: "Italy’s finest traditional-method sparkling – citrus, brioche, fine bubbles and elegance.", quality: 5, price: 3 },
        { name: "Valtellina Superiore / Sforzato", taste: "Alpine Nebbiolo – red fruit, herbs, tar and freshness. Unique mountain expression.", quality: 4, price: 3 }
      ],
        desc: "Home of Italy’s finest traditional-method sparkling wine (Franciacorta) and Alpine Nebbiolo."
      },
      {
        id: "sardinia",
        name: "Sardinia",
        lat: 40.0,
        lng: 9.0,
        climate: "Mediterranean, windy, with strong maritime influence. Hot dry summers.",
        soil: "Granite, limestone, sand and clay. Very varied across the island.",
        water: "Low rainfall in many areas. Wind helps keep vines healthy.",
        vines: ["Vermentino", "Cannonau (Grenache)", "Carignano", "Nuragus", "Monica"],
        wines: [
        { name: "Vermentino di Gallura", taste: "Aromatic, citrus, herbs and saline. The island’s signature white.", quality: 3, price: 2 },
        { name: "Cannonau di Sardegna", taste: "Grenache – red fruit, herbs, spice and warmth. Mediterranean character.", quality: 3, price: 2 }
      ],
        desc: "Island of distinctive wines – aromatic Vermentino and powerful Cannonau (Grenache)."
      }
    ]

  },

  // ==================== UNITED STATES ====================
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    center: [39.5, -98.0],
    zoom: 4,
    regions: [
      {
        id: "napa",
        name: "Napa Valley",
        lat: 38.5,
        lng: -122.3,
        climate: "Mediterranean. Warm dry summers, cool wet winters. Strong marine influence creates a dramatic north-south temperature gradient and large diurnal swings.",
        soil: "Extremely diverse – over 30 soil series. Alluvial gravels on the valley floor, volcanic and rocky soils on the mountainsides.",
        water: "Almost no summer rain. Irrigation is carefully managed. Sustainable water practices are a major focus.",
        vines: ["Cabernet Sauvignon", "Chardonnay", "Merlot", "Sauvignon Blanc", "Pinot Noir", "Zinfandel"],
        wines: [
        { name: "Napa Cabernet Sauvignon", taste: "Ripe blackcurrant, cassis, vanilla, chocolate and polished tannins. Powerful and opulent.", quality: 5, price: 4 },
        { name: "Napa Chardonnay", taste: "From rich and buttery to more restrained citrus and mineral styles.", quality: 4, price: 3 },
        { name: "Mountain Cabernet", taste: "More structure, intensity and age-worthiness than valley floor.", quality: 5, price: 5 }
      ],
        desc: "America’s most famous wine region. World-class Cabernet with perfect climate and soil diversity."
      },
      {
        id: "sonoma",
        name: "Sonoma County",
        lat: 38.5,
        lng: -122.8,
        climate: "Cooler and more varied than Napa due to greater Pacific influence. Fog and wind are major factors, especially near the coast.",
        soil: "Highly diverse – volcanic, sedimentary, alluvial, and sandy soils across many AVAs.",
        water: "Marine influence reduces water stress. Irrigation still used in warmer inland areas.",
        vines: ["Pinot Noir", "Chardonnay", "Cabernet Sauvignon", "Zinfandel", "Sauvignon Blanc", "Syrah"],
        wines: [
        { name: "Russian River Pinot Noir", taste: "Red fruit, earth, spice and silky texture. Cool-climate elegance.", quality: 4, price: 3 },
        { name: "Sonoma Coast Pinot / Chardonnay", taste: "Even cooler – brighter fruit, higher acidity and mineral notes.", quality: 4, price: 3 },
        { name: "Dry Creek Zinfandel", taste: "Ripe berry, spice, pepper and old-vine intensity.", quality: 4, price: 2 }
      ],
        desc: "More diverse and often cooler than Napa. Outstanding Pinot Noir, Chardonnay and old-vine Zinfandel."
      },
      {
        id: "willamette",
        name: "Willamette Valley",
        lat: 45.2,
        lng: -123.0,
        climate: "Cool maritime. Similar latitude to Burgundy. Long growing season with risk of autumn rain. Protected by the Coast Range.",
        soil: "Three main families: volcanic basalt (Jory), marine sedimentary (Willakenzie), and loess.",
        water: "Adequate rainfall. Dry farming is possible in many sites; irrigation used selectively.",
        vines: ["Pinot Noir", "Chardonnay", "Pinot Gris", "Riesling", "Gamay"],
        wines: [
        { name: "Willamette Valley Pinot Noir", taste: "Red cherry, raspberry, earth, spice and fine tannins. Burgundian in spirit.", quality: 4, price: 3 },
        { name: "Willamette Chardonnay", taste: "Citrus, green apple, hazelnut and precise acidity. Rapidly rising quality.", quality: 4, price: 3 }
      ],
        desc: "Oregon’s flagship region and one of the world’s great Pinot Noir areas."
      },
      {
        id: "columbia",
        name: "Columbia Valley",
        lat: 46.2,
        lng: -119.5,
        climate: "Continental desert climate east of the Cascades. Hot sunny days, cold nights, very low rainfall (irrigation essential).",
        soil: "Volcanic basalt, loess (wind-blown silt), and sandy soils. Excellent drainage.",
        water: "Extremely dry. Irrigation from the Columbia and Snake Rivers is essential.",
        vines: ["Cabernet Sauvignon", "Merlot", "Syrah", "Riesling", "Chardonnay", "Cabernet Franc"],
        wines: [
        { name: "Columbia Valley Cabernet / Bordeaux blends", taste: "Ripe black fruit, sage, spice and firm structure. Excellent value for quality.", quality: 4, price: 2 },
        { name: "Syrah", taste: "Black fruit, smoked meat, pepper and cool-climate freshness.", quality: 4, price: 2 },
        { name: "Riesling", taste: "Citrus, stone fruit and vibrant acidity. Outstanding examples.", quality: 4, price: 2 }
      ],
        desc: "Washington’s powerhouse. Ripe yet fresh reds thanks to long sunny days and cold nights."
      }
    ]
  },

  // ==================== AUSTRALIA ====================
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    center: [-30.0, 135.0],
    zoom: 4,
    regions: [
      {
        id: "barossa",
        name: "Barossa Valley",
        lat: -34.5,
        lng: 139.0,
        climate: "Warm Mediterranean. Hot dry summers, mild winters. One of Australia’s warmest premium regions.",
        soil: "Red-brown earths, clay loams, sandy soils over limestone and ironstone. Many ancient low-yielding vines.",
        water: "Low growing-season rainfall. Many old vines are dry-grown; irrigation used elsewhere.",
        vines: ["Shiraz", "Grenache", "Mataro", "Cabernet Sauvignon", "Riesling", "Semillon"],
        wines: [
        { name: "Barossa Shiraz", taste: "Ripe blackberry, plum, chocolate, spice and full body. Classic Australian power.", quality: 4, price: 2 },
        { name: "Old-vine Shiraz / GSM", taste: "More complexity and concentration from ancient vines. Exceptional depth.", quality: 5, price: 3 },
        { name: "Eden Valley Riesling", taste: "Lime, floral and steely acidity. One of Australia’s best Riesling styles.", quality: 4, price: 2 }
      ],
        desc: "Iconic for powerful old-vine Shiraz. Some of the oldest continuously producing vines in the world."
      },
      {
        id: "margaret-river",
        name: "Margaret River",
        lat: -33.95,
        lng: 115.07,
        climate: "Maritime Mediterranean. Surrounded on three sides by ocean. Warm days, cool nights, strong sea breezes.",
        soil: "Gravelly loams over lateritic gravel and granite. Excellent drainage and low fertility.",
        water: "Moderate rainfall, mostly in winter. Irrigation used carefully in dry years.",
        vines: ["Cabernet Sauvignon", "Chardonnay", "Sauvignon Blanc", "Semillon", "Shiraz"],
        wines: [
        { name: "Margaret River Cabernet", taste: "Cassis, eucalyptus, fine tannins and elegant structure. Among Australia’s finest.", quality: 5, price: 3 },
        { name: "Margaret River Chardonnay", taste: "Citrus, white peach, nuts and precise balance. World-class.", quality: 5, price: 3 }
      ],
        desc: "One of the world’s most isolated fine-wine regions. Elegant Cabernet and outstanding Chardonnay."
      },
      {
        id: "yarra",
        name: "Yarra Valley",
        lat: -37.7,
        lng: 145.4,
        climate: "Cool temperate. Significant altitude variation creates a range of microclimates. Cooler than most Australian regions.",
        soil: "Ancient soils – clay, sand, and volcanic. Good drainage on the slopes.",
        water: "Higher rainfall than many Australian regions. Dry farming possible in many sites.",
        vines: ["Pinot Noir", "Chardonnay", "Cabernet Sauvignon", "Shiraz", "Sauvignon Blanc"],
        wines: [
        { name: "Yarra Valley Pinot Noir", taste: "Red fruit, spice, earth and silky texture. Cool-climate refinement.", quality: 4, price: 3 },
        { name: "Yarra Chardonnay", taste: "Citrus, white flowers and mineral. Elegant and restrained.", quality: 4, price: 3 }
      ],
        desc: "Victoria’s premier cool-climate region. Refined Pinot Noir and Chardonnay near Melbourne."
      },
      {
        id: "coonawarra",
        name: "Coonawarra",
        lat: -37.3,
        lng: 140.8,
        climate: "Cool maritime. Long ripening season with cool nights. Ideal for Cabernet.",
        soil: "Famous terra rossa (red clay loam) over limestone. The classic ‘cigar’ shaped strip.",
        water: "Moderate rainfall. The limestone base provides good drainage and water retention.",
        vines: ["Cabernet Sauvignon", "Shiraz", "Merlot", "Chardonnay"],
        wines: [
        { name: "Coonawarra Cabernet Sauvignon", taste: "Blackcurrant, eucalyptus, mint and fine structure. Terra rossa signature.", quality: 4, price: 3 }
      ],
        desc: "Australia’s most famous Cabernet region, defined by its unique terra rossa soil."
      },
      {
        id: "hunter",
        name: "Hunter Valley",
        lat: -32.8,
        lng: 151.2,
        climate: "Warm humid subtropical influence. Cloud cover and humidity are distinctive. Early ripening.",
        soil: "Alluvial flats and sandy loams. Red volcanic soils in some higher sites.",
        water: "Higher humidity and rainfall than most Australian regions. Irrigation used.",
        vines: ["Semillon", "Shiraz", "Chardonnay", "Verdelho"],
        wines: [
        { name: "Hunter Semillon", taste: "Unique – lemon, toast, honey and incredible ageing potential. Australia’s gift to the wine world.", quality: 5, price: 2 },
        { name: "Hunter Shiraz", taste: "Earthy, savoury, red fruit and medium body. Distinctive regional style.", quality: 3, price: 2 }
      ],
        desc: "Australia’s oldest wine region. Famous for distinctive, long-lived Semillon and earthy Shiraz."
      }
    ]
  },

  // ==================== SPAIN ====================
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    center: [40.4, -3.7],
    zoom: 6,
    regions: [
      {
        id: "rioja",
        name: "Rioja",
        lat: 42.45,
        lng: -2.45,
        climate: "Continental with Atlantic and Mediterranean influences. Significant diurnal range. Three distinct sub-zones.",
        soil: "Clay-limestone, alluvial, and ferrous clay. More limestone in Alta and Alavesa.",
        water: "Moderate rainfall, mostly winter/spring. Good drainage on the best slopes.",
        vines: ["Tempranillo", "Garnacha", "Graciano", "Mazuelo", "Viura"],
        wines: [
        { name: "Rioja Crianza / Reserva", taste: "Red fruit, vanilla, coconut, leather and soft tannins from American oak.", quality: 3, price: 2 },
        { name: "Rioja Gran Reserva", taste: "More tertiary complexity – dried fruit, spice, tobacco and long ageing.", quality: 4, price: 3 },
        { name: "Modern / single-vineyard Rioja", taste: "Fresher fruit, less oak, more terroir expression. Exciting new wave.", quality: 4, price: 3 }
      ],
        desc: "Spain’s most famous region. Elegant, oak-aged Tempranillo that can age for decades."
      },
      {
        id: "ribera",
        name: "Ribera del Duero",
        lat: 41.65,
        lng: -4.0,
        climate: "Extreme continental. Hot summers, very cold winters, large diurnal swings. High altitude (700–1000 m).",
        soil: "Limestone, clay, sand and alluvial. Stony in many of the best sites.",
        water: "Low rainfall. Irrigation is regulated and carefully managed.",
        vines: ["Tempranillo (Tinto Fino)", "Cabernet Sauvignon", "Merlot", "Malbec"],
        wines: [
        { name: "Ribera del Duero", taste: "Powerful Tempranillo – dark fruit, chocolate, spice and firm structure. High altitude intensity.", quality: 4, price: 3 },
        { name: "Top Ribera", taste: "Exceptional concentration and ageing potential. Some of Spain’s most ambitious reds.", quality: 5, price: 4 }
      ],
        desc: "Powerful, structured Tempranillo from high-altitude vineyards along the Duero River."
      },
      {
        id: "priorat",
        name: "Priorat",
        lat: 41.15,
        lng: 0.75,
        climate: "Warm continental with Mediterranean influence. Hot, dry summers. Dramatic slate hillsides.",
        soil: "Famous llicorella (black slate and quartzite). Extremely poor, forces low yields.",
        water: "Very low rainfall. Vines struggle – the key to concentration.",
        vines: ["Garnacha", "Cariñena", "Cabernet Sauvignon", "Syrah", "Merlot"],
        wines: [
        { name: "Priorat", taste: "Intense slate-driven wines – black fruit, mineral, herbs and powerful structure. Low yields.", quality: 5, price: 4 }
      ],
        desc: "Dramatic slate soils and old Garnacha & Cariñena vines produce some of Spain’s most intense wines."
      },
      {
        id: "rias-baixas",
        name: "Rías Baixas",
        lat: 42.4,
        lng: -8.7,
        climate: "Cool, wet Atlantic. High rainfall, mild temperatures, strong maritime influence.",
        soil: "Granite-based, sandy and alluvial. Excellent drainage despite high rainfall.",
        water: "Abundant rainfall. Good drainage prevents waterlogging on the best sites.",
        vines: ["Albariño", "Loureira", "Treixadura", "Caiño Blanco"],
        wines: [
        { name: "Albariño", taste: "Citrus, peach, saline and high acidity. Fresh, aromatic and perfect with seafood.", quality: 4, price: 2 }
      ],
        desc: "Spain’s leading white wine region. Fresh, Atlantic-influenced Albariño."
      }
    ]
  },

  // ==================== ARGENTINA ====================
  {
    id: "argentina",
    name: "Argentina",
    flag: "🇦🇷",
    center: [-34.0, -64.0],
    zoom: 4,
    regions: [
      {
        id: "mendoza",
        name: "Mendoza",
        lat: -33.0,
        lng: -68.8,
        climate: "High-altitude continental desert. Intense sunlight, very low humidity, large diurnal shifts. Elevation is the key moderator.",
        soil: "Alluvial – sand, silt, clay and gravel from Andean rivers. Poor in organic matter, excellent drainage.",
        water: "Extremely arid. Almost all vineyards irrigated with Andean snowmelt via an ancient canal system.",
        vines: ["Malbec", "Cabernet Sauvignon", "Bonarda", "Syrah", "Torrontés", "Chardonnay"],
        wines: [
        { name: "Mendoza Malbec", taste: "Ripe black fruit, violet, plum and soft tannins. The signature of Argentina.", quality: 4, price: 2 },
        { name: "High-altitude / top Malbec", taste: "More freshness, floral notes and structure from elevation. Outstanding quality.", quality: 5, price: 3 },
        { name: "Cabernet & blends", taste: "Structured reds with black fruit and Andean freshness.", quality: 4, price: 2 }
      ],
        desc: "The heart of Argentine wine. High-altitude desert vineyards producing world-class Malbec."
      },
      {
        id: "salta",
        name: "Salta (Cafayate)",
        lat: -26.1,
        lng: -65.9,
        climate: "Extreme high-altitude desert. Some of the highest vineyards in the world (up to 3,000 m). Intense UV and diurnal range.",
        soil: "Sandy and rocky alluvial soils. Very poor and free-draining.",
        water: "Very arid. Irrigation from mountain rivers is essential.",
        vines: ["Torrontés", "Malbec", "Cabernet Sauvignon", "Tannat"],
        wines: [
        { name: "Torrontés", taste: "Highly aromatic – rose, citrus, peach and floral. Unique Argentine white from extreme altitude.", quality: 3, price: 2 },
        { name: "High-altitude Malbec", taste: "Intense colour, floral notes and vibrant acidity from 1500–3000 m elevation.", quality: 4, price: 3 }
      ],
        desc: "Home of the world’s highest commercial vineyards and Argentina’s signature white – Torrontés."
      }
    ]
  },

  // ==================== GERMANY ====================
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    center: [50.5, 9.0],
    zoom: 6,
    regions: [
      {
        id: "mosel",
        name: "Mosel",
        lat: 49.9,
        lng: 7.0,
        climate: "Cool continental. One of the coolest wine regions in the world. Steep slopes maximize sun exposure.",
        soil: "Famous blue Devonian slate. Excellent heat retention and mineral character.",
        water: "The Mosel River moderates temperatures and reflects light onto the steep vineyards.",
        vines: ["Riesling", "Müller-Thurgau", "Elbling", "Pinot Blanc", "Pinot Noir"],
        wines: [
        { name: "Mosel Kabinett / Spätlese", taste: "Delicate Riesling – lime, slate, white flowers and low alcohol. Pure and ethereal.", quality: 4, price: 2 },
        { name: "Mosel Auslese / higher Prädikat", taste: "More concentration and residual sugar with electric acidity. Incredible balance.", quality: 5, price: 3 },
        { name: "Dry Grosses Gewächs", taste: "Powerful dry Riesling from top sites – citrus, slate and profound minerality.", quality: 5, price: 3 }
      ],
        desc: "The spiritual home of Riesling. Steep slate slopes produce some of the purest, most elegant wines on earth."
      },
      {
        id: "rheingau",
        name: "Rheingau",
        lat: 50.0,
        lng: 8.0,
        climate: "Cool continental, slightly warmer than Mosel. South-facing slopes along the Rhine.",
        soil: "Slate, quartzite, loess and clay. Varied but excellent for Riesling and Pinot Noir.",
        water: "Rhine River moderates the climate. Good drainage on the slopes.",
        vines: ["Riesling", "Pinot Noir", "Pinot Blanc", "Müller-Thurgau"],
        wines: [
        { name: "Rheingau Riesling", taste: "More power than Mosel – ripe citrus, peach, slate and excellent structure.", quality: 4, price: 2 },
        { name: "Spätburgunder (Pinot Noir)", taste: "Red fruit, earth and increasing quality. Germany’s rising red star.", quality: 3, price: 3 }
      ],
        desc: "Historic region producing powerful, structured Riesling and increasingly fine Pinot Noir."
      }
    ]
  },

  // ==================== NEW ZEALAND ====================
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    center: [-41.5, 174.0],
    zoom: 5,
    regions: [
      {
        id: "marlborough",
        name: "Marlborough",
        lat: -41.5,
        lng: 173.9,
        climate: "Cool maritime. High sunshine hours, cool nights, strong diurnal range. One of the sunniest places in NZ.",
        soil: "Alluvial gravel and silt over free-draining riverbeds. Very stony in many sites.",
        water: "Low rainfall during the growing season. Irrigation from local rivers is widely used.",
        vines: ["Sauvignon Blanc", "Pinot Noir", "Chardonnay", "Pinot Gris", "Riesling"],
        wines: [
        { name: "Marlborough Sauvignon Blanc", taste: "Explosive passionfruit, gooseberry, grass and zesty acidity. The classic NZ style.", quality: 4, price: 2 },
        { name: "Marlborough Pinot Noir", taste: "Red fruit, spice and silky texture. Improving rapidly.", quality: 3, price: 2 }
      ],
        desc: "Home of the world’s most distinctive Sauvignon Blanc style – vibrant, passionfruit and grassy."
      },
      {
        id: "central-otago",
        name: "Central Otago",
        lat: -45.0,
        lng: 169.2,
        climate: "Continental – the only true continental climate in NZ. Hot summers, cold winters, large diurnal range. High altitude.",
        soil: "Schist-derived soils, glacial deposits, and loess. Free-draining and low fertility.",
        water: "Low rainfall. Irrigation is necessary in most vineyards.",
        vines: ["Pinot Noir", "Pinot Gris", "Riesling", "Chardonnay", "Sauvignon Blanc"],
        wines: [
        { name: "Central Otago Pinot Noir", taste: "Ripe red and black fruit, spice, silk and concentration. NZ’s finest Pinot region.", quality: 5, price: 3 }
      ],
        desc: "The world’s southernmost wine region and NZ’s finest Pinot Noir area."
      }
    ]
  },

  // ==================== CHILE ====================
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    center: [-33.5, -71.0],
    zoom: 5,
    regions: [
      {
        id: "maipo",
        name: "Maipo Valley",
        lat: -33.7,
        lng: -70.7,
        climate: "Mediterranean. Warm dry summers, cool winters. Andes influence creates diurnal range.",
        soil: "Alluvial and colluvial – gravel, sand and clay from the Maipo River and Andean foothills.",
        water: "Irrigation from Andean snowmelt is essential. Very little summer rain.",
        vines: ["Cabernet Sauvignon", "Merlot", "Carmenère", "Syrah", "Chardonnay"],
        wines: [
        { name: "Maipo Cabernet Sauvignon", taste: "Cassis, mint, eucalyptus and firm structure. Chile’s classic Cabernet region.", quality: 4, price: 2 },
        { name: "Carmenère", taste: "Green pepper, dark fruit, spice and soft texture. Chile’s signature variety.", quality: 3, price: 2 }
      ],
        desc: "Chile’s most famous valley and the historic heart of its fine wine industry. Excellent Cabernet."
      },
      {
        id: "colchagua",
        name: "Colchagua Valley",
        lat: -34.6,
        lng: -71.3,
        climate: "Warm Mediterranean with cooling influence from the Pacific and Andes. Good diurnal range.",
        soil: "Diverse – alluvial, granite, clay and volcanic influences depending on location.",
        water: "Irrigation from rivers fed by Andean snowmelt.",
        vines: ["Cabernet Sauvignon", "Carmenère", "Syrah", "Malbec", "Carménère"],
        wines: [
        { name: "Colchagua Carmenère / reds", taste: "Ripe dark fruit, herbs, spice and generous texture. Excellent value.", quality: 3, price: 2 }
      ],
        desc: "One of Chile’s premier red wine valleys, known for rich Carmenère and Cabernet."
      }
    ]
  },

  // ==================== PORTUGAL ====================
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    center: [39.5, -8.0],
    zoom: 6,
    regions: [
      {
        id: "douro",
        name: "Douro Valley",
        lat: 41.15,
        lng: -7.5,
        climate: "Extreme continental in the upper Douro – very hot summers, cold winters. Dramatic terraced slopes.",
        soil: "Schist (the key). Poor, rocky, forces roots deep. Excellent for quality.",
        water: "Low rainfall. The Douro River and traditional terraces help manage water.",
        vines: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta Barroca", "Tinto Cão"],
        wines: [
        { name: "Vintage Port", taste: "Black fruit, chocolate, spice and massive structure. Needs decades of ageing.", quality: 5, price: 4 },
        { name: "Tawny Port", taste: "Dried fruit, nuts, caramel and smoothness. Ready to drink.", quality: 4, price: 3 },
        { name: "Douro DOC dry red", taste: "Dark fruit, schist minerality and structure. Exciting and improving.", quality: 4, price: 2 }
      ],
        desc: "Home of Port and increasingly outstanding dry reds from steep schist terraces."
      },
      {
        id: "alentejo",
        name: "Alentejo",
        lat: 38.5,
        lng: -7.9,
        climate: "Hot Mediterranean / continental. Very warm summers, mild winters. One of Portugal’s hottest regions.",
        soil: "Diverse – schist, granite, clay, limestone and marble. Wide range of terroirs.",
        water: "Low rainfall. Irrigation is widely used and carefully managed.",
        vines: ["Aragonez (Tempranillo)", "Trincadeira", "Alicante Bouschet", "Touriga Nacional", "Antão Vaz"],
        wines: [
        { name: "Alentejo reds", taste: "Ripe dark fruit, spice and soft tannins. Warm, generous and good value.", quality: 3, price: 1 },
        { name: "Alentejo whites", taste: "Citrus, tropical notes and freshness. Improving rapidly.", quality: 3, price: 1 }
      ],
        desc: "Vast region producing generous, sun-drenched reds and increasingly refined whites."
      }
    ]
  },

  // ==================== SOUTH AFRICA ====================
  {
    id: "southafrica",
    name: "South Africa",
    flag: "🇿🇦",
    center: [-33.5, 19.0],
    zoom: 6,
    regions: [
      {
        id: "stellenbosch",
        name: "Stellenbosch",
        lat: -33.95,
        lng: 18.85,
        climate: "Mediterranean. Warm dry summers, cool wet winters. Mountain ranges create many microclimates.",
        soil: "Highly varied – granite, sandstone, shale and alluvial. Excellent diversity.",
        water: "Winter rainfall. Irrigation used in dry summer months on many sites.",
        vines: ["Cabernet Sauvignon", "Syrah", "Pinotage", "Chenin Blanc", "Chardonnay", "Sauvignon Blanc"],
        wines: [
        { name: "Stellenbosch Cabernet / Bordeaux blends", taste: "Black fruit, fynbos, spice and firm structure. South Africa’s premier region.", quality: 4, price: 2 },
        { name: "Chenin Blanc", taste: "From fresh and citrusy to rich and complex old-vine examples. Outstanding.", quality: 4, price: 2 },
        { name: "Syrah / Pinotage", taste: "Syrah is excellent; Pinotage is the unique local variety – can be rustic or refined.", quality: 3, price: 2 }
      ],
        desc: "South Africa’s premier wine region. Outstanding Cabernet, Syrah and old-vine Chenin Blanc."
      },
      {
        id: "swartland",
        name: "Swartland",
        lat: -33.3,
        lng: 18.8,
        climate: "Warm Mediterranean / semi-arid. Hot dry summers. One of the more extreme climates in the Cape.",
        soil: "Granite, shale and clay. Old bush vines on dry-farmed sites are a specialty.",
        water: "Very low rainfall. Many of the best old vines are dry-farmed.",
        vines: ["Chenin Blanc", "Syrah", "Grenache", "Cinsault", "Carignan", "Pinotage"],
        wines: [
        { name: "Old-vine Chenin Blanc", taste: "Complex, textural, citrus, nuts and mineral. Some of SA’s most exciting whites.", quality: 5, price: 2 },
        { name: "Syrah / Mediterranean blends", taste: "Dark fruit, herbs, spice and freshness. The Swartland Independent style.", quality: 4, price: 2 }
      ],
        desc: "Exciting region for old-vine Chenin and Mediterranean reds. Home of the Swartland Independent movement."
      }
    ]
  }
];
