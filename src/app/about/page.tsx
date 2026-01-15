import type { Metadata } from "next";

import { About } from "@/components/About";

export const metadata: Metadata = {
  title: "About",
  description: "About Nikhil Singh — experience, achievements, and background.",
};

export default function AboutPage() {
  return <About />;
}
