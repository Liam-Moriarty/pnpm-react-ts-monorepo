import { useEffect, useState } from 'react';
import { sheetCount, sheets } from './sheets';

const SHOW_MS = 2000;
// Matches the .welcome exit transition in style.css.
const LEAVE_MS = 450;

// The cover sheet shown for the first 2 seconds. Any key, click or scroll
// skips it. It repeats the page's own title, so it's hidden from screen
// readers, which go straight to the content underneath.
export const Welcome = ({ onDone }: { onDone: () => void }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (leaving) {
      const timer = setTimeout(onDone, LEAVE_MS);
      return () => clearTimeout(timer);
    }

    const leave = () => setLeaving(true);
    const timer = setTimeout(leave, SHOW_MS);
    window.addEventListener('keydown', leave);
    window.addEventListener('pointerdown', leave);
    window.addEventListener('wheel', leave, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', leave);
      window.removeEventListener('pointerdown', leave);
      window.removeEventListener('wheel', leave);
    };
  }, [leaving, onDone]);

  return (
    <div
      aria-hidden="true"
      data-leaving={leaving ? '' : undefined}
      className="welcome fixed inset-0 z-50 grid place-items-center bg-background/85 p-4 backdrop-blur-xs"
    >
      <div className="welcome-sheet drawn w-full max-w-xl bg-background">
        <div className="p-6 sm:p-8">
          <p className="text-muted">Welcome to</p>
          <p className="welcome-title mt-1 font-display text-4xl font-light font-stretch-expanded sm:text-5xl">
            pnpm monorepo template
          </p>
          <p className="mt-4 text-muted">
            A quick guide to this repo, drawn as a set of {sheets.length}{' '}
            sheets.
          </p>
        </div>
        <dl className="grid grid-cols-2 border-t-[1.5px] border-text text-sm sm:grid-cols-[1fr_1fr_1.5fr]">
          <div className="border-r border-border p-4">
            <dt className="text-xs text-muted">Stack</dt>
            <dd className="mt-1">React, Vite, Tailwind</dd>
          </div>
          <div className="border-border p-4 sm:border-r">
            <dt className="text-xs text-muted">Sheets</dt>
            <dd className="mt-1">01 to {sheetCount}</dd>
          </div>
          <div className="p-4 max-sm:col-span-2 max-sm:border-t max-sm:border-border">
            <dt className="text-xs text-muted">Status</dt>
            <dd className="mt-2">
              <span className="stamp text-xs">Issued for development</span>
            </dd>
          </div>
        </dl>
      </div>
      <p className="absolute bottom-6 text-sm text-muted">
        Click or press any key to skip
      </p>
    </div>
  );
};
