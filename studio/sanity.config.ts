import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Lewis Stratton",
  projectId: "6w3l41di",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "article",
              title: "Articles",
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== "siteSettings"),
  },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "siteSettings"),
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter(({ action }) => action !== "unpublish" && action !== "delete")
        : prev,
  },
});
