import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Redirector from '../Redirector';

describe('Redirector', () => {
  it('logs error when url is missing', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Redirector url="" />);
    expect(errorSpy).toHaveBeenCalledWith('No or invalid redirect URL');
    errorSpy.mockRestore();
  });

  it('replaces location after delay', () => {
    jest.useFakeTimers();
    const originalLocation = window.location;
    const replaceSpy = jest.fn();
    // jsdom makes location readonly; replace it for this test.
    delete (window as any).location;
    (window as any).location = { ...originalLocation, replace: replaceSpy };

    render(<Redirector url="https://example.com" delayMs={500} />);
    jest.advanceTimersByTime(500);
    expect(replaceSpy).toHaveBeenCalledWith('https://example.com');
    (window as any).location = originalLocation;
    jest.useRealTimers();
  });
});
