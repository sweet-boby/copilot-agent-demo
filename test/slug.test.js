import test from "node:test";
import assert from "node:assert/strict";

import { slugify, slugifyAll } from "../src/index.js";

test("lowercases and joins words with a single dash", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("collapses runs of separators into one dash", () => {
  assert.equal(slugify("Hello   ---  World"), "hello-world");
});

test("trims surrounding whitespace and dashes", () => {
  assert.equal(slugify("  --Hello World--  "), "hello-world");
});

test("drops quotes instead of turning them into dashes", () => {
  assert.equal(slugify(`It's a "quoted" title`), "its-a-quoted-title");
});

test("drops typographic quotes and apostrophes", () => {
  assert.equal(slugify("It’s a “quoted” title"), "its-a-quoted-title");
  assert.equal(slugify("don’t"), "dont");
  assert.equal(slugify("‚quoted„ ‘words’"), "quoted-words");
});

test("keeps punctuation out of the slug", () => {
  assert.equal(slugify("Hello, World!"), "hello-world");
});

test("returns an empty string when nothing survives", () => {
  assert.equal(slugify("!!!"), "");
});

test("rejects non-string input", () => {
  assert.throws(() => slugify(42), TypeError);
});

test("slugifyAll maps over a list of titles", () => {
  assert.deepEqual(slugifyAll(["Hello World", "Second Post"]), [
    "hello-world",
    "second-post",
  ]);
});

test("slugifyAll rejects non-array input", () => {
  assert.throws(() => slugifyAll("Hello World"), TypeError);
});

test("folds Latin diacritics", () => {
  assert.equal(slugify("Café déjà vu"), "cafe-deja-vu");
});

test("preserves CJK and supports mixed scripts", () => {
  assert.equal(slugify("日本語のタイトル"), "日本語のタイトル");
  assert.equal(slugify("Hello 世界"), "hello-世界");
});

test("removes emoji and symbols without stray dashes", () => {
  assert.equal(slugify("Hello 👋 World 🎉"), "hello-world");
});

test("preserves ASCII behavior", () => {
  assert.equal(slugify(`It's a "quoted" title!`), "its-a-quoted-title");
});

test("preserves non-Latin combining marks during normalization", () => {
  assert.equal(slugify("が"), "が");
});

test("truncates at a dash boundary without exceeding maxLength", () => {
  assert.equal(slugify("Hello Beautiful World", { maxLength: 12 }), "hello");
  assert.equal(slugify("hello-world", { maxLength: 10 }), "hello");
  assert.equal(slugify("beautiful-day", { maxLength: 5 }), "");
});

test("does not truncate when maxLength is omitted, zero, or Infinity", () => {
  const input = "Hello Beautiful World";
  assert.equal(slugify(input), "hello-beautiful-world");
  assert.equal(slugify(input, { maxLength: 0 }), "hello-beautiful-world");
  assert.equal(slugify(input, { maxLength: Infinity }), "hello-beautiful-world");
});

test("rejects invalid maxLength values", () => {
  for (const maxLength of [-1, 1.5, NaN, -Infinity]) {
    assert.throws(() => slugify("Hello World", { maxLength }), TypeError);
  }
});

test("rejects invalid options", () => {
  assert.throws(() => slugify("Hello World", null), TypeError);
  assert.throws(() => slugify("Hello World", []), TypeError);
});
