import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  meta,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="ui-text-section">{title}</h2>
      {description ? <p className="ui-text-secondary">{description}</p> : null}
      {meta}
    </div>
  );
}
