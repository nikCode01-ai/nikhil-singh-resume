import type { Metadata } from "next";

import { JobsClient } from "./JobsClient";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Live job vacancies and openings relevant to my profile.",
};

export default function JobsPage() {
  return <JobsClient />;
}
