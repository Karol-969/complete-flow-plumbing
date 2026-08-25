import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { BUSINESS_INFO } from "@shared/schema";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      metaTitle="Terms of Service | Complete Flow Plumbing"
      metaDescription="The terms that apply when you use the Complete Flow Plumbing website and book our licensed NSW plumbing services."
      canonical="/terms"
      lastUpdated="June 2026"
      intro={
        <>
          These terms apply when you use the {BUSINESS_INFO.name} website (ABN{" "}
          {BUSINESS_INFO.abn}) and when you book our plumbing services. By using
          our website or engaging us for work, you agree to these terms. Nothing
          in these terms excludes the rights and guarantees you have under the
          Australian Consumer Law.
        </>
      }
    >
      <LegalSection heading="Our services">
        <p>
          {BUSINESS_INFO.name} provides residential and commercial plumbing
          services across the Southern Highlands, Wollondilly, Macarthur, the
          Sutherland Shire, St George, Bayside, the Eastern Suburbs, Wollongong &
          Illawarra, the Blue Mountains and Goulburn & the
          Southern Tablelands. Service availability can depend on location,
          scheduling and the nature of the work.
        </p>
      </LegalSection>

      <LegalSection heading="Quotes and pricing">
        <p>
          We provide free, no-obligation quotes. A quote is an estimate based on
          the information available at the time. If the scope of work changes —
          for example, if a problem is more extensive than first apparent — we
          will let you know and confirm any change in price before continuing
          wherever practical. There is no call-out fee for standard service calls
          during business hours; after-hours emergency calls may attract a
          surcharge, which we communicate upfront.
        </p>
      </LegalSection>

      <LegalSection heading="Bookings and cancellations">
        <p>
          When you book a job, we&apos;ll agree on a time that suits you. If you
          need to reschedule or cancel, please let us know as early as you can so
          we can offer the slot to another customer.
        </p>
      </LegalSection>

      <LegalSection heading="Workmanship guarantee">
        <p>
          Our work is backed by our {BUSINESS_INFO.guarantee.toLowerCase()}. If
          something we&apos;ve installed or repaired fails due to our workmanship
          within the guarantee period, we&apos;ll return and put it right at no
          additional cost. This guarantee is in addition to your rights under the
          Australian Consumer Law and does not cover issues caused by misuse,
          third-party work, or normal wear and tear.
        </p>
      </LegalSection>

      <LegalSection heading="Licensing and insurance">
        <p>
          {BUSINESS_INFO.name} is a fully licensed and insured NSW plumbing
          business (NSW Licence {BUSINESS_INFO.licence}). All work is carried out
          by licensed plumbers to the relevant Australian Standards.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          Unless otherwise agreed in writing, payment is due on completion of the
          work. We accept cash, EFTPOS, major credit cards and bank transfer.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the extent permitted by law, our liability for any claim relating to
          our services is limited to re-supplying the service or paying the cost
          of having it re-supplied. Nothing in these terms limits or excludes any
          guarantee, right or remedy you have under the Australian Consumer Law,
          which always applies.
        </p>
      </LegalSection>

      <LegalSection heading="Website use">
        <p>
          The content on this website is provided for general information only
          and may be updated at any time. You may not copy or reuse our content,
          branding or images without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and governing law">
        <p>
          We may update these terms from time to time; the current version will
          always be available on this page. These terms are governed by the laws
          of New South Wales, Australia.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          For any questions about these terms, contact {BUSINESS_INFO.name} on{" "}
          {BUSINESS_INFO.phone} or at {BUSINESS_INFO.email}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
