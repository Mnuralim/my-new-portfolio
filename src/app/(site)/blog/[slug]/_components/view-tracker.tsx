"use client";

import { useEffect } from "react";
import { recordView } from "@/actions/engagement";

// renders nothing; counting happens in a server action so cached/prefetched renders never inflate views
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    recordView(slug).catch(() => {});
  }, [slug]);
  return null;
}
