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
});
