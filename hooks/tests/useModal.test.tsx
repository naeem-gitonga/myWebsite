import { act, renderHook } from '@testing-library/react';
import useModal from '../useModal';

describe('useModal', () => {
  it('toggles modal state', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current[0]).toBe(false);

    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });
});
