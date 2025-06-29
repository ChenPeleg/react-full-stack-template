import { describe, it, expect } from 'vitest';
import { useFormState } from '../../hooks/useFormState';
import { act, renderHook } from '@testing-library/react';
import React from 'react';

describe('useFormState', () => {
    it('gets the initial values from the hook call', async () => {
        const initialValues = { testField: 'firstValue' };
        const { result } = renderHook(() => {
            const ref = React.useRef(null);
            return useFormState(ref, { initialValues: initialValues });
        });

        expect(result.current.values.testField).toBe('firstValue');
    });
    it('updates the form state when setField is called', async () => {
        const initialValues = { testField: 'firstValue' };
        const { result } = renderHook(() => {
            const ref = React.useRef(null);
            return useFormState(ref, { initialValues });
        });
        await act(async () => {
            // await the act function
            result.current.setField('testField', 'testValue');
        });
        expect(result.current.values.testField).toBe('testValue');
    });
});
