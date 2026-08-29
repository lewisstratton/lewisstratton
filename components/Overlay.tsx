"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMountEffect } from "@/hooks/useMountEffect";
import { EASE } from "@/lib/motion";

function OverlayPanel({
  title,
  meta,
  onClose,
  children,
}: {
  title: string;
  meta: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useMountEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <div className="sticky top-0 z-10 flex justify-between items-baseline gap-6 px-6 lg:px-12 pt-[max(1.5rem,env(safe-area-inset-top))] lg:pt-10 pb-6 font-mono text-[10px] lg:text-xs tracking-tighter text-foreground">
        <span className="flex flex-col gap-1.5">
          <span className="font-bold">{title}</span>
          <span className="opacity-40 italic">{meta}</span>
        </span>

        <button
          onClick={onClose}
          className="font-bold hover:opacity-50 transition-opacity duration-300 shrink-0"
        >
          Close
        </button>
      </div>

      {children}
    </>
  );
}

export default function Overlay({
  open,
  title,
  meta,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  meta: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[60] bg-surface overflow-y-auto overscroll-contain"
          data-lenis-prevent
        >
          <OverlayPanel title={title} meta={meta} onClose={onClose}>
            {children}
          </OverlayPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
