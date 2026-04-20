---
description: Component hierarchy system - distinguishing Section-level components from Atom components.
globs: src/components/**/*.astro
---

# Component Hierarchy System

This project uses a **two-tier component hierarchy** to ensure proper page composition and prevent layout mistakes.

> [!CRITICAL]
> **Understanding this hierarchy is ESSENTIAL for page generation.**
> Misusing Atom components as top-level page sections will result in broken layouts with missing padding, headings, and semantic structure.

---

## Component Levels

### 1. SECTION Components

**Definition**: Self-contained page sections that can be placed directly in a page layout. They include their own:
- Section wrapper with proper vertical padding
- Section header (title/subtitle)
- Background handling
- Semantic HTML `<section>` element

**Characteristics**:
- ✅ Wrap content in `<Section>` component or equivalent padding
- ✅ Include `title` and often `subtitle` props
- ✅ Render a heading element (H2 or H3) via `<SectionHeader>` or inline
- ✅ Can be used directly at the top level of page content
- ✅ Are self-sufficient and need no parent wrapper

**Examples**:
- `ProcessSteps` - Has title/subtitle props, wraps in `<Section>`
- `IntroSection` - Has headline/subheadline, includes Section wrapper
- `ContentSection` - Text-heavy content section with title/subtitle and Section wrapper
- `CTASection` - Has title/subtitle, complete with background and padding
- `FaqAccordion` - Has title/subtitle, wraps in Section
- `TestimonialsSection` - Has title/subtitle, complete layout

**Usage in Page**:
```astro
---
import ProcessSteps from '@components/ProcessSteps.astro';
import CTASection from '@components/CTASection.astro';
---

<Layout>
  <!-- ✅ Correct: Section components directly in page -->
  <ProcessSteps 
    title="Our Simple Process" 
    subtitle="From inspection to protection"
    steps={[...]}
  />
  <CTASection 
    title="Ready to Get Started?"
    subtitle="Contact us today"
  />
</Layout>
```

---

### 2. ATOM Components

**Definition**: Building blocks designed to be used INSIDE other components or sections. They do NOT include:
- Section wrappers or padding
- Their own headings
- Background handling

**Characteristics**:
- ❌ NO `<Section>` wrapper
- ❌ NO title/subtitle props (or if they exist, not rendered as section headers)
- ❌ NO vertical section padding (py-16, py-24, etc.)
- ⚠️ MUST be placed inside a Section component or other wrapper
- ⚠️ Are NOT self-sufficient

**Examples**:
- `StatsBar` - Just a grid of stat items, no section wrapper
- `Button` - Interactive element, no layout context
- `ServiceCard` - Individual card, meant for grids
- `SectionHeader` - Heading utility, used BY sections
- `Section` - Wrapper utility, used BY sections
- `DecorativeSpacer` - Visual element between sections

**Correct Usage (Inside a Section)**:
```astro
---
import Section from '@components/Section.astro';
import SectionHeader from '@components/SectionHeader.astro';
import StatsBar from '@components/StatsBar.astro';
---

<!-- ✅ Correct: Atom wrapped in Section with its own header -->
<Section background="surface" padding="lg">
  <SectionHeader 
    title="Our Track Record" 
    subtitle="Numbers that speak for themselves" 
  />
  <StatsBar stats={[...]} />
</Section>
```

**INCORRECT Usage (Direct in Page)**:
```astro
<!-- ❌ WRONG: Atom used directly without wrapper -->
<ProcessSteps title="Our Process" steps={[...]} />
<StatsBar stats={[...]} /> <!-- Missing section wrapper, heading, padding! -->
<CTASection title="Get Started" />
```

---

## Identifying Component Level

### Quick Test

Ask these questions to determine if a component is a Section or Atom:

| Question | Section | Atom |
|----------|---------|------|
| Does it have a `title` prop that renders as H2? | ✅ Yes | ❌ No |
| Does it wrap itself in `<Section>` or have py-16+ padding? | ✅ Yes | ❌ No |
| Can it stand alone on a page without a wrapper? | ✅ Yes | ❌ No |
| Is it meant to be repeated inside a grid/list? | ❌ No | ✅ Yes |
| Does it import/use `Section.astro`? | ✅ Usually | ❌ No |

### JSDoc Level Tag

Every component MUST include a `@level` tag in its JSDoc:

```astro
---
/**
 * @component ProcessSteps
 * @level section
 * @description Displays a step-by-step process...
 */
---
```

