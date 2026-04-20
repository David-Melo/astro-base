# Astro Marketing Site Starter

This repository is a reusable Astro-based starter for marketing websites.

The project is currently in a foundation stage. The codebase includes the base Astro/Tailwind setup, shared layout, typography system, SEO utilities, and a planned component registry. Client-specific strategy, content, and branding can be layered on top of this base per project clone.

## Tech Stack

- `Astro 6`
- `TypeScript`
- `Tailwind CSS v4`
- `Preline`
- `React 19` support via `@astrojs/react`
- `MDX` support via `@astrojs/mdx`
- `PostCSS` with `autoprefixer`
- `sharp` for image processing

## Getting Started

Use `yarn`, since the repository includes `yarn.lock`.

```bash
yarn install
yarn dev
```

The dev server starts on Astro's default local port unless overridden.

## Scripts

- `yarn dev` - run the local Astro development server
- `yarn build` - build the static production output to `dist/`
- `yarn preview` - preview the built site locally
- `yarn astro` - run Astro CLI commands directly

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

## Development Notes

- Node requirement: `>=22.12.0`
- Output mode is static
- Tailwind is integrated through Vite
- TypeScript path aliases are configured for `@components`, `@layouts`, `@mdx`, `@assets`, and `@utils`
- `Preline` is loaded globally in the shared layout

Current implementation caveats:

- the homepage is still placeholder content
- the component registry describes planned sections, but the corresponding components are not built yet
- structured data still contains placeholder business metadata
- `src/styles/colors.css`, `public/site.webmanifest`, and `public/robots.txt` still need to be aligned with each project's brand and launch data

## Documentation

- `docs/strategy_blueprint.md` - project-specific brand, audience, messaging, SEO, and site strategy
- `docs/brand_palette.md` - project-specific palette and visual direction
- `docs/project_overview.md` - technical summary for agents and contributors
- `docs/site_overview.md` - current implementation snapshot and handoff summary

## Deployment

Run:

```bash
yarn build
```

This generates a static site in `dist/` for deployment to a static hosting platform.
