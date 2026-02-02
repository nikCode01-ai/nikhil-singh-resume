import type { Metadata } from "next";

import { Blogs } from "@/components/Blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Technical insights, case studies, and best practices from recent projects.",
};

export default function BlogsPage() {
  return <Blogs />;
}