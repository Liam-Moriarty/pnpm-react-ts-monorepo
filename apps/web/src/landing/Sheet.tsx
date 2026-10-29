import type { ReactNode } from 'react';
import { KeyPlan } from './KeyPlan';
import { sheetCount, sheetName, sheetNumber, type SheetId } from './sheets';

type SheetProps = {
  id: SheetId;
  children: ReactNode;
};

// One drawing sheet: the content on the left, the title block on the right
// (below it on narrow screens). The plan sheet is already on screen when the
// page loads and has its own intro, so only the topic sheets draw on scroll.
export const Sheet = ({ id, children }: SheetProps) => (
  <section
    id={id}
    data-scroll-drawn={id === 'plan' ? undefined : ''}
    className="sheet drawn grid scroll-mt-6 bg-background lg:grid-cols-[1fr_15rem]"
  >
    <div className="min-w-0 space-y-6 p-5 sm:p-10 [&>p]:max-w-prose">
      {children}
    </div>
    <TitleBlock id={id} />
  </section>
);

const TitleBlock = ({ id }: { id: SheetId }) => (
  <div className="border-t-[1.5px] border-text lg:border-t-0 lg:border-l-[1.5px]">
    <dl className="grid grid-cols-2 lg:sticky lg:top-0 lg:grid-cols-1">
      <div className="border-b border-border p-4 max-lg:border-r">
        <dt className="text-xs text-muted">Project</dt>
        <dd className="mt-1 font-display text-sm">pnpm monorepo template</dd>
      </div>
      <div className="border-b border-border p-4">
        <dt className="text-xs text-muted">Sheet</dt>
        <dd className="mt-1 font-display text-lg leading-tight">
          {sheetName(id)}
        </dd>
      </div>
      {id !== 'plan' && (
        <div className="border-border p-4 max-lg:border-r lg:border-b">
          <dt className="text-xs text-muted">Key plan</dt>
          <dd className="mt-2">
            <KeyPlan sheet={id} />
          </dd>
        </div>
      )}
      <div className="p-4">
        <dt className="sr-only">Sheet number</dt>
        <dd className="sheet-number inline-block px-1 font-display font-light font-stretch-expanded">
          <span className="text-6xl">{sheetNumber(id)}</span>
          <span className="ml-2 text-muted">of {sheetCount}</span>
        </dd>
      </div>
    </dl>
  </div>
);

export const SheetHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display text-4xl font-light text-balance font-stretch-expanded sm:text-5xl">
    {children}
  </h2>
);

export const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="pt-4 font-display text-2xl">{children}</h3>
);

// Pass <li> elements: the margin notes a drafter adds beside a drawing.
export const Notes = ({ children }: { children: ReactNode }) => (
  <aside className="max-w-prose border-l-[1.5px] border-dashed border-muted pl-5">
    <h3 className="font-display text-sm font-medium">Notes</h3>
    <ul className="mt-2 space-y-2 text-sm text-muted">{children}</ul>
  </aside>
);
