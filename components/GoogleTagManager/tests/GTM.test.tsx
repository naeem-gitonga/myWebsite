import { render, screen } from '@testing-library/react';
import GTM from '../GTM';

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <script data-testid="next-script" {...props} />
  ),
}));

describe('GTM', () => {
  it('renders google tag manager scripts', () => {
    render(<GTM name="test" />);
    const scripts = screen.getAllByTestId('next-script');
    expect(scripts.length).toBe(2);
  });
});
