import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  url: string;
  width: number;
  height: number;
  lqip: string | null;
};

export type Project = {
  slug: string;
  title: string;
  publication: string;
  year: string;
  cover: SanityImage;
  images: SanityImage[];
};

export type ArticleImageBlock = {
  _type: "articleImage";
  _key: string;
  credit: string | null;
  image: SanityImage;
};

export type ArticleBlock = PortableTextBlock | ArticleImageBlock;

export type Article = {
  slug: string;
  title: string;
  standfirst: string | null;
  publication: string;
  date: string;
  year: string;
  formattedDate: string;
  byline: string | null;
  body: ArticleBlock[];
};

export type SiteSettings = {
  name: string;
  role: string | null;
  tagline: string | null;
  shortTagline: string | null;
  location: string | null;
  metaDescription: string | null;
  email: string;
  instagramHandle: string | null;
  instagramUrl: string | null;
  publications: string[];
  talent: string[];
};
