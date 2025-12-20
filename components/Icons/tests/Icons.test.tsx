import { render } from '@testing-library/react';
import Home from '../Home';
import Shop from '../Shop';
import ShoppingCart from '../ShoppingCart';
import LinkedIn from '../LinkedIn';
import Github from '../Github';
import Bitcoin from '../Bitcoin';
import Envelop from '../Envelope';
import XMark from '../XMark';

describe('Icons', () => {
  it('renders icon svgs', () => {
    const { container } = render(
      <div>
        <Home fill="red" />
        <Shop />
        <ShoppingCart />
        <LinkedIn />
        <Github />
        <Bitcoin />
        <Envelop />
        <XMark fill="black" />
      </div>
    );
    expect(container.querySelectorAll('svg').length).toBe(8);
  });
});
