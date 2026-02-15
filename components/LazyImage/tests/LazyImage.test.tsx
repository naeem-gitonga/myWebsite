import { fireEvent, render, screen } from '@testing-library/react';
import LazyImage from '../LazyImage';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

jest.mock('@/components/Modal/Modal', () => ({
  __esModule: true,
  default: ({
    isOpen,
    children,
    wrapperClassName,
    containerClassName,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    wrapperClassName?: string;
    containerClassName?: string;
  }) =>
    isOpen ? (
      <div
        data-testid="modal"
        data-wrapper={wrapperClassName}
        data-container={containerClassName}
      >
        {children}
      </div>
    ) : null,
}));

describe('LazyImage', () => {
  it('renders with default lazy loading', () => {
    const { getByAltText } = render(
      <LazyImage src="/image.png" alt="test" width={10} height={10} />
    );
    const img = getByAltText('test') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('opens the modal on click and renders the full-view image', () => {
    render(<LazyImage src="/image.png" alt="modal-test" width={10} height={10} />);
    const img = screen.getByAltText('modal-test');
    fireEvent.click(img);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByAltText('modal-test')).toBeInTheDocument();
  });
});
