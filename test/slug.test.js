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

// --- documented limitation (v0.1, ASCII only) -------------------------------
// These tests pin the CURRENT behaviour. They are expected to change when
// unicode support lands, see issue "feat(slug): unicode + CJK support".
test("strips characters outside a-z0-9", () => {
  assert.equal(slugify("Café déjà vu"), "caf-d-j-vu");
});

test("collapses non-ASCII-only titles to an empty string", () => {
  assert.equal(slugify("日本語のタイトル"), "");
});
