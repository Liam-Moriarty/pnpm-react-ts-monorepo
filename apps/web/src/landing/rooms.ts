import type { SheetId } from './sheets';

export type Room = {
  path: string;
  note: string;
  sheet: SheetId;
  // Placement on the 12-column, 4-row plan: row-start / col-start / row-end / col-end.
  area: string;
  // Not in the repo yet, so its walls are dashed.
  planned?: boolean;
};

// .env.local sits inside apps/web's corner, like a closet, so it comes after
// apps/web and is painted over it.
export const rooms: readonly Room[] = [
  {
    path: 'apps/web',
    note: 'The React app. You are looking at it.',
    sheet: 'run',
    area: '1 / 1 / 3 / 5',
  },
  {
    path: '.env.local',
    note: 'Local settings, git-ignored',
    sheet: 'env',
    area: '2 / 3 / 3 / 5',
  },
  {
    path: 'packages/ui',
    note: 'Shared components, shipped as source',
    sheet: 'shared-ui',
    area: '1 / 5 / 3 / 8',
  },
  {
    path: 'packages/*-config',
    note: 'Shared ESLint and TypeScript settings',
    sheet: 'run',
    area: '1 / 8 / 2 / 13',
  },
  {
    path: 'docs/',
    note: 'Six planning docs to approve before building',
    sheet: 'setup',
    area: '2 / 8 / 3 / 13',
  },
  {
    path: 'apps/server',
    note: 'Placeholder until something needs a server',
    sheet: 'supabase',
    area: '3 / 1 / 5 / 4',
    planned: true,
  },
  {
    path: 'supabase/',
    note: 'Migrations, once a feature stores data',
    sheet: 'supabase',
    area: '3 / 4 / 5 / 6',
    planned: true,
  },
  {
    path: '.github/',
    note: 'CI, previews, deploys and Dependabot',
    sheet: 'workflow',
    area: '3 / 6 / 5 / 9',
  },
  {
    path: '.husky/',
    note: 'Git hooks',
    sheet: 'workflow',
    area: '3 / 9 / 4 / 11',
  },
  {
    path: '.changeset/',
    note: 'Package version bumps',
    sheet: 'workflow',
    area: '4 / 9 / 5 / 11',
  },
  {
    path: 'CLAUDE.md',
    note: 'Rules for Claude Code',
    sheet: 'claude',
    area: '3 / 11 / 5 / 13',
  },
];
