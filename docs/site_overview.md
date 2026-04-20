# Site Overview

## Project Status

The site is in early implementation. The repository is best understood as a reusable starter with project-specific strategy inputs, while the shipped frontend is still a scaffold with one placeholder homepage and shared foundation utilities.

## Brand Implementation

The intended design direction in the current strategy docs is clear:

- premium, calm, Apple-inspired restraint
- a clear service-led positioning for the target client
- primary emphasis on the client's main offer, proof, and conversion path
- refined green plus warm neutral palette
- Euclid Circular B typography

What is implemented today only partially reflects that direction:

- Euclid typography is wired into the global styles
- the actual color token file still uses placeholder colors from another project
- page copy and metadata are still generic placeholder content

## Components Created

Implemented:

- base page shell in `src/layouts/Layout.astro`
- placeholder homepage in `src/pages/index.astro`
- shared typography and color token files
- structured data utility module
- image registry utility

Planned but not yet built:

- hero
- intro section
- benefits grid
- services grid
- process steps
- testimonials
- case study
- long-form content section
- FAQ accordion
- comparison section
- related links section
- final CTA section

Those planned sections are documented in `src/components/component-registry.json`, but the component files themselves do not exist yet.

## Pages And Content

Current route inventory:

- `/` - placeholder homepage with generic title, description, and a `Welcome` heading

Pages commonly called for by strategy but not implemented yet:

- Home
- Core service pages
- Gallery / Projects
- About
- Contact
- Service Areas or location pages

Content system status:

- no `src/content/` directory
- no content collections
- no editorial or gallery content files
- no image assets currently registered in `src/assets/`

## Key Features

Available today:

- static Astro build pipeline
- sitewide SEO metadata shell
- JSON-LD helpers for business, page, FAQ, service, breadcrumb, and blog schemas
- image registry utility for future Astro image usage
- global Tailwind v4 styling setup
- Preline runtime loaded in the layout for future interactive sections

Still missing:

- real lead capture or contact flow
- service comparison or offer explanation content
- gallery/project proof
- service-area or location content
- production brand and business metadata

## Technical Stack

- `Astro 6.1.7`
- `TypeScript`
- `Tailwind CSS v4`
- `Preline 4.1.3`
- `React 19` support enabled
- `MDX` support enabled
- `PostCSS` + `autoprefixer`
- static output build

## Responsive Breakpoints

- No custom breakpoints are configured.
- The project currently relies on Tailwind's default responsive system.
- Existing typography utilities explicitly use the `md:` breakpoint for larger heading and text sizes.

## Build Status

- `yarn build` succeeds
- current output generates a single static page: `/index.html`

## Deployment Notes

- The site builds as a static Astro output and can be deployed to any static host.
- No deployment platform configuration is checked in yet.
- `Astro.site` is not configured, so canonical URLs and schema defaults still fall back to `https://site.com`.
- Public metadata needs cleanup before launch:
  - `site.webmanifest` still references another brand
  - `robots.txt` still uses a placeholder sitemap URL

## Contact Information

- contact details should come from the active client strategy and launch assets
- public-facing email should only be shown if it is explicitly provided for the current project
- structured data still contains placeholder contact and business identity values that must be replaced before production

## Next Steps

1. Align global color tokens, manifest data, robots metadata, and structured data with the active project's brand and launch data.
2. Build the approved component foundation from the planned registry so pages are composed from real reusable sections.
3. Replace the placeholder homepage with the strategy-driven homepage narrative and conversion flow.
4. Add the core service and trust pages needed by the current project, such as service, gallery, about, contact, and location pages.
5. Implement the contact or lead-capture experience called for in the active strategy.
6. Add real photography, logos, and optimized image assets.
