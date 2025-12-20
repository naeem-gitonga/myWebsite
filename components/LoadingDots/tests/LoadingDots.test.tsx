import { render } from '@testing-library/react';
import LoadingDots from '../LoadingDots';

describe('LoadingDots', () => {
  it('renders dot elements', () => {
    const { container } = render(
      <LoadingDots outerClassName="outer" dotClassName="dot" />
    );
    expect(container.querySelectorAll('div').length).toBeGreaterThan(1);
  });

  it('renders without outer class name', () => {
    const { container } = render(<LoadingDots />);
    expect(container.querySelectorAll('div').length).toBeGreaterThan(1);
  });
});
