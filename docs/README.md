# Planning docs

Six documents that must exist, and be approved, before anyone starts building
an app from this template. Each one answers a question that otherwise gets
answered halfway through the build by whoever happens to be typing, whether
that's a developer or an AI assistant.

Whoever builds the app drafts them; drafting with AI is fine. Whoever owns the
app reads them and approves or rejects them before work starts. Changing a
sentence here costs far less than changing a screen later.

| #   | Document                                               | Answers                                                | If it's missing                                |
| --- | ------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------- |
| 01  | [Product requirements](01-product-requirements.md)     | What the app does, feature by feature                  | The app does what the builder assumed          |
| 02  | [Technical requirements](02-technical-requirements.md) | What it's built on, where it runs, what it connects to | Tools get swapped mid-build and work is redone |
| 03  | [App flow](03-app-flow.md)                             | What happens on every screen and every click           | Dead ends nobody finds until a user does       |
| 04  | [Design brief](04-design-brief.md)                     | How every screen looks                                 | Screens drift apart or look like a template    |
| 05  | [Database schema](05-database-schema.md)               | What data is stored, where, and who can see it         | Nobody can say who has access to user data     |
| 06  | [Implementation plan](06-implementation-plan.md)       | What gets built in what order, and where sign-off is   | Everything is "nearly done" for weeks          |

Write them in that order; each one leans on the ones before it.

## Filling them in

- Every doc starts with a status line. Move it from `Not started` to `Draft`
  when work begins, and to `Approved` when the owner signs off, with who
  approved it and when.
- Replace every `TODO`. A doc with a `TODO` left in it isn't finished. To list
  what's left: `grep -rn TODO docs/0*.md`
- Length follows the project stage set in [`CLAUDE.md`](../CLAUDE.md). A
  Prototype doc can be half a page; MVP and Production docs need the detail.
  What no stage can skip is the decision each doc records.
- Keep them current. When a decision changes during the build, update the doc
  in the same pull request.

## The check before building starts

Tick a box only if you've read that doc and agree with it.

- [ ] 01 · A feature list I've read and agreed to
- [ ] 02 · The tools it runs on, written down and fixed
- [ ] 03 · A map of every screen and what each click does
- [ ] 04 · A design brief that matches the brand
- [ ] 05 · A plan for where user data lives and who can see it
- [ ] 06 · A build order with points where I sign off

| Boxes ticked | What it means                                                           |
| ------------ | ----------------------------------------------------------------------- |
| 6            | There's a plan. Building can start.                                     |
| 3 to 5       | Write the missing ones first. It's quicker than fixing the build later. |
| 0 to 2       | Nobody has decided what's being built yet. Don't start.                 |

**Never skip 05.** A screen that looks wrong is an afternoon's fix. User data
stored in the wrong place, or visible to the wrong people, is a breach you
have to explain to your users.

## Other docs

- [Commit message cheat sheet](conventional-commit/COMMITS.md)
