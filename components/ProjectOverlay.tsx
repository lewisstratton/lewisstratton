"use client";

import Image from "next/image";
import Overlay from "./Overlay";
import { Project } from "@/data/projects";

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
        {project?.images.map((src, index) => (
          <div key={src} className="w-full max-w-xl overflow-hidden">
            <Image
              src={src}
              alt={`${project.title} for ${project.publication}, image ${index + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="w-full h-auto"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </Overlay>
  );
}
