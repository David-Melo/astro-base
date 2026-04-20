---
description: Agent for syncing the SiloPage component registry with available components. Run after adding new components to make them available for silo pages.
globs:
  - src/components/SiloPage.astro
  - src/components/silo-registry.json
alwaysApply: false
---

# Silo Sync Agent

This agent synchronizes the `SiloPage.astro` component registry with the available components in the project. Run this agent after adding, removing, or renaming components to keep the silo system up to date.

## When to Run This Agent

- After running the **component documentation agent** (`generate component types`)
- After adding a new section-level component to `src/components/`
- After removing or renaming a component
- When you see "Unknown component" warnings during build

## How It Works

1. Reads `src/components/silo-registry.json` for the allowed/excluded component lists
2. Updates the imports and `COMPONENT_MAP` in `SiloPage.astro`
3. Ensures the silos-agent documentation stays accurate

## Registry File

The source of truth for which components can be used in silo pages is:

**`src/components/silo-registry.json`**

```json
{
  "allowed": [
    "HeroInterior",
    "HeroPage",
    "IntroSection",
    ...
  ],
  "excluded": [
    "HeroForm",
    "Section",
    "SectionHeader",
    "Button",
    ...
  ],
  "excludeReasons": {
    "HeroForm": "Only for lead-gen landing pages with forms",
    "Section": "Internal building block, not a section component",
    ...
  }
}
```

## Sync Process

When invoked, perform these steps:

### Step 1: Read the Registry

```bash
cat src/components/silo-registry.json
```

### Step 2: Verify Components Exist

For each component in `allowed`, verify that:
- `src/components/{ComponentName}.astro` exists
- The component has a Props interface exported

### Step 3: Update SiloPage.astro

Update the imports section:
```astro
// =============================================================================
// Component Registry - Auto-generated, do not edit manually
// Run "sync silo components" to regenerate
// =============================================================================
import HeroInterior from './HeroInterior.astro';
import HeroPage from './HeroPage.astro';
// ... all allowed components
```

Update the COMPONENT_MAP:
```astro
const COMPONENT_MAP: Record<string, any> = {
  HeroInterior,
  HeroPage,
  // ... all allowed components
};
```

### Step 4: Update Documentation

Update `.cursor/rules/silos-agent.mdc` with the current allowed component list if it has changed.

## Adding a New Component to Silo Pages

When the user wants to make a new component available for silo pages:

1. **Add to registry**:
   Edit `src/components/silo-registry.json`:
   ```json
   {
     "allowed": [
       // ... existing
       "NewComponent"
     ]
   }
   ```

2. **Run sync**:
   This agent will update `SiloPage.astro` imports and COMPONENT_MAP

3. **Verify**:
   ```bash
   yarn build
   ```

## Removing a Component from Silo Pages

1. Move the component from `allowed` to `excluded` in the registry
2. Add an `excludeReasons` entry explaining why
3. Run this sync agent
4. Update any silo JSON files that use the component

## Validation

After syncing, verify:
- [ ] All imports in SiloPage.astro are valid
- [ ] COMPONENT_MAP keys match import names
- [ ] `yarn build` succeeds
- [ ] No "Unknown component" warnings

## Integration with Component Documentation Agent

The component documentation agent (`generate component types`) should be updated to also:
1. Check if new components should be added to the silo registry
2. Prompt the user: "Component X was added. Should it be available for silo pages? (y/n)"
3. If yes, add to `silo-registry.json` and run this sync agent

Alternatively, run this agent manually after the documentation agent.