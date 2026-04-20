---
name: blog_writer_agent
readonly: true
---

# Blog Writer Agent

## Overview

The Blog Writer Agent creates SEO-optimized blog posts. Blog posts are stored as MDX files in the content collection and rendered automatically by the blog system.

## Optional Workflow Prerequisite

Use this workflow when the project has a blog content collection or when the user explicitly wants one created. If `src/content/blog/` and the related routes/templates do not exist yet, treat the blog system as optional rather than assumed.

## File Structure

### Where Blog Posts Live

```
src/content/blog/
├── best-service.mdx      # Example: /blog/best-service/
├── top-10.mdx            # Example: /blog/top-10/
└── [slug].mdx            # File name becomes the URL slug
```

### URL Pattern

- File: `src/content/blog/my-blog-post.mdx`
- URL: `/blog/my-blog-post/`
- Always use lowercase, hyphen-separated slugs

## Blog Post Schema (Required Frontmatter)

Every blog post MUST have this frontmatter structure:

```yaml
---
title: "Your SEO-Optimized Title Here"
description: "Meta description for SEO (150-160 characters recommended). Include primary keyword naturally."
publishedDate: 2026-01-27
author: "Site Name"
category: "Category1"
tags:
  - "primary keyword"
  - "secondary keyword"
  - "related topic"
readingTime: 8
featuredImage: "/assets/blog/your-image.webp"
featuredImageAlt: "Descriptive alt text for the featured image"
draft: false
---
```

### Field Details

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | **Yes** | H1 and meta title. Include primary keyword. Max ~60 chars for SERP display. |
| `description` | string | **Yes** | Meta description. 150-160 chars. Include primary keyword naturally. |
| `publishedDate` | date | **Yes** | Format: `YYYY-MM-DD`. Used for sorting and display. |
| `updatedDate` | date | No | Add when updating old posts. Format: `YYYY-MM-DD`. |
| `author` | string | **Yes** | Default: use the current site or brand name from the strategy docs. Can be a team member name. |
| `category` | enum | **Yes** | Use project-appropriate categories defined by the site's content model. Common examples: `"Guides"`, `"Case Studies"`, `"Industry News"`, `"Tips & Guides"` |
| `tags` | string[] | **Yes** | 3-7 relevant keywords for filtering and SEO. |
| `readingTime` | number | **Yes** | Estimated minutes to read. Calculate: word count / 200. |
| `featuredImage` | string | **Yes** | Path to image. Use `/assets/blog/` or existing `/assets/` images. |
| `featuredImageAlt` | string | **Yes** | Descriptive alt text for accessibility and SEO. |
| `draft` | boolean | **Yes** | Set `false` to publish, `true` to hide from listings. |

### Category Options

Choose the most appropriate category:

- **Industry News** - Company news, industry updates, regulations
- **Tips & Guides** - How-to content, educational guides, checklists

## Content Structure

### Standard Blog Post Template

```mdx
---
title: "How to [Achieve X] in [Location]"
description: "Learn how to [achieve X] with our expert guide and discover [key benefit] for your situation."
publishedDate: 2026-01-27
author: "Author"
category: "Tips & Guides"
tags:
  - "primary keyword"
  - "secondary keyword"
  - "location modifier"
readingTime: 7
featuredImage: "/assets/blog/featured-image.webp"
featuredImageAlt: "Description of the featured image"
draft: false
---

Opening paragraph that hooks the reader and establishes the problem or topic. Include the primary keyword naturally within the first 100 words. This paragraph appears in the hero section preview.

## First Major Section (H2)

Content explaining the first key point. Use short paragraphs (2-4 sentences max) for readability.

Additional paragraph with more details. Include relevant statistics, facts, or examples.

### Subsection (H3)

More detailed content under the subsection. This helps with content organization and SEO.

### Another Subsection (H3)

Continue building out the section with valuable information.

## Second Major Section (H2)

Content for the second major topic.

**Bold text** for emphasis on important points.

Key points in a list format:

- First important point
- Second important point
- Third important point

## Section with Numbered Steps (H2)

When explaining a process:

1. First step with explanation
2. Second step with explanation
3. Third step with explanation

## Conclusion or Call to Action (H2)

Wrap up the article with a summary and clear next steps for the reader.

Mention the current brand naturally and encourage the reader to take the next relevant action.
```

## Markdown/MDX Syntax Guide

### Headings

```mdx
## H2 - Major Sections (Primary structure)
### H3 - Subsections within H2s
#### H4 - Rarely needed, for deep nesting
```

