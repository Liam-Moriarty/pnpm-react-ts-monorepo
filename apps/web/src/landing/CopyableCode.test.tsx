import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyableCode } from './CopyableCode';

describe('CopyableCode', () => {
  it('copies the code and says so', async () => {
    const user = userEvent.setup();
    render(<CopyableCode code="pnpm dev" />);

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(await navigator.clipboard.readText()).toBe('pnpm dev');
    expect(screen.getByRole('status').textContent).toBe('Copied');
  });

  it('tells the reader to copy by hand when the clipboard is blocked', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('Clipboard blocked')
    );
    render(<CopyableCode code="pnpm dev" />);

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(screen.getByRole('status').textContent).toContain(
      "Couldn't copy here"
    );
  });
});
