// FILE: frontend/src/app/layout.tsx
//
// SYSTEMIC ROLE:
//   Root layout for the Pagez frontend.
//
//   Responsibilities:
//   - Load global CSS token layers.
//   - Load Geist Sans and Geist Mono through next/font.
//   - Provide baseline Pagez metadata.
//   - Provide viewport configuration.
//   - Inject a no-flash theme initialization script.
//   - Apply semantic body classes backed by design tokens.
//
//   This layout must not implement tenant routing, authentication, PWA service
//   worker registration, booking, payments, ads, or analytics. Those belong to
//   later phases.

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { THEME_INIT_SCRIPT } from "@/design-system/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pagez",
    template: "%s | Pagez",
  },
  description:
    "Multi-tenant influencer portfolio, booking, link hub, services, and analytics platform.",
  applicationName: "Pagez",
  authors: [
    {
      name: "Siddhant Kumar (@S-V-J)",
      url: "https://github.com/S-V-J",
    },
  ],
  keywords: [
    "Pagez",
    "influencer",
    "portfolio",
    "booking",
    "link in bio",
    "services",
    "analytics",
    "PWA",
  ],
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0a0a0a",
    },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="pagez-theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
