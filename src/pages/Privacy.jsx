import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: 0 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>Last updated: March 25, 2026</p>
        </div>
      </section>
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '40px 44px' }}>
          {[
            ['Who we are', 'The HCCS™ Standard website (hccsstandard.com) is operated by IngenuityCo LLC ("we," "us," "our"). We are committed to protecting the privacy of individuals who visit our website and use our services.'],
            ['What we collect', `We collect information you voluntarily provide when you:
• Take the Quick Assessment or Full Assessment (name, work email, organization, title, company size, LinkedIn profile)
• Use the contact form (name, email, organization, message)
• Subscribe to communications

We also collect standard web analytics data (page views, device type, referral source) through privacy-respecting analytics. We do not use cookies for tracking or advertising.`],
            ['How we use your information', `We use your information to:
• Deliver assessment results and reports to you
• Respond to your inquiries via the contact form
• Send follow-up communications related to your assessment (you can unsubscribe at any time)
• Improve our services and website

We do not sell, rent, or trade your personal information to third parties.`],
            ['Third-party services', `We use the following services to operate:
• Resend (email delivery): processes your email address to send assessment reports and communications
• Airtable (data storage): stores assessment submissions and contact form entries
• Anthropic (AI assistant): processes chat messages to provide HCCS™ guidance; messages are not stored by us after the session ends
• Stripe (payments): processes payment information for assessment purchases; we do not see or store your payment card details
• Netlify (hosting): hosts the website and serverless functions

Each service has its own privacy policy governing how it handles your data.`],
            ['Data retention', 'Assessment data and contact form submissions are retained for a maximum of 2 years unless you request earlier deletion. You may request deletion of your data at any time by contacting us.'],
            ['Data security', 'We implement reasonable technical and organizational measures to protect your information. Assessment data is transmitted over HTTPS encryption. Access to stored data is restricted to authorized personnel.'],
            ['Your rights', `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information
• Opt out of follow-up communications
• Request a copy of your data in a portable format

To exercise any of these rights, contact us using the information below.`],
            ['AI chat assistant', 'Our website includes an AI-powered chat assistant that uses the Anthropic API to answer questions about the HCCS™ Standard. Chat messages are sent to Anthropic for processing and are not stored by us after the session. Anthropic\'s data usage policies apply to messages processed through their API.'],
            ['Children', 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.'],
            ['Changes to this policy', 'We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date.'],
            ['Contact', 'For privacy inquiries or to exercise your rights, contact us via the contact form at hccsstandard.com/contact or connect with us on LinkedIn.'],
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
