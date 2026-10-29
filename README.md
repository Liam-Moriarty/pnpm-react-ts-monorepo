# pnpm React TypeScript monorepo template

A starting point for React apps that need a real toolchain from day one: a
pnpm and Turborepo monorepo with React 19, Vite 8, TypeScript 7 and Vitest 5,
shared lint and TypeScript configs, git hooks that enforce conventional
commits, Changesets, and GitHub Actions for CI, pull request previews and
per-branch deploys.

It also comes with a process: six planning docs to fill in before anyone builds
anything, and a [`CLAUDE.md`](CLAUDE.md) that keeps AI-assisted work sized to
what the project actually needs.

## Before you write any code

1. **Fill in the six planning docs** in [`docs/`](docs/README.md) and get them
   approved: product requirements, technical requirements, app flow, design
   brief, database schema and implementation plan. Building starts when all six
   are approved.
2. **Set the project stage** at the top of [`CLAUDE.md`](CLAUDE.md):
   Prototype, MVP or Production. It decides how much engineering rigour
   applies, for people and for Claude.
3. **Work through [Setting up a new project](#setting-up-a-new-project)**
   below.

## Requirements

- **Node.js 26**, pinned in [`.nvmrc`](.nvmrc). With nvm: `nvm install` then
  `nvm use`.
- **pnpm 8.15.6**, pinned in the `packageManager` field of `package.json`.
  Node 25 and later no longer ship Corepack, so install it with
  `npm install -g pnpm@8.15.6`.

pnpm 8 prints a `url.parse()` deprecation warning on Node 26. It's harmless.

## Quick start

```sh
git clone <your-repo-url> my-app
cd my-app
nvm use
pnpm install   # also installs the git hooks
pnpm dev       # web app on http://localhost:5173
```

## Setting up a new project

- [ ] Fill in and approve the six docs in [`docs/`](docs/README.md).
- [ ] Set the stage line in [`CLAUDE.md`](CLAUDE.md).
- [ ] Rename the root package in `package.json` (it's still
      `with-vite-react`).
- [ ] Replace the sample `Header` and `Counter` components and the
      `sample.test.ts` files.
- [ ] Put local settings in `apps/web/.env.local` (git-ignored). See
      [Environment variables](#environment-variables).
- [ ] For pull request previews, add the repository secrets `VERCEL_TOKEN`,
      `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
- [ ] For the CD workflows, create the GitHub environments `development`,
      `staging` and `production`. Add the repository variables `DEV_URL`,
      `STAGE_URL`, `PROD_URL` and the repository secrets `DEV_API_URL`,
      `STAGE_API_URL`, `PROD_API_URL`. Give `production` required reviewers.
- [ ] Pick a deploy target in each `cd-*.yml` workflow. Until you uncomment
      one of the options, they build and print success but deploy nothing.
- [ ] Let the release workflow open pull requests: Settings → Actions →
      General → Workflow permissions → allow GitHub Actions to create and
      approve pull requests.
- [ ] Protect `main` and require the CI check to pass. Create `dev` and
      `stage` branches if you use them.

## What's inside

```text
.
├── apps/
│   ├── web/                 React 19 + Vite 8 single-page app
│   └── server/              placeholder, not a workspace package yet
├── packages/
│   ├── ui/                  @repo/ui: shared React components
│   ├── eslint-config/       @repo/eslint-config: shared ESLint rules
│   └── typescript-config/   @repo/typescript-config: shared tsconfigs
├── docs/                    the six planning docs and a commit cheat sheet
├── .changeset/              Changesets config
├── .github/workflows/       CI, preview, release, and dev/stage/main CD
├── .husky/                  git hooks
├── CLAUDE.md                rules for AI-assisted work in this repo
├── .nvmrc                   Node version, read by every workflow
└── turbo.json               task pipeline
```

| Area         | Tools                                                       |
| ------------ | ----------------------------------------------------------- |
| Monorepo     | pnpm 8 workspaces, Turborepo 2                              |
| Frontend     | React 19, Vite 8, `@vitejs/plugin-react` 6                  |
| Language     | TypeScript 7                                                |
| Testing      | Vitest 5                                                    |
| Code quality | ESLint 8 with typescript-eslint 8, Prettier 3, EditorConfig |
| Git          | Husky 9, lint-staged, commitlint                            |
| Releases     | Changesets                                                  |
| CI/CD        | GitHub Actions, Vercel previews                             |
| Database     | Supabase (planned; added when the first feature needs it)   |

## Scripts

Run these from the repository root.

| Command                 | What it does                                                 |
| ----------------------- | ------------------------------------------------------------ |
| `pnpm dev`              | Starts every app in dev mode                                 |
| `pnpm build`            | Builds everything; typecheck and tests run first             |
| `pnpm lint`             | Lints every package                                          |
| `pnpm typecheck`        | Type-checks every package                                    |
| `pnpm test`             | Runs every package's tests                                   |
| `pnpm precheck`         | Lint, typecheck, test and build. Run it before opening a PR. |
| `pnpm format`           | Formats the whole repo with Prettier                         |
| `pnpm changeset`        | Records a version bump for a package in `packages/`          |
| `pnpm version-packages` | Applies changesets (the release workflow normally does this) |

One package or one test file:

```sh
pnpm turbo run test --filter=web
pnpm --filter web exec vitest run src/sample.test.ts
```

## Day-to-day workflow

### Branches and deploys

| Event                              | What runs                                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Pull request into `main`           | CI (install, lint, typecheck, build, test) and a Vercel preview                                                  |
| Pull request into `dev` or `stage` | Vercel preview                                                                                                   |
| Push to `dev`                      | CD — Dev: checks, build, deploy step                                                                             |
| Push to `stage`                    | CD — Stage: checks, then deploy step                                                                             |
| Push to `main`                     | CI; CD — Production (checks, then deploy after approval); Release (opens the version PR if there are changesets) |

### Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org)
and commitlint rejects anything else:

```text
type(optional-scope): subject in lowercase
```

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
  `ci`, `chore`, `revert`, `wip`.
- Start the subject with a lowercase word, acronyms included:
  `ci: fix the release step`, not `fix: CI release step`.
- Header up to 100 characters, no full stop at the end.

### Git hooks

| Hook            | What it does                                                         |
| --------------- | -------------------------------------------------------------------- |
| `pre-commit`    | lint-staged: ESLint and Prettier on staged files                     |
| `commit-msg`    | commitlint checks the message                                        |
| `pre-push`      | Tests and typecheck for packages changed in the last commit          |
| `pre-rebase`    | Blocks rebasing while on `main`                                      |
| `post-merge`    | Reinstalls dependencies if `pnpm-lock.yaml` changed                  |
| `post-checkout` | Reinstalls dependencies if `pnpm-lock.yaml` changed between branches |

### Versioning packages

Packages in `packages/` are versioned with Changesets; `web` isn't. After
changing a package, run `pnpm changeset`, describe the change, and commit the
generated file. When it reaches `main`, the release workflow opens a
`chore: release packages` pull request that bumps the versions.

## Environment variables

- Local values go in `apps/web/.env.local`, which git ignores. Read them in
  code with `import.meta.env.VITE_*`.
- **Anything prefixed `VITE_` is built into the browser bundle and is
  public.** Never put a secret in one; secrets belong in server-side code.
- The CD workflows pass `VITE_APP_ENV` and `VITE_API_URL` to the build.
- Turborepo runs tasks in strict env mode. A variable that isn't `VITE_*` must
  be listed in `turbo.json` (`env` or `globalEnv`), or the build won't see it.

## Changing the shared UI package

`web` installs `@repo/ui` from a packed file (`packages/ui/repo-ui-0.0.0.tgz`),
not a live link, so changes in `packages/ui` don't show up in `web` until you
repack it:

```sh
pnpm --filter @repo/ui build
(cd packages/ui && pnpm pack)
pnpm install
```

Commit the new `.tgz` and `pnpm-lock.yaml` together.

## Adding Supabase

Supabase is the planned database and auth provider. It isn't installed yet;
add it when the first feature needs it, following
[`docs/05-database-schema.md`](docs/05-database-schema.md):

- Install `@supabase/supabase-js` in `apps/web` and create the client in a
  single module.
- Put `VITE_SUPABASE_URL` and the publishable (anon) key in `.env.local`. The
  `service_role` / secret key never goes in a `VITE_` variable or in
  `apps/web`.
- Keep schema changes as SQL migrations in `supabase/migrations/`, with
  row-level security on every table.

[`CLAUDE.md`](CLAUDE.md) has the full list of rules.

## Working with Claude Code

[`CLAUDE.md`](CLAUDE.md) tells Claude how to work here. It covers the project
stage, simplicity rules (KISS, YAGNI, rule of three), a security baseline
that applies at every stage, and the extra checklists for MVP and Production.
Claude reads the planning docs before building a feature and stops to ask when
one is missing or unapproved. Keep the stage line current.

## Known limitations

- Vitest can't import `@repo/ui` unless the test config inlines it
  (`server.deps.inline: ['@repo/ui']`), because the package uses directory
  imports that only a bundler resolves.
- `web`'s `lint` script only covers `.ts` files. `.tsx` files are linted when
  you commit, but not by `pnpm lint` or CI.
- ESLint 8 is past end-of-life. Moving to ESLint 9 means switching to the flat
  config format.
- `apps/server` is an empty placeholder.
