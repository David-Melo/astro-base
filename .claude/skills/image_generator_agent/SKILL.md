# Image Generator Agent

## Overview

The Image Generator Agent automates the process of finding placeholder images in the codebase and replacing them with AI-generated images using Google's Gemini image generation API.

## Workflow

The image generation process consists of three main phases:

### Phase 1: Scan for Placeholders

```bash
yarn images:scan
```

This command:
1. Scans all JSON files in `docs/generated-pages/`
2. Scans Astro/HTML files in `src/`
3. Identifies placeholder URLs (placehold.co, via.placeholder.com, etc.)
4. Extracts metadata (dimensions, alt text, captions)
5. Builds prompts for image generation
6. Saves findings to `scripts/image-gen/image-registry.json`

### Phase 2: Generate Images

```bash
yarn images:generate
```

This command:
1. Reads pending images from the registry
2. Downloads placeholder images for dimension reference
3. Calls Gemini API to generate new images
4. Saves generated images to `public/assets/generated/`
5. Updates the registry with paths and status
6. Replaces placeholder URLs in source files with new paths

### Phase 3: Review & Commit

After generation:
1. Review generated images in `public/assets/generated/`
2. Check updated source files
3. Commit changes to version control

## File Locations

| File | Purpose |
|------|---------|
| `scripts/image-gen/scan-placeholders.js` | Scanner script |
| `scripts/image-gen/generate-images.js` | Generator script |
| `scripts/image-gen/image-registry.json` | State/progress tracking |
| `scripts/image-gen/placeholder-sources/` | Downloaded placeholder images |
| `scripts/image-gen/temp/` | Temporary generated files |
| `public/assets/generated/` | Final generated images |
| `.env` | API key configuration |

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### Registry Configuration

The `image-registry.json` file contains configuration options:

```json
{
  "config": {
    "model": "gemini-3-pro-image-preview",
    "outputFormat": "webp",
    "quality": 85,
    "publicDir": "public/assets/generated",
    "maxConcurrent": 3,
    "retryAttempts": 3,
    "retryDelayMs": 5000
  }
}
```

## Commands

### Scan Commands

```bash
# Scan for placeholders and update registry
yarn images:scan

# Dry run - see what would be found
yarn images:scan --dry-run

# Scan and download placeholders for dimension reference
yarn images:scan --download
```

### Generate Commands

```bash
# Generate all pending images
yarn images:generate

# Dry run - see what would be generated
yarn images:generate --dry-run

# Generate specific image by ID
yarn images:generate --id=img_abc12345

# Generate limited number of images
yarn images:generate --limit=5

# Generate without updating source files
yarn images:generate --skip-update
```

## Image Registry Schema

Each image in the registry has the following structure:

```json
{
  "id": "img_abc12345",
  "url": "https://placehold.co/600x400/...",
  "width": 600,
  "height": 400,
  "aspectRatio": "600:400",
  "service": "placehold.co",
  "text": "Decoded placeholder text",
  "metadata": {
    "alt": "Alt text from source",
    "caption": "Caption if available",
    "component": "Component name"
  },
  "usages": [
    {
      "filePath": "docs/generated-pages/file.json",
      "propPath": "page.blocks[0].props.image"
    }
  ],
  "prompt": "Generated prompt for image creation",
  "status": "pending|generating|completed|failed",
  "placeholderPath": "scripts/image-gen/placeholder-sources/img_abc12345.png",
  "generatedPath": "public/assets/generated/img_abc12345-description.webp",
  "publicPath": "/assets/generated/img_abc12345-description.webp",
  "createdAt": "2026-01-14T...",
  "updatedAt": "2026-01-14T...",
  "error": null
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `pending` | Ready for generation |
| `generating` | Currently being generated |
| `completed` | Successfully generated and deployed |
| `failed` | Generation failed (see error field) |

## Placeholder Detection

The scanner detects the following placeholder services:

- **placehold.co**: `https://placehold.co/WxH/BG/TEXT?text=...`
- **via.placeholder.com**: `https://via.placeholder.com/WxH`
- **picsum.photos**: `https://picsum.photos/W/H`
- **dummyimage.com**: `https://dummyimage.com/WxH`

## Prompt Generation

Prompts are automatically generated from:

1. **Placeholder text**: Decoded from URL query parameter
2. **Alt text**: From `alt` or `imageAlt` property
3. **Caption**: From nearby `caption` property
4. **Description**: From `description` property
5. **Title**: From `title` property

All prompts are enhanced with: "Professional photo for a pest control/termite inspection company... Modern, clean, trustworthy aesthetic."

## Manual Prompt Editing

After scanning, you can edit prompts in `image-registry.json`:

```json
{
  "images": {
    "img_abc12345": {
      "prompt": "Your custom prompt here",
      ...
    }
  }
}
```

Then run `yarn images:generate` to use the updated prompts.

## Error Handling

If generation fails:

1. The image status is set to `failed`
2. The error message is saved to the `error` field
3. Running `yarn images:generate` again will retry failed images
4. Check the console output for specific error messages

## Best Practices

### Scanning

1. Run `yarn images:scan` after adding new content with placeholders
2. Review the registry to ensure prompts are appropriate
3. Edit prompts manually if needed for better results

### Generating

1. Generate in batches using `--limit` to manage API usage
2. Review generated images before committing
3. Re-run failed images after fixing any issues

### Prompt Writing

For best results, prompts should:
- Be specific and descriptive
- Include the subject, style, and mood
- Mention "professional", "clean", or relevant aesthetic
- Avoid copyrighted content or brand references

## Troubleshooting

### "GEMINI_API_KEY not found"

Ensure you have a `.env` file in the project root with:
```
GEMINI_API_KEY=your_key_here
```

### "No image generated in response"

The API may not have returned an image. Try:
- Adjusting the prompt
- Running again (transient error)
- Checking API quotas

### Images not updating in source files

Run with verbose logging and check:
- File paths in registry are correct
- Source files exist and are readable
- URL in source matches exactly

## Integration with Dev Workflow

When building pages that need images:

1. Use placeholder URLs during development:
   ```
   https://placehold.co/600x400/f5f5f5/1a1a1a?text=Professional+Inspector
   ```

2. Include alt text in your component props:
   ```json
   {
     "image": "https://placehold.co/600x400/...",
     "imageAlt": "Professional termite inspector examining home foundation"
   }
   ```

3. Run the scanner and generator before production deployment

4. Commit the generated images and updated source files