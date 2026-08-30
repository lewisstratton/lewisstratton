# Lewis Stratton

Portfolio site for a London-based stylist and fashion editor. Next.js front end, Sanity CMS, deployed as a static export to Cloudflare Pages.

## Structure

| Path | What it is |
| --- | --- |
| `app`, `components` | The website |
| `lib/sanity` | Client, GROQ queries, types, image loader |
| `studio` | Sanity Studio (own dependencies, deployed separately) |
| `scripts/migrate.mjs` | One-off import of the original content |

## Running locally

```bash
npm install
npm run dev
```

Requires `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=6w3l41di
NEXT_PUBLIC_SANITY_DATASET=production
```

The Studio runs separately:

```bash
cd studio
npm install
npm run dev
```

## Editing content

The Studio is hosted at **https://lewisstratton.sanity.studio**.

- **Projects** — drag rows to reorder; the order is what the site shows. Each project has a cover (the home page image) and a set of images shown when it opens. Use **Upload multiple images** to add a whole story at once; it uploads in batches so large drops don't fail.
- **Articles** — same drag ordering. The body takes paragraphs, pull quotes and images with credits.
- **Site Settings** — name, role, taglines, email, Instagram, and the credit lists in the About panel.

## Publishing changes

The site is a static export, so published edits appear after a rebuild. Connect a Sanity webhook to a Cloudflare Pages deploy hook to make this automatic:

1. Cloudflare Pages → Settings → Builds & deployments → Deploy hooks → create one, copy the URL.
2. sanity.io/manage → API → Webhooks → create, paste the URL, method `POST`, dataset `production`, trigger on create/update/delete.

## Deploying

**Website** — Cloudflare Pages, building from this repo:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | from `.nvmrc` (22) |

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` as environment variables.

**Studio**

```bash
cd studio
npm run deploy
```

## Migrating the original content

Run once, with a write token from sanity.io/manage (Editor permissions):

```bash
SANITY_WRITE_TOKEN=sk... node scripts/migrate.mjs
```

Uploads all project and article images and creates the documents in order. Safe to re-run; documents use fixed IDs and are replaced rather than duplicated.
