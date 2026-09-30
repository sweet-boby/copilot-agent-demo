# slugkit

Tiny, zero-dependency URL slug utilities.

> **This repository is a demo project for [GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent).**
> It is intentionally small, has a real test suite and CI, and ships an
> [`AGENTS.md`](./AGENTS.md) with repository instructions so you can watch how an
> agent picks up conventions, opens a pull request, and reacts to review
> comments. See [Running the demo](#running-the-demo) below.

## Install

```bash
npm install
```

No dependencies are installed — `slugkit` has none, by design.

## Usage

```js
import { slugify, slugifyAll } from "slugkit";

slugify("Hello World");            // "hello-world"
slugify(`It's a "quoted" title`);  // "its-a-quoted-title"
slugify("It’s a “quoted” title");   // "its-a-quoted-title"
slugify("Café déjà vu");           // "cafe-deja-vu"
slugify("Hello 世界");              // "hello-世界"
slugify("Hello Beautiful World", { maxLength: 12 }); // "hello"
slugifyAll(["Hello World", "Second Post"]);
// ["hello-world", "second-post"]
```

## API

| Function | Signature | Notes |
| --- | --- | --- |
| `slugify` | `slugify(input: string, options?: { maxLength?: number }): string` | Throws `TypeError` for non-strings or invalid options. |
| `slugifyAll` | `slugifyAll(inputs: string[]): string[]` | Throws `TypeError` for non-arrays. |

`slugify` folds Latin diacritics, preserves Unicode letters and numbers
(including CJK), removes ASCII and typographic quotation marks instead of
turning them into separators, and removes emoji and symbols. Its optional
`maxLength` must be a non-negative integer or `Infinity`: `0`, `Infinity`, or
an omitted value leaves the slug untruncated. A positive value keeps only
complete dash-separated words that fit within the limit; if the first word is
too long, the result is an empty string. `slugifyAll` retains its existing
signature and behavior.

| Input | Output |
| --- | --- |
| `Café déjà vu` | `cafe-deja-vu` |
| `日本語のタイトル` | `日本語のタイトル` |
| `Hello 世界` | `hello-世界` |
| `Hello 👋 World 🎉` | `hello-world` |

## Development

```bash
npm test          # node --test, Node 20+
npm run test:watch
```

`src/` is pure and synchronous — no I/O, no dependencies. See [`AGENTS.md`](./AGENTS.md)
for the full contribution rules (Conventional Commits, tests in the same commit,
PR description requirements).

## Running the demo

1. Upgrade to a paid Copilot plan and make sure **Copilot cloud agent** is
   enabled in your personal Copilot settings.
2. Open an issue and assign it to **Copilot**, or use the **Agents** tab of this
   repository and describe the task in the prompt box.
3. Watch the session log, steer the agent with a follow-up prompt if it drifts,
   then review the pull request it opens.
4. On the **Agents** tab you can trace the commit back to the session log, and
   archive the session when you are done.

## License

MIT
