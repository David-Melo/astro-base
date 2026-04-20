---
alwaysApply: false
---

# Accessibility Standards

Use this rule whenever generating or editing UI, page structure, navigation, forms, or interactive behavior.

## Goal

Ship websites that are usable, understandable, and navigable for real people using keyboards, assistive technology, reduced-motion preferences, zoom, and mobile devices.

## Core Principle

Accessibility is not a polish layer added at the end. It must shape layout, component choices, copy structure, and interaction patterns from the start.

## Landmarks And Page Structure

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer` where they fit.
- Each page should have one clear `main` region.
- Use one H1 per page.
- Keep heading levels in logical order. Do not jump from H1 to H4 without structure between them.
- Section headings should reflect the real content hierarchy, not just a visual style preference.

## Links, Buttons, And Interactive Controls

- Use links for navigation and buttons for actions.
- Interactive labels must be explicit. Avoid vague text like "Click here" or "Learn more" without context nearby.
- Icon-only controls must include an accessible name via visible text or `aria-label`.
- Focus styles must remain visible. Do not remove outlines without a clear accessible replacement.
- Hover-only interactions must also work with keyboard focus.

## Forms

- Every input must have a visible label or a programmatically associated label.
- Placeholder text must not be the only label.
- Required fields should be clearly marked.
- Helper text and validation errors must be associated with the field they describe.
- Error states must explain what is wrong and how to fix it.
- After failed validation, focus should move predictably to the first problem or to an error summary.
- Success and error messages should be easy to notice and understandable without color alone.

## Images And Media

- Informative images need concise, descriptive alt text.
- Decorative images should use empty alt text.
- Alt text should explain what the image shows and why it matters in context.
- Do not stuff keywords into alt text.
- Avoid relying on images alone to communicate critical information.

## Motion, Contrast, And Readability

- Maintain strong contrast for text, controls, and focus indicators.
- Do not communicate meaning with color alone.
- Respect `prefers-reduced-motion` for animations, transitions, and auto-advancing effects.
- Use readable line lengths, spacing, and tap targets.
- Ensure UI still works when users zoom in or enlarge text.

## Navigation And Repeated UI

- Navigation structure should be understandable without visual guesswork.
- Repeated site chrome should be consistent across pages.
- If a menu, accordion, modal, or disclosure opens and closes, keyboard behavior must remain predictable.
- Avoid keyboard traps.

## Content And Copy Structure

- Headings should help a screen-reader or skim reader understand the page quickly.
- Lists should use semantic list markup when content is truly a list.
- Tables should be used only for tabular information, not layout.
- CTA copy should stay specific and understandable out of context when possible.

## Human Verification Checklist

Before considering work complete, do a basic accessibility sanity pass:

- Can the page be navigated with a keyboard?
- Is there one H1 and a sensible heading order?
- Do links and buttons have clear labels?
- Do forms have labels, helper text, and understandable error states?
- Are important images described appropriately?
- Are contrast and focus states still visible?
- Does motion remain reasonable for users who prefer less animation?

## When In Doubt

- Prefer simpler patterns over clever ones.
- Prefer semantic HTML over extra wrappers and JavaScript.
- Prefer clarity, predictability, and readable structure over visual novelty.
