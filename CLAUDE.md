# CLAUDE.md

How to work in this repository. Read **Project stage** first: it decides how
much of the rest of this file applies to the change in front of you.

## Project stage

**Current stage: Prototype**

<!-- Prototype | MVP | Production. Change this line when the project moves on. -->

| Stage      | Means                                                                | Apply                       |
| ---------- | -------------------------------------------------------------------- | --------------------------- |
| Prototype  | Testing an idea. May be thrown away. No real users or personal data. | Simplicity rules + Baseline |
| MVP        | Real users and their data, small scale, changing fast.               | + MVP checklist             |
| Production | Paying users, an uptime promise, or sensitive data.                  | + Production checklist      |

- Build what the current stage needs and nothing from a later stage. If a
  later-stage item matters for the change at hand, name it in one line in your
  reply; don't build it.
- The Baseline applies at every stage. Each item is cheap now and expensive to
  retrofit: a leaked key stays in git history, a table without RLS leaks every
  row.
- If a request implies a later stage (real user data in a Prototype, payments,
  health data, an SLA), say so and ask whether to move the stage first.

## Plan before building

The six planning docs in `docs/` (`01-product-requirements.md` to
`06-implementation-plan.md`, indexed in `docs/README.md`) record what's being
built: features, tools, screens and flows, design, data and access, and build
order.

- Before building a feature in `apps/` or `packages/ui`, read the docs that
  cover it. If the feature isn't in `01`, or a doc it depends on is not
  `Approved` or still contains `TODO`, stop and say what's missing. Don't make
  that decision yourself halfway through the build. If the user says to go
  ahead anyway, do it and name the gap in your reply.
- When a decision changes during the build, update the doc in the same change.
- The access table in `05-database-schema.md` is the source for RLS policies
  and their tests.
- Tooling, CI and docs work doesn't depend on the docs being approved.

## Deciding how to build something

When principles conflict, this order wins:

1. Correct, and meets the Baseline.
2. The simplest thing that works (KISS, YAGNI, Worse Is Better). A plain
   version that ships beats a perfect one that doesn't.
3. Least surprise: names, APIs and UI do what they say. `getUser()` never
   writes.
4. DRY, once a pattern has appeared three times (Rule of Three). Prefer
   duplication over the wrong abstraction (AHA): a bad abstraction costs more
   to undo than copied code.

In practice:

- No speculative code: no options, flags, params, interfaces or generic helpers
  that nothing uses yet. "We might need it" is not a reason.
- Don't reinvent the wheel: Supabase for auth and access rules, maintained
  libraries for dates, validation and sanitising. Before adding a dependency,
  check whether one already in the repo does the job; when adding one, check
  it's maintained and the name is exact (typosquatting), and say why.
- Code moves into `packages/*` when a second app imports it, not before.
- Debugging (Occam's razor): rule out the boring causes first (missing env
  var, stale turbo cache, wrong Supabase project)
  before theorising.
- Keep changes scoped to the task. Don't refactor, reformat or tidy unrelated
  code in the same change.

### SOLID in a React + TypeScript codebase

The code is components, hooks and functions, not class hierarchies. Apply SOLID
in that form:

- **Single responsibility**: a component renders, a hook owns one piece of
  state or data, data access lives outside components. Split when something
  has two reasons to change, not because it's long.
- **Open/closed**: extend through props, composition (`children`) and new
  files. When a component grows a third boolean flag for special cases,
  compose instead.
- **Liskov**: a component that wraps another (`PrimaryButton` around `Button`)
  accepts and honours the wrapped component's props contract.
- **Interface segregation**: props and params take only what they use. Pass
  `userName`, not the whole user row.
- **Dependency inversion**, scaled to the stage: at Prototype a hook may call
  Supabase directly. From MVP, components call feature functions (e.g.
  `src/features/<feature>/api.ts`), never the Supabase query builder, so the UI
  doesn't depend on Supabase and logic can be tested with a fake. Add a formal
  interface only when a second implementation or a test needs one.

### Code conventions

- TypeScript strict. No `any`; take `unknown` and narrow it.
- Named exports, matching the existing code.
- Tests sit next to the code as `*.test.ts` / `*.test.tsx`.
- Comments explain why, not what. Names say what the thing does.
- Match the conventions of neighbouring files over personal preference.

