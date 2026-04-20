---
description: Standards for Astro component documentation, type safety, and semantic optimization.
globs: src/components/**/*.astro
---

# Component Documentation Standards

All Astro components in this project must adhere to the following standards to ensure they are discoverable and usable by both human developers and AI agents.

> [!IMPORTANT]
> This rule applies **ONLY** to content components within `src/components/`. 
> **DO NOT** apply these JSDoc standards to layouts in `src/layouts/`.

> [!CAUTION]
> **Global/Layout Components Live Separately**
> 
> Components like `Navbar` and `Footer` are **global layout components** and live in `src/layouts/components/`. 
> These are used exclusively by `Layout.astro` and should **NEVER** be used within page content or other components.
> 
> When generating pages or composing content, **only use components from `src/components/`** — never import from `src/layouts/components/`.

## 1. Exported Prop Types
Every component that accepts props must define them in an exported `Props` interface. This allows other components and agents to inspect the component's API.

```astro
---
export interface Props {
  // ... props
}
---
```

## 2. JSDoc Documentation
Components must include a JSDoc block at the top of the frontmatter script.

### Required Fields:
- `@component`: The name of the component.
- `@level`: Either `section` or `atom`. See `component-hierarchy.md` for definitions.
- `@description`: A concise explanation of what the component does.
- `@usage`: A code snippet showing how to use the component.
- `@semantic`: A breakdown of the component's role in the marketing and SEO strategy.

> [!IMPORTANT]
> **The `@level` tag is CRITICAL for proper page generation.**
> - `section` = Self-contained page section with title, padding, and Section wrapper. Can be used directly at page level.
> - `atom` = Building block meant to be used INSIDE other components. MUST be wrapped in a Section or parent component.

### Example Template (Section Component):
```astro
---
/**
 * @component ProcessSteps
 * @level section
 * @description Displays a step-by-step process with numbers, icons, and descriptions.
 * 
 * @usage
 * <ProcessSteps 
 *   title="How It Works" 
 *   subtitle="Our simple 4-step process"
 *   steps={[...]}
 * />
 * 
 * @semantic
 * - **Category**: Solution / Trust
 * - **SEO Role**: Demonstrates professional workflow and expertise.
 * - **User Psychology**: Reduces uncertainty by providing a clear path.
 */

export interface Props {
  /** Section title (H2) */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Array of step objects */
  steps: Step[];
}
---
```

### Example Template (Atom Component):
```astro
---
/**
 * @component StatsBar
 * @level atom
 * @description A horizontal grid of key metrics. Must be wrapped in a Section component.
 * 
 * @usage
 * <Section background="surface" padding="lg">
 *   <SectionHeader title="Our Track Record" />
 *   <StatsBar stats={[...]} />
 * </Section>
 * 
 * @semantic
 * - **Category**: Trust / USP
 * - **SEO Role**: Reinforces credibility through quantifiable achievements.
 * - **User Psychology**: Numbers build trust and demonstrate expertise.
 */

export interface Props {
  /** Array of stat objects to display */
  stats: Stat[];
}
---
```

## 3. Semantic Categories
When documenting the `@semantic` role, use the following categories:
- **Conversion**: Drives actions (CTAs, Forms).
- **USP**: Highlights unique selling points.
- **Trust**: Builds credibility (Testimonials, Badges).
- **Solution**: Presents services or products.
- **Pain Point**: Addresses customer frustrations.
- **Silo**: Supports SEO silo architecture.

## 4. Grid Component Column Best Practices

**IMPORTANT: For grid-based components with auto-column calculation (WhyChooseGrid, IconFeatureSection, ValuesGrid, TestimonialsSection, ServicesGrid, TeamSection, TrustSignals), DO NOT specify the `columns` prop in generated content.**

### Why Omit the Columns Prop?

All grid components have **smart auto-calculation** that determines optimal column count based on:
- Item count
- Content density (text-heavy vs icon-only)
- Readability priorities

### Rules for LLM Content Generation:

1. **NEVER include `"columns"` in JSON** unless you have a specific design reason to override
2. **Let the component decide** - it will choose the most readable layout
3. **Text-heavy grids** (WhyChooseGrid, ValuesGrid, TestimonialsSection) cap at 2-3 columns for readability
4. **Icon-only grids** (TrustSignals) can use up to 4 columns since content is compact

### ✅ Correct JSON (no columns prop):
```json
{
  "component": "IconFeatureSection",
  "props": {
    "title": "Our Services",
    "items": [...]
  }
}
```

