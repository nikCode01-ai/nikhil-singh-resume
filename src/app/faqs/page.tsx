import type { Metadata } from "next";

import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about services, process, and engagements.",
};

export default function FAQsPage() {
  return <FAQ />;
}
