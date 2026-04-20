---
globs:
  - src/components/component-registry.json
  - src/components/**/*.astro
---

# Component Registry Contract

This rule defines the canonical machine-readable source of truth for approved page components.

## Purpose

`src/components/component-registry.json` tells implementation workflows which components are approved, how they map to the conceptual component system, and whether they may be used directly in page composition.

This prevents the approved component layer from living only in prose.

## Source Of Truth Relationship

- `.claude/rules/component-system.md` defines the conceptual 12-component marketing system.
- `src/components/component-registry.json` defines the actual approved components available in this codebase.
- `src/components/**/*.astro` is the implementation of those approved components.

If these sources drift, update the registry and components so they remain aligned with the conceptual system.

## Registry Structure

The registry should be a JSON object with metadata plus an `entries` array.

Recommended shape:

```json
{
  "version": 1,
  "generatedBy": "component_foundation_agent",
  "lastUpdated": "ISO-8601 timestamp",
  "notes": "Optional short note",
  "entries": [
    {
      "name": "HeroPage",
      "path": "src/components/HeroPage.astro",
      "level": "section",
      "role": "hero",
      "status": "approved",
      "topLevelEligible": true,
      "propsSummary": ["title", "subtitle", "primaryCta", "secondaryCta", "image"],
      "usageNotes": "Primary top-of-page conversion section"
    }
  ]
}
```

## Required Fields Per Entry

- `name`: component name
- `path`: repo-relative file path
- `level`: `section` or `atom`
- `role`: mapped role from the conceptual system
- `status`: `approved`, `planned`, or `deprecated`
- `topLevelEligible`: whether it may be placed directly in page layouts
- `propsSummary`: short list of important props
- `usageNotes`: concise usage guidance

## Role Mapping Guidance

The `role` field should map back to the conceptual system in `.claude/rules/component-system.md`, such as:

- `hero`
- `intro-content`
- `benefits`
- `features`
- `how-it-works`
- `social-proof`
- `case-study`
- `long-form-seo-content`
- `faq`
- `comparison`
- `related-links`
- `final-cta`

If one component spans multiple conceptual roles, use the dominant role and explain nuance in `usageNotes`.

## Top-Level Composition Rules

- `section` components are usually `topLevelEligible: true`
- `atom` components must be `topLevelEligible: false`
- if a section is special-purpose and should not be broadly reused at top level, set `topLevelEligible: false` and explain why

## Implementation Expectations

When a component is added, removed, renamed, deprecated, or reclassified:

1. update the component file
2. update its JSDoc and `@level`
3. update `src/components/component-registry.json`
4. update downstream registries such as `silo-registry.json` when relevant

## Dev Agent Expectations

`dev_agent` must inspect `src/components/component-registry.json` before generating major pages.

It should:

- prefer `approved` entries first
- avoid `deprecated` entries unless maintaining legacy behavior
- treat `planned` entries as unavailable until implemented
- justify any newly created component when the registry cannot express the requested page cleanly
