# 02 · Technical requirements

**Status:** Not started · **Owner:** TODO · **Approved by:** TODO · **Date:**
TODO

What the app is built on, where it runs, and which systems it connects to.
Decided once and written down. Changing a tool after approval means updating
this document first.

## Platform

The template already makes these choices. Confirm each one, or record why
you're changing it in the decision log at the end.

| Area              | Choice                         | Notes                                                   |
| ----------------- | ------------------------------ | ------------------------------------------------------- |
| Frontend          | React 19, Vite 8, TypeScript 7 | Single-page app in `apps/web`                           |
| Monorepo          | pnpm 8 workspaces, Turborepo 2 |                                                         |
| Runtime           | Node.js 26                     | Pinned in `.nvmrc`                                      |
| Testing           | Vitest 5                       |                                                         |
| Database and auth | Supabase                       | TODO: confirm, or write "not needed"                    |
| Hosting           | Vercel                         | PR previews are wired up. TODO: confirm production host |
| Server code       | None yet                       | TODO: only if something needs a server (webhooks, keys) |

## Project stage

TODO: Prototype, MVP or Production, and why. Put the same value in the stage
line of [`CLAUDE.md`](../CLAUDE.md); it decides how much engineering rigour the
build gets.

## Environments

Delete the rows you don't need. At Prototype, local plus PR previews is often
enough.

| Environment | URL                   | Git branch | Supabase project | Notes |
| ----------- | --------------------- | ---------- | ---------------- | ----- |
| Local       | http://localhost:5173 | any        | TODO             |       |
| Development | TODO                  | `dev`      | TODO             |       |
| Staging     | TODO                  | `stage`    | TODO             |       |
| Production  | TODO                  | `main`     | TODO             |       |

## Systems it connects to

Every outside system: payment providers, email, CRMs, existing databases,
third-party APIs.

| System | What we send or receive | How it authenticates | Owner or contact |
| ------ | ----------------------- | -------------------- | ---------------- |
| TODO   | TODO                    | TODO                 | TODO             |

## Configuration and secrets

Anything prefixed `VITE_` is built into the browser bundle and is public.
Secrets never get that prefix.

| Name           | Public?       | Where it's set                | Purpose                            |
| -------------- | ------------- | ----------------------------- | ---------------------------------- |
| `VITE_APP_ENV` | Yes           | CD workflows                  | Which environment the build is for |
| `VITE_API_URL` | Yes (bundled) | GitHub secret per environment | TODO                               |
| TODO           | TODO          | TODO                          | TODO                               |

## Targets

Fill this in from MVP on. At Prototype, write "not yet".

- **Expected users and data volume:** TODO
- **Uptime target:** TODO
- **Performance:** TODO: e.g. pages usable within 2 seconds on a phone
- **Browsers and devices:** TODO
- **Backups and recovery:** TODO: how much data you can afford to lose, and
  how quickly the app must be back

## Decision log

| Date | Decision | Why  |
| ---- | -------- | ---- |
| TODO | TODO     | TODO |
