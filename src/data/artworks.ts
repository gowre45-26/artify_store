import { Artwork, FrameOption } from '../types/art';

// High-fidelity generated assets
import heroExhibitionImg from '../assets/images/hero_exhibition_monolith_1790586581662.jpg';
import coastalTempestImg from '../assets/images/art_oil_coastal_tempest_1790586596543.jpg';
import bronzeSculptureImg from '../assets/images/art_sculpture_bronze_torso_1790586609647.jpg';
import pigmentSetImg from '../assets/images/art_pigment_mineral_set_1790586621955.jpg';

export const FRAME_OPTIONS: FrameOption[] = [
  {
    id: 'unframed',
    name: 'Unframed / Gallery Stretched Canvas',
    price: 0,
    description: 'Clean gallery-wrapped edge (1.5" depth) ready to hang directly on museum hardware.',
    cssBorder: 'border-0 shadow-md',
    material: 'Natural kiln-dried pine stretcher bars'
  },
  {
    id: 'black-oak',
    name: 'Minimalist Matte Black Oak',
    price: 135,
    description: 'Deep shadowbox float profile crafted from sustainably harvested German black oak with acid-free backing.',
    cssBorder: 'border-[8px] border-[#18181b] shadow-xl',
    material: 'Solid Black Oak'
  },
  {
    id: 'museum-gilt',
    name: 'Fluted Florentine Museum Gilt',
    price: 240,
    description: 'Classical fluted moulding hand-leafed in 22-karat antiqued gold leaf with subtle bole undertones.',
    cssBorder: 'border-[10px] border-[#c29b38] shadow-2xl ring-1 ring-[#eab308]/50',
    material: 'Hand-Carved Gilt Wood'
  },
  {
    id: 'walnut-float',
    name: 'Natural American Walnut Shadowbox',
    price: 185,
    description: 'Warm organic grain finish with a 10mm recessed floating reveal and UV-filtering museum acrylic.',
    cssBorder: 'border-[8px] border-[#5c3a21] shadow-xl',
    material: 'Solid American Walnut'
  }
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'art-01',
    title: 'Tempest Over the Solitary Headland',
    artist: 'Elena Vanechka',
    artistNationality: 'Austrian, b. 1984',
    artistBio: 'Known for monumental maritime landscapes exploring atmospheric turbulence and light refraction through impasto knife work.',
    category: 'painting',
    style: 'Neo-Impressionism',
    medium: 'Oil and cold wax on Belgian linen',
    dimensions: {
      widthCm: 140,
      heightCm: 105,
      imperial: '55.1 × 41.3 in'
    },
    year: 2025,
    price: 3450,
    image: coastalTempestImg,
    description: 'An arresting exploration of dusk sea mist breaking against monolithic granite cliffs. Heavy layers of raw lapis indigo, cadmium ochre, and titanium whites evoke the raw kinetic presence of the Atlantic coastline.',
    provenance: [
      'Commissioned for the 2025 Salzburg Modern Salon',
      'Exhibited at Gallerie Saint-Germain, Paris (Nov 2025)',
      'Consigned directly from the artist’s Vienna atelier'
    ],
    certificateDetails: 'Archival Hahnemühle Holographic Certificate of Authenticity #AT-9842 signed by the artist.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: true,
    orientation: 'landscape',
    framingCompatible: true,
    exhibitionRoomNote: 'Recommended viewing distance: 2.5 meters under warm directional spotlight (3000K).'
  },
  {
    id: 'art-02',
    title: 'Monument to the Silent Echo',
    artist: 'Marcus Thorne',
    artistNationality: 'British, b. 1978',
    artistBio: 'Marcus Thorne combines classical lost-wax foundry methods with organic abstract geometries influenced by Henry Moore and Barbara Hepworth.',
    category: 'sculpture',
    style: 'Minimalist',
    medium: 'Lost-wax cast bronze on hand-chiseled Jura limestone plinth',
    dimensions: {
      widthCm: 38,
      heightCm: 68,
      depthCm: 32,
      imperial: '15.0 × 26.8 × 12.6 in'
    },
    year: 2024,
    price: 4800,
    image: bronzeSculptureImg,
    description: 'An intimate yet commanding bronze sculpture examining the tension between hollowed void and tensile mass. The surface bears an artisan ferric nitrate patina shifting between rich umber and olive sheen.',
    provenance: [
      'Cast at Morris Singer Foundry, Hampshire',
      'Private Collection of Lord Sterling, Edinburgh (2024–2025)',
      'Acquired directly for the 2026 Spring Vernissage'
    ],
    certificateDetails: 'Foundry stamp "MT 03/08" stamped into bronze base with foundry documentation.',
    edition: 'Edition 3 of 8 (Bronze cast)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: true,
    orientation: 'portrait',
    framingCompatible: false,
    exhibitionRoomNote: 'Best showcased on a freestanding pedestal with low-angle raking light to emphasize hollow contours.'
  },
  {
    id: 'art-03',
    title: 'Vernissage Grand Hall Monolith',
    artist: 'Soren Lindqvist',
    artistNationality: 'Danish, b. 1972',
    artistBio: 'Lindqvist is renowned for monumental architectural canvas fields that merge Scandinavian reductive color theory with meditative textural depth.',
    category: 'painting',
    style: 'Abstract Expressionism',
    medium: 'Pigment, pulverized marble, and acrylic emulsion on raw flax',
    dimensions: {
      widthCm: 180,
      heightCm: 120,
      imperial: '70.8 × 47.2 in'
    },
    year: 2026,
    price: 5200,
    image: heroExhibitionImg,
    description: 'Created as the central anchor for the Autumn Vernissage. Subtle horizontal strata in bone white, warm alabaster, and graphite grey create an expansive visual resonance that calms and expands interior architecture.',
    provenance: [
      'Debuted at Copenhagen Architecture & Art Biennale 2026',
      'Museum of Contemporary Forms Guest Exhibit'
    ],
    certificateDetails: 'Permanent accession registration registry #DK-2026-081 with digital NFC museum chip.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: true,
    orientation: 'landscape',
    framingCompatible: true,
    exhibitionRoomNote: 'Dominant centerpiece intended for wide living rooms or executive gallery salons.'
  },
  {
    id: 'art-04',
    title: 'Master Atelier Natural Pigment & Brush Apothecary',
    artist: 'Atelier de Cennini',
    artistNationality: 'Florence & Lyon',
    artistBio: 'A historical guild of master colorists reviving 15th-century mineral extraction, gum binders, and Kolinsky sable crafting techniques.',
    category: 'atelier',
    style: 'Classical Realism',
    medium: 'Natural Afghan lapis lazuli, raw Siena ochre, Bohemian malachite in hand-blown vials + 5 Kolinsky brushes',
    dimensions: {
      widthCm: 45,
      heightCm: 30,
      depthCm: 12,
      imperial: '17.7 × 11.8 × 4.7 in'
    },
    year: 2026,
    price: 680,
    image: pigmentSetImg,
    description: 'An extraordinary curated collector box for practicing fine artists and connoisseurs. Contains 12 ground pure mineral pigments free of synthetics, alongside brass ferrules, French walnut oil, and goat hair wash brushes.',
    provenance: [
      'Hand-assembled in limited batches at the Lyon pigment mill',
      'Certified non-toxic archival grade'
    ],
    certificateDetails: 'Atelier stamp and batch numbered wax seal on box lid.',
    edition: 'Atelier Seasonal Batch (Edition of 40)',
    inStock: true,
    stockCount: 6,
    isFeaturedExhibition: false,
    orientation: 'landscape',
    framingCompatible: false,
    exhibitionRoomNote: 'Suitable for studio display in glazed curiosity cabinets.'
  },
  {
    id: 'art-05',
    title: 'Studies in Terracotta Geometry I & II',
    artist: 'Camille Reynaud',
    artistNationality: 'French, b. 1991',
    artistBio: 'Reynaud explores Mediterranean clay forms, architectural archways, and earthen pigment washes on handmade Japanese kozo paper.',
    category: 'print',
    style: 'Minimalist',
    medium: 'Stone lithograph hand-pulled on 300gsm Somerset Velvet paper with deckled edges',
    dimensions: {
      widthCm: 76,
      heightCm: 102,
      imperial: '29.9 × 40.1 in'
    },
    year: 2025,
    price: 890,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    description: 'Two interlocking earthen arches rendered in burnt sienna, dusty travertine, and charcoal dust. Printed using a traditional 19th-century flatbed Bavarian limestone press.',
    provenance: [
      'Printed at Idem Paris Atelier, Montparnasse',
      'Numbered and blind-stamped in the margins by the artist'
    ],
    certificateDetails: 'Embossed publisher chop mark & artist pencil signature with certificate.',
    edition: 'Limited Edition 18 of 50',
    inStock: true,
    stockCount: 4,
    isFeaturedExhibition: false,
    orientation: 'portrait',
    framingCompatible: true,
    exhibitionRoomNote: 'Looks magnificent paired with Natural American Walnut shadowbox frame.'
  },
  {
    id: 'art-06',
    title: 'Nocturne in Ultramarine and Gold',
    artist: 'Isabelle Moreau',
    artistNationality: 'Belgian, b. 1986',
    artistBio: 'Moreau synthesizes historical Flemish chiaroscuro with fluid abstract gold-leaf interventions.',
    category: 'painting',
    style: 'Abstract Expressionism',
    medium: 'Oil, 24k gold leaf, and dammar varnish on cradled birch panel',
    dimensions: {
      widthCm: 120,
      heightCm: 120,
      imperial: '47.2 × 47.2 in'
    },
    year: 2025,
    price: 4100,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep celestial tones of lapis and midnight black pierced by molten fractures of genuine gold leaf. The surface shifts dynamic highlights throughout the day as natural daylight changes.',
    provenance: [
      'Solo Retrospective: "Gilded Shadows", Antwerp Art Fair',
      'Acquired through Galerie Verhaegen'
    ],
    certificateDetails: 'Certificate of Authenticity with gold-leaf forensic swatch test record.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: true,
    orientation: 'square',
    framingCompatible: true,
    exhibitionRoomNote: 'Commands attention in low ambient light where gold reflections shimmer.'
  },
  {
    id: 'art-07',
    title: 'Botanical Herbarium: Ficus & Wild Ferns',
    artist: 'Julian Croft',
    artistNationality: 'Irish, b. 1969',
    artistBio: 'Former botanical illustrator for the Royal Botanic Gardens, Croft now creates monumental intimate watercolor studies of fragile flora.',
    category: 'painting',
    style: 'Botanical & Organic',
    medium: 'Fine watercolor and graphite on 640gsm Arches cold-press cotton rag',
    dimensions: {
      widthCm: 80,
      heightCm: 110,
      imperial: '31.5 × 43.3 in'
    },
    year: 2025,
    price: 1950,
    image: 'https://images.unsplash.com/photo-1582561176251-c035ea6f32e6?auto=format&fit=crop&w=1200&q=80',
    description: 'A contemplative botanical composition capturing wild forest ferns and silver lichen with surgical precision yet poetic breath. Layered washes of sap green, raw umber, and translucent indigo.',
    provenance: [
      'Exhibited at Chelsea Botanical Art Show 2025 (Gold Medal)',
      'Consigned directly from the artist’s Connemara studio'
    ],
    certificateDetails: 'Signed in graphite bottom right with botanical accession stamp.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: false,
    orientation: 'portrait',
    framingCompatible: true,
    exhibitionRoomNote: 'Float mounting with non-reflective museum glass is highly recommended.'
  },
  {
    id: 'art-08',
    title: 'Equilibrium in Alabaster',
    artist: 'Naomi Tanaka',
    artistNationality: 'Japanese-Canadian, b. 1980',
    artistBio: 'Tanaka works in direct stone carving, embracing the Japanese philosophy of wabi-sabi through raw crystalline textures.',
    category: 'sculpture',
    style: 'Minimalist',
    medium: 'Carved Volterra alabaster on blackened steel base',
    dimensions: {
      widthCm: 25,
      heightCm: 48,
      depthCm: 22,
      imperial: '9.8 × 18.9 × 8.7 in'
    },
    year: 2024,
    price: 3600,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    description: 'Translucent Italian alabaster carved into intersecting curvilinear fins that catch interior light. When backlit by soft natural light, the mineral interior glows with an ethereal warmth.',
    provenance: [
      'Carved in residence at Pietrasanta, Tuscany',
      'Winner of the Kyoto Sculpture Fellowship Prize'
    ],
    certificateDetails: 'Artist signature engraved into the underside of the blackened steel base.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: false,
    orientation: 'portrait',
    framingCompatible: false,
    exhibitionRoomNote: 'Ideal placed near a window or soft backlit wall niche.'
  },
  {
    id: 'art-09',
    title: 'The Cartographer’s Meridian',
    artist: 'Mateo Gutierrez',
    artistNationality: 'Spanish, b. 1975',
    artistBio: 'Gutierrez investigates forgotten trade routes and navigational astronomy through copper-plate intaglio etchings.',
    category: 'print',
    style: 'Contemporary',
    medium: 'Multi-plate copper etching and chine-collé on Hannemühle rag paper',
    dimensions: {
      widthCm: 60,
      heightCm: 80,
      imperial: '23.6 × 31.5 in'
    },
    year: 2024,
    price: 720,
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    description: 'Intricate celestial constellations overlaid across 17th-century navigational longitude lines. Deep velvety intaglio blacks with sepia accents printed in an artisanal Madrid workshop.',
    provenance: [
      'Talleres Mayor Intaglio Press, Madrid',
      'Acquired for the Madrid Contemporary Print Biennial'
    ],
    certificateDetails: 'Numbered and titled in pencil with master printer blindstamp.',
    edition: 'Limited Edition 09 of 35',
    inStock: true,
    stockCount: 5,
    isFeaturedExhibition: false,
    orientation: 'portrait',
    framingCompatible: true,
    exhibitionRoomNote: 'Pairs exquisitely with the Florentine Gilt frame for historical gravitas.'
  },
  {
    id: 'art-10',
    title: 'Raw French Linen Stretched Canvas Roll (Master Grade)',
    artist: 'Tissage d’Armentières',
    artistNationality: 'Flanders, France',
    artistBio: 'Weaving heritage linens since 1888 for European academies and conservation studios.',
    category: 'atelier',
    style: 'Contemporary',
    medium: '100% pure long-staple Normandy flax, 460gsm quadruple-primed titanium oil ground (10 meters × 2.1 meters)',
    dimensions: {
      widthCm: 210,
      heightCm: 1000,
      imperial: '82.6 in × 32.8 ft'
    },
    year: 2026,
    price: 540,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    description: 'The definitive standard for serious painters. Heavy tight weave with balanced grain tooth, sized with rabbit-skin glue and double lead-free oil primer. Will not sag or warp under heavy impasto.',
    provenance: [
      'Woven and prepared in the historic Nord-Pas-de-Calais mills',
      'Stored in climate-controlled archival roll tubes'
    ],
    certificateDetails: 'Mill quality stamp of authenticity and batch certification.',
    edition: 'Atelier Mill Stock',
    inStock: true,
    stockCount: 8,
    isFeaturedExhibition: false,
    orientation: 'landscape',
    framingCompatible: false,
    exhibitionRoomNote: 'Shipped in heavy-duty moisture-sealed museum tube.'
  },
  {
    id: 'art-11',
    title: 'Serenade at Twilight (The Venetian Lagoon)',
    artist: 'Alessandro Conti',
    artistNationality: 'Italian, b. 1982',
    artistBio: 'Conti captures atmospheric moisture and light dispersion across historical European canals with delicate glazes and sfumato.',
    category: 'painting',
    style: 'Classical Realism',
    medium: 'Oil on gessoed poplar board with walnut oil glazing',
    dimensions: {
      widthCm: 90,
      heightCm: 65,
      imperial: '35.4 × 25.6 in'
    },
    year: 2025,
    price: 2850,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    description: 'An evocative Venetian view looking towards San Giorgio Maggiore at twilight. Rose gold sunset light glazes over tranquil waters, silhouetting moored gondolas.',
    provenance: [
      'Painted plein air during the Venice Regatta 2025',
      'Exhibited at Galleria d’Arte Moderna, Venice'
    ],
    certificateDetails: 'Signed in vermilion bottom left; registered in the Conti Catalogue Raisonné.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: false,
    orientation: 'landscape',
    framingCompatible: true,
    exhibitionRoomNote: 'Classical piece that looks timeless in either Fluted Gilt or Black Oak.'
  },
  {
    id: 'art-12',
    title: 'Whispers of the Ochre Valley',
    artist: 'Amara Kalu',
    artistNationality: 'Nigerian-British, b. 1989',
    artistBio: 'Kalu explores terrestrial maps, soil stratification, and ancestral memory using pulverized clay pigments and gold dust.',
    category: 'painting',
    style: 'Abstract Expressionism',
    medium: 'Natural soil pigments, casein, and bronze powder on heavy raw cotton canvas',
    dimensions: {
      widthCm: 150,
      heightCm: 100,
      imperial: '59.1 × 39.4 in'
    },
    year: 2025,
    price: 3900,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80',
    description: 'Rich warm terracotta, raw umber, and copper fissures reminiscent of arid riverbeds viewed from high altitude. Deep tactile surface with mineral crusts and shimmering metallic dust.',
    provenance: [
      'Exhibited at 1-54 Contemporary African Art Fair, London',
      'Private Collector acquisition release'
    ],
    certificateDetails: 'Signed on reverse with artist biometric thumbprint seal.',
    edition: 'Original (1 of 1 Unique)',
    inStock: true,
    stockCount: 1,
    isFeaturedExhibition: true,
    orientation: 'landscape',
    framingCompatible: true,
    exhibitionRoomNote: 'Complements contemporary natural wood interiors and limestone fireplaces.'
  }
];

export const CURATOR_STATEMENT = {
  curator: 'Dr. Henri de Vance',
  role: 'Chief Curator, Vernissage Salon & Store',
  title: 'Autumn Salon 2026: Materiality, Provenance, and the Living Canvas',
  essay: 'In an era of fleeting synthetic imagery, our 2026 Salon reasserts the irreplaceable gravitas of physical medium. Every canvas, bronze casting, and mineral pigment presented in the Art Store is vetted for rigorous archival longevity and curatorial merit. Whether you are an established collector acquiring an original monumental oil or an artist sourcing purest lapis lazuli from historical French mills, you participate directly in sustaining the living atelier tradition.'
};
