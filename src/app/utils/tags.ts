// Tags with fewer posts than this are noindex and stay out of the sitemap
export const MIN_POSTS_TO_INDEX_TAG = 3;

/** URL-safe slug for a tag name: "Inteligencia Artificial" -> "inteligencia-artificial". */
export function tagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tagPath(tag: string): string {
  return `/blog/tag/${tagSlug(tag)}`;
}
