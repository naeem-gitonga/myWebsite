import { render } from '@testing-library/react';
import LazyImage from '../LazyImage/LazyImage';
import Home from '../Icons/Home';
import Shop from '../Icons/Shop';
import ShoppingCart from '../Icons/ShoppingCart';
import LinkedIn from '../Icons/LinkedIn';
import Github from '../Icons/Github';
import Bitcoin from '../Icons/Bitcoin';
import Envelop from '../Icons/Envelope';
import XMark from '../Icons/XMark';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

describe('media and icons', () => {
  it('renders lazy image with default loading', () => {
    const { getByAltText } = render(
      <LazyImage src="/image.png" alt="test" width={10} height={10} />
    );
    const img = getByAltText('test') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('lazy');
  });

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
