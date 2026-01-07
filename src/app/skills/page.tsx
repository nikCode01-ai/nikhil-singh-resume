import type { Metadata } from "next";

import { Skills } from "@/components/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills and toolset of Nikhil Singh — frontend, backend, databases, cloud, and real-time systems.",
};

export default function SkillsPage() {
  return <Skills />;
}
