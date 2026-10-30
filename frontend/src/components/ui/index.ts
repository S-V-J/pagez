// FILE: frontend/src/components/ui/index.ts
//
// SYSTEMIC ROLE:
//   Barrel export for the Pagez UI component kit.
//
//   This file provides a single stable import path for all P01.5 components:
//
//     import { Button, Card, Dialog, Table } from "@/components/ui";
//
//   Rules:
//   - Every public UI component must be exported here.
//   - Do not export internal-only helpers unless they are part of the contract.
//   - Keep exports alphabetized for deterministic review.
//   - Do not export backend packages.
//   - Do not export vendor SaaS SDKs.

export * from "./accordion";
export * from "./avatar";
export * from "./badge";
export * from "./button";
export * from "./calendar-grid";
export * from "./card";
export * from "./chart-container";
export * from "./checkbox";
export * from "./dialog";
export * from "./drawer";
export * from "./empty-state";
export * from "./file-uploader";
export * from "./input";
export * from "./label";
export * from "./pagination";
export * from "./popover";
export * from "./progress";
export * from "./radio-group";
export * from "./scroll-area";
export * from "./select";
export * from "./separator";
export * from "./skeleton";
export * from "./slider";
export * from "./switch";
export * from "./table";
export * from "./tabs";
export * from "./textarea";
export * from "./toast";
export * from "./toggle";
export * from "./toggle-group";
export * from "./tooltip";
