import type { Metadata } from "next";
import Terms from "@/content/legal/terms.mdx";
import { LegalPage } from "@/src/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The agreement between you and Ur Late, in plain words.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <Terms />
    </LegalPage>
  );
}
