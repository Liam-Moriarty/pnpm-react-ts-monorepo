import { Header } from '@repo/ui';
import { RepoPlan } from './RepoPlan';
import { Sheet } from './Sheet';
import { sheetNumber, sheets } from './sheets';

export const PlanSheet = ({ drawn }: { drawn: boolean }) => (
  <Sheet id="plan">
    <Header title="pnpm monorepo template" />
    <p className="text-lg text-muted">
      React 19, Vite 8, TypeScript 7 and Tailwind CSS 4 in a pnpm and Turborepo
      monorepo. Each room on the plan is a folder: select one to open the sheet
      that explains it.
    </p>
    <RepoPlan drawn={drawn} />
    <div className="grid gap-8 pt-2 sm:grid-cols-2">
      <section aria-labelledby="legend-heading">
        <h2 id="legend-heading" className="font-display text-sm font-medium">
          Legend
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-4 w-8 shrink-0 border-[1.5px] border-text"
            />
            In the repo now
          </li>
          <li className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-4 w-8 shrink-0 border-[1.5px] border-dashed border-muted"
            />
            Planned: add it when a feature needs it
          </li>
          <li className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-4 w-8 shrink-0 border-[1.5px] border-primary [background-image:var(--hatch)]"
            />
            Select it to open its sheet
          </li>
        </ul>
      </section>
      <nav aria-labelledby="index-heading">
        <h2 id="index-heading" className="font-display text-sm font-medium">
          Sheet index
        </h2>
        <ol className="mt-3 space-y-1 text-sm">
          {sheets.slice(1).map((sheet) => (
            <li key={sheet.id}>
              <a
                href={`#${sheet.id}`}
                className="inline-flex gap-3 text-primary decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="font-display text-muted tabular-nums">
                  {sheetNumber(sheet.id)}
                </span>
                {sheet.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  </Sheet>
);
