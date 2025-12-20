import { fireEvent, render } from '@testing-library/react';
import ReturnArrow from '../ReturnArrow';

describe('ReturnArrow', () => {
  it('scrolls to top when clicked', () => {
    jest.useFakeTimers();
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'pageYOffset', { value: 6, writable: true });

    const { container } = render(<ReturnArrow />);
    const arrow = container.querySelector('#arrow');
    fireEvent.click(arrow as HTMLElement);
    jest.runOnlyPendingTimers();

    expect(window.scrollTo).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('toggles visibility on scroll', () => {
    const { container } = render(<ReturnArrow />);
    const arrow = container.querySelector('#arrow') as HTMLElement;
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(arrow.style.display).toBe('none');
    Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });
    window.dispatchEvent(new Event('scroll'));
    expect(arrow.style.display).toBe('initial');
  });
});
