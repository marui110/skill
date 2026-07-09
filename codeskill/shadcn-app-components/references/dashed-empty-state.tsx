"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function DashedEmptyState({
  description,
  title,
  icon: Icon,
  action,
  className,
  animated = false,
  variant = "dashed",
}: {
  description: ReactNode;
  title?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
  animated?: boolean;
  variant?: "dashed" | "featured";
}) {
  const reduce = useReducedMotion();
  const shell = cn(
    "flex flex-col items-center justify-center gap-4 text-center",
    variant === "dashed" && "rounded-lg bg-[var(--surface-2)]/50 py-16",
    variant === "featured" && "min-h-[min(520px,calc(100dvh-12rem))] gap-6 px-6 py-10",
    className,
  );

  const body = (
    <>
      {Icon ? <Icon className="size-8 text-muted-foreground" /> : null}
      {title ? <h2 className="ui-text-section">{title}</h2> : null}
      <p className="text-sm leading-[22px] text-muted-foreground">{description}</p>
      {action}
    </>
  );

  if (animated && !reduce) {
    return (
      <motion.div
        className={shell}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {body}
      </motion.div>
    );
  }
  return <div className={shell}>{body}</div>;
}
