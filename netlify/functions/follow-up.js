// Netlify scheduled function - runs daily
// Sends 24-hour follow-up to teaser leads who haven't purchased

const FOLLOW_UP_SUBJECT = "Your hiring governance gaps aren't closing themselves";

const followUpHtml = (name, level, gaps) => `
<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
  <div style="background:linear-gradient(135deg,#0a1628,#1a2d4a);padding:28px 32px;border-radius:12px 12px 0 0">
    <div style="font-size:20px;font-weight:700;letter-spacing:0.05em">
      <span style="color:#fff">HCCS</span> <span style="color:#5b9bd5">Standard</span><span style="color:#5b9bd5;font-size:10px;vertical-align:super">\u2122</span>
    </div>
  </div>
  
  <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none">
    <p style="font-size:16px;color:#0f172a;font-weight:600;margin:0 0 16px">Hi ${name},</p>
    
    <p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 16px">
      Yesterday you took the HCCS\u2122 Quick Assessment and scored at <strong>estimated Level ${level}</strong>.
      ${level < 3 ? `That\u2019s ${3-level} level${3-level>1?'s':''} below the credibility threshold.` : 'You\'re at or above the credibility threshold.'}
    </p>

    ${gaps > 0 ? `<p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 16px">
      You had <strong>${gaps} control gaps</strong> out of the 10 we sampled. But here\u2019s the thing: we only tested 10 of 67 controls. The full assessment covers the other 57, and most organizations discover significantly more gaps than the teaser suggests.
    </p>` : ''}

    <p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 24px">
      Here\u2019s what the full HCCS\u2122 Assessment gives you that the quick version can\u2019t:
    </p>
    
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:0 0 24px">
      <div style="font-size:14px;color:#334155;margin-bottom:8px"><strong>\u2713</strong> All 67 controls scored with definition, example, and remediation</div>
      <div style="font-size:14px;color:#334155;margin-bottom:8px"><strong>\u2713</strong> Validated maturity level per domain (not estimated)</div>
      <div style="font-size:14px;color:#334155;margin-bottom:8px"><strong>\u2713</strong> Prioritized gap analysis (MUST before SHOULD before MAY)</div>
      <div style="font-size:14px;color:#334155;margin-bottom:8px"><strong>\u2713</strong> Phased remediation roadmap to Level 3</div>
      <div style="font-size:14px;color:#334155;margin-bottom:8px"><strong>\u2713</strong> Personalized business case document for leadership</div>
      <div style="font-size:14px;color:#334155"><strong>\u2713</strong> Audit-grade report you can share with counsel or executives</div>
    </div>

    <div style="text-align:center;margin:0 0 24px">
      <a href="https://hccsstandard.com/assess/full" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;text-decoration:none">See pricing and get started</a>
      <div style="font-size:13px;color:#94a3b8;margin-top:8px">Starting at $149 for the full self-assessment</div>
    </div>

    <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:24px">
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0 0 8px">
        <strong>Need help building a business case?</strong> After your quick assessment, you can generate a personalized budget request document to share with your CFO. Or visit our <a href="https://hccsstandard.com/business-case" style="color:#2563eb">business case page</a> for ROI data and stakeholder talking points.
      </p>
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0">
        Questions? Reply to this email or use our <a href="https://hccsstandard.com/contact" style="color:#2563eb">contact form</a>.
      </p>
    </div>
  </div>
  
  <div style="padding:20px 32px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;text-align:center">
    <div style="font-size:12px;color:#94a3b8">HCCS\u2122 | hccsstandard.com | \u00A9 2026 IngenuityCo LLC</div>
    <div style="font-size:11px;color:#cbd5e1;margin-top:4px">You received this because you took the HCCS\u2122 Quick Assessment. <a href="mailto:info@hccsstandard.com?subject=Unsubscribe" style="color:#94a3b8">Unsubscribe</a></div>
  </div>
</div>`;

exports.handler = async function(event) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  if (!RESEND_API_KEY || !AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Missing env vars' }) };
  }

  try {
    // Get leads from 23-25 hours ago (window to avoid duplicates)
    const now = new Date();
    const hoursAgo25 = new Date(now - 25 * 60 * 60 * 1000).toISOString();
    const hoursAgo23 = new Date(now - 23 * 60 * 60 * 1000).toISOString();

    const formula = encodeURIComponent(
      `AND(IS_AFTER({Submitted}, '${hoursAgo25}'), IS_BEFORE({Submitted}, '${hoursAgo23}'), {Source} = 'Teaser')`
    );

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Leads?filterByFormula=${formula}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );

    if (!airtableRes.ok) {
      console.error('Airtable error:', await airtableRes.text());
      return { statusCode: 200, body: JSON.stringify({ message: 'Airtable query failed' }) };
    }

    const data = await airtableRes.json();
    const leads = data.records || [];

    console.log(`Found ${leads.length} leads for 24h follow-up`);

    let sent = 0;
    for (const lead of leads) {
      const f = lead.fields;
      const name = f.Name || 'there';
      const email = f.Email;
      const level = f['Estimated Level'] || 0;
      const gaps = f.Gaps || 0;

      if (!email) continue;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'HCCS Standard <noreply@hccsstandard.com>',
            to: [email],
            bcc: ['info@hccsstandard.com'],
            subject: FOLLOW_UP_SUBJECT,
            html: followUpHtml(name.split(' ')[0], level, gaps),
          }),
        });

        if (emailRes.ok) {
          sent++;
          console.log(`Follow-up sent to ${email}`);
        } else {
          console.error(`Failed to send to ${email}:`, await emailRes.text());
        }
      } catch (e) {
        console.error(`Error sending to ${email}:`, e.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Processed ${leads.length} leads, sent ${sent} follow-ups` }),
    };
  } catch (err) {
    console.error('Follow-up error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

// Netlify scheduled function config
exports.config = {
  schedule: "@hourly"
};
