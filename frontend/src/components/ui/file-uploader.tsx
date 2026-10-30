'use client';

// FILE: frontend/src/components/ui/file-uploader.tsx
//
// SYSTEMIC ROLE:
//   Baseline file upload control for Pagez.
//
//   Used by:
//   - Portfolio media uploads (P06)
//   - Service catalog images (P08)
//   - Avatar uploads (P02, P04)
//   - CSV/import surfaces in superadmin (P16)
//   - Invoice/receipt uploads (P10, P11)
//
//   ACCESSIBILITY CONTRACT:
//   - Uses native input[type="file"] as the accessible source of truth.
//   - Visible label is associated through htmlFor.
//   - Drag-and-drop zone is supplementary; keyboard users can use Browse files.
//   - Errors are announced with role="alert".
//   - Disabled state blocks interaction and reduces opacity.
//
//   DESIGN TOKEN CONTRACT:
//   - Border uses --pagez-border / --pagez-input.
//   - Background uses --pagez-background.
//   - Drag-active state uses --pagez-ring and --pagez-accent.
//   - Error text uses --pagez-destructive.
//   - Supports dark mode and tenant overrides automatically.
//
//   TYPE CONFLICT RESOLUTION:
//   The native div element has React DOM onError and onChange event props.
//   This component exposes domain-specific onFilesChange and onError(message)
//   callbacks, so the base div props omit onChange, onError, and children.

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

interface FileUploaderProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "onError" | "children"
  > {
  id?: string;
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeBytes?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  onError?: (message: string) => void;
}

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function FileUploader({
  className,
  id,
  label = "Drop files here or click to browse",
  description,
  accept,
  multiple = false,
  maxFiles,
  maxSizeBytes,
  disabled = false,
  onFilesChange,
  onError,
  ...props
}: FileUploaderProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragCounterRef = React.useRef(0);

  const onFilesChangeRef = React.useRef(onFilesChange);
  const onErrorRef = React.useRef(onError);

  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    onFilesChangeRef.current = onFilesChange;
    onErrorRef.current = onError;
  }, [onFilesChange, onError]);

  const reportError = React.useCallback((message: string) => {
    setErrorMessage(message);
    onErrorRef.current?.(message);
  }, []);

  const processFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) {
        return;
      }

      const incomingAll = Array.from(fileList);
      const incomingInitial = multiple
        ? incomingAll
        : incomingAll.slice(0, 1);

      let incoming = incomingInitial;

      if (maxSizeBytes) {
        const oversized = incoming.filter((file) => file.size > maxSizeBytes);

        if (oversized.length > 0) {
          reportError(
            `${oversized.length} file(s) exceed the maximum size of ${formatFileSize(maxSizeBytes)}.`,
          );
          incoming = incoming.filter((file) => file.size <= maxSizeBytes);
        }
      }

      if (incoming.length === 0) {
        return;
      }

      const base = multiple ? selectedFiles : [];
      let merged = [...base, ...incoming];

      if (maxFiles && merged.length > maxFiles) {
        reportError(`Only ${maxFiles} file(s) can be uploaded.`);
        merged = merged.slice(0, maxFiles);
      }

      setSelectedFiles(merged);
      setErrorMessage(null);
      onFilesChangeRef.current?.(merged);
    },
    [
      maxFiles,
      maxSizeBytes,
      multiple,
      reportError,
      selectedFiles,
    ],
  );

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    dragCounterRef.current += 1;
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    dragCounterRef.current = Math.max(0, dragCounterRef.current - 1);

    if (dragCounterRef.current === 0) {
      setDragActive(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    dragCounterRef.current = 0;
    setDragActive(false);

    if (disabled) {
      return;
    }

    processFiles(event.dataTransfer.files);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files);
    event.target.value = "";
  };

  return (
    <div
      data-slot="file-uploader"
      className={cn(
        "relative flex w-full flex-col gap-3 rounded-lg border border-dashed border-input bg-background p-6 text-center shadow-[var(--pagez-shadow-2xs)] transition-[color,background-color,border-color,box-shadow] duration-[var(--pagez-duration-fast)] ease-[var(--pagez-ease-out)]",
        dragActive && "border-ring bg-accent/50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
      />

      <div className="flex flex-col items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8 text-muted-foreground"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <div className="grid gap-1">
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none"
          >
            {label}
          </label>

          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Browse files
        </Button>
      </div>

      {errorMessage ? (
        <p role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      ) : null}

      {selectedFiles.length > 0 ? (
        <ul className="grid w-full gap-2 text-left text-xs">
          {selectedFiles.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-3 py-2"
            >
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { FileUploader, formatFileSize };
export type { FileUploaderProps };
