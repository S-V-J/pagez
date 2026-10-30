'use client';

// FILE: frontend/src/components/showcase/showcase-tenant-preview.tsx
//
// SYSTEMIC ROLE:
//   Live tenant theme override preview for the Pagez design-system showcase.
//
//   Responsibilities:
//   - Collect controlled tenant theme values.
//   - Convert them to --tenant-* CSS variables using the validated helper.
//   - Apply those variables to a bounded preview scope.
//   - Demonstrate that components inside the scope inherit tenant branding
//     without component-level prop drilling.
//
//   SECURITY NOTE:
//   tenantThemeToCssVariables validates values before emitting CSS variables.
//   Invalid values are omitted rather than injected into the DOM.

import * as React from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  tenantThemeToCssVariables,
  type TenantTheme,
} from "@/design-system/tenant-theme";

const defaultTenantTheme: TenantTheme = {
  primary: "oklch(55% 0.2 264)",
  accent: "oklch(65% 0.18 320)",
  radius: "lg",
  fontSans: "Inter",
};

export function ShowcaseTenantPreview() {
  const [theme, setTheme] = React.useState<TenantTheme>(defaultTenantTheme);

  const primaryId = React.useId();
  const accentId = React.useId();
  const radiusId = React.useId();
  const fontId = React.useId();

  const style = React.useMemo(
    () => tenantThemeToCssVariables(theme) as React.CSSProperties,
    [theme],
  );

  const updateTheme = React.useCallback((patch: Partial<TenantTheme>) => {
    setTheme((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="grid flex-1 gap-4 rounded-lg border border-border bg-muted/30 p-4">
        <div className="grid gap-2">
          <Label htmlFor={primaryId}>Primary color</Label>
          <Input
            id={primaryId}
            value={theme.primary ?? ""}
            onChange={(event) => updateTheme({ primary: event.target.value })}
            placeholder="oklch(55% 0.2 264)"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={accentId}>Accent color</Label>
          <Input
            id={accentId}
            value={theme.accent ?? ""}
            onChange={(event) => updateTheme({ accent: event.target.value })}
            placeholder="oklch(65% 0.18 320)"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={radiusId}>Radius preset</Label>
          <Select
            value={theme.radius ?? "md"}
            onValueChange={(value) => updateTheme({ radius: value })}
          >
            <SelectTrigger id={radiusId}>
              <SelectValue placeholder="Select radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fontId}>Font stack</Label>
          <Input
            id={fontId}
            value={theme.fontSans ?? ""}
            onChange={(event) => updateTheme({ fontSans: event.target.value })}
            placeholder="Inter"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setTheme(defaultTenantTheme)}
        >
          Reset tenant theme
        </Button>
      </div>

      <div
        data-slot="tenant-preview-scope"
        className="tenant-theme-scope flex-1 rounded-lg border border-border p-4"
        style={style}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tenant portfolio preview</CardTitle>
            <CardDescription>
              Components inside this scope inherit tenant branding through
              --tenant-* CSS variables.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap items-center gap-3">
            <Button type="button">Book now</Button>
            <Button type="button" variant="secondary">
              View services
            </Button>
            <Badge variant="accent">Featured</Badge>
            <Badge variant="outline">Link hub</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
