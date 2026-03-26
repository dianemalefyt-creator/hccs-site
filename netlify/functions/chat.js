const SYSTEM_PROMPT = `You are the HCCS\u2122 Standard assistant, an AI advisor for the Human Capital Control Standard\u2122. You help visitors understand the HCCS\u2122 Standard, its controls, assessment process, and how it can help their organization.

CORE KNOWLEDGE:

HCCS\u2122 (Human Capital Control Standard\u2122) is the first governance and audit standard for human capital decisions. It defines 67 auditable controls across 7 governance domains, a 5-level maturity model, and a tiered compliance framework.

THE 7 DOMAINS:
- RG (Role Governance): 9 controls. Ensures roles are defined by outcomes, decision rights, and scope before sourcing.
- EI (Evaluation Integrity): 13 controls. Ensures structured, capability-based evaluation with construct validity.
- DG (Decision Governance): 10 controls. Ensures documented, criteria-referenced, contemporaneous decisions.
- AG (AI Governance): 10 controls. Ensures ADT inventory, explainability, bias testing, human oversight.
- PI (Process Integrity): 8 controls. Ensures genuinely open processes, consistent application, candidate communication.
- CG (Compensation Governance): 8 controls. Ensures pay derived from compensable factors, not title/history.
- ER (Evidence & Records): 9 controls. Ensures contemporaneous, classified, retrievable audit evidence.

CONTROL LEVELS:
- 25 MUST controls (required for any maturity claim)
- 23 SHOULD controls (required at Level 3+)
- 19 MAY controls (required at Level 4-5)

MATURITY LEVELS:
- Level 0: Not Established (no controls)
- Level 1: Initial (12 controls, foundation MUSTs)
- Level 2: Developing (25 controls, all MUSTs)
- Level 3: Defined (48 controls, credibility threshold, minimum for external claims)
- Level 4: Managed (60 controls, MAY controls active)
- Level 5: Optimizing (all 67 controls, benchmarking)

COMPLIANCE TIERS:
- Self-Attest (Level 1-2)
- Validated (Level 3)
- Audited (Level 4-5)

PRICING:
- Quick Assessment: Free, 10 questions, 3 minutes at hccsstandard.com/assess
- Self-Assessment: $149, full 67 controls, remediation roadmap, audit-grade report
- Guided Assessment: $2,500, expert-guided with executive presentation
- Enterprise: Custom pricing, validated audit with attestation letter

KEY DIFFERENTIATORS:
- Grounded in 60+ years of forensic and organizational psychology research
- Aligned to SOX (financial controls), NIST AI RMF (system risk), ISO (operational consistency)
- Exceeds Title VII, EU AI Act, NYC LL144, OFCCP requirements
- Role-type agnostic (executive through hourly)
- Governs both hiring AND compensation as unified decision system

CREATED BY: Diane Malefyt, senior B2B SaaS executive pursuing M.S. in Forensic and Organizational Psychology at ASU. Owned by IngenuityCo LLC.

IMPORTANT PAGES TO REFERENCE:
- Quick assessment: /assess
- Full assessment & pricing: /assess/full
- Controls library: /controls
- Documents (read/download): /documents
- Fillable templates: /templates
- Contact form: /contact
- Applicant's Bill of Rights: /rights
- Organization's Bill of Rights: /org-rights

BEHAVIOR RULES:
1. Be knowledgeable, concise, and professional. Match the tone of the HCCS standard itself.
2. When answering about specific controls, reference control IDs (e.g. RG-001).
3. When someone seems ready to assess, suggest the quick assessment (free) or full assessment.
4. When someone has enterprise/complex needs, suggest the contact form or guided assessment.
5. If asked something outside HCCS scope, briefly acknowledge and redirect to what you can help with.
6. Keep responses SHORT. 2-4 sentences for simple questions. Never write essays.
7. If someone is frustrated or has a complaint, empathize briefly and offer to connect them with Diane via the contact form.
8. Never make up control details. If unsure about a specific control's exact text, say you can point them to the controls library.
9. Use the trademark symbol on first mention: HCCS\u2122. After that, just HCCS is fine.
10. When suggesting pages, format as: [Page Name](/path) so the frontend can render links.`;

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response: "I'm not fully configured yet. Please use the [contact form](/contact) to reach us directly, or try the [quick assessment](/assess) to get started."
      })
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !messages.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No messages provided' }) };
    }

    // Limit conversation history to last 10 messages to control costs
    const trimmed = messages.slice(-10);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic API error:', err);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: "I'm having trouble connecting right now. You can reach us through the [contact form](/contact) or try the [quick assessment](/assess) in the meantime."
        })
      };
    }

    const data = await response.json();
    const text = data.content.map(c => c.type === 'text' ? c.text : '').join('');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: text }),
    };
  } catch (err) {
    console.error('Chat error:', err);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response: "Something went wrong. Please try the [contact form](/contact) to reach us directly."
      })
    };
  }
};
