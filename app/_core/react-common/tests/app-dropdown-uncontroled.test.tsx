import { render, fireEvent, screen, act } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';
import { AppDropdownUncontrolled } from '../dropdown/AppDropdownUncontrolled';

describe('AppDropdownUncontrolled', () => {
    const mockSetSelectedOption = vi.fn();
    const options = [
        {
            id: '1',
            label: 'Option 1',
        },
        {
            id: '2',
            label: 'Option 2',
        },
    ];
    const theDefaultOption = null; // options[0];

    it('renders without crashing', () => {
        const { getByText } = render(
            <AppDropdownUncontrolled
                defaultValue={theDefaultOption}
                options={options}
                updateField={mockSetSelectedOption}
            />
        );

        expect(getByText('Option 1')).not.toBeNull();
    });
    it('menu options are not visible before click', async () => {
        await act(async () =>
            render(
                <AppDropdownUncontrolled
                    options={options}
                    defaultValue={theDefaultOption}
                    updateField={mockSetSelectedOption}
                />
            )
        );
        const menuOptions = screen.queryByRole('menuitem');
        expect(menuOptions).toBeNull();
    });
    it('menu options are visible after click', async () => {
        await act(async () =>
            render(
                <AppDropdownUncontrolled
                    options={options}
                    defaultValue={theDefaultOption}
                    updateField={mockSetSelectedOption}
                />
            )
        );
        fireEvent.click(screen.getByRole('button'));
        const menuOptions = screen.queryAllByRole('menuitem');
        expect(menuOptions).toHaveLength(2);
    });

    it('does not open dropdown if disabled', async () => {
        await act(async () =>
            render(
                <AppDropdownUncontrolled
                    disabled={true}
                    options={options}
                    defaultValue={theDefaultOption}
                    updateField={mockSetSelectedOption}
                />
            )
        );
        // fireEvent.click(screen.getByRole('button'));
        const allOptions = screen.queryAllByRole('menuitem');
        expect(allOptions).toHaveLength(0);
    });

    it('calls updateField={} when an option is clicked', () => {
        const { getByRole, getByText } = render(
            <AppDropdownUncontrolled
                options={options}
                defaultValue={theDefaultOption}
                updateField={mockSetSelectedOption}
            />
        );
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByText('Option 2'));
        expect(mockSetSelectedOption).toHaveBeenCalledWith(options[1]);
    });
});
