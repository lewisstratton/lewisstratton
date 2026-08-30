"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SanityImage from "@/components/SanityImage";
import ProjectOverlay from "@/components/ProjectOverlay";
import { hasIntroPlayed } from "@/lib/intro";
import { ENTRANCE, ENTRANCE_DELAY } from "@/lib/motion";
import type { Project } from "@/lib/sanity/types";

gsap.registerPlugin(ScrollTrigger);

export default function HomeView({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      const introDelay = hasIntroPlayed() ? ENTRANCE_DELAY : 3.0;

      items.forEach((item, index) => {
        const image = item.querySelector<HTMLElement>(".project-image");
        const caption = item.querySelector<HTMLElement>(".project-caption");
        const targets = [image, caption].filter(Boolean);

        if (index === 0) {
          gsap.from(targets, { ...ENTRANCE, delay: introDelay });
        } else {
          gsap.from(targets, {
            ...ENTRANCE,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    },
    { scope: containerRef, dependencies: [projects.length] }
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full relative selection:bg-foreground selection:text-background"
    >
      <div className="w-full min-h-screen px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-4">

        <div className="hidden lg:block lg:col-span-1" />

        <div className="lg:col-span-2 flex flex-col items-center pb-6 lg:pb-[calc(50vh-6px)] z-10">
          <div className="w-full flex flex-col items-center gap-24 sm:gap-32 lg:gap-40">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                data-melt
                onClick={() => setActiveProject(project)}
                className={`project-item group cursor-pointer flex flex-col w-full max-w-md items-center ${index === 0 ? "min-h-[calc(100svh-4rem)] justify-end" : ""
                  }`}
              >
                <div className="project-image w-full overflow-hidden mb-3">
                  <SanityImage
                    image={project.cover}
                    alt={`${project.title} for ${project.publication}`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>

                <div className="project-caption w-full flex flex-row justify-between items-baseline font-mono text-[10px] lg:text-xs tracking-tight leading-none text-foreground">
                  <span className="font-bold shadow-[0_1px_0_0_transparent] group-hover:shadow-[0_1px_0_0_currentColor] transition-all duration-300">
                    {project.title}
                  </span>
                  <span className="opacity-40 italic text-right">
                    {project.publication} ({project.year})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1" />
      </div>

      <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
