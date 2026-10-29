import { describe, expect, it, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Welcome } from './Welcome';

describe('Welcome', () => {
  it('leaves by itself after 2 seconds', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<Welcome onDone={onDone} />);

    act(() => vi.advanceTimersByTime(2000));
    expect(onDone).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(450));
    expect(onDone).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  // Real timers: waitFor gives up after 1 second, well inside the 2 seconds
  // the welcome would otherwise stay.
  it('leaves straight away when a key is pressed', async () => {
    const user = userEvent.setup();
    const onDone = vi.fn();
    render(<Welcome onDone={onDone} />);

    await user.keyboard('{Enter}');

    await waitFor(() => expect(onDone).toHaveBeenCalledOnce());
  });
});
