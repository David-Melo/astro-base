---
alwaysApply: false
---
# Brand Color Palette

This project uses a dynamic color system defined in `docs/brand_palette.md`. All brand colors are implemented in `/src/styles/colors.css` using CSS variables.

**⚠️ CRITICAL:** Before applying any colors or creating components, you MUST read `docs/brand_palette.md` to retrieve the specific hex codes and semantic mappings for the current project.

## 🎨 Semantic Tokens (Dynamic)

Use these semantic tokens in Tailwind classes. The actual values are determined by the `brand_palette.md` file.

| Tailwind Token | CSS Variable | Usage Description |
|----------------|--------------|-------------------|
| `bg-primary` / `text-primary` | `var(--color-primary)` | Main brand color (Buttons, Links, Highlights) |
| `bg-primary-glow` | `var(--color-primary-glow)` | Hover states for primary elements |
| `bg-accent` / `text-accent` | `var(--color-accent)` | Secondary/Action color (CTAs, Important highlights) |
| `bg-accent-dark` | `var(--color-accent-dark)` | Hover states for accent elements |
| `bg-secondary` | `var(--color-secondary)` | Muted/Neutral elements (Borders, Secondary text) |
| `bg-background` / `text-background` | `var(--color-background)` | Main page background |
| `bg-card` | `var(--color-card)` | Elevated surfaces (Cards, Modals) |
| `bg-background-dark` | `var(--color-background-dark)` | Dark backgrounds (Footers, Dark sections) |
| `text-foreground` | `var(--color-foreground)` | Primary text color (Off-black) |
| `text-text-secondary` | `var(--color-text-secondary)` | Secondary/Muted text color |
| `text-error` / `bg-error` | `var(--color-error)` | Error states, Destructive actions |
| `text-success` / `bg-success` | `var(--color-success)` | Success states, Confirmations |
| `text-info` / `bg-info` | `var(--color-info)` | Information alerts |
| `text-warning` / `bg-warning` | `var(--color-warning)` | Warnings |
| `text-critical` / `bg-critical` | `var(--color-critical)` | Critical alerts, High priority |

## Implementation Guidelines

### 1. Reading the Palette
*   **Step 1**: Read `docs/brand_palette.md`.
*   **Step 2**: Extract the Hex codes for all required keys (Primary, Secondary, Functional Colors, etc.).
*   **Step 3**: If `src/styles/colors.css` does not match the palette, UPDATE IT immediately using the format below.

### 2. Updating CSS Variables
To apply the brand colors, write to `src/styles/colors.css`:

```css
:root {
  /* PRIMARY: The main brand identity color */
  --color-primary: [HEX_FROM_PALETTE_PRIMARY];
  --color-primary-glow: [HEX_LIGHTER_VARIANT];

  /* ACCENT: The action/CTA color */
  --color-accent: [HEX_FROM_PALETTE_ACCENT];
  --color-accent-dark: [HEX_DARKER_VARIANT];

  /* BACKGROUNDS: Base surfaces */
  --color-background: [HEX_FROM_PALETTE_BACKGROUND]; /* Usually White/Off-White */
  --color-card: [HEX_FROM_PALETTE_NEUTRAL];          /* Light Gray */
  --color-background-dark: [HEX_FROM_PALETTE_DARK];  /* Dark Gray/Black */

  /* TEXT: Readability colors */
  --color-foreground: [HEX_FROM_PALETTE_TEXT_MAIN];  /* Off-Black */
  --color-text-secondary: [HEX_FROM_PALETTE_TEXT_MUTED];
  
  /* SECONDARY: Borders & Subtle elements */
  --color-secondary: [HEX_FROM_PALETTE_SECONDARY];

  /* FUNCTIONAL / SEMANTIC COLORS */
  --color-error: [HEX_FROM_PALETTE_ERROR];       /* Red */
  --color-success: [HEX_FROM_PALETTE_SUCCESS];   /* Green */
  --color-info: [HEX_FROM_PALETTE_INFO];         /* Blue */
  --color-warning: [HEX_FROM_PALETTE_WARNING];   /* Yellow */
  --color-critical: [HEX_FROM_PALETTE_CRITICAL]; /* Orange */
}
```

### 3. Component Usage
When building components, **NEVER hardcode hex values**.

*   **Correct**: `<button class="bg-primary text-white hover:bg-primary-glow">`
*   **Incorrect**: `<button class="bg-[#1E40AF] ...">`

### 4. Preline UI Integration
This project uses **Preline UI**. Preline components often come with hardcoded colors (e.g., `bg-blue-600`, `text-gray-800`).

**When using Preline components:**
1.  **Copy** the component HTML.
2.  **Identify** the default color classes (usually `blue`, `gray`, `slate`).
3.  **Replace** them with our **Semantic Tokens**:
    *   `bg-blue-600` → `bg-primary`
    *   `text-blue-600` → `text-primary`
    *   `bg-gray-800` → `bg-card` or `bg-background-dark`
    *   `text-gray-500` → `text-text-secondary`
    *   `focus:ring-blue-500` → `focus:ring-primary`
4.  **Keep** functional classes (layout, spacing, typography) as is.

### 5. Gradients (If defined in Palette)
If `docs/brand_palette.md` specifies gradients:
*   Define `var(--gradient-primary)` in `colors.css`.
*   Use in Tailwind as `bg-[image:var(--gradient-primary)]`.