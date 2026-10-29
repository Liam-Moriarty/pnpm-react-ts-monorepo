import type { ReactNode } from 'react';

type ScheduleProps = {
  caption: string;
  head: [string, string];
  rows: [ReactNode, ReactNode][];
};

// A drawing's schedule: the two-column table a drafter uses to list doors,
// windows or, here, scripts and hooks. On a phone each row stacks, so the
// commands keep their full width.
export const Schedule = ({ caption, head, rows }: ScheduleProps) => (
  <table className="w-full border-collapse text-left text-sm max-sm:block">
    <caption className="pb-2 text-left font-display text-sm font-medium max-sm:block">
      {caption}
    </caption>
    <thead className="max-sm:sr-only">
      <tr>
        {head.map((label) => (
          <th
            key={label}
            scope="col"
            className="border border-border bg-surface px-3 py-2 font-display font-medium text-muted"
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="max-sm:block">
      {rows.map(([first, second], i) => (
        <tr
          key={i}
          className="max-sm:-mt-px max-sm:block max-sm:border max-sm:border-border"
        >
          <th
            scope="row"
            className="border border-border px-3 py-2 align-top font-normal max-sm:block max-sm:border-0 max-sm:pb-0"
          >
            {first}
          </th>
          <td className="border border-border px-3 py-2 align-top text-muted max-sm:block max-sm:border-0">
            {second}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
