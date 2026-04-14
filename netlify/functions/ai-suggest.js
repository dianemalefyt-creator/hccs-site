exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
  if (!ANTHROPIC_API_KEY) {
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestion: 'AI suggestions are not configured yet.' }) }
  }

  try {
    const { step, context } = JSON.parse(event.body)

    const PROMPTS = {
      outcomes: `You are an HCCS™ decision governance expert. Based on the role title and department, suggest 3 measurable business outcomes for a role definition. These must be outcomes (what the person delivers or changes), NOT tasks (activities they perform).

Role: ${context.title || 'Unknown'}
Department: ${context.dept || 'Unknown'}
Reports to: ${context.reportsTo || 'Unknown'}

Respond with exactly 3 outcomes, one per line, no numbering, no bullets. Each should be specific and measurable. Example format:
Reduce production incidents by 40% within 12 months
Own and execute the migration from monolith to microservices architecture
Establish cross-team code review standards achieving 95% coverage`,

      decisions: `You are an HCCS™ decision governance expert. Based on this role, suggest decision rights in three categories.

Role: ${context.title || 'Unknown'}
Department: ${context.dept || 'Unknown'}
Outcomes: ${context.outcome1 || ''}, ${context.outcome2 || ''}

Respond in exactly this format (3 sections, each with 2-3 items):
INDEPENDENT:
[decision 1]
[decision 2]
CONSULTATION:
[decision 1]
[decision 2]
APPROVAL:
[decision 1]
[decision 2]`,

      capabilities: `You are an HCCS™ decision governance expert. Based on this role and its outcomes, suggest required capabilities (must have at hire) and learnable capabilities (can develop in 6-12 months). Also suggest things to explicitly NOT require.

Role: ${context.title || 'Unknown'}
Outcomes: ${context.outcome1 || ''}, ${context.outcome2 || ''}

Respond in exactly this format:
REQUIRED:
[capability 1]
[capability 2]
[capability 3]
LEARNABLE:
[capability 1]
[capability 2]
NOT_REQUIRED:
[anti-requirement 1]
[anti-requirement 2]`,

      criteria: `You are an HCCS™ decision governance expert. Based on the role definition, suggest 4-5 evaluation criteria that are derived from the outcomes and required capabilities. Each criterion must assess capability, not proxies like years of experience or company names.

Role: ${context.title || 'Unknown'}
Outcomes: ${context.outcome1 || ''}, ${context.outcome2 || ''}
Required: ${context.required || ''}

Respond with 4-5 criteria, one per line, no numbering. Each should be a capability that can be assessed in an interview.`,

      general: `You are an HCCS™ decision governance expert. Help with this step of building a governed decision process.

Context: ${JSON.stringify(context).slice(0, 500)}

Provide a brief, practical suggestion (3-4 sentences max).`,
    }

    const prompt = PROMPTS[step] || PROMPTS.general

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) {
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestion: 'AI suggestion unavailable right now. Try filling in manually.' }) }
    }

    const data = await res.json()
    const text = data.content.map(c => c.type === 'text' ? c.text : '').join('')

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestion: text }) }
  } catch (err) {
    console.error('AI suggest error:', err)
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestion: 'Suggestion failed. Try filling in manually.' }) }
  }
}
