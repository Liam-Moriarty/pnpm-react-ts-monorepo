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

Defined once as CSS variables and used everywhere. No one-off colour values in
components.

| Token                | Value | Used for                    |
| -------------------- | ----- | --------------------------- |
| `--color-primary`    | TODO  | Main buttons, links         |
| `--color-text`       | TODO  | Body text                   |
| `--color-background` | TODO  | Page background             |
| `--color-surface`    | TODO  | Cards, panels               |
| `--color-border`     | TODO  | Dividers, input outlines    |
| `--color-error`      | TODO  | Errors, destructive actions |
| `--color-success`    | TODO  | Confirmations               |

Dark mode: TODO: yes or no. If yes, add a dark value column.

## Typography

| Use                 | Font | Size and weight |
| ------------------- | ---- | --------------- |
| Headings            | TODO | TODO            |
| Body                | TODO | TODO            |
| Labels, small print | TODO | TODO            |

## Components

How each element looks in every state. Shared components live in
`packages/ui`.

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
