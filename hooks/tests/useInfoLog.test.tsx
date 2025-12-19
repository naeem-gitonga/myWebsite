import { renderHook } from '@testing-library/react';
import useInfoLog from '../useInfoLog';

describe('useInfoLog', () => {
  it('logs the message only once', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    renderHook(() => useInfoLog());
    renderHook(() => useInfoLog());

    expect(logSpy).toHaveBeenCalledTimes(6);

    logSpy.mockRestore();
  });
});
