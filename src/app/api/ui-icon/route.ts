import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bookmark,
  Bot,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Code,
  Database,
  Download,
  ExternalLink,
  Facebook,
  Filter,
  Gitlab,
  Globe,
  IndianRupee,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Smartphone,
  Star,
  Sun,
  Target,
  Trophy,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const runtime = "nodejs";

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bookmark,
  Bot,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Code,
  Database,
  Download,
  ExternalLink,
  Facebook,
  Filter,
  Gitlab,
  Globe,
  IndianRupee,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Smartphone,
  Star,
  Sun,
  Target,
  Trophy,
  Twitter,
  Users,
  X,
  Youtube,
};

const colorTokenMap: Record<string, string> = {
  "brand-green": "#1f4d37",
  "brand-greenDark": "#173a2a",
  "brand-yellow": "#f4b400",
  "brand-cream": "#f7f5ef",
  "white": "#ffffff",
  "black": "#000000",
  "slate-900": "#0f172a",
  "slate-700": "#334155",
  "slate-600": "#475569",
  "amber-600": "#d97706",
  "amber-500": "#f59e0b",
  "amber-400": "#fbbf24",
  "red-600": "#dc2626",
};

function svgResponse(svg: string, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
  }
  headers.set("X-Content-Type-Options", "nosniff");

  return new Response(svg, {
    ...init,
    headers,
  });
}

function clampInt(value: number, min: number, max: number) {
  return Math.min(Math.max(Math.floor(value), min), max);
}

function parseColor(input: string | null | undefined) {
  const raw = (input || "").trim();
  if (!raw) return null;

  const token = colorTokenMap[raw];
  if (token) return token;

  if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([0-9a-fA-F]{2})?$/.test(raw)) {
    return raw;
  }

  return null;
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function attributesToString(attributes: Record<string, unknown>) {
  return Object.entries(attributes)
    .filter(([key, value]) => key !== "key" && value !== undefined && value !== null)
    .map(([key, value]) => ` ${key}="${escapeAttribute(String(value))}"`)
    .join("");
}

function renderIconSvg(
  Icon: LucideIcon,
  opts: { size: number; strokeWidth: number; color: string; fill: string },
) {
  const rendered = (Icon as unknown as { render?: (props: unknown, ref: unknown) => unknown }).render?.(
    {
      color: opts.color,
      size: opts.size,
      strokeWidth: opts.strokeWidth,
      fill: opts.fill,
    },
    null,
  ) as { props?: { iconNode?: Array<[string, Record<string, unknown>]> } };

  const iconNode = rendered?.props?.iconNode;
  if (!iconNode) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  }

  const inner = iconNode
    .map(([tag, attrs]) => `<${tag}${attributesToString(attrs)}></${tag}>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 24 24" fill="${escapeAttribute(opts.fill)}" stroke="${escapeAttribute(opts.color)}" stroke-width="${opts.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = (url.searchParams.get("name") || "").trim();

  if (!name) {
    return svgResponse(
      renderIconSvg(X, { size: 24, strokeWidth: 2, color: "#dc2626", fill: "none" }),
      { status: 400 },
    );
  }

  const Icon = iconMap[name];
  if (!Icon) {
    return svgResponse(
      renderIconSvg(X, { size: 24, strokeWidth: 2, color: "#dc2626", fill: "none" }),
      { status: 404 },
    );
  }

  const sizeRaw = Number(url.searchParams.get("size") || "24");
  const strokeRaw = Number(url.searchParams.get("strokeWidth") || "2");

  const size = clampInt(Number.isFinite(sizeRaw) ? sizeRaw : 24, 8, 256);
  const strokeWidth = clampInt(Number.isFinite(strokeRaw) ? strokeRaw : 2, 1, 4);

  const color = parseColor(url.searchParams.get("color")) ?? "#1f4d37";
  const fill = parseColor(url.searchParams.get("fill")) ?? "none";

  const svg = renderIconSvg(Icon, { size, strokeWidth, color, fill });

  return svgResponse(svg);
}
