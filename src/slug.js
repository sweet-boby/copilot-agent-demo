/**
 * Convert a human-readable title into a URL-friendly slug.
 *
 * @param {string} input Title to convert.
 * @param {{ maxLength?: number }} [options] Optional slug length limit.
 * @returns {string} The slug, or an empty string when nothing survives.
 */
export function slugify(input, options = {}) {
  if (typeof input !== "string") {
    throw new TypeError("slugify expects a string");
  }

  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("slugify options must be an object");
  }

  const { maxLength } = options;
  if (
    maxLength !== undefined &&
    maxLength !== 0 &&
    maxLength !== Infinity &&
    (!Number.isInteger(maxLength) || maxLength < 0)
  ) {
    throw new TypeError("maxLength must be a non-negative integer, 0, or Infinity");
  }

  const slug = input
    .trim()
    .replace(/\p{Script=Latin}\p{M}*/gu, (letter) =>
      letter.normalize("NFD").replace(/\p{M}/gu, ""),
    )
    .toLowerCase()
    .replace(/['"‘’“”‚„]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  if (maxLength === undefined || maxLength === 0 || maxLength === Infinity) {
    return slug;
  }

  let truncated = "";
  for (const word of slug.split("-")) {
    const candidate = truncated ? `${truncated}-${word}` : word;
    if (candidate.length > maxLength) {
      break;
    }
    truncated = candidate;
  }

  return truncated;
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
