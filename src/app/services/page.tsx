import type { Metadata } from "next";

import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by Nikhil Singh — full-stack engineering, real-time systems, APIs, and cloud infrastructure.",
};

export default function ServicesPage() {
  return <Services />;
}
