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
slugifyAll(["Hello World", "Second Post"]);
// ["hello-world", "second-post"]
```

## API

| Function | Signature | Notes |
| --- | --- | --- |
| `slugify` | `slugify(input: string): string` | Throws `TypeError` for non-strings. |
| `slugifyAll` | `slugifyAll(inputs: string[]): string[]` | Throws `TypeError` for non-arrays. |

## Current limitations (v0.1)

The implementation keeps only `[a-z0-9]` and replaces every other run of
characters with a single dash. That means:

| Input | Output today | Problem |
| --- | --- | --- |
| `Café déjà vu` | `caf-d-j-vu` | accented letters are dropped instead of folded |
| `日本語のタイトル` | `` (empty) | non-Latin scripts are dropped entirely |
| `Hello 👋 World` | `hello-world` | fine, but emoji handling is accidental |
| very long titles | very long slugs | no way to cap the length |

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