```astro
---
/**
 * @component StatsBar
 * @level atom
 * @description A horizontal grid of key metrics...
 */
---
```

---

## Component Classification Reference

### Section Components (Use Directly in Pages)

| Component | Has Title | Has Section Wrapper | Notes |
|-----------|-----------|---------------------|-------|
| `HeroInterior` | ✅ | ✅ | Interior page hero |
| `HeroPage` | ✅ | ✅ | Standard page hero |
| `HeroForm` | ✅ | ✅ | Lead-gen hero with form |
| `IntroSection` | ✅ | ✅ | Introductory content block |
| `ApproachSection` | ✅ | ✅ | Methodology/approach display |
| `CommitmentSection` | ✅ | ✅ | Company commitments |
| `ContentSection` | ✅ | ✅ | Text-heavy content with rich formatting |
| `CoverageSection` | ✅ | ✅ | Service area coverage |
| `CTASection` | ✅ | ✅ | Call-to-action block |
| `FaqAccordion` | ✅ | ✅ | FAQ with accordion |
| `IconFeatureGrid` | ✅ | ✅ | Features with icons |
| `ProcessSteps` | ✅ | ✅ | Step-by-step process |
| `ServicesGrid` | ✅ | ✅ | Grid of service cards |
| `TeamSection` | ✅ | ✅ | Team member display |
| `TestimonialsSection` | ✅ | ✅ | Customer testimonials |
| `TrustSignals` | ✅ | ✅ | Trust badges/signals |
| `ValuesGrid` | ✅ | ✅ | Company values grid |
| `WhyChooseGrid` | ✅ | ✅ | USP grid layout |
| `AlertBanner` | ✅ | Inline | Alert/notification banner |
| `CalloutBanner` | ✅ | ✅ | Promotional callout |

### Atom Components (Use Inside Sections)

| Component | Purpose | Use Inside |
|-----------|---------|------------|
| `Button` | Interactive CTA element | Any component |
| `Section` | Wrapper with padding/background | N/A (is the wrapper) |
| `SectionHeader` | H2 + subtitle block | Section components |
| `StatsBar` | Stats/metrics grid | Custom Section wrapper |
| `ServiceCard` | Individual service card | `ServicesGrid` |
| `ServicePillarCard` | Pillar service card | `ServicesGrid` |
| `TeamMemberCard` | Team member card | `TeamSection` |
| `TestimonialCard` | Testimonial card | `TestimonialsSection` |

> **Note**: `DecorativeSpacer` has section-level padding and heading, so it's classified as a section component.

---

## Rules for Dev Agents

### When Generating Pages

1. **ONLY use Section components at the top level** of page content
2. **NEVER place Atom components directly in page layout** without wrapping
3. **If you need custom content with an Atom**, compose it properly:

```astro
<!-- ✅ Correct composition with Atom -->
<Section background="surface" padding="lg">
  <SectionHeader title="Your Custom Title" subtitle="Subtitle here" />
  <StatsBar stats={stats} />
</Section>
```

### When Using Silo Registry

- Treat `src/components/component-registry.json` as the primary approved component catalog.
- Treat `src/components/silo-registry.json` as a silo-specific filtered subset of that broader catalog.
- Only `@level section` components should be in the `allowed` list
- All `@level atom` components must be in the `excluded` list

### When Creating New Components

1. Decide upfront: Is this a Section or Atom?
2. Add the `@level` tag to JSDoc
3. If Section: wrap in `<Section>`, include title prop, use `<SectionHeader>`
4. If Atom: document that it requires a parent wrapper

---

## Fixing Atom Misuse

If you encounter an Atom used at top-level (like `StatsBar` without wrapper):

**Before (broken)**:
```astro
<ProcessSteps title="..." steps={[...]} />
<StatsBar stats={[...]} />
<CTASection title="..." />
```

**After (fixed)**:
```astro
<ProcessSteps title="..." steps={[...]} />
<Section background="white" padding="md">
  <SectionHeader title="Our Proven Track Record" subtitle="See why thousands trust us" />
  <StatsBar stats={[...]} />
</Section>
<CTASection title="..." />
```

---

## Maintenance

When adding new components:
1. Classify as Section or Atom based on the criteria above
2. Add `@level section` or `@level atom` to JSDoc
3. Update `component-registry.json`
4. Update `silo-registry.json` accordingly when the component is relevant to silo pages
5. Run component documentation regeneration