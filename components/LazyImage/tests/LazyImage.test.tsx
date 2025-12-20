import { render } from '@testing-library/react';
import LazyImage from '../LazyImage';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

describe('LazyImage', () => {
  it('renders with default lazy loading', () => {
    const { getByAltText } = render(
      <LazyImage src="/image.png" alt="test" width={10} height={10} />
    );
    const img = getByAltText('test') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
