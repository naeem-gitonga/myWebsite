import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from '../Modal';
import { MEDIA_SM } from '@/hooks/useBreakpoint';

describe('Modal', () => {
  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  beforeEach(() => {
    document.body.id = 'body';
    document.body.className = '';
  });

  it('renders modal content and close button', async () => {
    setWindowWidth(MEDIA_SM + 200);
    const onClose = jest.fn();
    const { container } = render(
      <Modal isOpen hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    expect(await screen.findByText('content')).toBeInTheDocument();
    const icon = container.querySelector('svg');
    fireEvent.click(icon?.parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} hideClose={false} setModalOpen={jest.fn()}>
        <div>content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('adds and removes overflowHidden on the body', async () => {
    setWindowWidth(MEDIA_SM + 200);
    const onClose = jest.fn();
    const { rerender } = render(
      <Modal isOpen hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    await screen.findByText('content');
    expect(document.body.classList.contains('overflowHidden')).toBe(true);

    rerender(
      <Modal isOpen={false} hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    await waitFor(() =>
      expect(document.body.classList.contains('overflowHidden')).toBe(false)
    );
  });

  it('animates out and unmounts on small screens when isOpen flips to false', async () => {
    jest.useFakeTimers();
    setWindowWidth(MEDIA_SM - 1);
    const onClose = jest.fn();
    const { rerender } = render(
      <Modal isOpen hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    await screen.findByText('content');

    rerender(
      <Modal isOpen={false} hideClose={false} setModalOpen={onClose}>
        <div>content</div>
      </Modal>
    );

    expect(screen.getByText('content')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('content')).toBeNull();
    });

    jest.useRealTimers();
  });

  it('uses slide-in animation class on small screens', async () => {
    setWindowWidth(MEDIA_SM - 1);
    const { container } = render(
      <Modal isOpen hideClose={false} setModalOpen={jest.fn()}>
        <div>content</div>
      </Modal>
    );

    await screen.findByText('content');
    const modalContainer = container.querySelector('#modal > div:last-child');
    expect(modalContainer?.className).toContain('slideIn');
  });
});
