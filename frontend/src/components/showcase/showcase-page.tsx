'use client';

// FILE: frontend/src/components/showcase/showcase-page.tsx
//
// SYSTEMIC ROLE:
//   Main client component for the Pagez design-system showcase route.
//
//   Responsibilities:
//   - Render every major P01.5 component family.
//   - Provide interactive state for overlays, forms, navigation, data display,
//     calendar, pagination, toast, drawer, dialog, popover, and tenant preview.
//   - Serve as the human-inspection surface for P01.6.
//
//   NON-GOALS:
//   - This is not a production feature page.
//   - It does not implement tenant routing, authentication, booking persistence,
//     analytics ingestion, payments, ads, or PWA service worker behavior.

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  addMonths,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  CalendarGrid,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSide,
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  FileUploader,
  Input,
  Label,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToastProvider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@/components/ui";

import { ShowcaseSection } from "./showcase-section";
import { ShowcaseThemeToggle } from "./showcase-theme-toggle";
import { ShowcaseTenantPreview } from "./showcase-tenant-preview";

const SHOWCASE_CALENDAR_MONTH = new Date(2026, 9, 1);
const SHOWCASE_CALENDAR_VALUE = new Date(2026, 9, 15);
const SHOWCASE_CALENDAR_TODAY = new Date(2026, 9, 30);

const colorTokens = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "popover", className: "bg-popover" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "info", className: "bg-info" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
  { name: "chart-1", className: "bg-chart-1" },
  { name: "chart-2", className: "bg-chart-2" },
  { name: "chart-3", className: "bg-chart-3" },
  { name: "chart-4", className: "bg-chart-4" },
  { name: "chart-5", className: "bg-chart-5" },
] as const;

const chartBars = [
  { label: "Mon", value: 35 },
  { label: "Tue", value: 55 },
  { label: "Wed", value: 40 },
  { label: "Thu", value: 70 },
  { label: "Fri", value: 50 },
  { label: "Sat", value: 80 },
  { label: "Sun", value: 65 },
] as const;

const bookingRows = [
  {
    id: "bk_1042",
    service: "Brand consultation",
    date: "2026-10-15",
    status: "Confirmed",
    amount: "$180",
  },
  {
    id: "bk_1043",
    service: "Photoshoot",
    date: "2026-10-18",
    status: "Pending",
    amount: "$320",
  },
  {
    id: "bk_1044",
    service: "Podcast appearance",
    date: "2026-10-22",
    status: "Cancelled",
    amount: "$240",
  },
  {
    id: "bk_1045",
    service: "Workshop",
    date: "2026-10-28",
    status: "Confirmed",
    amount: "$540",
  },
] as const;

export function ShowcasePage() {
  return (
    <ToastProvider>
      <TooltipProvider>
        <ShowcaseContent />
      </TooltipProvider>
    </ToastProvider>
  );
}

