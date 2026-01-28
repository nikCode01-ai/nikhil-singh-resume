"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, ButtonLink } from "@/components/Button";
import { cn } from "@/lib/utils";
import { person } from "@/lib/resume-data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/price", label: "Price" },
  { href: "/tools", label: "Tools" },
  { href: "/projects", label: "Projects" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blogs", label: "Blogs" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faqs", label: "FAQs" },
];

export function HomeHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const initials = useMemo(() => {
    return person.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("");
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <div className="rounded-full bg-brand-green px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow font-bold text-brand-green">
                {initials}
              </div>
              <div className="text-base font-semibold tracking-tight text-white">
                {person.name.split(" ")[0]}
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "transition-colors hover:text-brand-yellow",
                      active && "text-brand-yellow",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href="/contact"
                variant="primary"
                size="sm"
                className="hidden md:inline-flex focus-visible:!ring-offset-brand-green"
              >
                Contact Me
              </ButtonLink>

              <Button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                variant="icon"
                className="h-10 w-10 rounded-full border-0 bg-white/10 text-white shadow-none hover:bg-white/15 hover:text-white focus-visible:!ring-offset-brand-green md:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <div className="absolute right-4 top-4 w-[92%] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="text-sm font-semibold text-slate-900">Menu</div>
              <Button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                variant="icon"
                className="h-9 w-9 rounded-full border-0 bg-slate-100 text-slate-700 shadow-none hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="px-2 py-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50",
                      active && "bg-slate-100",
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="text-slate-400" aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}

              <div className="mt-2 px-2 pb-2">
                <ButtonLink href="/contact" variant="primary" size="md" fullWidth>
                  Contact Me
                </ButtonLink>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
