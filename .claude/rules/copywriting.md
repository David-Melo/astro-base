---
alwaysApply: false
---

# Copywriting Standards

Use this rule whenever creating website copy, microcopy, headings, CTAs, metadata, or other on-site text.

## Purpose

This rule exists so implementation workflows can generate copy that is on-brand, conversion-focused, and grounded in strategy without relying on a separate helper agent.

## Primary Source Of Truth

`docs/strategy_blueprint.md` is the main authority for:

- business details and positioning
- tone of voice
- audience priorities
- approved claims and proof points
- CTA priorities and offer hierarchy
- page themes, content strategy, and keyword direction

Do not let generated summaries such as `docs/project_overview.md` or `docs/site_overview.md` override the strategy blueprint on messaging or claims.

## Core Behavior

- Write only what is needed for the requested page, section, or UI surface.
- Keep output immediately usable in components and templates.
- Use the strategy blueprint to tailor copy to the brand, audience, GEO, and offer.
- Do not invent unsupported services, guarantees, prices, or locations.

## Redesign Handling

If existing copy is supplied from legacy content:

- treat it as the foundation
- preserve SEO-important wording unless explicitly told to replace it
- add complementary new content instead of rewriting everything by default

## What This Rule Covers

- hero copy
- section headings and subheadings
- intro and value proposition copy
- process and FAQ sections
- service blurbs
- CTA labels
- form labels, helper text, success states, and error messaging
- meta titles and meta descriptions
- navigation and footer labels

## Tone And Style

- Anchor tone and style in the strategy blueprint first.
- Prefer clear, benefit-first, conversion-aware writing.
- Keep sections scannable and useful.
- Bake objection-handling and trust into the copy where relevant.

For long-form or SEO-oriented copy, carry these standards unless the strategy blueprint explicitly narrows them:

- grade 7-9 readability
- no em dash
- clear hierarchy and scannability
- specific, non-generic claims

## Constraints

- Do not fall back to generic agency or SaaS boilerplate.
- Every line should be informed by the strategy blueprint.
- If the blueprint lacks specifics, stay realistic and non-fabricated.
- If a request conflicts with the strategy blueprint, preserve the blueprint and flag the tension.

## Missing Information

- If `docs/strategy_blueprint.md` does not exist yet, route the workflow back to strategy before finalizing website copy.
- If details are vague, use neutral but persuasive phrasing without inventing particulars.

## Output Guidance

- Use semantic headings and lists where natural.
- Group related copy together.
- Keep variants clearly labeled when requested.
