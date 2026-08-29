"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink from "@/components/TransitionLink";
import { ENTRANCE, ENTRANCE_DELAY } from "@/lib/motion";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".nf-item", { ...ENTRANCE, delay: ENTRANCE_DELAY });
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

        <div className="lg:col-span-2 flex flex-col justify-center items-start z-10">
          <div className="w-full max-w-md flex flex-col gap-8">
            <span className="nf-item font-mono text-[10px] lg:text-xs tracking-tighter opacity-30">
              404
            </span>

            <p className="nf-item font-mono text-xs lg:text-sm leading-relaxed tracking-tight text-foreground/60">
              This page doesn&rsquo;t exist.
            </p>

            <TransitionLink
              href="/"
              className="nf-item self-start font-mono text-[10px] lg:text-xs tracking-tighter font-bold hover:opacity-50 transition-opacity duration-300"
            >
              ← Back to work
            </TransitionLink>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1" />
      </div>
    </main>
  );
}
