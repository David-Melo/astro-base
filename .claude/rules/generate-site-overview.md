---
alwaysApply: false
---
# Generate Site Overview Prompt

Use this prompt to generate or regenerate the `SITE_OVERVIEW.md` file—a comprehensive implementation summary that documents what has been built, what the current state is, and what comes next.

## Purpose

`SITE_OVERVIEW.md` is a **project implementation summary** that lives at the project root. It serves as:
- A handoff document for stakeholders or new team members.
- A record of what has been built and how it aligns with the brand strategy.
- A snapshot of current features, components, and content.
- A roadmap of next steps and pending work.

This is **different** from `.claude/rules/overview.md`, which is a generated technical project structure reference for AI agents.
Neither summary document should override `docs/strategy_blueprint.md` on brand, audience, messaging, or structural intent.

## Sources of Truth

When generating `SITE_OVERVIEW.md`, you must pull information from:

### Client-Specific (from `docs/`)
- `docs/strategy_blueprint.md` → Brand identity, USPs, target audience, tone, color palette, key differentiators.
- `docs/brand_palette.md` → Color system with hex values and usage guidelines.
- `docs/client_intake_form.json` (or `.md`/`.csv`) → Client name, slogan, contact info, GEO target.
- `docs/sitemap.md` → Page structure and routes.
- `docs/design-brief.md` → Design requirements and constraints (if present).
- `docs/navbar.md` & `docs/footer.md` → Navigation and footer structure (if present).

### Project-Specific (from codebase)
- `package.json` → Dependencies and versions.
- `src/components/` → List of components created.
- `src/pages/` → Pages implemented.
- `src/content/` → MDX content files.
- `src/styles/` → Styling architecture.
- `public/` → Assets and fonts.
- `astro.config.mjs`, `tsconfig.json`, `postcss.config.cjs` → Configuration.

## Instructions

When generating or regenerating `SITE_OVERVIEW.md`, follow these steps:

### 1. Read Client Identity
- Read `docs/strategy_blueprint.md` to extract:
  - Client name and tagline/slogan.
  - Executive summary (who they are, what they offer).
  - Target audience and GEO.
  - Tone of voice.
  - Key differentiators (USPs).
- Read `docs/brand_palette.md` to extract:
  - Primary, secondary, and accent colors with hex values.
  - Design aesthetic/vibe.

### 2. Audit the Codebase
- Scan `src/components/` and list all components with brief descriptions.
- Scan `src/pages/` and list all implemented pages.
- Scan `src/content/pages/` for MDX content files.
- Check `src/styles/` for the styling architecture (colors, typography, global).
- Check `public/` for fonts and asset organization.
- Read `package.json` for the tech stack and versions.

### 3. Document the Implementation
Compile the findings into the output structure below.

### 4. Identify Next Steps
Based on `docs/strategy_blueprint.md` and the current implementation:
- What pages or features are still pending?
- What content gaps exist?
- What integrations or enhancements are planned?

## Output Structure

Write the file to `SITE_OVERVIEW.md` at the project root using this structure:

```markdown
# [Client Name] - Website Implementation Summary

## 🎉 Project Status
[One sentence stating the project status: Complete, In Progress, etc.]

A [brief description] website has been created for **[Client Name]**, [location/service area description].

---

## 🎨 Brand Implementation

### Color System
- **Primary ([Name])**: `#XXXXXX` - [Usage description]
- **Secondary ([Name])**: `#XXXXXX` - [Usage description]
- **Accent ([Name])**: `#XXXXXX` - [Usage description]
- **Background Dark**: `#XXXXXX` - [Usage description]
- **Design Aesthetic**: [Description of the overall vibe]

### Typography System
- Custom font: **[Font Name]** ([variants available])
- Semantic classes: [List key typography classes if defined]

### Icon System
- **[Icon library]** via [integration method]
- Usage: `[example usage pattern]`

---

## 📦 Components Created

### Layout Components
1. **[Component.astro]** - [Brief description]
2. ...

### Section Components
3. **[Component.astro]** - [Brief description]
4. ...

### Utility Components
5. **[Component.astro]** - [Brief description]
6. ...

---

## 📄 Pages & Content

### Implemented Pages
| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | ✅ Complete |
| `/about` | About | ✅ Complete |
| ... | ... | ... |

### Homepage Sections
1. **Hero Section** - [Brief description of content/messaging]
2. **[Section Name]** - [Brief description]
3. ...

---

## 🚀 Key Features

### Conversion Optimization
- [Feature 1]
- [Feature 2]
- ...

### User Experience
- [Feature 1]
- [Feature 2]
- ...

### SEO Optimization
- [Feature 1]
- [Feature 2]
- ...

---

## 🛠 Technical Stack

- **[Framework]** - [Description]
- **[Styling]** - [Description]
- **[UI Library]** - [Description]
- **[Icons]** - [Description]
- **[Language]** - [Description]
- **[Content]** - [Description]

---

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

---

## 🎯 Next Steps

### Immediate Priorities
1. [Task 1]
2. [Task 2]
3. ...

### Content Expansion
1. [Task 1]
2. [Task 2]
3. ...

### Performance & Analytics
1. [Task 1]
2. [Task 2]
3. ...

---

## ✅ Build Status

**Build Status**: [✅ Success / ❌ Failing / 🔄 In Progress]  
**Last Build**: [Date or "Not yet built"]

---

## 🚀 Deployment

To deploy the site:

\`\`\`bash
yarn build    # Build for production
yarn preview  # Preview production build locally
\`\`\`

Deploy `dist/` directory to any static host:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

---

## 📞 Contact Information

**Business Name**: [From strategy blueprint]  
**Phone**: [From strategy blueprint]  
**Email**: [From strategy blueprint]  
**Address**: [From strategy blueprint]  
**Service Area**: [From strategy blueprint]

---

**Built following the [Client Name] brand strategy and development guidelines.**
```

## Quick Generate Command

> "Generate `SITE_OVERVIEW.md` using `@generate-site-overview`. Read the strategy blueprint, scan the codebase, and create a comprehensive implementation summary."

## Example Usage

After completing a major milestone:
> "Regenerate @SITE_OVERVIEW.md to reflect the current state of the project. Include all new components, pages, and features."

After initial site build:
> "Create the initial @SITE_OVERVIEW.md documenting everything we've built so far."

For handoff:
> "Update @SITE_OVERVIEW.md with the latest implementation details for client handoff."