import { fireEvent, render, screen } from '@testing-library/react';
import Tooltip from '../Tooltip/Tooltip';
import Tags from '../Tags/Tags';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadingDots from '../LoadingDots/LoadingDots';
import Price from '../Price/Price';
import Modal from '../Modal/Modal';
import PromoBanner from '../PromoBanner/PromoBanner';

describe('UI primitives', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('shows and hides tooltip text on hover', () => {
    const { container, queryByText } = render(
      <Tooltip text="help">
        <span>hover me</span>
      </Tooltip>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(queryByText('help')).toBeNull();
    fireEvent.mouseOver(wrapper);
    expect(screen.getByText('help')).toBeInTheDocument();
    fireEvent.mouseOut(wrapper);
    expect(queryByText('help')).toBeNull();
  });

  it('renders tags list', () => {
    render(<Tags tags={['one', 'two']} />);
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('renders loading screen text', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('LOADING NAEEMGITONGA.COM')).toBeInTheDocument();
  });

  it('renders loading dots', () => {
    const { container } = render(
      <LoadingDots outerClassName="outer" dotClassName="dot" />
    );
    expect(container.querySelectorAll('div').length).toBeGreaterThan(1);
  });

  it('renders price with promotion', () => {
    const { container } = render(
      <Price price={10} promotion={5} priceStyle="price" strike="strike" />
    );
    expect(container.textContent).toContain('$10');
    expect(container.textContent).toContain('$5');
  });

  it('renders modal content and close button', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal isOpen hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
    const icon = container.querySelector('svg');
    fireEvent.click(icon?.parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders promo banner when enabled', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SHOW_PROMO_BANNER: 'true',
      NEXT_PUBLIC_PROMO_BANNER_TEXT: 'Promo',
    };
    render(<PromoBanner />);
    expect(screen.getByText('Promo')).toBeInTheDocument();
  });
});
