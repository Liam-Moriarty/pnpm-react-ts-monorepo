export type SheetId =
  | 'plan'
  | 'setup'
  | 'run'
  | 'workflow'
  | 'shared-ui'
  | 'env'
  | 'supabase'
  | 'claude';

export type SheetInfo = {
  id: SheetId;
  name: string;
};

export const sheets: readonly SheetInfo[] = [
  { id: 'plan', name: 'Repo plan' },
  { id: 'setup', name: 'Setup' },
  { id: 'run', name: 'Run and scripts' },
  { id: 'workflow', name: 'Daily workflow' },
  { id: 'shared-ui', name: 'Shared UI and Tailwind' },
  { id: 'env', name: 'Env vars and secrets' },
  { id: 'supabase', name: 'Adding Supabase' },
  { id: 'claude', name: 'Working with Claude Code' },
];

const twoDigits = (n: number) => String(n).padStart(2, '0');

export const sheetCount = twoDigits(sheets.length);

export const sheetNumber = (id: SheetId) =>
  twoDigits(sheets.findIndex((sheet) => sheet.id === id) + 1);

export const sheetName = (id: SheetId) =>
  sheets.find((sheet) => sheet.id === id)?.name ?? '';
