import type { CSSProperties } from 'react';
import { rooms } from './rooms';
import type { SheetId } from './sheets';

// The small plan in each title block: the rooms this sheet covers are hatched,
// and the whole thing links back to the full plan.
export const KeyPlan = ({ sheet }: { sheet: SheetId }) => (
  <a
    href="#plan"
    className="group block space-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
  >
    <span
      aria-hidden="true"
      className="grid h-16 grid-cols-12 grid-rows-4 gap-0.5"
    >
      {rooms.map((room) => (
        <span
          key={room.path}
          style={{ '--area': room.area } as CSSProperties}
          data-here={room.sheet === sheet ? '' : undefined}
          className={`border [grid-area:var(--area)] group-hover:border-primary data-here:border-primary data-here:[background-image:var(--hatch)] ${room.planned ? 'border-dashed border-muted' : 'border-text'}`}
        />
      ))}
    </span>
    <span className="block text-sm text-primary group-hover:underline">
      Back to the repo plan
    </span>
  </a>
);
