import { act, renderHook } from '@testing-library/react';
import useModal from '../useModal';

describe('useModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="body"></div>';
  });

  it('toggles modal state and body class', () => {
    const { result } = renderHook(() => useModal());
    const body = document.getElementById('body');

    expect(result.current[0]).toBe(false);
    expect(body?.classList.contains('overflowHidden')).toBe(false);

    act(() => result.current[1]());
    expect(body?.classList.contains('overflowHidden')).toBe(true);

    act(() => result.current[1]());
    expect(body?.classList.contains('overflowHidden')).toBe(false);
  });

  it('handles missing body element safely', () => {
    document.body.innerHTML = '';
    const { result } = renderHook(() => useModal());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });
});
