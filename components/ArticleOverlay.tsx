"use client";

import Image from "next/image";
import Overlay from "./Overlay";
import { Article } from "@/data/articles";

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
          <div className="flex flex-col gap-2">
            <span className="font-bold tracking-tighter text-foreground">
              {article?.standfirst}
            </span>
            <span className="opacity-40 tracking-tighter text-[10px]">{article?.date}</span>
          </div>

          {article?.body.map((block, index) =>
            block.type === "image" ? (
              <figure key={block.src} className="flex flex-col gap-2 -mx-6 lg:mx-0">
                <Image
                  src={block.src}
                  alt={block.credit}
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-auto"
                  priority={index === 0}
                />
                <figcaption className="px-6 lg:px-0 opacity-40 tracking-tighter text-[10px]">
                  {block.credit}
                </figcaption>
              </figure>
            ) : block.type === "quote" ? (
              <p key={index} className="text-foreground py-2">
                {block.text}
              </p>
            ) : (
              <p key={index}>{block.text}</p>
            )
          )}

          <p className="opacity-40 tracking-tighter text-[10px]">{article?.byline}</p>
        </div>
      </div>
    </Overlay>
  );
}
