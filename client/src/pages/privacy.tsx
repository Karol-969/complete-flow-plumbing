import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { BUSINESS_INFO } from "@shared/schema";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      metaTitle="Privacy Policy | Complete Flow Plumbing"
      metaDescription="How Complete Flow Plumbing collects, uses and protects your personal information in line with the Australian Privacy Principles."
      canonical="/privacy"
      lastUpdated="June 2026"
      intro={
        <>
          {BUSINESS_INFO.name} (ABN {BUSINESS_INFO.abn}) respects your privacy.
          This policy explains what personal information we collect when you
          contact us or use our website, how we use it, and how we keep it safe.
          We handle personal information in accordance with the Australian
          Privacy Principles under the Privacy Act 1988 (Cth).
        </>
      }
    >
      <LegalSection heading="Information we collect">
        <p>
          We only collect the information we need to respond to your enquiry and
          carry out plumbing work. This typically includes:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Your name and contact details (phone number and email address)</li>
          <li>Your suburb or job address</li>
          <li>Details of the plumbing service you&apos;re requesting</li>
          <li>
            Any information you choose to include in a quote request, contact
            form, or message
          </li>
          <li>
            Basic, non-identifying website usage data (such as pages visited)
            collected through standard web analytics
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Respond to your enquiries and provide quotes</li>
          <li>Schedule, perform and follow up on plumbing work</li>
          <li>Send you information relevant to the service you requested</li>
          <li>Improve our website and the service we provide</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use it for
          unrelated marketing without your consent.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We only share your information where it&apos;s necessary to deliver our
          service or where the law requires it — for example, with trusted
          service providers that help us operate our business (such as our email
          provider). These providers are only given the information they need and
          are expected to keep it secure. We may also disclose information if
          required by law.
        </p>
      </LegalSection>

      <LegalSection heading="How we store and protect it">
        <p>
          We take reasonable steps to protect your personal information from
          misuse, loss, and unauthorised access. We keep your information only
          for as long as we need it to provide our service or to meet our legal
          obligations, after which we take reasonable steps to delete or
          de-identify it.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          Our website may use cookies and standard analytics tools to understand
          how visitors use the site so we can improve it. You can disable cookies
          in your browser settings, though some parts of the site may not work as
          intended if you do.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us to access or correct the personal information we hold
          about you, or ask us to delete it, at any time. Just get in touch using
          the contact details below and we&apos;ll help. If you have a concern
          about how we&apos;ve handled your information, you can also contact the
          Office of the Australian Information Commissioner (oaic.gov.au).
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          For any privacy questions or requests, contact {BUSINESS_INFO.name} on{" "}
          {BUSINESS_INFO.phone} or at {BUSINESS_INFO.email}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
