# HCCS Standard Website - Deployment Guide

## What's in this package

```
hccs-site/
├── dist/                    ← Pre-built, ready to deploy directly
├── public/
│   ├── docs/               ← Three Word documents for download
│   └── _redirects          ← Netlify SPA routing
├── src/
│   ├── components/         ← Nav, Footer
│   ├── data/               ← 67 controls with definitions, examples, remediation
│   ├── pages/              ← Home, Assessment, Documents, About
│   ├── App.jsx             ← Router
│   └── main.jsx            ← Entry point
├── netlify.toml            ← Netlify build config
├── package.json
└── vite.config.js
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing page |
| `/assess` | 67-control maturity assessment tool |
| `/documents` | Document downloads (Core Standard, IG, Templates) |
| `/about` | About HCCS, author, scientific foundation |

## Deploy to Netlify (5 minutes)

### Option A: Drag and drop (fastest)
1. Go to https://app.netlify.com
2. Drag the `dist/` folder onto the deploy area
3. Site is live immediately at a random Netlify URL
4. Go to Site Settings → Domain Management → Add custom domain
5. Enter `hccsstandard.com`
6. Netlify gives you DNS records to add at your registrar

### Option B: GitHub (recommended for ongoing updates)
1. Create a GitHub repo:
   ```bash
   cd hccs-site
   git init
   git add -A
   git commit -m "HCCS Standard v1.0"
   git remote add origin https://github.com/YOUR_USERNAME/hccs-site.git
   git push -u origin main
   ```
2. Go to https://app.netlify.com → New site from Git
3. Connect your GitHub repo
4. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy. Every push to main auto-deploys.

### DNS Setup (at your registrar - Namecheap, GoDaddy, etc.)

**For hccsstandard.com (primary):**
- CNAME record: `www` → `YOUR-SITE.netlify.app`
- A record: `@` → Netlify's load balancer IP (shown in domain settings)
- Or use Netlify DNS (they'll give you nameservers)

**For the other three domains (redirects):**
In Netlify → Site Settings → Domain Management → Domain aliases:
- Add `hccsaudit.com`
- Add `hccsgovernance.com`
- Add `hccsframework.com`

Then point each domain's DNS to the same Netlify site.

### SSL
Netlify provisions free SSL automatically once DNS propagates. Takes ~5 minutes.

## Local Development

```bash
cd hccs-site
npm install
npm run dev
# Opens at http://localhost:5173
```

## To Rebuild

```bash
npm run build
# Output in dist/
```

## Email Report Setup (Resend)

The assessment can email the full report to users. This requires a Resend account (free: 100 emails/day).

### Setup (5 minutes):

1. Go to https://resend.com and create a free account
2. Add your domain: Domains → Add Domain → `hccsstandard.com`
3. Resend gives you DNS records (DKIM, SPF). Add them in Namecheap Advanced DNS
4. Once verified, create an API key: API Keys → Create
5. In Netlify: Site Settings → Environment Variables → Add:
   - Key: `RESEND_API_KEY`
   - Value: your Resend API key
6. Redeploy the site (Deploys → Trigger Deploy)

That's it. The "Email Report to Me" button on the results page will now send the full HTML report to the user's email.

### How it works:
- User clicks "Email Report to Me"
- Frontend POSTs assessment data to `/.netlify/functions/send-report`
- Netlify serverless function builds the HTML report and sends via Resend API
- User receives formatted report in their inbox with all scores, notes, gaps, and remediation

### From address:
Reports are sent from `reports@hccsstandard.com`. You can change this in `netlify/functions/send-report.js`.

## Lead Capture

The assessment tool has an email capture form on the results page. Currently it stores nothing (frontend only). To capture leads:

### Option 1: Netlify Forms (easiest)
Add `data-netlify="true"` to the form. Netlify captures submissions automatically. View them in the Netlify dashboard under Forms.

### Option 2: Connect to a service
Add a form handler that POSTs to:
- ConvertKit / Mailchimp for email lists
- Airtable for a simple CRM
- HubSpot for full CRM

## Files Included for Download

The `/docs/` directory contains:
- `HCCS-1.0-Core-Standard.docx` (403 KB)
- `HCCS-IG-1.0-Implementation-Guide.docx` (381 KB)
- `HCCS-T-1.0-Template-Library.docx` (200 KB)

These are served directly. Users click "Download .docx" and get the file.








