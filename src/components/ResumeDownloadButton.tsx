'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';

import { Button } from '@/components/Button';

type ResumeTemplateId = '1' | '2';
type ResumeFormat = 'pdf' | 'docx';

type Props = {
  variant?: 'hero' | 'about';
  label?: string;
};

function extractFilename(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;

  const match = /filename\*?=(?:UTF-8''|\")?([^\";]+)\"?/i.exec(
    contentDisposition
  );
  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function ResumeDownloadButton({ variant = 'hero', label }: Props) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState<{
    template: ResumeTemplateId;
    format: ResumeFormat;
  } | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ResumeTemplateId>('1');
  const [error, setError] = useState<string | null>(null);

  const templates = useMemo(
    () => [
      {
        id: '1' as const,
        name: 'Template 1',
        description: 'Classic ATS-friendly layout with full details',
      },
      {
        id: '2' as const,
        name: 'Template 2',
        description: 'Compact layout (projects + skills snapshot)',
      },
    ],
    []
  );

  const triggerVariant = variant === 'about' ? 'inverse' : 'secondary';

  const close = useCallback(() => {
    if (downloading) return;
    setOpen(false);
    setError(null);
  }, [downloading]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close, open]);

  const download = useCallback(
    async (template: ResumeTemplateId, format: ResumeFormat) => {
      setError(null);
      setDownloading({ template, format });

      try {
        const res = await fetch(
          `/api/resume?template=${template}&format=${format}&disposition=attachment`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Resume download failed');
        }

        const blob = await res.blob();
        const filename =
          extractFilename(res.headers.get('content-disposition')) ??
          `Resume-Template-${template}.${format}`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Resume download failed');
      } finally {
        setDownloading(null);
      }
    },
    []
  );

  const previewUrl = useMemo(
    () =>
      `/api/resume?template=${selectedTemplate}&format=pdf&disposition=inline`,
    [selectedTemplate]
  );

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setError(null);
          setSelectedTemplate('1');
          setOpen(true);
        }}
        variant={triggerVariant}
        size="md"
      >
        {label ?? 'Download Resume'}
        <Download className="h-4 w-4" aria-hidden="true" />
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Resume download"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Choose a Resume Template
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Select a template to preview, then download as PDF or DOCX.
                </p>
              </div>
              <Button
                type="button"
                onClick={close}
                variant="icon"
                className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {error ? (
              <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            ) : null}

            <div className="mt-5 grid gap-3">
              {templates.map((t) => {
                const isSelected = selectedTemplate === t.id;
                const isDisabled = downloading !== null;

                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                      isDisabled
                        ? 'cursor-not-allowed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                        : isSelected
                          ? 'border-brand-green/40 bg-brand-cream dark:bg-brand-green/10'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {t.name}
                        </div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {t.description}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-brand-green dark:text-brand-greenLight">
                        {isSelected ? 'Selected' : 'Preview'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Preview (PDF)
                </div>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-brand-green dark:text-brand-greenLight"
                >
                  Open in new tab
                </a>
              </div>
              <iframe
                title="Resume preview"
                src={previewUrl}
                className="h-[420px] w-full bg-white dark:bg-slate-900"
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                disabled={downloading !== null}
                onClick={() => download(selectedTemplate, 'pdf')}
                variant="primary"
                size="md"
                fullWidth
              >
                {downloading?.template === selectedTemplate &&
                downloading.format === 'pdf'
                  ? 'Downloading PDF...'
                  : 'Download PDF'}
              </Button>
              <Button
                type="button"
                disabled={downloading !== null}
                onClick={() => download(selectedTemplate, 'docx')}
                variant="secondary"
                size="md"
                fullWidth
              >
                {downloading?.template === selectedTemplate &&
                downloading.format === 'docx'
                  ? 'Downloading DOCX...'
                  : 'Download DOCX'}
              </Button>
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                type="button"
                onClick={close}
                disabled={downloading !== null}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
