# Page + Workspace 模式

## Server Page

```tsx
// app/(app)/feature/page.tsx
import { requireAuthContext } from "@/lib/security/auth";
import { getFeatureData } from "@/lib/db/queries/feature";
import { FeatureWorkspace } from "@/components/feature/feature-workspace";

export const dynamic = "force-dynamic";

export default async function FeaturePage() {
  const { user } = await requireAuthContext();
  const data = await getFeatureData(user.id);
  return <FeatureWorkspace initialData={data} />;
}
```

## Client Workspace

```tsx
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { AppPageHeader } from "@/components/shared/app-page-header";
import { doAction } from "@/app/(app)/feature/actions";

export function FeatureWorkspace({ initialData }: { initialData: Data }) {
  const [pending, start] = useTransition();

  function handleAction() {
    start(async () => {
      const result = await doAction(payload);
      if (result.error) toast.error(result.error);
      else toast.success("Saved");
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <AppPageHeader title="Feature">{/* actions */}</AppPageHeader>
      {/* domain UI */}
    </div>
  );
}
```

## Server Action

```tsx
"use server";

import { getAuthenticatedUser } from "@/lib/security/auth";
import { InputSchema } from "@/lib/security/validation";
import { revalidatePath } from "next/cache";

export async function doAction(input: unknown) {
  const user = await getAuthenticatedUser();
  const data = InputSchema.parse(input);
  // ... db with user.id filter
  revalidatePath("/app/feature");
  return { ok: true };
}
```
