import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "credits", title: "Credits" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "identity",
      description: "The wordmark shown in the corner of every page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      group: "identity",
      description: "Shown centred on the loading screen, e.g. Stylist & Fashion Editor",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      group: "identity",
      description: "The full sentence shown in the About panel.",
    }),
    defineField({
      name: "shortTagline",
      title: "Short tagline",
      type: "string",
      group: "identity",
      description: "The one-line version shown in the Contact panel.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "identity",
      description: "Shown on the right of the Contact view, e.g. London",
    }),
    defineField({
      name: "metaDescription",
      title: "Search description",
      type: "text",
      rows: 2,
      group: "identity",
      description: "Used by search engines and link previews.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      group: "contact",
      description: "Including the @",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "publications",
      title: "Selected publications",
      type: "array",
      of: [{ type: "string" }],
      group: "credits",
      options: { layout: "tags" },
    }),
    defineField({
      name: "talent",
      title: "Selected talent",
      type: "array",
      of: [{ type: "string" }],
      group: "credits",
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
