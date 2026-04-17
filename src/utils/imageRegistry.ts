/**
 * Image Registry for Astro Image Optimization
 * 
 * This module provides a mapping from JSON path format (/assets/...) 
 * to imported ImageMetadata for use with Astro's <Image> component.
 * 
 * Usage:
 *   import { getImage } from '@utils/imageRegistry';
 *   const resolved = getImage('/assets/home/hero.webp');
 *   if (resolved) {
 *     <Image src={resolved} alt="..." />
 *   }
 */

import type { ImageMetadata } from 'astro';

// Import all images from src/assets using Vite's glob import
// eager: true means they're imported at build time, not lazy-loaded
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{webp,jpg,jpeg,png,gif,avif}',
  { eager: true }
);

// Build the path-to-image map (JSON path format → ImageMetadata)
export const imageMap = new Map<string, ImageMetadata>();

for (const [path, module] of Object.entries(imageModules)) {
  // Convert Vite's path format "/src/assets/home/x.webp" 
  // to JSON path format "/assets/home/x.webp"
  const jsonPath = path.replace('/src/assets/', '/assets/');
  imageMap.set(jsonPath, module.default);
}

/**
 * Get an image by its JSON path format.
 * 
 * @param jsonPath - Path in format "/assets/folder/image.webp"
 * @returns ImageMetadata if found, null otherwise
 * 
 * @example
 * const heroImage = getImage('/assets/home/hero.webp');
 */
export function getImage(jsonPath: string): ImageMetadata | null {
  return imageMap.get(jsonPath) ?? null;
}

/**
 * Get image dimensions for a given path.
 * Useful for setting width/height attributes on fallback img tags.
 * 
 * @param jsonPath - Path in format "/assets/folder/image.webp"
 * @returns Object with width and height, or null if not found
 */
export function getImageDimensions(jsonPath: string): { width: number; height: number } | null {
  const img = imageMap.get(jsonPath);
  if (!img) return null;
  return { width: img.width, height: img.height };
}

/**
 * Check if an image exists in the registry.
 * 
 * @param jsonPath - Path in format "/assets/folder/image.webp"
 * @returns true if image is in registry
 */
export function hasImage(jsonPath: string): boolean {
  return imageMap.has(jsonPath);
}

/**
 * Get all available image paths.
 * Useful for debugging or validation.
 * 
 * @returns Array of all registered JSON paths
 */
export function getAllImagePaths(): string[] {
  return Array.from(imageMap.keys());
}

// Export the total count for debugging
export const imageCount = imageMap.size;