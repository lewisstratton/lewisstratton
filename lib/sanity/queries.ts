import { groq } from "next-sanity";
import { client } from "./client";
import type { Article, Project, SiteSettings } from "./types";

const imageFragment = groq`{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(orderRank) {
  "slug": slug.current,
  title,
  publication,
  year,
  cover ${imageFragment},
  "images": images[] ${imageFragment}
}`;

const articlesQuery = groq`*[_type == "article" && defined(slug.current)] | order(orderRank) {
  "slug": slug.current,
  title,
  standfirst,
  publication,
  date,
  byline,
  "body": body[] {
    ...,
    _type == "articleImage" => {
      _type,
      _key,
      credit,
      "image": image ${imageFragment}
    }
  }
}`;

const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  name,
  role,
  tagline,
  shortTagline,
  location,
  metaDescription,
  email,
  instagramHandle,
  instagramUrl,
  "publications": coalesce(publications, []),
  "talent": coalesce(talent, [])
}`;

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function getProjects(): Promise<Project[]> {
  const projects = await client.fetch<Project[]>(projectsQuery);
  return projects.map((project) => ({ ...project, images: project.images ?? [] }));
}

export async function getArticles(): Promise<Article[]> {
  const articles = await client.fetch<Omit<Article, "year" | "formattedDate">[]>(articlesQuery);
  return articles.map((article) => ({
    ...article,
    body: article.body ?? [],
    year: article.date.slice(0, 4),
    formattedDate: formatDate(article.date),
  }));
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(siteSettingsQuery);
}
