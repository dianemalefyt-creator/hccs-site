exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Email not configured' }) };
  }

  try {
    const { email, html, org } = JSON.parse(event.body);
    if (!email || !html) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email or html' }) };
    }

    // Strip the toolbar from the email version
    const cleanHtml = html
      .replace(/<div class="no-print toolbar">[\s\S]*?<\/script>/g, '')
      .replace(/<div class="no-print toolbar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'HCCS Standard <noreply@hccsstandard.com>',
        to: [email],
        bcc: ['info@hccsstandard.com'],
        subject: `HCCS™ Business Case - ${org || 'Your Organization'}`,
        html: cleanHtml,
      }),
    });

    if (res.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } else {
      const err = await res.text();
      console.error('Resend error:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send' }) };
    }
  } catch (err) {
    console.error('Send business case error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
