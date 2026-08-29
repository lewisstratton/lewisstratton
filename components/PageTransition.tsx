"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { EASE_IN } from "@/lib/motion";

const TransitionContext = createContext<{
  navigateTo: (href: string) => void;
}>({ navigateTo: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const navigateTo = useCallback(
    async (href: string) => {
      if (href === pathname || isAnimating.current) return;
      isAnimating.current = true;

      const melting = contentRef.current?.querySelectorAll("[data-melt]");

      if (melting?.length) {
        await gsap.to(melting, {
          opacity: 0,
          filter: "blur(12px)",
          y: -16,
          duration: 0.45,
          ease: EASE_IN,
          stagger: 0.035,
        });
      }

      router.push(href);
      window.scrollTo(0, 0);

      isAnimating.current = false;
    },
    [router, pathname]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <div ref={contentRef}>{children}</div>
    </TransitionContext.Provider>
  );
}
