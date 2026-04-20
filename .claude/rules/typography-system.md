---
alwaysApply: false
---
### 📄 Body Text

#### `.text-body`
- **Purpose**: Default body text (also applied to `<body>` element)
- **Size**: 1.125rem (18px)
- **Line Height**: 1.625
- **Use Cases**: Paragraphs, standard content

```html
<p class="text-body">This is standard body text for general content.</p>
```

#### `.text-lead`
- **Purpose**: Introductory paragraphs, emphasized text
- **Size**: 1.25rem (20px) → 1.375rem (22px) on tablet+
- **Color**: Slate-700 (`rgb(51 65 85)`)
- **Line Height**: 1.625
- **Use Cases**: First paragraphs, callouts, emphasized content

```html
<p class="text-lead">Start here with larger, more prominent text to draw attention.</p>
```

#### `.text-small`
- **Purpose**: Secondary information, captions, footnotes
- **Size**: 1rem (16px)
- **Color**: Slate-600 (`rgb(71 85 105)`)
- **Line Height**: 1.625
- **Use Cases**: Metadata, timestamps, captions, helper text

```html
<p class="text-small">Published on November 15, 2025</p>
```

---

### 📖 Prose Content

#### `.prose-euclid`
- **Purpose**: Long-form content areas (blog posts, articles)
- **Font**: Euclid Circular B
- **Max Width**: None (override Tailwind prose defaults)
- **Use Cases**: Blog content, documentation, articles

```html
<article class="prose-euclid">
  <!-- Your content with proper heading classes -->
</article>
```

---

## 🎨 Design Hierarchy Best Practices

### Typical Page Structure
```html
<!-- Hero Section -->
<section>
  <h1 class="text-hero">Main Hero Headline</h1>
  <p class="text-subhero">Supporting description text</p>
</section>

<!-- Content Section -->
<section>
  <h2 class="heading-1">Major Section</h2>
  <p class="text-lead">Introductory paragraph with emphasis</p>
  <p class="text-body">Regular body content continues here...</p>
  
  <h3 class="heading-2">Subsection</h3>
  <p class="text-body">More content...</p>
  
  <h4 class="heading-3">Sub-subsection</h4>
  <p class="text-body">Even more content...</p>
</section>

<!-- Cards/Features -->
<div class="card">
  <h3 class="heading-4">Feature Title</h3>
  <p class="text-body">Feature description</p>
  <span class="text-small">Additional metadata</span>
</div>
```

---

## 🚫 What NOT To Do

### ❌ DON'T use Tailwind text size utilities
```html
<!-- WRONG -->
<h1 class="text-4xl font-bold">Heading</h1>

<!-- CORRECT -->
<h1 class="heading-1">Heading</h1>
```

### ❌ DON'T manually add font-weight to headings
```html
<!-- WRONG -->
<h2 class="heading-2 font-bold">Title</h2>

<!-- CORRECT -->
<h2 class="heading-2">Title</h2>
```

### ❌ DON'T mix systems
```html
<!-- WRONG -->
<h1 class="text-3xl heading-1">Mixed classes</h1>

<!-- CORRECT -->
<h1 class="heading-1">Clean approach</h1>
```

### ❌ DON'T override font-family
```html
<!-- WRONG -->
<p class="text-body font-sans">Content</p>

<!-- CORRECT -->
<p class="text-body">Content</p>
```

---

## ✅ Quick Decision Tree

**Need large impact text?**
→ Use `.text-hero` or `.heading-display`

**Need a page/section title?**
→ Use `.heading-1` or `.heading-2`

**Need component/card titles?**
→ Use `.heading-3` or `.heading-4`

**Need small labels/tags?**
→ Use `.heading-5` or `.heading-6`

**Need intro/emphasized paragraph?**
→ Use `.text-lead`

**Need regular paragraph text?**
→ Use `.text-body` (or omit class, it's the default)

**Need small supplementary text?**
→ Use `.text-small`

**Need caption/metadata text?**
→ Use `.text-small`

---

## 🎯 Component Examples

### Hero Section
```html
<section class="py-20 text-center">
  <h1 class="text-hero">Welcome to Our Platform</h1>
  <p class="text-subhero mt-4">Build amazing things with our tools</p>
</section>
```

### Feature Card
```html
<div class="p-6 border rounded-lg">
  <h3 class="heading-4">Lightning Fast</h3>
  <p class="text-body mt-2">Experience blazing speed</p>
  <span class="text-small mt-4 block">Updated today</span>
</div>
```

### Blog Article
```html
<article class="prose-euclid">
  <h1 class="heading-1">Article Title</h1>
  <p class="text-small">By Author Name • Nov 15, 2025</p>
  <p class="text-lead">This is the introduction paragraph with emphasis.</p>
  <p class="text-body">Regular content continues here...</p>
  <h2 class="heading-2">Section Heading</h2>
  <p class="text-body">More content...</p>
</article>
```

---

## 💡 Summary

- **Always** use custom typography classes from `typography.css`
- **Never** use raw Tailwind text size utilities (`text-xl`, `text-2xl`, etc.)
- **Never** manually override font weights or families on these classes
- **Trust** the system - all sizing, spacing, and responsiveness is built-in
- **Follow** semantic HTML structure with appropriate heading levels

This typography system ensures consistency, accessibility, and beautiful design across the entire application.