## Baseline: every stage, no exceptions

**Secrets and config**

- Never commit secrets. `.env` and `*.local` are git-ignored; keep local
  secrets in `.env.local`.
- Every `VITE_*` variable is compiled into the public JS bundle. Only public
  values go there (Supabase URL, anon/publishable key). The Supabase
  `service_role`/secret key, and any other secret, never gets a `VITE_` prefix
  and never appears under `apps/web`.
- Local development never points at a production database.

**Auth and data access (Supabase)**

- Use Supabase Auth. Never write password hashing, session or token code.
- Enable RLS on every table in an exposed schema, in the same migration that
  creates it. RLS on with no policy denies everything, which is the right
  start; add policies for exactly the access needed.
- Authorization is enforced by RLS on the server, never by hiding UI. Policies
  check ownership (`auth.uid() = user_id`) or membership; this is the IDOR
  defence.
- `security definer` functions and plain views bypass RLS. Avoid them; when
  one is needed, set `search_path = ''` and check `auth.uid()` inside it.
  Create views with `security_invoker = true`.
- On a server or Edge Function, identify the user by verifying the JWT
  (`supabase.auth.getUser(token)` or `getClaims()`), never by decoding it,
  trusting `getSession()`, or reading a user id from the request body.
- No SQL built from strings. Use the supabase-js query builder, or parameters
  in SQL functions (`format()` with `%L`/`%I` if dynamic SQL is unavoidable).
- Schema changes, RLS policies included, are SQL migrations committed under
  `supabase/migrations/`, not dashboard clicks.

**Input, output, errors**

- Render user content through JSX. No `dangerouslySetInnerHTML` with user data
  unless it's sanitised with DOMPurify first.
- No user input in shell commands, file paths, `eval`/`new Function`, or URLs a
  server fetches.
- Auth errors stay generic ("Invalid email or password"); never reveal whether
  an account exists.
- Never log passwords, tokens, keys or whole user records, `console.log`
  included.
- Collect only the data a feature uses. Data never stored can't leak.

**Dependencies**

- pnpm only. `pnpm-lock.yaml` is committed and never hand-edited.

## MVP checklist (adds to the Baseline)

**Testing and code**

- Vitest tests for business logic, validation and every bug fix (failing test
  first). Skip render-only components.
- RLS tests per table, at minimum "user A cannot read or change user B's rows"
  (pgTAP via `supabase test db`).
- Validate input at trust boundaries (forms, RPC arguments, Edge Function
  bodies) with a schema library such as zod. Back it with DB constraints
  (`NOT NULL`, `CHECK`, `UNIQUE`, foreign keys): the database is the last line
  of data integrity.
- Writes that must succeed or fail together go in a Postgres function called
  with `rpc()`. supabase-js has no client-side transactions.
- No mass assignment: never pass a form or request object straight to
  `insert`/`update`; list the fields. Columns users must not set (`role`,
  `owner_id`, `plan`) are protected by RLS `WITH CHECK`, column privileges or a
  trigger, not just left off the form.
- Select only the columns needed (`select('id, name')`), especially for data
  other users can see. Fetch related rows in one embedded select, not one
  query per row (N+1).
- Generate DB types (`supabase gen types typescript`) and type the client.
- Check `error` on every Supabase call. supabase-js returns `{ data, error }`
  and doesn't throw, so an unchecked error fails silently.
- Error boundary at the app root: users see a plain message, never a stack
  trace.

**Auth**

- Supabase Auth settings: minimum password length 12, leaked-password
  protection on, email confirmation on, refresh-token rotation on, JWT expiry
  kept short (default one hour).
- Password reset uses Supabase's built-in flow (single-use, expiring links).
- Sign-out calls `signOut()`; a password change also ends other sessions
  (`signOut({ scope: 'others' })`).
- Choose the access model (RBAC is the usual start) before a second role
  appears. Multi-tenant data: every tenant-owned table has an `org_id` and RLS
  checks membership on it.
- Classify data before storing it: note which columns hold PII, payment or
  health data.

**Operations**

- Separate Supabase projects and keys for dev and production.
- Admin actions and permission changes go to an audit table (Supabase already
  logs auth events).
