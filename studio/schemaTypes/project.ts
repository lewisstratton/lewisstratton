import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import BatchImageInput from "../components/BatchImageInput";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The subject or story name, e.g. Eliza",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication",
      type: "string",
      description: "Where it ran, e.g. DSCENE, Digital Cover",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{4}$/, { name: "four digits" }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      description: "Shown on the home page. Can be any frame from the story.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Every image in the story, in order. Drag to reorder.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      components: { input: BatchImageInput },
    }),
  ],
  preview: {
    select: { title: "title", publication: "publication", year: "year", media: "cover" },
    prepare({ title, publication, year, media }) {
      return { title, subtitle: [publication, year].filter(Boolean).join(" · "), media };
    },
  },
});
