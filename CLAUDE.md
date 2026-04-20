# Agent Entry Point

Start here when entering this repository as a new AI agent.

This file is only a navigation layer. It should help you find the real project context and framework, not replace them.

## Read First

Read these in order when they exist:

1. `docs/client_intake_form.json`
2. `docs/strategy_blueprint.md`
3. `docs/brand_palette.md`
4. `docs/design-brief.md`
5. `docs/project_overview.md`
6. `docs/site_overview.md`
7. `.claude/README.md`

## Where Things Live

- `docs/` contains project-specific context, strategy, and generated summaries.
- `.claude/` contains the reusable framework: rules, skills, and workflow guidance.
- `src/` contains the implementation.
- `public/` contains static assets.

## Working Model

Use this mental model:

`docs inputs -> strategy -> component foundation -> page implementation -> generated summaries`

At a high level:

- strategy docs define the site direction
- `component_foundation_agent` establishes the approved component system
- `dev_agent` composes pages from that system

## Framework Awareness

You do not need this file to restate the whole framework.

Use:

- `.claude/README.md` for the framework map
- `.claude/rules/` for constraints and standards
- `.claude/skills/` for runnable workflows

## Priority

If documents conflict, prefer:

1. project-specific docs in `docs/`
2. the real codebase
3. supportive generated summaries such as `docs/project_overview.md`, `docs/site_overview.md`, and `README.md`

## Important Note

Do not assume `docs/` is optional. In this repo, it is the primary project-context folder.
