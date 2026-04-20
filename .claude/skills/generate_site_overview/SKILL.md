---
name: generate-site-overview
description: Generate or regenerate the site implementation summary from strategy docs and the current codebase. Use when the user wants a current handoff-style snapshot of what has been built and what comes next.
model: inherit
---

# Generate Site Overview

Use this skill to generate or regenerate `docs/site_overview.md`, a comprehensive implementation summary documenting what has been built, what the current state is, and what comes next.

## Purpose

`docs/site_overview.md` is a project implementation summary. It serves as:

- a handoff document for stakeholders or new team members
- a record of what has been built and how it aligns with the brand strategy
- a snapshot of current features, components, and content
- a roadmap of next steps and pending work

This is different from `docs/project_overview.md`, which is the broader technical project structure reference.

Neither summary document should override `docs/strategy_blueprint.md` on brand, audience, messaging, or structural intent.

## Sources Of Truth

### Client-Specific

- `docs/strategy_blueprint.md`
- `docs/brand_palette.md`
- `docs/client_intake_form.json`
- `docs/sitemap.md`
- `docs/design-brief.md` when present
- `docs/navbar.md` and `docs/footer.md` when present

### Project-Specific

- `package.json`
- `src/components/`
- `src/pages/`
- `src/content/`
- `src/styles/`
- `public/`
- `astro.config.mjs`
- `tsconfig.json`
- `postcss.config.cjs`

## Workflow

### 1. Read Client Identity

Extract:

- client name and slogan
- executive summary
- target audience and GEO
- tone of voice
- differentiators
- brand colors and design aesthetic

### 2. Audit The Codebase

- list components created
- list implemented pages
- inspect `src/content/pages/` for MDX content
- summarize styling architecture
- summarize fonts and assets
- read `package.json` for the stack and versions

### 3. Document The Implementation

Write `docs/site_overview.md` using this structure:

- project status
- brand implementation
- components created
- pages and content
- key features
- technical stack
- responsive breakpoints
- next steps
- build status
- deployment
- contact information

### 4. Identify Next Steps

Based on `docs/strategy_blueprint.md` and current implementation, call out:

- pending pages or features
- content gaps
- planned integrations or enhancements

## Output Policy

- write the file to `docs/site_overview.md`
- do not write `SITE_OVERVIEW.md` at the project root
- do not write generated project-state files into `.claude/`

## Quick Usage

- regenerate the site overview after a major milestone
- create the initial site overview after the first implementation pass
- update the site overview for handoff
