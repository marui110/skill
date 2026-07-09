import type { Transition, Variants } from "framer-motion";

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  stagger: 0.05,
  count: 1.2,
} as const;

export const ease = {
  out: [0.0, 0.0, 0.2, 1.0] as const,
  in: [0.4, 0.0, 1.0, 1.0] as const,
  inOut: [0.4, 0.0, 0.2, 1.0] as const,
  spring: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  countSpring: { type: "spring", stiffness: 50, damping: 20 } as Transition,
} as const;

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal } },
    exit: { opacity: 0, transition: { duration: duration.fast } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: duration.stagger, delayChildren: 0.1 } },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.out } },
  },
} as const satisfies Record<string, Variants>;

export const cardHoverClass =
  "transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm";

export const inputFocusGlowClass =
  "transition-[border-color,box-shadow] duration-200 focus-visible:border-accent/50 focus-visible:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.15)]";

export const MAX_STAGGER_ITEMS = 20;

export function getStaggerDelay(index: number): number {
  return Math.min(index, MAX_STAGGER_ITEMS - 1) * duration.stagger * 1000;
}
