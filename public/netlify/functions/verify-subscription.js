// Verifies Stripe checkout session and returns subscription status
// Called after redirect from Stripe Checkout

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY
  if (!STRIPE_SECRET) {
    // Fallback: if no Stripe secret, accept access codes
    try {
      const { code } = JSON.parse(event.body)
      const VALID_CODES = ['HCCSPRO', 'LAUNCH2026', 'FOUNDER', 'DIMALEFYT']
      if (code && VALID_CODES.includes(code.toUpperCase())) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'active',
            plan: 'pro',
            email: 'code-activated',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          })
        }
      }
    } catch {}
    return { statusCode: 200, body: JSON.stringify({ status: 'inactive' }) }
  }

  try {
    const { sessionId, code } = JSON.parse(event.body)

    // Check access codes first
    const VALID_CODES = ['HCCSPRO', 'LAUNCH2026', 'FOUNDER', 'DIMALEFYT']
    if (code && VALID_CODES.includes(code.toUpperCase())) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'active',
          plan: 'pro',
          email: 'code-activated',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
      }
    }

    if (!sessionId) {
      return { statusCode: 200, body: JSON.stringify({ status: 'inactive' }) }
    }

    // Verify with Stripe
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${STRIPE_SECRET}` },
    })

    if (!res.ok) {
      return { statusCode: 200, body: JSON.stringify({ status: 'inactive', error: 'Invalid session' }) }
    }

    const session = await res.json()

    if (session.payment_status === 'paid' || session.status === 'complete') {
      // Determine plan from metadata or price
      const plan = session.metadata?.plan || 'pro'
      const isAnnual = session.metadata?.interval === 'year'

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'active',
          plan,
          email: session.customer_details?.email || session.customer_email,
          expiresAt: isAnnual
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            : new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
          customerId: session.customer,
        })
      }
    }

    return { statusCode: 200, body: JSON.stringify({ status: 'inactive' }) }
  } catch (err) {
    console.error('Verify sub error:', err)
    return { statusCode: 200, body: JSON.stringify({ status: 'inactive', error: err.message }) }
  }
}
