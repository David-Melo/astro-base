
---
name: launch_checklist_agent
model: fast
---

# Launch Checklist Agent (Astro Site)

## Purpose

Generate a comprehensive pre-launch checklist for this Astro site and save it to `./docs/launch_checklist.md`.

The checklist must cover:
- Technical SEO (indexing, canonicals, sitemaps, robots, OG, schema)
- Search engine tooling (Google Search Console, Bing Webmaster Tools)
- Semantics and accessibility
- Analytics and conversion tracking (GA4 + GTM, events)
- Forms and lead flow (submission, validation, thank-you, spam control)
- Redirects and URL hygiene (301/302 rules, trailing slashes, canonical strategy)
- Performance and Core Web Vitals (images, fonts, JS/CSS, caching)
- Deployment readiness (DNS, SSL, environment variables, monitoring)
- Legal/compliance basics (privacy/cookies/consent where applicable)
- Security basics (headers, third-party scripts, least privilege)

## Output Requirements

When invoked, produce or replace this file:

- `docs/launch_checklist.md`
- `docs/launch_checklist.json`

The output must be:
- A checklist with clear sections, using Markdown checkboxes (`- [ ]`)
- “Explain-first”: every checklist item includes a short explanation and a practical way to verify it
- Astro-aware: mention where things usually live (e.g. `src/layouts`, `src/pages`, `public/`)
- Tooling-aware: prefer `yarn` commands when commands are suggested
- Conversion-aware: ensure CTAs, phone clicks, and forms are fully tracked and tested

## Inputs to Consider (Repo Context)

- Astro + Tailwind v4 + Preline
- Blog content via MDX
- Programmatic “silo” pages exist (sitemap should be silo-aware)
- Images should be WebP where possible, and placeholder workflows exist

## What To Generate

Create `docs/launch_checklist.md` with:

1. A short “how to use this” that explains the context categories below
2. A **context-categorized** checklist with these top-level sections:
   - **In-repo (Dev / Astro codebase)**: tasks that can be completed by editing code/content and running local checks
   - **External (Accounts / DNS / Tools)**: tasks that must be completed outside the repo (DNS, GTM/GA4 setup, Search Console, Bing, email DNS, hosting dashboards)
   - **Production verification (After deploy)**: tasks that require a deployed URL to validate (robots/sitemap responses, real-time analytics, end-to-end forms, PSI)
   - **Post-launch (first 7 days)**: monitoring tasks and cleanup (404s, indexing, conversions)
3. Each checklist item must include:
   - **Why** it matters
   - **Verify** steps that are concrete and testable
4. Keep the checklist conversion-focused and silo-aware (sitemap includes silo pages, excludes junk)
5. Also create `docs/launch_checklist.json` that contains the same checklist items with stable IDs and checked state.
   - JSON schema (minimum):
     - `version`: number
     - `generatedAt`: ISO string
     - `summary`: `{ total, checked }`
     - `categories`: `[{ category, total, checked }]`
     - `items`: `[{ id, category, group, text, checked, why, verify[] }]`
6. IMPORTANT: Preserve progress when regenerating:
   - Do not reset any existing `- [x]` checkmarks in `docs/launch_checklist.md`
   - Do not reset any existing `checked: true` values in `docs/launch_checklist.json`
   - If you restructure text, keep prior checked states by matching items by their meaning/title within the same context section
   - Keep IDs stable unless the meaning of the item changes

## Style

- No fluff. No generic “just do SEO” phrasing.
- Use short paragraphs.
- Use strong, practical verification steps.
- Include “why it matters” in one sentence where helpful.