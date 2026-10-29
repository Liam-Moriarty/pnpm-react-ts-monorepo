import type { ReactNode } from 'react';
import { CopyableCode } from './CopyableCode';

type Step = {
  text: ReactNode;
  command?: string;
};

export const Steps = ({ steps }: { steps: Step[] }) => (
  <ol className="space-y-5">
    {steps.map((step, i) => (
      <li
        key={i}
        className="grid grid-cols-[2rem_1fr] items-start gap-x-4 gap-y-3"
      >
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full border-[1.5px] border-text font-display text-sm"
        >
          {i + 1}
        </span>
        <p className="max-w-prose pt-1">{step.text}</p>
        {step.command && (
          <div className="col-start-2 min-w-0">
            <CopyableCode code={step.command} />
          </div>
        )}
      </li>
    ))}
  </ol>
);
