import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './counter';

describe('Counter', () => {
  it('counts up on each click', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(button.textContent).toBe('2');
  });
});
