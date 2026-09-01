"use client";

import { useRef } from "react";
import Overlay from "./Overlay";
import SanityImage from "./SanityImage";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Project } from "@/lib/sanity/types";

function Gallery({ project }: { project: Project }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    function handleWheel(event: WheelEvent) {
      if (!element || element.scrollWidth <= element.clientWidth) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      element.scrollLeft += event.deltaY;
    }

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  });

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto overscroll-contain"
      data-lenis-prevent
    >
      <div className="flex flex-col items-center gap-6 px-6 pb-24 lg:flex-row lg:h-full lg:w-max lg:gap-10 lg:px-12 lg:pb-10">
        {project.images.map((image, index) => (
          <SanityImage
            key={image.url}
            image={image}
            alt={`${project.title} for ${project.publication}, image ${index + 1}`}
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority={index < 2}
            className="w-full max-w-xl h-auto lg:h-full lg:w-auto lg:max-w-none object-contain"
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
      {project && <Gallery project={project} />}
    </Overlay>
  );
}
