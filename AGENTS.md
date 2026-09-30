# AGENTS.md — conventions for automated contributors

This repository is a hands-on demo of **GitHub Copilot cloud agent**.
Every automated contributor (Copilot, other coding agents, or a human's script)
must follow the rules below. They exist so that a review can be done quickly and
so that the demo shows what "repository custom instructions" actually change.

## Project rules

- Node.js >= 20, ESM only (`"type": "module"`). Use `import`, never `require`.
- **Zero runtime dependencies.** If a task seems to need one, stop and ask in a
  comment instead of adding it to `package.json`.
- `src/` is pure and synchronous: no I/O, no `process`, no network, no `Date.now()`.
- Every exported function needs a JSDoc block and at least one test.

## Testing

- Tests live in `test/` and use the built-in `node:test` runner with
  `node:assert/strict`.
- Run `npm test` before requesting review. All tests must pass on Node 20 and 22.
- When you intentionally change behaviour, update the affected test **in the same
  commit** and call it out in the PR description. Never delete a test to make CI
  pass without explaining why in the PR description.

## Commits and pull requests

- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`,
  `docs:`, `test:`, `chore:`, `refactor:`.
- One logical change per commit; keep each commit focused.
- The PR description must contain: **what changed**, **why**, **how it was
  validated**, and **which acceptance criteria of the linked issue are met**.
- Link the issue with `Closes #<number>` so it closes on merge.

## Backwards compatibility

- `slugify(input)` and `slugifyAll(inputs)` are the public API.
- Do **not** change or remove their existing parameters, and do not turn them
  into options-object-only functions. New behaviour must be opt-in through an
  additional optional parameter or a new export.
- Plain-ASCII results must stay byte-identical to v0.1.
