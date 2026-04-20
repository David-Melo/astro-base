---
name: blog_writer_agent
readonly: true
---

# Blog Writer Agent

## Overview

The Blog Writer Agent creates SEO-optimized blog posts. Blog posts are stored as MDX files in the content collection and rendered automatically by the blog system.

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
| `author` | string | **Yes** | Default: `"Florida Termite Guys"`. Can be a team member name. |
| `category` | enum | **Yes** | One of: `"Termite Treatment"`, `"Pest Control"`, `"Home Maintenance"`, `"Industry News"`, `"Tips & Guides"` |
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
title: "How to [Achieve X] in Florida"
description: "Learn how to [achieve X] with our expert guide. Discover [key benefit] and protect your Florida home."
publishedDate: 2026-01-27
author: "Author"
category: "Tips & Guides"
tags:
  - "primary keyword"
  - "secondary keyword"
  - "florida homes"
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

Mention Florida Termite Guys naturally and encourage the reader to take action (schedule an inspection, contact us, etc.).
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
featuredImageAlt: "Professional termite inspector examining wood structure"
```

### Creating New Images with Placeholder Agent

When a blog post needs a custom image that doesn't exist:

1. **During writing**, use the `@image_placeholder_agent` to generate a placeholder:

   Request from the placeholder agent:
   ```
   image_id: blog_termite_signs_hero
   width: 1200
   height: 630
   page_context: blog_post_hero
   semantic_role: hero_background
   description_hint: "Close-up of termite damage on wooden beam, showing galleries and frass"
   ```

2. **For the frontmatter**, use a placehold.co URL temporarily:
   ```yaml
   featuredImage: "https://placehold.co/1200x630?text=termite_signs_hero"
   featuredImageAlt: "Close-up of termite damage showing galleries and wood destruction"
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
- Include location when relevant: "in Florida", "for Florida Homes"

**Examples:**
- "How to Choose the Best Termite Service for Your Florida Home"
- "5 Warning Signs of Termite Damage Every Florida Homeowner Should Know"
- "Complete Guide to Tentless Termite Treatment in South Florida"

### Meta Description Optimization

- 150-160 characters
- Include primary keyword naturally
- Include a call-to-action or benefit
- Make it compelling to click

**Example:**
```yaml
description: "Discover what makes a great termite service in Florida. Learn the key factors to evaluate, questions to ask, and why local expertise matters."
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
  - "termite inspection"
  - "termite damage"
  - "Florida homes"
  - "home protection"
  - "pest control"
```

## Writing Guidelines

### Tone and Voice

- **Professional** but approachable
- **Educational** without being condescending
- **Confident** without being salesy
- **Local** - reference Florida, South Florida, specific cities when relevant

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

### Florida-Specific Content

Always include Florida-relevant information:
- Florida climate and termite species
- Local regulations (WDO inspections, etc.)
- South Florida specific concerns
- Seasonal considerations
- Local cities and areas we serve

## File Naming Convention

- Use lowercase
- Separate words with hyphens
- Be descriptive but concise
- Include primary keyword

**Good examples:**
- `best-termite-service.mdx`
- `termite-damage-signs-florida.mdx`
- `tentless-treatment-guide.mdx`
- `wdo-inspection-explained.mdx`

**Bad examples:**
- `Blog Post 1.mdx` (spaces, no keywords)
- `termites.mdx` (too vague)
- `the-ultimate-complete-guide-to-all-things-termite.mdx` (too long)

## Complete Example

Here's a complete blog post following all guidelines:

```mdx
---
title: "5 Early Warning Signs of Termite Damage in Florida Homes"
description: "Learn to spot termite damage early with these 5 warning signs every Florida homeowner should know. Protect your home before it's too late."
publishedDate: 2026-01-28
author: "Florida Termite Guys"
category: "Tips & Guides"
tags:
  - "termite damage"
  - "warning signs"
  - "Florida homes"
  - "termite inspection"
  - "home protection"
readingTime: 6
featuredImage: "/assets/blog/termite-damage-signs.webp"
featuredImageAlt: "Close-up of termite damage showing wood galleries and mud tubes"
draft: false
---

Florida homeowners face a constant battle against termites. Our warm, humid climate creates perfect conditions for these destructive pests to thrive year-round. Knowing the early warning signs of termite damage can save you thousands of dollars in repairs.

## 1. Mud Tubes on Foundation Walls

Subterranean termites build mud tubes to travel between their underground colonies and your home's wood. These pencil-sized tunnels appear on foundation walls, in crawl spaces, and along exterior surfaces.

Check your foundation regularly, especially after rain. Fresh mud tubes appear moist and active. Break a small section and check back in a few days. If it's rebuilt, you have an active infestation.

## 2. Hollow-Sounding Wood

Termites eat wood from the inside out, leaving a thin veneer that looks normal. Tap on wooden surfaces around your home. Damaged wood sounds hollow or papery compared to solid wood.

Pay special attention to:

- Window and door frames
- Baseboards and crown molding
- Wood siding and trim
- Deck posts and beams

## 3. Discarded Wings Near Windows

Termite swarmers shed their wings after finding a mate. Finding small, translucent wings near windows, doors, or light fixtures indicates termites are trying to establish a new colony in your home.

Swarming typically occurs in spring and fall in Florida. A single swarm event means termites are already nearby.

## 4. Frass (Termite Droppings)

Drywood termites push their droppings out of small holes in infested wood. This frass looks like small, dark pellets or sawdust piles.

Finding frass beneath wooden furniture, along baseboards, or in attic spaces signals an active drywood termite infestation that needs immediate attention.

## 5. Bubbling or Peeling Paint

Moisture from termite activity can cause paint to bubble or peel. This often resembles water damage but appears in areas without plumbing or known water issues.

If you notice unexplained paint damage, especially on window frames or exterior wood, investigate further for termite activity.

## What to Do If You Spot These Signs

Don't wait if you notice any of these warning signs. Termite damage grows exponentially worse over time. A professional inspection can confirm the type of termites and extent of damage.

Florida Termite Guys offers free inspections throughout South Florida. Our experienced technicians know exactly where to look and can recommend the most effective treatment for your situation.

Early detection is your best defense against costly repairs. Schedule your inspection today and protect your Florida home.
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
- [ ] Includes Florida-specific information
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