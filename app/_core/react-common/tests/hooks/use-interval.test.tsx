//@ts-check
import { act, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { it, vi, describe, expect, beforeEach, afterEach } from 'vitest';

import { useInterval } from '../../hooks/useInterval';

export const TestIntervalComponent = ({
    intervalInMs,
}: {
    intervalInMs: number;
}): React.ReactNode => {
    const [counter, setCounter] = useState(0);
    useInterval(() => {
        setCounter(counter + 1);
    }, intervalInMs);
    return <div data-testid={'counter'}> {counter.toString()}</div>;
};
describe('Use interval', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('runs every second for three seconds', async () => {
        render(<TestIntervalComponent intervalInMs={1000} />);
        const intervalRunningTimes = 3;

        await act(async () => {
            for (let times = intervalRunningTimes; times--; ) {
                vi.advanceTimersByTime(1000);
            }
        });
        expect(
            screen.getByTestId('counter').innerHTML ===
                intervalRunningTimes.toString()
        );
    });
    it('runs every two seconds for ten seconds', async () => {
        render(<TestIntervalComponent intervalInMs={2000} />);
        const intervalRunningTimes = 5;

        await act(async () => {
            for (let times = intervalRunningTimes; times--; ) {
                vi.advanceTimersByTime(2000);
            }
        });
        expect(
            screen.getByTestId('counter').innerHTML ===
                intervalRunningTimes.toString()
        );
    });
});
