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
    render(<LazyImage src="/image.png" alt="test" width={10} height={10} />);
    const img = screen.getByTestId('lazy-image-thumbnail') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('opens the modal on click and renders the full-view image', () => {
    render(<LazyImage src="/image.png" alt="modal-test" width={10} height={10} />);
    const thumbnail = screen.getByTestId('lazy-image-thumbnail');
    fireEvent.click(thumbnail);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    const modalImage = screen.getByTestId('lazy-image-modal');
    expect(modalImage).toBeInTheDocument();
  });
});
