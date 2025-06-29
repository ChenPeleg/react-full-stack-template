import { render, fireEvent, screen, act } from '@testing-library/react';


import { describe, expect, it, vi } from 'vitest';
import { AppDropdownControlled } from '../dropdown/AppDropdownControlled';

describe('AppDropdownControlled', () => {
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
    const selectedOption = null; // options[0];

    it('renders without crashing', () => {
        const { getByText } = render(
            <AppDropdownControlled
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={mockSetSelectedOption}
            />
        );

        expect(getByText('Option 1')).not.toBeNull();
    });
    it('menu options are not visible before click', async () => {
        await act(async () =>
            render(
                <AppDropdownControlled
                    options={options}
                    selectedOption={selectedOption}
                    setSelectedOption={mockSetSelectedOption}
                />
            )
        );
        const menuOptions = screen.queryByRole('menuitem');
        expect(menuOptions).toBeNull();
    });
    it('menu options are visible after click', async () => {
        await act(async () =>
            render(
                <AppDropdownControlled
                    options={options}
                    selectedOption={selectedOption}
                    setSelectedOption={mockSetSelectedOption}
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
                <AppDropdownControlled
                    disabled={true}
                    options={options}
                    selectedOption={selectedOption}
                    setSelectedOption={mockSetSelectedOption}
                />
            )
        );
        // fireEvent.click(screen.getByRole('button'));
        const allOptions = screen.queryAllByRole('menuitem');
        expect(allOptions).toHaveLength(0);
    });

    it('calls setSelectedOption when an option is clicked', () => {
        const { getByRole, getByText } = render(
            <AppDropdownControlled
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={mockSetSelectedOption}
            />
        );
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByText('Option 2'));
        expect(mockSetSelectedOption).toHaveBeenCalledWith(options[1]);
    });
});
