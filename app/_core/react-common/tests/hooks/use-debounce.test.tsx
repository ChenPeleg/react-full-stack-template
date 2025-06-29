import { act, renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useDebounce } from '../../hooks/useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
    it('should call the callback after the specified delay', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 500));

        act(() => {
            result.current();
        });

        expect(callback).not.toBeCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(callback).toBeCalled();
    });
    it('should debounce multiple calls to the callback', async () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 500));

        await act(async () => {
            // Call the debounced function multiple times
            result.current();
            result.current();
            result.current();
        });

        // The callback should not have been called yet
        expect(callback).not.toBeCalled();

        await act(async () => {
            vi.advanceTimersByTime(500);
        });

        // The callback should have been called once
        expect(callback).toBeCalledTimes(1);
    });
});
