/**
 * Convert a human-readable title into a URL-friendly slug.
 *
 * Current behaviour (v0.1, ASCII only):
 * - lowercases the input
 * - removes single and double quotes
 * - replaces every run of characters outside `[a-z0-9]` with a single dash
 * - trims leading and trailing dashes
 *
 * Known limitations are documented in the README: characters outside
 * `[a-z0-9]` are dropped, so accented letters lose their letter and CJK
 * titles collapse to an empty string.
 *
 * @param {string} input Title to convert.
 * @returns {string} The slug, or an empty string when nothing survives.
 */
export function slugify(input) {
  if (typeof input !== "string") {
    throw new TypeError("slugify expects a string");
  }

  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Slugify every title in a list.
 *
 * @param {string[]} inputs Titles to convert.
 * @returns {string[]} One slug per input, in the same order.
 */
export function slugifyAll(inputs) {
  if (!Array.isArray(inputs)) {
    throw new TypeError("slugifyAll expects an array of strings");
  }

  return inputs.map((input) => slugify(input));
}
