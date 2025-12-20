import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
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

  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} hideClose={false} setModalOpen={jest.fn()}>
        <div>content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });
});
