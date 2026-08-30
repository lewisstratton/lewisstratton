import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { basename, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6w3l41di";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN.");
  console.error("Create one at https://sanity.io/manage with Editor permissions, then:");
  console.error("  SANITY_WRITE_TOKEN=sk... node scripts/migrate.mjs");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

const PROJECTS = [
  { slug: "eliza-dscene", title: "Eliza", publication: "DSCENE, Digital Cover", year: "2026", cover: "01.jpg" },
  { slug: "yonaka-hunger", title: "Yonaka", publication: "Hunger Magazine", year: "2026", cover: "03.jpg" },
  { slug: "forge-male-model-scene", title: "Forge", publication: "Male Model Scene", year: "2026", cover: "06.jpg" },
  { slug: "bethany-antonia-dscene", title: "Bethany Antonia Cover Story", publication: "DSCENE", year: "2026", cover: "01.jpg" },
  { slug: "edgar-wright-hunger", title: "Edgar Wright", publication: "Hunger Magazine, Cover", year: "2025", cover: "01.webp" },
  { slug: "louis-iii-male-model-scene", title: "Louis III", publication: "Male Model Scene, Cover", year: "2025", cover: "01.webp" },
  { slug: "max-parker-hunger", title: "Max Parker", publication: "Hunger Magazine", year: "2025", cover: "01.webp" },
  { slug: "lustre-fucking-young", title: "Lustre", publication: "Fucking Young!", year: "2025", cover: "01.jpg" },
  { slug: "intercise-male-model-scene", title: "Intercise", publication: "Male Model Scene", year: "2025", cover: "01.webp" },
  { slug: "flowers-fucking-young", title: "Flowers", publication: "Fucking Young!", year: "2025", cover: "01.jpg" },
  { slug: "to-experiment-kaltblut", title: "To Experiment", publication: "Kaltblut", year: "2024", cover: "01.jpg" },
];

const DIOR_CREDITS = {
  "01.webp": "La Galerie Dior. Photo © Adrien Diran, courtesy of Dior",
  "02.webp": "La Galerie Dior. Photo © Adrien Diran, courtesy of Dior",
  "03.webp": "La Galerie Dior. Photo © Lewis Stratton for DSCENE",
  "04.webp": "La Galerie Dior. Photo © Lewis Stratton for DSCENE",
};

const DIOR_BODY = [
  { image: "01.webp" },
  "Having spent the past few seasons experiencing Dior through the pace of fashion week, showroom appointments and industry presentations, La Galerie Dior offered something unexpectedly rare: time. Time to move through the house differently.",
  "Open since June 10th, the exhibition traces almost eighty years of Dior history across thirteen themed rooms, not as chronology, but as continuation, moving between archive, process and image, and tracing how the house has been constantly rewritten by those who have shaped it. Seeing Jonathan Anderson’s couture placed alongside Christian Dior, John Galliano, Raf Simons and Maria Grazia Chiuri shifts the perspective. Removed from the pace of the fashion calendar, it becomes less about season and more about continuity, where new work sits within a much longer conversation.",
  "Before the exhibition properly begins, visitors are greeted by La Galerie Dior’s signature spiral staircase. Rising through the centre of the building, its white architecture is framed by hundreds of miniature Dior creations, introducing the house through colour, craftsmanship and instantly recognisable codes.",
  { image: "02.webp" },
  "The first room returns to origin. Sketches, archival material and early references map Christian Dior’s foundations, bringing together the influences that shaped the house before it became the house we know today.",
  { quote: "What becomes clear is not comparison, but continuity. The same ideas return across decades, each creative director interpreting them in their own way. Seeing Jonathan Anderson’s work alongside them gives a completely different perspective than seeing it on the runway." },
  "What becomes clear is how much of Dior’s visual language began long before his first collection. The colours of his childhood home, alongside the people, places and cultural references that surrounded him, feel less like background detail and more like the foundations of the aesthetic he would go on to build. Running through the room is a timeline charting the house’s earliest years. What stands out is the speed of its rise: from its founding to international recognition in remarkably little time, establishing an identity that has remained recognisable ever since. From there, the exhibition shifts into The Enchanted Gardens. Garments from Christian Dior and his successors are brought together, allowing decades of Dior to exist within the same space.",
  "What becomes clear is not comparison, but continuity. The same ideas return across decades, each creative director interpreting them in their own way. Seeing Jonathan Anderson’s work alongside them gives a completely different perspective than seeing it on the runway. Seen outside of that context, you notice things differently: not as seasonal collections, but as a longer visual language being repeated and adjusted over time. As the room opens into a lighter space, the florals remain, but the focus returns to Dior himself, with a large image of his childhood home positioned behind the garments. Rather than repeating the reference, the exhibition builds on it, connecting the garments back to the world that first shaped them.",
  { image: "03.webp" },
  "Beyond this point, the exhibition shifts away from finished garments and towards construction. Archival material introduces Dior’s idea of the “office of dreams”, where ideas begin as sketches before becoming clothing. It is less about display than structure, showing how the house thinks before it makes. The most revealing shift comes in the atelier, where bags are made in real time, offering a rare glimpse into one of the most closely guarded parts of the house. What stands out is not the craft alone, but the access to it. Work usually concealed is slowed down and exposed, shifting the object from outcome to process. From there, attention moves into the visual language of the house itself.",
  { quote: "Alongside the garments, imagery sits within the same system, showing how Dior is constructed not only through clothing, but through the details and symbols that become recognisable over time." },
  "Alongside the garments, imagery sits within the same system, showing how Dior is constructed not only through clothing, but through the details and symbols that become recognisable over time. The bow is one of those details. Returning across Dior’s history, it has become one of the house’s most instantly recognisable codes. From Christian Dior’s own writing through to later collections, and more recently in Jonathan Anderson’s work for Dior, it is a detail that immediately signals the house. The exhibition then opens into the ballroom. After the closeness of process, the shift is immediate: a vast space where silhouette and ceremony take over. Ballgowns fill the room, and the scale of the house returns.",
  { image: "04.webp" },
  "Ultimately, La Galerie Dior does not present the house as something fixed. It shows it as something continuously rewritten through those who first shaped it and those who continue to work within its language now. Dior is not anchored to a single creative director or moment. It moves through time, reinterpretation and image. What stays with you is not the structure of the exhibition, but the way it slows everything down just enough to make that structure visible.",
];

