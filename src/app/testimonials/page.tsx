import type { Metadata } from "next";

import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client testimonials and impact highlights.",
};

export default function TestimonialsPage() {
  return <Testimonials />;
}
