"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS, Project } from "@/data/projects";
import { hasIntroPlayed } from "@/lib/intro";
import { ENTRANCE, ENTRANCE_DELAY } from "@/lib/motion";
import ProjectOverlay from "@/components/ProjectOverlay";

gsap.registerPlugin(ScrollTrigger);

function VideoItem({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleLoadedData() {
    if (videoRef.current) videoRef.current.currentTime = 0.1;
  }

  function handleMouseEnter() {
    videoRef.current?.play();
  }

  function handleMouseLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0.1;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-auto cursor-pointer"
    />
  );
}

export default function Home() {
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
    { scope: containerRef }
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
            {PROJECTS.map((project, index) => (
              <div
                key={project.slug}
                data-melt
                onClick={() => setActiveProject(project)}
                className={`project-item group cursor-pointer flex flex-col w-full max-w-md items-center ${index === 0 ? "min-h-[calc(100svh-4rem)] justify-end" : ""
                  }`}
              >
                <div className="project-image w-full overflow-hidden mb-3">
                  {project.type === "video" ? (
                    <VideoItem src={project.cover} />
                  ) : (
                    <Image
                      src={project.cover}
                      alt={`${project.title} for ${project.publication}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-auto"
                      priority={index < 2}
                    />
                  )}
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
