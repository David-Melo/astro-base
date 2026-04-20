---
alwaysApply: false
---

# Image Placeholder Standards

Use this rule whenever implementing temporary imagery, placeholder image props, or image intent contracts for future generation or sourcing.

## Purpose

This rule defines how to create image placeholders that are structurally stable, brand-aware, and useful for future replacement workflows.

## Source Of Truth

Use `docs/strategy_blueprint.md` for:

- brand tone and vibe
- target audience and GEO
- page and section context
- key differentiators and narrative direction

Do not invent services, locations, prices, or factual details not supported by the strategy blueprint.

## placehold.co Usage

- Base URL: `https://placehold.co/{width}x{height}`
- Width and height must be between 10 and 4000
- Use a machine-friendly identifier via `?text=`
- Prefer snake_case identifiers
- Default to standard placehold.co output unless a specific format is needed

## Required Inputs

When creating a placeholder, define:

- `image_id`
- `width`
- `height`
- `page_context`
- `semantic_role`

Optional but recommended:

- `description_hint`
- `format`

## HTML Output Standard

For raw HTML contexts, use an `<img>` with:

- `src` from `placehold.co`
- explicit `width` and `height`
- descriptive, context-aware `alt`
- `data-image-id`
- `data-page-context`
- `data-semantic-role`
- `data-description`

Loading behavior:

- above-the-fold or hero images: `loading="eager"` and `fetchpriority="high"`
- everything else: `loading="lazy"`

## Component-Based Output

For component-based contexts, return props that fit the component contract rather than loose prose.

For silo-style image blocks, prefer JSON props that match the receiving component, such as `ImageSection`.

## Alt Text Standards

Alt text should:

- describe what the image shows
- reflect why it matters in context
- align with the tone and audience from the strategy blueprint
- avoid keyword stuffing

If the image is decorative, use empty alt text instead.

## Behavior Constraints

- Never generate real image data in this rule.
- Always use placeholders here.
- Treat the alt text and machine-readable description as the prompt future image workflows will inherit.

## Example Pattern

```html
<img
  src="https://placehold.co/1200x600?text=hero_service_action"
  width="1200"
  height="600"
  alt="Service professional performing their work with care and precision in a clean, trustworthy setting."
  loading="eager"
  fetchpriority="high"
  data-image-id="hero_service_action"
  data-page-context="homepage_hero"
  data-semantic-role="hero_supporting_illustration"
  data-description="Hero image showing the service in action for a homepage layout."
/>
```
