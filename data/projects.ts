export type Project = {
  slug: string;
  title: string;
  publication: string;
  year: string;
  cover: string;
  images: string[];
} & ({ type: "image" } | { type: "video" });

function frames(slug: string, count: number, extension: "jpg" | "webp" = "jpg") {
  return Array.from(
    { length: count },
    (_, index) => `/projects/${slug}/${String(index + 1).padStart(2, "0")}.${extension}`
  );
}

export const PROJECTS: Project[] = [
  {
    slug: "eliza-dscene",
    title: "Eliza",
    publication: "DSCENE, Digital Cover",
    year: "2026",
    type: "image",
    cover: "/projects/eliza-dscene/01.jpg",
    images: frames("eliza-dscene", 5),
  },
  {
    slug: "yonaka-hunger",
    title: "Yonaka",
    publication: "Hunger Magazine",
    year: "2026",
    type: "image",
    cover: "/projects/yonaka-hunger/03.jpg",
    images: frames("yonaka-hunger", 4),
  },
  {
    slug: "forge-male-model-scene",
    title: "Forge",
    publication: "Male Model Scene",
    year: "2026",
    type: "image",
    cover: "/projects/forge-male-model-scene/06.jpg",
    images: frames("forge-male-model-scene", 6),
  },
  {
    slug: "bethany-antonia-dscene",
    title: "Bethany Antonia Cover Story",
    publication: "DSCENE",
    year: "2026",
    type: "image",
    cover: "/projects/bethany-antonia-dscene/01.jpg",
    images: frames("bethany-antonia-dscene", 1),
  },
  {
    slug: "edgar-wright-hunger",
    title: "Edgar Wright",
    publication: "Hunger Magazine, Cover",
    year: "2025",
    type: "image",
    cover: "/projects/edgar-wright-hunger/01.webp",
    images: frames("edgar-wright-hunger", 5, "webp"),
  },
  {
    slug: "louis-iii-male-model-scene",
    title: "Louis III",
    publication: "Male Model Scene, Cover",
    year: "2025",
    type: "image",
    cover: "/projects/louis-iii-male-model-scene/01.webp",
    images: frames("louis-iii-male-model-scene", 24, "webp"),
  },
  {
    slug: "max-parker-hunger",
    title: "Max Parker",
    publication: "Hunger Magazine",
    year: "2025",
    type: "image",
    cover: "/projects/max-parker-hunger/01.webp",
    images: frames("max-parker-hunger", 3, "webp"),
  },
  {
    slug: "lustre-fucking-young",
    title: "Lustre",
    publication: "Fucking Young!",
    year: "2025",
    type: "image",
    cover: "/projects/lustre-fucking-young/01.jpg",
    images: frames("lustre-fucking-young", 9),
  },
  {
    slug: "intercise-male-model-scene",
    title: "Intercise",
    publication: "Male Model Scene",
    year: "2025",
    type: "image",
    cover: "/projects/intercise-male-model-scene/01.webp",
    images: frames("intercise-male-model-scene", 13, "webp"),
  },
  {
    slug: "flowers-fucking-young",
    title: "Flowers",
    publication: "Fucking Young!",
    year: "2025",
    type: "image",
    cover: "/projects/flowers-fucking-young/01.jpg",
    images: frames("flowers-fucking-young", 10),
  },
  {
    slug: "to-experiment-kaltblut",
    title: "To Experiment",
    publication: "Kaltblut",
    year: "2024",
    type: "image",
    cover: "/projects/to-experiment-kaltblut/01.jpg",
    images: frames("to-experiment-kaltblut", 10),
  },
];
