---
alwaysApply: false
---
# Icon System

## Icon Library
This project uses **Phosphor Duotone Icons** via `@iconify/tailwind4` for Tailwind CSS v4.

## Implementation

### Installation
The following packages are required:
- `@iconify/tailwind4` - Tailwind v4 plugin for Iconify (dev dependency)
- `@iconify-json/ph` - Phosphor icon set data (dev dependency)

### Configuration
The plugin is imported in `/src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@iconify/tailwind4";
```

### How It Works
- **Build-time optimization**: Icons are converted to inline SVGs during the build process
- **Performance**: Only icons actually used in your code are included in the final bundle
- **No icon fonts**: No additional HTTP requests or unused icon data
- **Type safety**: Icon names are validated at build time

### Usage
Use Phosphor duotone icons with the following syntax:

```html
<span class="icon-[ph--bug-duotone] size-6"></span>
```

**Format breakdown:**
- `icon-[ph--bug-duotone]` - Iconify class syntax (Phosphor duotone icon)
- `ph` - Phosphor icon set prefix
- `--` - Double dash separates the prefix from the icon name
- `bug-duotone` - The full icon name with variant (use single hyphens within the name)
- Examples: `arrow-right-duotone`, `chart-line-up-duotone`, `facebook-logo-duotone`
- `size-6` - Tailwind utility to control icon size

### Examples

```html
<!-- Navigation icons -->
<span class="icon-[ph--list-duotone] size-5"></span>
<span class="icon-[ph--x-duotone] size-5"></span>
<span class="icon-[ph--arrow-right-duotone] size-4"></span>

<!-- Feature icons -->
<span class="icon-[ph--lightning-duotone] size-6"></span>
<span class="icon-[ph--shield-check-duotone] size-6"></span>
<span class="icon-[ph--sparkle-duotone] size-32"></span>

<!-- Social icons -->
<span class="icon-[ph--facebook-logo-duotone] size-5"></span>
<span class="icon-[ph--x-logo-duotone] size-5"></span>
<span class="icon-[ph--linkedin-logo-duotone] size-5"></span>
```

### Sizing
Use Tailwind utilities to control icon dimensions:

**For small to medium icons, use `size-*` utilities:**
```html
<span class="icon-[ph--arrow-right-duotone] size-4"></span>  <!-- 16px -->
<span class="icon-[ph--phone-call-duotone] size-5"></span>   <!-- 20px -->
<span class="icon-[ph--shield-check-duotone] size-6"></span> <!-- 24px -->
<span class="icon-[ph--lightning-duotone] size-8"></span>    <!-- 32px -->
```

**For large icons, use explicit `w-*` and `h-*` utilities:**
```html
<span class="icon-[ph--medal-duotone] w-16 h-16"></span>     <!-- 64px -->
<span class="icon-[ph--house-duotone] w-20 h-20"></span>     <!-- 80px -->
<span class="icon-[ph--sparkle-duotone] w-32 h-32"></span>   <!-- 128px -->
```

**For responsive sizing:**
```html
<span class="icon-[ph--star-duotone] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"></span>
```

**When icon class comes from a variable:**
```html
<!-- Correct -->
<span class={iconClass + " w-16 h-16 text-primary"}></span>

<!-- Also correct with responsive sizing -->
<span class={iconClass + " w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-primary"}></span>
```

### Finding Icons
Browse the complete Phosphor icon library at [https://phosphoricons.com/](https://phosphoricons.com/)

**To use an icon:**
1. Find the icon on phosphoricons.com
2. Note the icon name (e.g., "Arrow Right")
3. Convert to the format: `icon-[ph--arrow-right-duotone]` (kebab-case, single hyphens within name)
4. Add Tailwind size utilities as needed

## Important Notes

- ✅ **Use this approach** - Optimized for performance with build-time SVG generation
- ✅ **Phosphor duotone only** - Stick to the duotone style for brand consistency
- ❌ **Never use inline SVG** - Use the Iconify plugin for all icons
- ❌ **Never use icon fonts** - They hurt performance with unnecessary HTTP requests
- ❌ **Never use other icon libraries** - Phosphor duotone is the brand standard

## Why This Approach?

1. **Performance**: Only icons you use are included as inline SVGs (no font files)
2. **Developer Experience**: Simple class-based syntax, no imports needed
3. **Build-time validation**: Typos in icon names are caught during build
4. **Optimized for Astro**: Works perfectly with Astro's build process
5. **Zero runtime overhead**: Icons are static SVG markup in the HTML