import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: 0 }}>Terms of Use</h1>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>Last updated: April 14, 2026</p>
        </div>
      </section>
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '40px 44px' }}>
          {[
            ['Acceptance of terms', 'By accessing or using hccsstandard.com (the "Website"), you agree to these Terms of Use. If you do not agree, do not use the Website. These terms constitute a legal agreement between you and IngenuityCo LLC ("we," "us," "our").'],
            ['Description of services', 'The Website provides information about the Human Capital Control Standard™ (HCCS™), including governance assessments, educational content, downloadable documents, fillable templates, an AI-powered chat assistant, and related tools and resources.'],
            ['Intellectual property', `The HCCS™ Standard, including all documents, controls, assessment instruments, templates, blog content, and website design, is the intellectual property of IngenuityCo LLC. "HCCS" and "Human Capital Control Standard" are trademarks of IngenuityCo LLC.

You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from this Website without prior written permission, except for:
• Downloading documents for your organization's internal use
• Generating and sharing assessment reports and business case documents for internal decision-making
• Referencing the standard with proper attribution`],
            ['Assessment services and scope', `HCCS™ assessments are governance readiness evaluations. They are not legal advice, compliance certifications, regulatory filings, or guarantees of any kind.

Self-Assessment ($500): Scope is limited to a single domain (e.g., Employment & Workforce) within a single department or business unit. Results are generated from your self-reported answers. They are intended for internal planning and gap identification. They do not represent a validated audit, legal opinion, or compliance certification. The report is licensed to the purchasing organization for internal use only and may not be shared publicly or represented as an independent assessment.

Guided Assessment ($7,500): Scope covers a single domain, organization-wide (all departments within one domain). Includes expert-led walkthrough, evidence review, executive presentation, and 30-day follow-up. Guided Assessment reports are licensed to the purchasing organization for internal and board-level use. They do not constitute third-party certification.

Enterprise Assessment (from $25,000): Scope covers multi-domain or multi-business-unit engagements, including third-party validation, formal attestation letter, and board-ready compliance report. Scope, timeline, and deliverables are defined in a separate Statement of Work executed prior to engagement.

All assessments are point-in-time evaluations reflecting governance posture as of the assessment date. They are valid for 12 months. Annual reassessment is recommended and priced separately. Organizations with multiple business units operating under different governance structures require separate assessments per unit.`],
            ['No certification or compliance guarantee', `No HCCS™ assessment, at any tier, constitutes a certification of compliance with any law, regulation, or standard, including but not limited to Title VII, the EU AI Act, NYC LL144, GDPR, CCPA, EEOC guidelines, OFCCP requirements, or any other federal, state, local, or international regulation.

The HCCS™ Standard is an independently developed governance framework. It is not endorsed by, affiliated with, or approved by any government agency, regulatory body, or standards organization. Alignment with SOX, NIST AI RMF, ISO, or other frameworks is architectural, not certified.

Assessment results identify governance gaps and provide remediation guidance. Implementing the recommendations does not guarantee regulatory compliance, litigation protection, or immunity from enforcement action. Organizations are responsible for obtaining their own legal counsel regarding compliance obligations.`],
            ['Limitation of liability', `TO THE MAXIMUM EXTENT PERMITTED BY LAW, INGENUITYCOLLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO:

(a) Your use of or inability to use the Website, assessments, tools, reports, or any other services;
(b) Any decisions made or actions taken based on assessment results, recommendations, remediation guidance, or any other content provided through the services;
(c) Any errors, omissions, or inaccuracies in assessment results or reports;
(d) Any third-party claims arising from your use of assessment results;
(e) Any regulatory action, litigation, audit finding, or enforcement proceeding, regardless of whether the organization used HCCS™ assessments or followed HCCS™ recommendations;
(f) Any loss of revenue, profits, data, or business opportunities.

Our total aggregate liability for all claims related to the services shall not exceed the amount you paid for the specific service giving rise to the claim. This limitation applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise).

You acknowledge that governance assessments involve professional judgment, that no assessment can identify every risk or guarantee any outcome, and that IngenuityCo LLC provides tools and frameworks, not legal advice or compliance guarantees.`],
            ['Disclaimer of warranties', `THE WEBSITE AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, OR RELIABILITY.

IngenuityCo LLC does not warrant that assessment results will be accurate, complete, or suitable for any particular regulatory or legal purpose. We do not warrant that using the HCCS™ Standard will prevent litigation, regulatory action, or adverse business outcomes.

The AI-powered chat assistant provides general information only and may produce inaccurate or incomplete responses. It does not provide legal, financial, or professional advice.`],
            ['Indemnification', 'You agree to indemnify, defend, and hold harmless IngenuityCo LLC, its officers, directors, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys\' fees) arising from: (a) your use of the Website or services, (b) your violation of these terms, (c) any third-party claims related to your use of assessment results or reports, or (d) any representation you make regarding HCCS™ compliance or certification status that is not authorized in writing by IngenuityCo LLC.'],
            ['Assessment report usage restrictions', `Assessment reports are licensed to the purchasing organization for internal use. You may not:
(a) Share Self-Assessment or Guided Assessment reports publicly or with parties outside your organization without written permission;
(b) Represent Self-Assessment results as independently validated, audited, or certified;
(c) Use the HCCS™ name, logo, or control framework in marketing materials, public statements, or regulatory filings without prior written authorization;
(d) Claim "HCCS Certified" or "HCCS Compliant" status based on a Self-Assessment or Guided Assessment. Only Enterprise engagements with third-party validation may produce attestation letters.

Organizations that publicly claim HCCS™ compliance without an authorized attestation letter may be required to retract those claims and may be subject to trademark enforcement.`],
            ['User conduct', `When using our services, you agree to:
• Provide accurate information in assessments and forms
• Use the services for their intended purpose (organizational governance assessment)
• Not attempt to circumvent access controls, payment requirements, or security measures
• Not use the AI chat assistant to generate harmful, misleading, or inappropriate content
• Not scrape, crawl, or automated-extract content from the Website`],
            ['Payments and refunds', 'Payments for assessments are processed through Stripe. All sales are final. If you experience a technical issue that prevents you from completing a purchased assessment, contact us and we will work to resolve it or provide a replacement access code.'],
            ['AI chat assistant', 'The AI-powered chat assistant provides general information about the HCCS™ Standard. It does not provide legal, financial, or professional advice. Responses are generated by a third-party AI model and may occasionally be incomplete or imperfect. Do not rely on chat responses as a substitute for professional consultation.'],
            ['Governing law', 'These terms are governed by the laws of the State of Arizona, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Maricopa County, Arizona.'],
            ['Changes to terms', 'We may update these terms from time to time. Continued use of the Website after changes are posted constitutes acceptance of the updated terms.'],
            ['Contact', 'For questions about these terms, contact us via the contact form at hccsstandard.com/contact.'],
          ].map(([title, text]) => (
            <div key={title} style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#475569', margin: 0, whiteSpace: 'pre-line' }}>{text}</p>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 20, marginTop: 32 }}>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>© 2026 IngenuityCo LLC. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
