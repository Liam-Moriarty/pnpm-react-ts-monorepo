import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the shared header from @repo/ui', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'pnpm monorepo template'
    );
  });

  it('links every room on the plan to a sheet on the page', () => {
    render(<App />);
    const plan = screen.getByRole('navigation', { name: 'Repo plan' });

    for (const room of within(plan).getAllByRole('link')) {
      const sheetId = room.getAttribute('href')?.slice(1) ?? '';
      expect(document.getElementById(sheetId)).not.toBeNull();
    }
  });
});
