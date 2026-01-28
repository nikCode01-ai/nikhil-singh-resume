"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/Button";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-24 sm:right-6">
      <Button
        type="button"
        variant="icon"
        className="h-11 w-11 rounded-full border-0 bg-white shadow-lg hover:bg-brand-cream dark:bg-slate-900 dark:hover:bg-slate-800"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}
