import { act, renderHook } from '@testing-library/react';
import useBreakpoint from '../useBreakpoint';

describe('useBreakpoint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('updates size on mount and on throttled resize', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe('lg');

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe('sm');

    act(() => {
      window.innerWidth = 1100;
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe('lg');
  });

  it('handles md and xs sizes', () => {
    Object.defineProperty(window, 'innerWidth', { value: 760, writable: true });
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe('md');

    act(() => {
      window.innerWidth = 300;
      window.dispatchEvent(new Event('resize'));
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe('xs');
  });
});
