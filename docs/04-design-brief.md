# 04 · Design brief

**Status:** Not started · **Owner:** TODO · **Approved by:** TODO · **Date:**
TODO

How every screen should look, so the tenth screen is as on-brand as the first.

## Brand

- **Logo files:** TODO: where they live (e.g. `apps/web/public/`) and which
  version goes on light and dark backgrounds
- **Logo rules:** TODO: minimum size, clear space, what not to do
- **Design files:** TODO: link to Figma or similar, or "none"
- **Voice:** TODO: formal or casual, and how error messages are worded

## Colours

Defined once in the `@theme` block of `apps/web/src/style.css`. Tailwind turns
each token into a CSS variable and a set of utilities: `--color-primary` gives
`bg-primary`, `text-primary` and `border-primary`. Use those everywhere. No
one-off colour values in components, Tailwind arbitrary values like
`bg-[#1d4ed8]` included.

The template ships blueprint values for these tokens, used by its landing page
and the sample `@repo/ui` components. They're placeholders: replace them with
the values below. It also defines `--color-muted` for secondary text and
`--color-grid` for the landing page's graph paper.

| Token                | Value | Used for                    |
| -------------------- | ----- | --------------------------- |
| `--color-primary`    | TODO  | Main buttons, links         |
| `--color-text`       | TODO  | Body text                   |
| `--color-background` | TODO  | Page background             |
| `--color-surface`    | TODO  | Cards, panels               |
| `--color-border`     | TODO  | Dividers, input outlines    |
| `--color-error`      | TODO  | Errors, destructive actions |
| `--color-success`    | TODO  | Confirmations               |

Dark mode: TODO: yes or no. If yes, add a dark value column. Tailwind's `dark:`
variant follows the operating system setting.

## Typography

Fonts and sizes go in the same `@theme` block (`--font-*`, `--text-*`). The
placeholder fonts are Saira (`--font-display`) and Atkinson Hyperlegible Next
and Mono (`--font-sans`, `--font-mono`), loaded from Google Fonts in
`apps/web/index.html`.

| Use                 | Font | Size and weight |
| ------------------- | ---- | --------------- |
| Headings            | TODO | TODO            |
| Body                | TODO | TODO            |
| Labels, small print | TODO | TODO            |

## Components

How each element looks in every state. Shared components live in
`packages/ui` and are styled with Tailwind classes.

| Element                         | Looks like | States to cover                 |
| ------------------------------- | ---------- | ------------------------------- |
| Primary button                  | TODO       | hover, focus, disabled, loading |
| Secondary button                | TODO       | hover, focus, disabled          |
| Text input                      | TODO       | focus, error, disabled          |
| Link                            | TODO       | hover, focus                    |
| Headings                        | TODO       |                                 |
| Card or panel                   | TODO       |                                 |
| Messages (error, success, info) | TODO       |                                 |

## Layout

Tailwind's defaults apply unless this section changes them: breakpoints at
640, 768, 1024, 1280 and 1536px (`sm` to `2xl`), and spacing in steps of 4px
(`p-1` is 4px). Changes go in `@theme`.

- **Breakpoints:** TODO: e.g. phone up to 640px, tablet up to 1024px, desktop
  above
- **Maximum content width:** TODO
- **Spacing scale:** TODO: e.g. 4, 8, 12, 16, 24, 32, 48px

## Accessibility

The minimum for every screen:

- Text contrast meets WCAG AA (4.5:1 for body text).
- Everything clickable can be reached and used with a keyboard, with a visible
  focus style.
- Images that carry meaning have alt text; every form field has a label.

Anything beyond this, e.g. a legal requirement: TODO
