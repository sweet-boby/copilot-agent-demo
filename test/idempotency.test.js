import test from "node:test";
import assert from "node:assert/strict";

import { slugify } from "../src/index.js";

test("slugify is idempotent for representative titles", () => {
  const titles = [
    "A Simple Title",
    `It's a "quoted" title!`,
    "Café déjà vu",
    "日本語のタイトル",
    "Hello 👋 World 🎉",
  ];

  for (const title of titles) {
    const slug = slugify(title);
    assert.equal(slugify(slug), slug, `expected slugify to be idempotent for ${title}`);
  }
});
