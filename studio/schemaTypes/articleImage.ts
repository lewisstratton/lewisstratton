import { defineType, defineField } from "sanity";

export default defineType({
  name: "articleImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
      description: "Shown beneath the image, e.g. Photo © Lewis Stratton for DSCENE",
    }),
  ],
  preview: {
    select: { media: "image", subtitle: "credit" },
    prepare({ media, subtitle }) {
      return { title: "Image", subtitle, media };
    },
  },
});
