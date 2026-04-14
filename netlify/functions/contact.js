exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Email not configured' }) };
  }

  try {
    const { name, email, org, interest, message, website } = JSON.parse(event.body);

    // Honeypot check - bots fill hidden fields
    if (website) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (!name || !email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Name and email required' }) };
    }

    // Message optional for subscribe requests
    if (!message && !interest?.startsWith('Subscribe')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Message required' }) };
    }

    const html = '<!DOCTYPE html><html><head><style>' +
      'body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px}' +
      'h1{font-size:22px;color:#0f172a;border-bottom:2px solid #2563eb;padding-bottom:8px}' +
      'table{width:100%;border-collapse:collapse;margin:16px 0}' +
      'td{padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;vertical-align:top}' +
      'td:first-child{font-weight:600;width:120px;color:#475569}' +
      '.msg{background:#f8fafc;border-left:3px solid #2563eb;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:14px;line-height:1.6}' +
      '</style></head><body>' +
      '<h1>New HCCS\u2122 Inquiry</h1>' +
      '<table>' +
      '<tr><td>Name</td><td>' + (name || '').replace(/</g, '&lt;') + '</td></tr>' +
      '<tr><td>Email</td><td><a href="mailto:' + email + '">' + email + '</a></td></tr>' +
      (org ? '<tr><td>Organization</td><td>' + org.replace(/</g, '&lt;') + '</td></tr>' : '') +
      (interest ? '<tr><td>Interest</td><td>' + interest.replace(/</g, '&lt;') + '</td></tr>' : '') +
      '<tr><td>Submitted</td><td>' + new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }) + '</td></tr>' +
      '</table>' +
      '<div class="msg">' + message.replace(/</g, '&lt;').replace(/\n/g, '<br>') + '</div>' +
      '<p style="font-size:13px;color:#64748b;margin-top:24px">Reply directly to this email to respond to ' + (name || '').replace(/</g, '&lt;') + '.</p>' +
      '</body></html>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HCCS Contact <reports@hccsstandard.com>',
        to: ['info@hccsstandard.com'],
        reply_to: email,
        subject: 'HCCS\u2122 Inquiry from ' + name + (org ? ' (' + org + ')' : '') + (interest ? ' - ' + interest : ''),
        html: html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send' }) };
    }

    // Also send confirmation to the person
    const confirmHtml = '<!DOCTYPE html><html><head><style>' +
      'body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px}' +
      '</style></head><body>' +
      '<div style="background:linear-gradient(135deg,#0a1628,#1a2d4a);color:#fff;padding:32px;border-radius:12px;text-align:center;margin-bottom:24px">' +
      '<div style="font-size:24px;font-weight:700">HCCS Standard\u2122</div>' +
      '<div style="color:#5b9bd5;font-size:14px;margin-top:4px">We received your inquiry</div>' +
      '</div>' +
      '<p>Hi ' + (name || '').replace(/</g, '&lt;') + ',</p>' +
      '<p>Thank you for reaching out about the HCCS\u2122 Standard. We received your message and will get back to you within one business day.</p>' +
      '<p>In the meantime, you can:</p>' +
      '<ul style="color:#475569">' +
      '<li><a href="https://hccsstandard.com/assess" style="color:#2563eb">Take the free governance assessment</a> (10 questions, 3 minutes)</li>' +
      '<li><a href="https://hccsstandard.com/controls" style="color:#2563eb">Browse the 70 controls</a></li>' +
      '<li><a href="https://hccsstandard.com/documents" style="color:#2563eb">Read the standard online</a></li>' +
      '</ul>' +
      '<p style="margin-top:24px">Best,<br><strong>Diane Malefyt</strong><br>HCCS\u2122 Standard<br><a href="https://www.linkedin.com/in/dianemalefyt/" style="color:#2563eb">LinkedIn</a></p>' +
      '<div style="font-size:11px;color:#94a3b8;margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;text-align:center">' +
      'HCCS\u2122 | hccsstandard.com | \u00A9 2026 IngenuityCo LLC</div>' +
      '</body></html>';

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HCCS Standard <reports@hccsstandard.com>',
        to: [email],
        subject: 'We received your HCCS\u2122 inquiry',
        html: confirmHtml,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Contact error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