function ShowcaseContent() {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerSide, setDrawerSide] = React.useState<DrawerSide>("bottom");
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(true);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState<number[]>([35]);
  const [selectValue, setSelectValue] = React.useState("design");
  const [radioValue, setRadioValue] = React.useState("pro");

  const [togglePressed, setTogglePressed] = React.useState(false);
  const [toggleGroupValue, setToggleGroupValue] = React.useState("list");
  const [tabValue, setTabValue] = React.useState("overview");
  const [accordionValue, setAccordionValue] = React.useState("item-1");

  const [page, setPage] = React.useState(1);
  const [files, setFiles] = React.useState<File[]>([]);

  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    () => SHOWCASE_CALENDAR_MONTH,
  );
  const [calendarValue, setCalendarValue] = React.useState<Date | null>(
    () => SHOWCASE_CALENDAR_VALUE,
  );

  const totalPages = 12;

  const disabledDate = React.useCallback((date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  }, []);

  const progressValue = Math.min(
    Math.max(sliderValue[0] ?? 0, 0),
    100,
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header
        id="showcase-top"
        className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">P01.6</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Design system showcase
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Visual verification surface for Pagez tokens, components, dark mode,
            and tenant theme overrides.
          </p>
        </div>

        <ShowcaseThemeToggle />
      </header>

      <ShowcaseSection
        id="showcase-tokens"
        title="Semantic color tokens"
        description="These swatches consume Pagez semantic tokens through Tailwind v4 theme mapping."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="flex flex-col gap-2 rounded-md border border-border bg-card p-3 text-xs text-card-foreground"
            >
              <div
                className={cn(
                  "h-12 rounded-sm border border-border",
                  token.className,
                )}
              />
              <span className="font-medium">{token.name}</span>
              <span className="font-mono text-muted-foreground">
                --pagez-{token.name}
              </span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Typography"
        description="Typography uses font tokens mapped from next/font and tenant font overrides."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <p className="font-display text-3xl text-foreground">
              Display heading
            </p>
            <p className="text-xs text-muted-foreground">font-display</p>
          </div>

          <div className="grid gap-2">
            <p className="font-sans text-3xl text-foreground">Sans heading</p>
            <p className="text-xs text-muted-foreground">font-sans</p>
          </div>

          <div className="grid gap-2">
            <p className="text-base text-foreground">
              Body copy is optimized for portfolio pages, dashboards, booking
              summaries, and analytics tables.
            </p>
            <p className="text-xs text-muted-foreground">body text</p>
          </div>

          <div className="grid gap-2">
            <p className="font-mono text-sm text-foreground">
              const pagez = &quot;design-system&quot;;
            </p>
            <p className="text-xs text-muted-foreground">font-mono</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        id="showcase-buttons"
        title="Buttons"
        description="Button variants and sizes consume semantic action tokens."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button">Default</Button>
          <Button type="button" variant="secondary">
            Secondary
          </Button>
          <Button type="button" variant="destructive">
            Destructive
          </Button>
          <Button type="button" variant="outline">
            Outline
          </Button>
          <Button type="button" variant="ghost">
            Ghost
          </Button>
          <Button type="button" variant="link">
            Link
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" size="sm">
            Small
          </Button>
          <Button type="button" size="default">
            Default
          </Button>
          <Button type="button" size="lg">
            Large
          </Button>
          <Button type="button" size="icon" aria-label="Settings">
            ⚙
          </Button>
          <Button type="button" disabled>
            Disabled
          </Button>
          <Button asChild>
            <a href="#showcase-top">Anchor button</a>
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Form controls"
        description="Inputs, selects, checkboxes, radios, switches, sliders, and file uploads."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="showcase-input-default">Default input</Label>
              <Input id="showcase-input-default" placeholder="Portfolio title" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-input-sm">Small input</Label>
              <Input
                id="showcase-input-sm"
                size="sm"
                placeholder="Slug"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-input-lg">Large input</Label>
              <Input
                id="showcase-input-lg"
                size="lg"
                placeholder="Search services"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-textarea">Textarea</Label>
              <Textarea
                id="showcase-textarea"
                placeholder="Write a short bio"
                defaultValue="Creator, speaker, and builder."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-select">Select</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger id="showcase-select">
                  <SelectValue placeholder="Choose a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design system</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="showcase-checkbox"
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
              />
              <Label htmlFor="showcase-checkbox">
                Accept booking terms
              </Label>
            </div>

            <div className="grid gap-2">
              <Label>Tier</Label>
              <RadioGroup
                value={radioValue}
                onValueChange={setRadioValue}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="showcase-radio-free" value="free" />
                  <Label htmlFor="showcase-radio-free">Free</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem id="showcase-radio-pro" value="pro" />
                  <Label htmlFor="showcase-radio-pro">Pro</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id="showcase-radio-enterprise"
                    value="enterprise"
                  />
                  <Label htmlFor="showcase-radio-enterprise">
                    Enterprise
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="showcase-switch"
                checked={switchOn}
                onCheckedChange={setSwitchOn}
              />
              <Label htmlFor="showcase-switch">Enable notifications</Label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-slider">Budget slider</Label>
              <Slider
                id="showcase-slider"
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                aria-label="Budget percentage"
              />
              <p className="text-xs text-muted-foreground">
                Value: {progressValue}%
              </p>
            </div>

            <FileUploader
              description="PNG, JPG, or WEBP. Maximum 3 files, 5 MB each."
              accept="image/png,image/jpeg,image/webp"
              maxFiles={3}
              maxSizeBytes={5 * 1024 * 1024}
              onFilesChange={setFiles}
            />

            <p className="text-xs text-muted-foreground">
              Selected files: {files.length}
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Feedback and status"
        description="Badges, progress, skeletons, empty states, and toast notifications."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="showcase-progress">Upload progress</Label>
              <Progress id="showcase-progress" value={progressValue} />
              <p className="text-xs text-muted-foreground">
                {progressValue}% complete
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <EmptyState>
              <EmptyStateIcon>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </EmptyStateIcon>
              <EmptyStateTitle>No bookings yet</EmptyStateTitle>
              <EmptyStateDescription>
                Create a booking link to start receiving requests.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button type="button" size="sm">
                  Create booking link
                </Button>
              </EmptyStateAction>
            </EmptyState>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Booking confirmed",
                description: "Your slot is reserved.",
                variant: "success",
                action: {
                  altText: "Undo booking confirmation",
                  label: "Undo",
                  onClick: () => {
                    toast({
                      title: "Undo requested",
                      description: "The booking cancellation is pending.",
                      variant: "info",
                    });
                  },
                },
              });
            }}
          >
            Success toast
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Campaign saved",
                description: "Ad draft stored locally.",
                variant: "info",
              });
            }}
          >
            Info toast
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              toast({
                title: "Payment failed",
                description: "Retry with another method.",
                variant: "destructive",
              });
            }}
          >
            Destructive toast
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Overlays"
        description="Dialog, drawer, popover, and tooltip behavior."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Open dialog
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm booking</DialogTitle>
                <DialogDescription>
                  This action reserves the selected slot and notifies the
                  tenant.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
                Service: Brand consultation
                <br />
                Date: 2026-10-15
                <br />
                Amount: $180
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setDialogOpen(false);
                    toast({
                      title: "Booking confirmed",
                      description: "Dialog action completed.",
                      variant: "success",
                    });
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Select
              value={drawerSide}
              onValueChange={(value) => setDrawerSide(value as DrawerSide)}
            >
              <SelectTrigger id="showcase-drawer-side" className="w-32">
                <SelectValue placeholder="Side" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button type="button" variant="outline">
                  Open drawer
                </Button>
              </DrawerTrigger>

              <DrawerContent side={drawerSide}>
                <DrawerHeader>
                  <DrawerTitle>Booking details</DrawerTitle>
                  <DrawerDescription>
                    Side-anchored overlay built on Radix Dialog.
                  </DrawerDescription>
                </DrawerHeader>

                <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
                  Drawer side: {drawerSide}
                </div>

                <DrawerFooter>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      toast({
                        title: "Drawer action",
                        description: "Drawer closed by action button.",
                        variant: "info",
                      });
                    }}
                  >
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline">
                Open popover
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-64">
              <div className="grid gap-3">
                <p className="text-sm font-medium">Filters</p>
                <p className="text-xs text-muted-foreground">
                  Popovers are useful for compact controls anchored to a
                  trigger.
                </p>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setPopoverOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Tooltip example"
              >
                i
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Tooltips provide supplementary context.
            </TooltipContent>
          </Tooltip>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Navigation and disclosure"
        description="Tabs, accordion, pagination, toggle, and toggle group."
      >
        <div className="grid gap-6">
          <Tabs
            value={tabValue}
            onValueChange={setTabValue}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-3 text-sm">
              Overview tab content.
            </TabsContent>

            <TabsContent value="analytics" className="pt-3 text-sm">
              Analytics tab content.
            </TabsContent>

            <TabsContent value="settings" className="pt-3 text-sm">
              Settings tab content.
            </TabsContent>
          </Tabs>

          <Accordion
            type="single"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. Radix handles keyboard interaction and ARIA state.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Does it support tenant themes?</AccordionTrigger>
              <AccordionContent>
                Yes. Tokens resolve tenant variables from ancestor scopes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is dark mode automatic?</AccordionTrigger>
              <AccordionContent>
                Yes. Dark mode overrides are defined in theme-dark.css.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-wrap items-center gap-3">
            <Toggle
              pressed={togglePressed}
              onPressedChange={setTogglePressed}
              aria-label="Toggle bold"
              variant="outline"
            >
              B
            </Toggle>

            <ToggleGroup
              type="single"
              value={toggleGroupValue}
              onValueChange={(value) => {
                if (value) {
                  setToggleGroupValue(value);
                }
              }}
              aria-label="View mode"
              variant="outline"
            >
              <ToggleGroupItem value="list">List</ToggleGroupItem>
              <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
              <ToggleGroupItem value="table">Table</ToggleGroupItem>
            </ToggleGroup>

            <Badge variant="secondary">
              Toggle: {togglePressed ? "on" : "off"}
            </Badge>

            <Badge variant="outline">
              Group: {toggleGroupValue}
            </Badge>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <p className="text-xs text-muted-foreground">
            Current page: {page} of {totalPages}
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Data display"
        description="Cards, tables, charts, calendar, avatar, separator, and scroll area."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio conversion</CardTitle>
              <CardDescription>
                Bookings from link hub this week.
              </CardDescription>
              <CardAction>
                <Badge variant="success">+12%</Badge>
              </CardAction>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              42 bookings, 1,840 link clicks, 7.2% conversion rate.
            </CardContent>

            <CardFooter>
              <Button type="button" variant="outline" size="sm">
                View report
              </Button>
            </CardFooter>
          </Card>

          <ChartContainer ariaLabel="Weekly bookings chart" className="h-56">
            <div className="flex h-full items-end gap-2">
              {chartBars.map((bar) => (
                <div
                  key={`chart-${bar.label}`}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t bg-chart-1"
                    style={{ height: `${bar.value}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <ChartLegend>
              <ChartLegendItem
                label="Bookings"
                colorVar="var(--pagez-chart-1)"
              />
              <ChartLegendItem
                label="Views"
                colorVar="var(--pagez-chart-2)"
              />
            </ChartLegend>
          </ChartContainer>

          <div className="grid gap-3">
            <Label>Bookings table</Label>
            <ScrollArea className="h-64 w-full rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {bookingRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.service}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.status === "Confirmed"
                              ? "success"
                              : row.status === "Pending"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {row.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          <div className="grid gap-3">
            <Label>Calendar grid</Label>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Previous month"
                onClick={() => setCalendarMonth((month) => addMonths(month, -1))}
              >
                Prev
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Next month"
                onClick={() => setCalendarMonth((month) => addMonths(month, 1))}
              >
                Next
              </Button>
            </div>

            <CalendarGrid
              month={calendarMonth}
              today={SHOWCASE_CALENDAR_TODAY}
              value={calendarValue}
              onSelect={setCalendarValue}
              disabledDate={disabledDate}
              weekStartsOn={0}
              locale="en-US"
            />

            <p className="text-xs text-muted-foreground">
              Selected date:{" "}
              {calendarValue
                ? calendarValue.toISOString().slice(0, 10)
                : "none"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/favicon.ico" alt="Pagez maintainer avatar" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>

            <div className="grid">
              <p className="text-sm font-medium text-foreground">
                Siddhant Kumar
              </p>
              <p className="text-xs text-muted-foreground">@S-V-J</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <Separator orientation="vertical" className="h-10" />
            <Badge variant="outline">Separator</Badge>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tenant theme preview"
        description="This section demonstrates --tenant-* override propagation."
      >
        <ShowcaseTenantPreview />
      </ShowcaseSection>

      <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
        Pagez design-system showcase. P01.6 verification surface.
      </footer>
    </main>
  );
}
