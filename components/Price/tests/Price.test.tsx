import { render } from '@testing-library/react';
import Price from '../Price';

describe('Price', () => {
  it('renders price with promotion', () => {
    const { container } = render(
      <Price price={10} promotion={5} priceStyle="price" strike="strike" />
    );
    expect(container.textContent).toContain('$10');
    expect(container.textContent).toContain('$5');
  });
});
