"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, X } from "lucide-react";

type ResumeTemplateId = "1" | "2";

type Props = {
  variant?: "hero" | "about";
  label?: string;
};

function extractFilename(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;

  const match = /filename\*?=(?:UTF-8''|\")?([^\";]+)\"?/i.exec(contentDisposition);
  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function ResumeDownloadButton({ variant = "hero", label }: Props) {
  const [open, setOpen] = useState(false);
  const [downloadingTemplate, setDownloadingTemplate] = useState<ResumeTemplateId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const templates = useMemo(
    () =>
      [
        {
          id: "1" as const,
          name: "Template 1",
          description: "Classic ATS-friendly layout with full details",
        },
        {
          id: "2" as const,
          name: "Template 2",
          description: "Compact layout (projects + skills snapshot)",
        },
      ],
    [],
  );

  const triggerClasses =
    variant === "about"
      ? "inline-flex items-center gap-3 rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      : "inline-flex items-center gap-3 rounded-full border border-brand-green/30 bg-white px-6 py-3 text-sm font-semibold text-brand-green shadow-sm transition-colors hover:bg-brand-cream";

  const bubbleClasses =
    variant === "about"
      ? "inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-green"
      : "inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-green";

  const close = useCallback(() => {
    if (downloadingTemplate) return;
    setOpen(false);
    setError(null);
  }, [downloadingTemplate]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  const download = useCallback(async (template: ResumeTemplateId) => {
    setError(null);
    setDownloadingTemplate(template);

    try {
      const res = await fetch(`/api/resume?template=${template}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Resume download failed");
      }

      const blob = await res.blob();
      const filename =
        extractFilename(res.headers.get("content-disposition")) ?? `Resume-Template-${template}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resume download failed");
    } finally {
      setDownloadingTemplate(null);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        className={triggerClasses}
      >
        {label ?? "Download Resume"}
        <span className={bubbleClasses}>
          <Download className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Choose a Resume Template</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Select a template and the PDF will download automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error ? <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

            <div className="mt-5 grid gap-3">
              {templates.map((t) => {
                const isBusy = downloadingTemplate === t.id;
                const isDisabled = downloadingTemplate !== null;

                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => download(t.id)}
                    className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                      isDisabled
                        ? "cursor-not-allowed border-slate-200 bg-slate-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                        <div className="mt-1 text-sm text-slate-600">{t.description}</div>
                      </div>
                      <div className="text-sm font-semibold text-brand-green">{isBusy ? "Downloading..." : "Download"}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={close}
                disabled={downloadingTemplate !== null}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
