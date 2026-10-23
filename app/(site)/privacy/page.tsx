import type { Metadata } from "next";
import Policy from "@/content/legal/privacy.mdx";
import { LegalPage } from "@/src/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Ur Late collects, why, who helps us, and how to delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <Policy />
    </LegalPage>
  );
}