const SETTINGS = {
  name: "Lewis Stratton",
  role: "Stylist & Fashion Editor",
  tagline: "Stylist and fashion editor based in London, contributing to a number of publications.",
  shortTagline: "Stylist and fashion editor based in London",
  location: "London",
  metaDescription: "London based stylist and fashion editor, contributing to a number of publications.",
  email: "studio@lewisstratton.com",
  instagramHandle: "@lewisstratton_",
  instagramUrl: "https://www.instagram.com/lewisstratton_/",
  publications: ["DSCENE", "Fucking Young!", "Hunger Magazine", "Male Model Scene", "Kaltblut"],
  talent: ["Bethany Antonia", "Eliza", "Yonaka", "Edgar Wright", "Louis III", "Max Parker"],
};

const key = () => Math.random().toString(36).slice(2, 12);
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });

const assetCache = new Map();

async function uploadImage(path) {
  if (assetCache.has(path)) return assetCache.get(path);
  if (!existsSync(path)) throw new Error(`Missing file: ${path}`);

  const asset = await client.assets.upload("image", readFileSync(path), {
    filename: basename(path),
  });
  assetCache.set(path, asset._id);
  return asset._id;
}

const imageRef = (id) => ({ _type: "image", asset: { _type: "reference", _ref: id } });

async function migrateProjects() {
  let rank = 0;
  for (const project of PROJECTS) {
    const dir = join("public/projects", project.slug);
    const files = readdirSync(dir).filter((f) => !f.startsWith(".")).sort(natural);

    process.stdout.write(`  ${project.title} (${files.length} images) `);

    const coverId = await uploadImage(join(dir, project.cover));
    const imageIds = [];
    for (const file of files) {
      imageIds.push(await uploadImage(join(dir, file)));
      process.stdout.write(".");
    }

    await client.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      orderRank: String(++rank).padStart(5, "0"),
      title: project.title,
      publication: project.publication,
      year: project.year,
      slug: { _type: "slug", current: project.slug },
      cover: imageRef(coverId),
      images: imageIds.map((id) => ({ ...imageRef(id), _key: key() })),
    });

    process.stdout.write(" ok\n");
  }
}

async function migrateArticles() {
  const dir = "public/articles/la-galerie-dior";
  process.stdout.write("  La Galerie Dior ");

  const body = [];
  for (const block of DIOR_BODY) {
    if (typeof block === "string") {
      body.push({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: block, marks: [] }],
      });
    } else if (block.quote) {
      body.push({
        _type: "block",
        _key: key(),
        style: "blockquote",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: block.quote, marks: [] }],
      });
    } else {
      const id = await uploadImage(join(dir, block.image));
      process.stdout.write(".");
      body.push({
        _type: "articleImage",
        _key: key(),
        image: imageRef(id),
        credit: DIOR_CREDITS[block.image],
      });
    }
  }

  await client.createOrReplace({
    _id: "article-la-galerie-dior",
    _type: "article",
    orderRank: "00001",
    title: "La Galerie Dior: A House in Conversation with Itself",
    standfirst: "Thirteen Rooms, Eighty Years, One Conversation",
    publication: "DSCENE",
    date: "2026-07-13",
    slug: { _type: "slug", current: "la-galerie-dior" },
    cover: imageRef(assetCache.get(join(dir, "01.webp"))),
    body,
    byline: "Words by DSCENE London Contributing Editor Lewis Stratton.",
  });

  process.stdout.write(" ok\n");
}

async function migrateSettings() {
  await client.createOrReplace({ _id: "siteSettings", _type: "siteSettings", ...SETTINGS });
  console.log("  site settings ok");
}

console.log(`Migrating into ${projectId}/${dataset}\n`);
console.log("Projects:");
await migrateProjects();
console.log("\nArticles:");
await migrateArticles();
console.log("\nSettings:");
await migrateSettings();
console.log(`\nDone. ${assetCache.size} images uploaded.`);