### ❌ Incorrect JSON (explicit columns override):
```json
{
  "component": "IconFeatureSection",
  "props": {
    "title": "Our Services",
    "items": [...],
    "columns": 4  // ❌ DON'T DO THIS - removes smart calculation
  }
}
```

### When Explicit Columns ARE Acceptable:

Only override `columns` if you have a specific design requirement, such as:
- Matching a specific brand guideline
- Creating visual balance with adjacent sections
- User explicitly requests a specific column count

## 5. Maintenance
When creating or updating a component, always ensure the documentation reflects the current API and intended use case.

---

## 5. Component Types Barrel Export

A barrel export file at `src/components/types.ts` consolidates all component prop interfaces into a single importable module. This enables:
- **Agent Efficiency**: AI agents can read one file to understand all component APIs without scanning 30+ files.
- **Type Reusability**: Other parts of the codebase can import these types.
- **Documentation**: Serves as a quick reference for all available component props.

### Generating the Types File

When invoked with the command **"generate component types"** or **"regenerate types.ts"**, you must:

1. **Scan all `.astro` files** in `src/components/`
2. **Extract the `Props` interface** from each component's frontmatter
3. **Rename each interface** to `{ComponentName}Props` (e.g., `Button.astro` → `ButtonProps`)
4. **Preserve all JSDoc comments** on individual properties
5. **Add a component-level JSDoc** with `@component` and `@description` extracted from the component
6. **Write the consolidated file** to `src/components/types.ts`

### Types File Format

The generated `types.ts` must follow this structure:

```typescript
/**
 * Component Prop Types Barrel Export
 * 
 * Auto-generated from src/components/*.astro
 * DO NOT EDIT MANUALLY - regenerate using "generate component types" command
 * 
 * @generated
 * @lastUpdated {ISO date string}
 */

// ============================================================================
// {ComponentName}
// ============================================================================

/**
 * @component {ComponentName}
 * @description {extracted description}
 */
export interface {ComponentName}Props {
  /** {prop description} */
  propName: type;
  // ... all props with their JSDoc comments
}

// ... repeat for all components alphabetically
```

### Generation Rules

1. **Alphabetical Order**: Components should be listed alphabetically by name.
2. **Preserve All Types**: Include complex types like objects, arrays, and unions exactly as defined.
3. **Inline Nested Types**: If a prop uses an inline object type (e.g., `{ icon: string; text: string }[]`), keep it inline.
4. **Skip Components Without Props**: If a component has no `Props` interface or has an empty `Props {}`, skip it.
5. **Exclude Layout Components**: Do NOT include components from `src/layouts/components/` (e.g., Navbar, Footer). These are global layout components and should never be suggested for page content.
6. **Update Timestamp**: Always update the `@lastUpdated` field with the current ISO date.

### Example Output

```typescript
/**
 * Component Prop Types Barrel Export
 * 
 * Auto-generated from src/components/*.astro
 * DO NOT EDIT MANUALLY - regenerate using "generate component types" command
 * 
 * @generated
 * @lastUpdated 2025-12-26T12:00:00.000Z
 */

// ============================================================================
// Button
// ============================================================================

/**
 * @component Button
 * @description Flexible button component that renders as either a <button> or <a> tag.
 */
export interface ButtonProps {
  /** Optional URL. If provided, the component renders as an <a> tag. */
  href?: string;
  /** Visual style variant. */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Size of the button. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  class?: string;
  /** HTML button type (only used if href is not provided). */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean;
}

// ============================================================================
// SectionHeader
// ============================================================================

/**
 * @component SectionHeader
 * @description Standardized H2 + subtitle header block for page sections.
 */
export interface SectionHeaderProps {
  /** The main heading text (H2). */
  title: string;
  /** Optional supporting text below the title. */
  subtitle?: string;
  /** Text alignment. */
  align?: 'left' | 'center';
  /** Additional CSS classes. */
  class?: string;
}

// ... additional components
```

### Trigger Conditions

Regenerate `types.ts` when:
- User requests: "generate component types", "regenerate types.ts", or similar
- After running component documentation updates
- A new component is created
- An existing component's Props interface is modified

### Validation

After generation, verify:
- [ ] All components with Props interfaces are included
- [ ] TypeScript syntax is valid (no syntax errors)
- [ ] JSDoc comments are properly formatted
- [ ] File header includes accurate timestamp