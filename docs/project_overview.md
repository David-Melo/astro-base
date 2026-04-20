# Project Overview

## Project Type

Static Astro marketing site scaffold intended to be reused as a base for future client websites. The repository currently includes generic implementation foundations plus client strategy documents that may be swapped or regenerated per project, but the codebase itself is still in an early foundation phase.

## Core Stack

- `Astro 6.1.7` with static output
- `TypeScript` using `astro/tsconfigs/strict`
- `Tailwind CSS v4` via `@tailwindcss/vite`
- `Preline 4.1.3` for interactive utility patterns
- `React 19` support enabled through `@astrojs/react`
- `MDX` support enabled through `@astrojs/mdx`
- `PostCSS` with `@tailwindcss/postcss` and `autoprefixer`
- `sharp` for Astro image optimization

## Key Dependencies

Dependencies that materially affect implementation decisions:

- `astro`: site framework and build system
- `@astrojs/react`: allows React islands/components if needed
- `@astrojs/mdx`: supports MDX content when editorial content is added
- `tailwindcss` and `@tailwindcss/vite`: styling system and Vite integration
- `preline`: interactive UI behaviors loaded globally in the base layout
- `sharp`: required for Astro image processing
- `zod`: available for schema validation, though not yet used in visible site code
- `dotenv`: available for environment variable loading
- `glob`: available for filesystem-based helper workflows
- `@iconify/tailwind4` and `@iconify-json/ph`: icon pipeline available in CSS
- `@tailwindcss/forms` and `@tailwindcss/typography`: installed for future form and prose styling patterns

## Config And Integrations

### Astro

- `astro.config.mjs` enables `mdx()` and `react()`
- output mode is `static`
- Tailwind is integrated through Vite rather than the legacy Astro Tailwind integration
- Vite ignores `.cursor` files during dev watch

### TypeScript

- Strict Astro config via `astro/tsconfigs/strict`
- `verbatimModuleSyntax` enabled
- Path aliases:
  - `@components/*` -> `src/components/*`
  - `@layouts/*` -> `src/layouts/*`
  - `@mdx/*` -> `src/components/mdx/*`
  - `@assets/*` -> `src/assets/*`
  - `@utils/*` -> `src/utils/*`

### PostCSS

- `@tailwindcss/postcss`
- `autoprefixer`

## Project Structure

```text
/
├── docs/
│   ├── brand_palette.md
│   ├── project_overview.md
│   ├── site_overview.md
│   └── strategy_blueprint.md
├── public/
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   └── component-registry.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── colors.css
│   │   ├── global.css
│   │   └── typography.css
│   └── utils/
│       ├── imageRegistry.ts
│       └── structuredData.ts
├── astro.config.mjs
├── package.json
├── postcss.config.cjs
├── tsconfig.json
└── yarn.lock
```

## Content Architecture

- There is currently no `src/content/` directory and no `astro:content` collections configured.
- `@astrojs/mdx` is installed, so MDX-based editorial content can be added later.
- No CMS integration is present.
- Strategy and brand guidance currently live in `docs/strategy_blueprint.md` and `docs/brand_palette.md`.
- `docs/sitemap.md` and `docs/design-brief.md` are referenced by the broader workflow but are not present in the current working tree.

## Component Architecture

- `src/layouts/Layout.astro` is the only implemented Astro UI shell.
- `src/pages/index.astro` is a placeholder homepage using the base layout and website schema utilities.
- `src/components/component-registry.json` defines the planned section library, but the actual component files listed there do not exist yet.
- Planned top-level sections include hero, intro, benefits, services, process, testimonials, case study, long-form content, FAQ, comparison, related links, and CTA blocks.
- The registry makes the intended component system explicit for future page generation, but it is not yet implemented.

## Styling System

- Global styles are loaded from `src/styles/global.css`.
- Tailwind CSS v4 is imported directly in CSS using `@import "tailwindcss";`.
- Preline CSS variants are imported globally.
- Typography utilities are custom-authored in `src/styles/typography.css`.
- Custom font family `Euclid Circular B` is defined with multiple weights and styles and expected from `/public/fonts/...`.
- No custom Tailwind breakpoints are defined. The current implementation uses Tailwind defaults and explicitly references `md:` breakpoints in typography utilities.

### Important styling caveat

`docs/brand_palette.md` may contain project-specific palette guidance, but `src/styles/colors.css` still contains placeholder colors and comments from another project. Future implementation work should treat the active strategy docs as the source of truth and update the CSS token file accordingly.

## SEO And Utility Systems

- `src/utils/structuredData.ts` provides helpers for:
  - `LocalBusiness`
  - `WebSite`
  - `WebPage`
  - `BreadcrumbList`
  - `BlogPosting`
  - `FAQPage`
  - `Service`
- The layout injects `LocalBusiness` schema sitewide and accepts additional page-level JSON-LD via props.
- `src/utils/imageRegistry.ts` uses `import.meta.glob()` to map `/src/assets` files to `/assets/...` JSON-friendly paths for Astro image usage.

### Current SEO caveat

Structured data values are still placeholder defaults such as `Site Name`, `https://site.com`, and `info@site.com`. These need to be replaced before launch.

## Scripts And Commands

Use `yarn`, since `yarn.lock` is present in the repo.

- `yarn install` - install dependencies
- `yarn dev` - start Astro dev server
- `yarn build` - create the static production build
- `yarn preview` - preview the built site locally
- `yarn astro` - run Astro CLI commands directly

## Build And Development Notes

- Minimum Node version is `>=22.12.0`.
- The production build currently succeeds.
- The build outputs a static site to `dist/`.
- Only one route is currently generated: `/index.html`.
- `Astro.site` is not configured in the checked-in config, so layout-level canonical URLs and some schema fallbacks resolve against `https://site.com/` unless overridden.

## Current State

The repository is in a foundation/scaffold stage rather than a finished marketing site state.

Implemented now:

- base Astro project configuration
- global layout and metadata shell
- placeholder homepage
- typography system and placeholder color tokens
- structured data helper library
- image registry utility
- component registry plan for future sections

Not yet implemented:

- homepage sections described in the active strategy blueprint
- interior routes such as service pages, gallery or case-study pages, about, contact, and location pages
- production business metadata
- aligned brand color tokens
- content collections or MDX content files
- real assets in `src/assets/`
- finalized contact, form, and quote conversion flow

## Constraints And Conventions

- `docs/strategy_blueprint.md` and `docs/brand_palette.md` should be treated as project-specific inputs that can change from clone to clone.
- Generated summaries should describe implementation state, not override strategy.
- Preserve or carefully redirect ranking URLs when the real site architecture is built out.
- Keep the experience premium and restrained, but informative enough for local SEO and homeowner decision-making.
- The public metadata files are not yet aligned with this project:
  - `public/site.webmanifest` still references another brand
  - `public/robots.txt` still points to `https://site.com/sitemap.xml`
- Contact strategy from the blueprint prioritizes phone and form contact over public email display.
