import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('renders the title as the page heading', () => {
    render(<Header title="Web" />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Web');
  });
});
