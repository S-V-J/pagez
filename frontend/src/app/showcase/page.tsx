// FILE: frontend/src/app/showcase/page.tsx
//
// SYSTEMIC ROLE:
//   Route entrypoint for the Pagez design-system showcase.
//
//   This route is intentionally no-indexed during P01 because it is a
//   development and verification surface, not a public product page.

import type { Metadata } from "next";

import { ShowcasePage } from "@/components/showcase/showcase-page";

export const metadata: Metadata = {
  title: "Design System Showcase",
  description:
    "Visual verification surface for Pagez design tokens, UI components, dark mode, and tenant theme overrides.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShowcaseRoute() {
  return <ShowcasePage />;
}
