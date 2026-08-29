"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { EASE_OUT } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: EASE_OUT,
      });
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
