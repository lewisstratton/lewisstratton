"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS, Project } from "@/data/projects";
import { ENTRANCE, ENTRANCE_DELAY } from "@/lib/motion";
import ProjectOverlay from "@/components/ProjectOverlay";

export default function ListPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      gsap.from(".list-row", { ...ENTRANCE, delay: ENTRANCE_DELAY });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full relative selection:bg-foreground selection:text-background"
    >
      <div className="w-full min-h-screen px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-4">
        <div className="hidden lg:block lg:col-span-1" />

        <div className="lg:col-span-2 flex flex-col items-center pt-24 pb-32 lg:pt-[calc(50vh-0.375rem)] lg:pb-[calc(50vh-6px)] z-10">
          <ul className="w-full max-w-md flex flex-col gap-7 font-mono text-[10px] lg:text-xs tracking-tighter leading-none text-foreground">
            {PROJECTS.map((project) => (
              <li key={project.slug} data-melt className="list-row">
                <button
                  onClick={() => setActiveProject(project)}
                  className="group w-full flex justify-between gap-6 items-baseline text-left cursor-pointer"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="font-bold shadow-[0_1px_0_0_transparent] group-hover:shadow-[0_1px_0_0_currentColor] transition-all duration-300 self-start">
                      {project.title}
                    </span>
                    <span className="opacity-40 italic">{project.publication}</span>
                  </span>
                  <span className="opacity-40 tabular-nums shrink-0">{project.year}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block lg:col-span-1" />
      </div>

      <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
