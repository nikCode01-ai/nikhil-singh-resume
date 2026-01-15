import type { Metadata } from "next";

import { Blogs } from "@/components/Blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Highlights and learnings from recent builds by Nikhil Singh.",
};

export default function BlogsPage() {
  return <Blogs />;
}
