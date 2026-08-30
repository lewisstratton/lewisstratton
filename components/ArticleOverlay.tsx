"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Overlay from "./Overlay";
import SanityImage from "./SanityImage";
import type { Article, ArticleImageBlock } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <p className="text-foreground py-2">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-50 transition-opacity duration-300"
      >
        {children}
      </a>
    ),
  },
  types: {
    articleImage: ({ value }: { value: ArticleImageBlock }) => (
      <figure className="flex flex-col gap-2 -mx-6 lg:mx-0">
        <SanityImage
          image={value.image}
          alt={value.credit ?? ""}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        {value.credit && (
          <figcaption className="px-6 lg:px-0 opacity-40 tracking-tighter text-[10px]">
            {value.credit}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default function ArticleOverlay({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) {
  return (
    <Overlay
      open={Boolean(article)}
      title={article?.title ?? ""}
      meta={article ? `${article.publication} (${article.year})` : ""}
      onClose={onClose}
    >
      <div className="px-6 lg:px-0 pb-24 lg:pb-32">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-8 font-mono text-xs leading-relaxed tracking-tight text-foreground/80">
          {article && (
            <>
              <div className="flex flex-col gap-2">
                {article.standfirst && (
                  <span className="font-bold tracking-tighter text-foreground">
                    {article.standfirst}
                  </span>
                )}
                <span className="opacity-40 tracking-tighter text-[10px]">
                  {article.formattedDate}
                </span>
              </div>

              <PortableText value={article.body} components={components} />

              {article.byline && (
                <p className="opacity-40 tracking-tighter text-[10px]">{article.byline}</p>
              )}
            </>
          )}
        </div>
      </div>
    </Overlay>
  );
}