- Dependabot (or `pnpm audit` in CI), plus GitHub secret scanning with push
  protection.
- Security headers in the host config (`vercel.json` on Vercel):
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`.
- File uploads, if any: private Supabase Storage bucket with access policies,
  size and MIME limits set on the bucket, server-generated file names.
- Backups on, restore steps written down.
- README covers setup, env vars, running and testing.

## Production checklist (adds to MVP)

**Security**

- Content-Security-Policy (start in report-only mode), HSTS and
  Permissions-Policy headers.
- Record the session-storage decision as an ADR. supabase-js keeps the session
  in `localStorage`, where any XSS can read it; if the threat model needs
  HttpOnly cookies, move auth behind a server using `@supabase/ssr`.
- MFA available to users, required for admins.
- Rate limits on every custom endpoint and Edge Function; review Supabase Auth
  rate limits. Cap request and upload sizes.
- CORS: explicit origin allowlist, never `*` with credentials. Cookie auth
  needs SameSite cookies or CSRF tokens.
- Server-side fetches of user-supplied URLs pass a destination allowlist that
  blocks internal ranges (SSRF).
- Uploads other users download: check file content, not the extension, and
  scan for malware.
- Audit log is append-only (no update/delete grants) or shipped to an external
  store. Alerts on failed-login spikes, error rates and unusual access.
- Secrets in a secrets manager or the platform's environment store, separate
  per environment, with a rotation procedure that needs no downtime.
- Supabase SSL enforcement and network restrictions on; Security Advisor clean
  before each release.
- Supply chain: SBOM generated in CI, dependency scan fails the build on
  high/critical, third-party GitHub Actions pinned to a commit SHA.
- Protected `main` with required review; the production environment has
  required reviewers (`cd-main.yml` already targets one). Containers, if any:
  minimal base image, non-root user, scanned.
- API versioning and a deprecation path once anything outside this repo calls
  the API.

**Reliability and performance**

- Point-in-time recovery on, restores tested, RTO/RPO and an uptime target
  written down and monitored.
- Retries with backoff for transient failures, on idempotent calls only.
  Circuit breakers or fallbacks around third-party services the app relies on.
- Index every column used in RLS policies and frequent filters; paginate lists
  (`range()`); code-split routes (`React.lazy`); track Core Web Vitals.
- Scale on evidence: add pooling, read replicas or caching when metrics show
  the need.
- A data retention and deletion policy that covers backups.

**Docs and cost**

- Architecture doc, ADRs for major decisions, API docs for server endpoints,
  runbooks for deploy, rollback, restore and incidents.
- End-to-end tests for critical flows (sign up, sign in, the core action).
- Spend caps or usage alerts on Supabase and Vercel; cost reviewed against
  usage.

## Repo map

- `apps/web`: React SPA built with Vite and styled with Tailwind CSS 4. The
  only app with code. Its landing page (`src/landing`) is a quick guide to
  this template and repeats the README's setup, scripts and workflow: when you
  change one, change the other.
- `apps/server`: placeholder, one comment line and no `package.json`, so not a
  workspace package. Don't build a server until something needs one (holding a
  secret, webhooks, HttpOnly-cookie auth); try RLS, Postgres functions and
  Edge Functions first.
- `packages/ui` (`@repo/ui`): shared React components, shipped as source (see
  Gotchas).
- `packages/eslint-config`, `packages/typescript-config`: shared configs.
  Extend them; don't copy rules into apps.
- `docs/`: the six planning docs (see Plan before building) and a commit cheat
  sheet.

## Commands

```sh
pnpm install
pnpm dev                                         # all apps
pnpm precheck                                    # lint + typecheck + test + build
pnpm lint | pnpm typecheck | pnpm test | pnpm build
pnpm turbo run test --filter=web                 # one package
pnpm --filter web exec vitest run src/x.test.ts  # one test file
pnpm changeset                                   # describe a change to a versioned package
pnpm format                                      # whole repo; not inside a feature change
```

## Gotchas

- `@repo/ui` is a source-only internal package: its `exports` point at `.ts`
  and `.tsx` files, apps link it with `workspace:*`, and each app's Vite build
  compiles it. It has no build step and no `dist/`. New shared packages follow
  the same pattern. A change in `packages/ui` can break `web`, so check both.
- Tailwind CSS 4 is configured in CSS, with no `tailwind.config.js`.
  `apps/web/src/style.css` imports it, and design tokens go in an `@theme`
  block there (see `docs/04-design-brief.md`); no one-off colours, arbitrary
  values like `bg-[#123456]` included. Tailwind skips `node_modules`, where
  `@repo/ui` is linked, so that file has `@source '../../../packages/ui'`.
  An app that uses `@repo/ui` without that line renders its components
  unstyled. `@repo/ui` components use the same tokens (`bg-surface`,
  `text-primary`), so an app that uses them defines the same token names.
- ESLint 10 with flat config. Each package's `eslint.config.js` re-exports
  `@repo/eslint-config/react` (React code: react-hooks rules, browser globals)
  or `@repo/eslint-config` (Node and tooling code; the root `eslint.config.mjs`
  uses it). ESLint uses the config nearest each file, so lint-staged running
  from the root still applies each package's own config. Rule changes go in
  `packages/eslint-config`, not in a package.
- Turbo's `build` depends on `typecheck` and `test`, so `pnpm build` runs the
  tests.
- Turbo 2 runs in strict env mode: a variable read during build or test must be
  declared in `turbo.json` (`env`/`globalEnv`) or turbo strips it. `VITE_*`
  passes through automatically.
- Use the versions in the repo, not assumed ones. A dependency used by more
  than one package has its version in the `catalog` in `pnpm-workspace.yaml`,
  and packages reference it as `catalog:`; change the catalog, not a
  `package.json`. Move a dependency into the catalog when a second package
  needs it. Peer dependency ranges (like `@repo/ui`'s `react: ^19`) stay
  ranges. The Node version lives in `.nvmrc`, and every workflow reads it.
- pnpm is pinned to 10 on purpose. pnpm 11 and 12 write a two-part lockfile
  that GitHub's dependency graph can't read yet, which stops Dependabot
  security alerts. Don't upgrade pnpm unless asked, and say why if you are.
- TypeScript 7 (the native compiler) runs `tsc` for type-checking. It has
  no JS compiler API, so typescript-eslint can't use it: `@repo/eslint-config`
  carries its own TypeScript 6 for the ESLint parser. Don't unify the two
  TypeScript versions.
- Tests run in jsdom with Testing Library. Each package's `vitest.setup.ts`
  cleans up the DOM after every test, because Vitest globals are off. Query by
  role or label (`getByRole`), and drive clicks and typing with `user-event`.
- Prettier: single quotes, semicolons, 80 columns, ES5 trailing commas. Some
  older files use double quotes; lint-staged reformats any file you touch, so
  don't reformat the others.

## Git, CI and releases

- Hooks: pre-commit runs lint-staged (ESLint `--max-warnings=0`, Prettier);
  commit-msg runs commitlint; pre-push runs test and typecheck (`--affected`)
  on everything not yet on the remote, plus the packages that depend on it;
  pre-rebase blocks rebasing while on `main`; post-merge and post-checkout
  reinstall when the lockfile changed.
- Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
  `build`, `ci`, `chore`, `revert`, `wip`. Scope optional and lowercase, header
  up to 100 characters, no trailing period.
- Add a changeset when changing a versioned package in `packages/*`. `web` is
  excluded from changesets.
- `dev`, `stage` and `main` each trigger a CD workflow that builds and prints
  success; the deploy steps are commented-out options. Don't enable one unless
  asked. `preview.yml` is the only workflow that deploys: a Vercel preview for
  PRs into those branches. `release.yml` opens the changesets version PR on
  `main`.
- Every workflow sets up through `.github/actions/setup` (pnpm from
  `package.json`, Node from `.nvmrc`, install); change setup there, not per
  workflow. Each workflow declares minimal `permissions`; widen them only for
  the step that needs it.
- Dependabot opens weekly PRs: one grouped PR for minor and patch updates, one
  per major, and one for GitHub Actions.

## Definition of done

- `pnpm precheck` passes (for a small change, the filtered commands for the
  touched packages), and you ran it rather than assumed it.
- The change meets the Baseline and the current stage's checklist items that
  it touches.
- From MVP on, new logic has tests and every bug fix has a regression test.