**Rules:**
- Never use H1 (it's automatically rendered from the title)
- Start with H2 for major sections
- Use H3 for subsections
- Maintain logical hierarchy

### Text Formatting

```mdx
**Bold text** for emphasis
*Italic text* for technical terms or slight emphasis
[Link text](https://example.com) for external links
[Internal link](/services/) for site navigation
```

### Lists

**Unordered (bullets):**
```mdx
- First item
- Second item
- Third item
```

**Ordered (numbered):**
```mdx
1. First step
2. Second step
3. Third step
```

### Blockquotes

```mdx
> This is a blockquote for testimonials or important callouts.
```

## Image Integration

### Using Existing Assets

Reference images from the public folder:

```yaml
featuredImage: "/assets/home/service_inspection.webp"
featuredImageAlt: "Professional service provider working in a real-world setting"
```

### Creating New Images with Placeholder Agent

When a blog post needs a custom image that doesn't exist:

1. **During writing**, use the `@image_placeholder_agent` to generate a placeholder:

   Request from the placeholder agent:
   ```
   image_id: blog_primary_topic_hero
   width: 1200
   height: 630
   page_context: blog_post_hero
   semantic_role: hero_background
   description_hint: "Detailed, on-brand image that supports the article's main topic"
   ```

2. **For the frontmatter**, use a placehold.co URL temporarily:
   ```yaml
   featuredImage: "https://placehold.co/1200x630?text=blog_primary_topic_hero"
   featuredImageAlt: "On-brand placeholder image supporting the blog post topic"
   ```

3. **After writing**, run the image generator workflow:
   ```bash
   yarn images:scan    # Finds the placeholder
   yarn images:generate  # Generates real image with AI
   ```

### Image Workflow Summary

1. **Write blog post** with placeholder URL or existing image
2. **Invoke `@image_placeholder_agent`** if you need a custom image description
3. **After approval**, run `yarn images:scan` then `yarn images:generate`
4. **Verify** the generated image and commit

## SEO Best Practices

### Title Optimization

- Include primary keyword near the beginning
- Keep under 60 characters for full SERP display
- Use power words: "Ultimate", "Complete", "Expert", "Essential"
- Include location when relevant: "in [Location]", "for [Audience]"

**Examples:**
- "How to Choose the Right [Service] Provider in [Location]"
- "5 Early Warning Signs Every [Audience] Should Know"
- "Complete Guide to [Service or Topic] in [Location]"

### Meta Description Optimization

- 150-160 characters
- Include primary keyword naturally
- Include a call-to-action or benefit
- Make it compelling to click

**Example:**
```yaml
description: "Discover what makes a great service provider in your area. Learn the key factors to evaluate, questions to ask, and why local expertise matters."
```

### Content SEO

1. **Primary keyword** in first 100 words
2. **Semantic variations** throughout (don't repeat exact phrase)
3. **Internal links** to service pages and other blog posts
4. **Headers** include keywords naturally
5. **Image alt text** is descriptive and keyword-relevant

### Tag Strategy

Use 3-7 tags per post:
- 1-2 primary keywords
- 2-3 related topics
- 1-2 location-based if relevant

```yaml
tags:
  - "primary keyword"
  - "secondary keyword"
  - "location modifier"
  - "audience problem"
  - "service category"
```

## Writing Guidelines

### Tone and Voice

- **Professional** but approachable
- **Educational** without being condescending
- **Confident** without being salesy
- **Local** - reference the project's real service area, target cities, or market context when relevant

### Paragraph Structure

- 2-4 sentences per paragraph max
- Short sentences for clarity
- One idea per paragraph
- Use transitions between sections

### Content Quality

- **Minimum 1,500 words** for comprehensive posts
- **Target 2,000-2,500 words** for pillar content
- Include specific facts, numbers, and examples
- Cite sources for statistics when possible
- Answer the user's search intent completely

### Local Relevance

When location matters, include locally relevant information:
- geography, climate, or market conditions that affect the topic
- local regulations, compliance rules, or service expectations when applicable
- city or region-specific concerns supported by the strategy docs
- seasonal considerations when they materially affect the advice
- target service areas referenced by the current site

## File Naming Convention

- Use lowercase
- Separate words with hyphens
- Be descriptive but concise
- Include primary keyword

**Good examples:**
- `best-service-provider-[location].mdx`
- `warning-signs-[topic].mdx`
- `service-buyers-guide.mdx`
- `what-to-know-before-hiring.mdx`

**Bad examples:**
- `Blog Post 1.mdx` (spaces, no keywords)
- `post-1.mdx` (too vague)
- `the-ultimate-complete-guide-to-everything-about-your-service-topic.mdx` (too long)

## Complete Example

Here's a complete example blog post following all guidelines. This is an illustrative placeholder, not a project default:

```mdx
---
title: "5 Early Warning Signs Homeowners Should Not Ignore"
description: "Learn how to spot early warning signs, what they mean, and when to call a professional before the problem gets worse."
publishedDate: 2026-01-28
author: "Example Service Brand"
category: "Tips & Guides"
tags:
  - "early warning signs"
  - "warning signs"
  - "home maintenance"
  - "professional inspection"
  - "preventive care"
readingTime: 6
featuredImage: "/assets/blog/example-warning-signs.webp"
featuredImageAlt: "Professional inspecting a problem area inside a home"
draft: false
---

Small warning signs often appear long before a problem becomes expensive. Knowing what to look for helps homeowners act early, ask better questions, and get the right kind of professional help before damage spreads.

## 1. Repeated Signs Of Moisture Or Material Damage

Recurring stains, swelling, warping, or material breakdown often point to a deeper issue. Even when the surface damage looks minor, repeated symptoms usually mean the underlying cause is still active.

Pay attention to where the issue returns. Patterns around windows, trim, exterior transitions, or utility penetrations can help a professional diagnose the real source faster.

## 2. Changes In Sound, Texture, Or Stability

Materials that suddenly feel soft, hollow, loose, or brittle may be signaling hidden deterioration. A visual check is useful, but touch and sound often reveal issues that are not obvious at first glance.

Pay special attention to:

- Window and door frames
- Baseboards and trim
- Exterior transitions
- High-wear structural touchpoints

## 3. Debris, Dust, Or Residue That Keeps Reappearing

If you repeatedly notice unusual dust, residue, flakes, or debris near the same area, do not assume it is cosmetic. Repeating evidence usually means the underlying condition has not been resolved.

Document when it shows up and what the surrounding conditions look like. Timing, weather, and room usage can all provide valuable context during inspection.

## 4. Surface Changes That Look Cosmetic But Are Not

Bubbling finishes, peeling paint, staining, and hairline cracks are easy to dismiss. In many cases, though, these are the visible symptoms of a larger issue developing below the surface.

If these signs appear in an area without an obvious explanation, schedule a professional assessment instead of waiting for the problem to become more visible.

## 5. A Problem Area That Keeps Expanding

When the same area keeps getting worse despite quick fixes, there is usually a root cause that needs proper diagnosis. Repainting, sealing, or patching may hide the symptom without solving the issue.

Track whether the problem is spreading, reappearing, or affecting nearby materials. That information helps guide the next step.

## What To Do If You Spot These Signs

Do not wait if you notice these warning signs. A professional inspection can confirm the root cause, explain the level of urgency, and recommend the most effective next step.

Use the closing section to connect the reader with the site's actual offer, service area, and conversion goal.

Early action usually leads to simpler, less disruptive solutions. Invite the reader to contact the business using the current site's real CTA.
```

## Checklist Before Publishing

- [ ] Frontmatter is complete with all required fields
- [ ] Title includes primary keyword (under 60 chars)
- [ ] Description is 150-160 characters with keyword
- [ ] `publishedDate` is set correctly
- [ ] `category` is one of the allowed values
- [ ] `tags` include 3-7 relevant keywords
- [ ] `readingTime` matches actual content length
- [ ] `featuredImage` path is valid (or placeholder is used)
- [ ] `featuredImageAlt` is descriptive
- [ ] `draft` is set to `false` for publishing
- [ ] Content starts with H2 (not H1)
- [ ] Primary keyword appears in first 100 words
- [ ] Content is at least 1,500 words
- [ ] Paragraphs are 2-4 sentences
- [ ] Includes locally relevant information when the topic calls for it
- [ ] Internal links to services/other posts where relevant
- [ ] File name is lowercase with hyphens
- [ ] Run `yarn dev` and verify post renders correctly

## Integration with Other Agents

### Image Placeholder Agent

When you need a custom hero image or inline images:

```
@image_placeholder_agent

Generate a placeholder for:
- image_id: blog_[slug]_hero
- width: 1200
- height: 630
- page_context: blog_post_hero
- semantic_role: hero_background
- description_hint: "[describe the image you want]"
```

### Image Generator Agent

After the blog post is approved with placeholders:

```bash
# Scan for placeholders in blog posts
yarn images:scan

# Generate real images
yarn images:generate

# The generator will:
# 1. Find the placeholder URL in the MDX frontmatter
# 2. Generate an AI image based on the alt text
# 3. Save to /assets/generated/
# 4. Update the MDX file with the new path
```

## Quick Reference

| What | Where/How |
|------|-----------|
| Create new post | `src/content/blog/[slug].mdx` |
| View all posts | `/blog/` |
| View single post | `/blog/[slug]/` |
| Categories | Config in `src/content/config.ts` |
| Blog index | `src/pages/blog/index.astro` |
| Blog post template | `src/pages/blog/[slug].astro` |
| Check rendering | `yarn dev` then visit the URL |