export const EASE = [0.76, 0, 0.24, 1] as const;

export const EASE_OUT = "power3.out";
export const EASE_IN = "power2.in";

export const ENTRANCE = {
  opacity: 0,
  y: 16,
  duration: 1.2,
  ease: EASE_OUT,
  stagger: 0.1,
} as const;

export const ENTRANCE_DELAY = 0.2;
