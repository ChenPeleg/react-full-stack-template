import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {useWindowSize} from '../../../react-common/hooks/useWindowResize';


describe('useWindowSize', () => {
    it('should update size when window resizes', async () => {
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 0,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 0,
            });
            window.dispatchEvent(new Event('resize'));
        });
        const { result } = renderHook(() => useWindowSize());

        // Initial window size
        expect(result.current).toEqual([0, 0]);

        // Simulate window resize
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 500,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 500,
            });
            window.dispatchEvent(new Event('resize'));
        });

        // Check if size updated
        expect(result.current).toEqual([500, 500]);
    });
});
