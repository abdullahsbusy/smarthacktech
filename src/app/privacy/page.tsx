import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HackTech collects, uses and protects the information you share on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro="This policy explains what information HackTech collects through this website, why we collect it, and how we handle it. We keep it short and plain."
      otherHref="/terms"
      otherLabel="Read our Terms"
      sections={[
        {
          heading: "What we collect",
          body: "When you submit our contact form or chat with Kaira (our AI assistant), we collect what you give us, typically your name, email, company, project details and budget/timeline. We also collect basic, non-identifying usage data (e.g. which pages were visited) to improve the site.",
        },
        {
          heading: "Why we collect it",
          body: "Only to respond to your enquiry, scope and quote your project, and follow up. We do not use it for unrelated marketing without your consent.",
        },
        {
          heading: "How it is stored & shared",
          body: (
            <>
              Submissions are stored in our database (Supabase) and may be emailed to
              our team. We do <strong>not</strong> sell your data or share it with
              third parties for advertising. We share information with service
              providers (hosting, database, email) only as needed to operate the
              site, and only when required by law.
            </>
          ),
        },
        {
          heading: "Retention",
          body: "We keep enquiry data only as long as needed to serve you and for reasonable business records, then delete it on request or when no longer needed.",
        },
        {
          heading: "Your choices",
          body: "You can ask us to access, correct or delete the personal data you submitted. Email us and we will action it.",
        },
        {
          heading: "Contact",
          body: (
            <>
              Questions about this policy? Email{" "}
              <a className="text-(--c6) hover:underline" href="mailto:contact.hacktechzone@gmail.com">
                contact.hacktechzone@gmail.com
              </a>
              .
            </>
          ),
        },
      ]}
    />
  );
}
