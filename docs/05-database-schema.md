# 05 · Database schema

**Status:** Not started · **Owner:** TODO · **Approved by:** TODO · **Date:**
TODO

What data the app stores, where it lives, and who can see each part of it.

**Never skip this one.** A screen that looks wrong is quick to fix. User data
visible to the wrong people is a breach.

## Data we keep

Everything the app stores about people or organisations. If the "Why we need
it" column is empty, don't collect it. Storing payment or health data usually
means the Production checklist in [`CLAUDE.md`](../CLAUDE.md) applies.

| Data | Example | Sensitivity                                         | Why we need it | How long we keep it |
| ---- | ------- | --------------------------------------------------- | -------------- | ------------------- |
| TODO | TODO    | TODO: public, internal, personal, payment or health | TODO           | TODO                |

## Where it lives

- **Database:** TODO: Supabase project per environment (see
  [02](02-technical-requirements.md))
- **Files:** TODO: Supabase Storage buckets, if any (see Files below)
- **Outside systems:** TODO: data held elsewhere, e.g. by a payment provider

## Tables

One block per table. Every table that holds user data has an owner column
(`user_id` or `org_id`) so the access rules can check it.

### `TODO_table_name`

TODO: what one row represents.

| Column       | Type        | Required | Notes                          |
| ------------ | ----------- | -------- | ------------------------------ |
| `id`         | uuid        | yes      | Primary key                    |
| `user_id`    | uuid        | yes      | Owner, references `auth.users` |
| `created_at` | timestamptz | yes      | Defaults to `now()`            |
| TODO         | TODO        | TODO     | TODO                           |

**Relationships:** TODO: e.g. one client has many invoices.

<!-- Copy the table block for each table. -->

## Who can see what

The access rules. Each row becomes a row-level security (RLS) policy in
`supabase/migrations/` and, from MVP on, a test. Anything not listed here is
denied.

| Table | Role | Read     | Create | Update   | Delete | Rule                              |
| ----- | ---- | -------- | ------ | -------- | ------ | --------------------------------- |
| TODO  | TODO | own rows | yes    | own rows | no     | TODO: e.g. `user_id = auth.uid()` |

Columns users must never set themselves (e.g. role, owner, plan, price): TODO

## Files

| Bucket | Public? | Who can upload | Who can read | Size and type limits |
| ------ | ------- | -------------- | ------------ | -------------------- |
| TODO   | No      | TODO           | TODO         | TODO                 |

## Backups and deletion

- **Backups:** TODO: how often, how long they're kept, who can restore
- **When a user deletes their account:** TODO: what's deleted, what's kept,
  and why
