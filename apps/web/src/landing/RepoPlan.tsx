import type { CSSProperties } from 'react';
import { rooms } from './rooms';
import { sheetNumber } from './sheets';

export const RepoPlan = ({ drawn }: { drawn: boolean }) => (
  <nav aria-label="Repo plan">
    <ul
      data-drawn={drawn ? '' : undefined}
      className="plan grid grid-cols-2 gap-1.5 lg:grid-cols-12 lg:grid-rows-[repeat(4,minmax(6rem,auto))]"
    >
      {rooms.map((room, i) => (
        <li
          key={room.path}
          style={{ '--i': i, '--area': room.area } as CSSProperties}
          className="max-lg:first:col-span-2 lg:[grid-area:var(--area)]"
        >
          <a
            href={`#${room.sheet}`}
            data-planned={room.planned ? '' : undefined}
            className="room drawn flex h-full flex-col gap-1 bg-background p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="font-mono text-sm">{room.path}</span>
            <span className="text-sm text-muted">{room.note}</span>
            <span className="mt-auto flex size-7 shrink-0 items-center justify-center self-end rounded-full border border-muted font-display text-xs text-muted">
              <span className="sr-only">Sheet </span>
              {sheetNumber(room.sheet)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
