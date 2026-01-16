import type { Metadata } from "next";

import { Skills } from "@/components/Skills";

export const metadata: Metadata = {
  title: "Tools",
  description: "Favorite tools and skills used by Nikhil Singh with proficiency levels.",
};

export default function ToolsPage() {
  return <Skills />;
}
