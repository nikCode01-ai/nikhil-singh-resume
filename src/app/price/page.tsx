import type { Metadata } from "next";

import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Indian pricing model for full-stack development, real-time systems, and API integrations.",
};

export default function PricePage() {
  return <Pricing />;
}
