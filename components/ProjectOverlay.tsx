"use client";

import Overlay from "./Overlay";
import SanityImage from "./SanityImage";
import type { Project } from "@/lib/sanity/types";

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
      <div className="flex flex-col items-center gap-6 lg:gap-10 px-6 lg:px-0 pb-24 lg:pb-32">
        {project?.images.map((image, index) => (
          <div key={image.url} className="w-full max-w-xl overflow-hidden">
            <SanityImage
              image={image}
              alt={`${project.title} for ${project.publication}, image ${index + 1}`}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </Overlay>
  );
}
