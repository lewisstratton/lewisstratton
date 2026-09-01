"use client";

import { useRef } from "react";
import Overlay from "./Overlay";
import SanityImage from "./SanityImage";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Project } from "@/lib/sanity/types";

function HorizontalGallery({ project }: { project: Project }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    function handleWheel(event: WheelEvent) {
      if (!element || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    }

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  });

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-x-auto overflow-y-hidden overscroll-contain"
      data-lenis-prevent
    >
      <div className="h-full w-max flex items-center gap-6 lg:gap-10 px-6 lg:px-12 pb-6 lg:pb-10">
        {project.images.map((image, index) => (
          <SanityImage
            key={image.url}
            image={image}
            alt={`${project.title} for ${project.publication}, image ${index + 1}`}
            sizes="(max-width: 1024px) 80vw, 45vw"
            priority={index < 2}
            className="h-full w-auto max-w-none object-contain"
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Overlay
      open={Boolean(project)}
      title={project?.title ?? ""}
      meta={project ? `${project.publication} (${project.year})` : ""}
      onClose={onClose}
    >
      {project && <HorizontalGallery project={project} />}
    </Overlay>
  );
}
