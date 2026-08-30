import { defineType, defineField, defineArrayMember } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "article" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown in the Articles menu. Keep it to roughly 50 characters so it stays on one line.",
      validation: (rule) => rule.required().max(60).warning("Longer titles may wrap on mobile"),
    }),
    defineField({
      name: "standfirst",
      title: "Standfirst",
      type: "string",
      description: "The line under the title, e.g. Thirteen Rooms, Eighty Years, One Conversation",
    }),
    defineField({
      name: "publication",
      title: "Publication",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (rule) => rule.required(),
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
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Pull quote", value: "blockquote" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
        defineArrayMember({ type: "articleImage" }),
      ],
    }),
    defineField({
      name: "byline",
      title: "Byline",
      type: "string",
      description: "e.g. Words by DSCENE London Contributing Editor Lewis Stratton.",
    }),
  ],
  preview: {
    select: { title: "title", publication: "publication", date: "date", media: "cover" },
    prepare({ title, publication, date, media }) {
      const year = date ? String(date).slice(0, 4) : "";
      return { title, subtitle: [publication, year].filter(Boolean).join(" · "), media };
    },
  },
});
