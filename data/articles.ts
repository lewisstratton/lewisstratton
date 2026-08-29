export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; credit: string };

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  publication: string;
  date: string;
  year: string;
  cover: string;
  body: ArticleBlock[];
  byline: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "la-galerie-dior",
    title: "La Galerie Dior: A House in Conversation with Itself",
    standfirst: "Thirteen Rooms, Eighty Years, One Conversation",
    publication: "DSCENE",
    date: "July 13, 2026",
    year: "2026",
    cover: "/articles/la-galerie-dior/01.webp",
    byline: "Words by DSCENE London Contributing Editor Lewis Stratton.",
    body: [
      {
        type: "image",
        src: "/articles/la-galerie-dior/01.webp",
        credit: "La Galerie Dior. Photo © Adrien Diran, courtesy of Dior",
      },
      {
        type: "paragraph",
        text: "Having spent the past few seasons experiencing Dior through the pace of fashion week, showroom appointments and industry presentations, La Galerie Dior offered something unexpectedly rare: time. Time to move through the house differently.",
      },
      {
        type: "paragraph",
        text: "Open since June 10th, the exhibition traces almost eighty years of Dior history across thirteen themed rooms, not as chronology, but as continuation, moving between archive, process and image, and tracing how the house has been constantly rewritten by those who have shaped it. Seeing Jonathan Anderson’s couture placed alongside Christian Dior, John Galliano, Raf Simons and Maria Grazia Chiuri shifts the perspective. Removed from the pace of the fashion calendar, it becomes less about season and more about continuity, where new work sits within a much longer conversation.",
      },
      {
        type: "paragraph",
        text: "Before the exhibition properly begins, visitors are greeted by La Galerie Dior’s signature spiral staircase. Rising through the centre of the building, its white architecture is framed by hundreds of miniature Dior creations, introducing the house through colour, craftsmanship and instantly recognisable codes.",
      },
      {
        type: "image",
        src: "/articles/la-galerie-dior/02.webp",
        credit: "La Galerie Dior. Photo © Adrien Diran, courtesy of Dior",
      },
      {
        type: "paragraph",
        text: "The first room returns to origin. Sketches, archival material and early references map Christian Dior’s foundations, bringing together the influences that shaped the house before it became the house we know today.",
      },
      {
        type: "quote",
        text: "What becomes clear is not comparison, but continuity. The same ideas return across decades, each creative director interpreting them in their own way. Seeing Jonathan Anderson’s work alongside them gives a completely different perspective than seeing it on the runway.",
      },
      {
        type: "paragraph",
        text: "What becomes clear is how much of Dior’s visual language began long before his first collection. The colours of his childhood home, alongside the people, places and cultural references that surrounded him, feel less like background detail and more like the foundations of the aesthetic he would go on to build. Running through the room is a timeline charting the house’s earliest years. What stands out is the speed of its rise: from its founding to international recognition in remarkably little time, establishing an identity that has remained recognisable ever since. From there, the exhibition shifts into The Enchanted Gardens. Garments from Christian Dior and his successors are brought together, allowing decades of Dior to exist within the same space.",
      },
      {
        type: "paragraph",
        text: "What becomes clear is not comparison, but continuity. The same ideas return across decades, each creative director interpreting them in their own way. Seeing Jonathan Anderson’s work alongside them gives a completely different perspective than seeing it on the runway. Seen outside of that context, you notice things differently: not as seasonal collections, but as a longer visual language being repeated and adjusted over time. As the room opens into a lighter space, the florals remain, but the focus returns to Dior himself, with a large image of his childhood home positioned behind the garments. Rather than repeating the reference, the exhibition builds on it, connecting the garments back to the world that first shaped them.",
      },
      {
        type: "image",
        src: "/articles/la-galerie-dior/03.webp",
        credit: "La Galerie Dior. Photo © Lewis Stratton for DSCENE",
      },
      {
        type: "paragraph",
        text: "Beyond this point, the exhibition shifts away from finished garments and towards construction. Archival material introduces Dior’s idea of the “office of dreams”, where ideas begin as sketches before becoming clothing. It is less about display than structure, showing how the house thinks before it makes. The most revealing shift comes in the atelier, where bags are made in real time, offering a rare glimpse into one of the most closely guarded parts of the house. What stands out is not the craft alone, but the access to it. Work usually concealed is slowed down and exposed, shifting the object from outcome to process. From there, attention moves into the visual language of the house itself.",
      },
      {
        type: "quote",
        text: "Alongside the garments, imagery sits within the same system, showing how Dior is constructed not only through clothing, but through the details and symbols that become recognisable over time.",
      },
      {
        type: "paragraph",
        text: "Alongside the garments, imagery sits within the same system, showing how Dior is constructed not only through clothing, but through the details and symbols that become recognisable over time. The bow is one of those details. Returning across Dior’s history, it has become one of the house’s most instantly recognisable codes. From Christian Dior’s own writing through to later collections, and more recently in Jonathan Anderson’s work for Dior, it is a detail that immediately signals the house. The exhibition then opens into the ballroom. After the closeness of process, the shift is immediate: a vast space where silhouette and ceremony take over. Ballgowns fill the room, and the scale of the house returns.",
      },
      {
        type: "image",
        src: "/articles/la-galerie-dior/04.webp",
        credit: "La Galerie Dior. Photo © Lewis Stratton for DSCENE",
      },
      {
        type: "paragraph",
        text: "Ultimately, La Galerie Dior does not present the house as something fixed. It shows it as something continuously rewritten through those who first shaped it and those who continue to work within its language now. Dior is not anchored to a single creative director or moment. It moves through time, reinterpretation and image. What stays with you is not the structure of the exhibition, but the way it slows everything down just enough to make that structure visible.",
      },
    ],
  },
];
