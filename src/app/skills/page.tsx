import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills and toolset of Nikhil Singh — frontend, backend, databases, cloud, and real-time systems.",
};

export default function SkillsPage() {
  redirect("/tools");
  return null;
}
