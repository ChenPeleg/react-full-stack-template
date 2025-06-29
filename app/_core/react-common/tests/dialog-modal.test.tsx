import { act, render, screen } from '@testing-library/react';
import { beforeAll, describe, test, vi } from 'vitest';
import { DialogModal } from '../dialog/DialogModal';

describe('DialogModal component', async () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn();
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });
    /**
     * sense jsdom does not support dialog element, we can only check if the correct classes are added
     * to the dialog element, in every situation.
     * In addition, the modal is hidden because jsdom does not support dialog element
     */
    test('component renders without errors', async ({ expect }) => {
        const setShowDialog = vi.fn();
        await act(async () => {
            render(
                <DialogModal showDialog={false} setShowDialog={setShowDialog}>
                    <div>Test Text</div>
                </DialogModal>
            );
        });
        const modal = await screen.findByRole('dialog', { hidden: true });

        expect(modal).not.toBe(null);
    });
    test('component renders content without errors', async ({ expect }) => {
        const setShowDialog = vi.fn();
        await act(async () => {
            render(
                <DialogModal showDialog={false} setShowDialog={setShowDialog}>
                    <div>Test Text</div>
                </DialogModal>
            );
        });
        const modal = await screen.findByText('Test Text');

        expect(modal).not.toBe(null);
    });

    test('should have appear class in the dialog modal if open', async ({
        expect,
    }) => {
        const setShowDialog = vi.fn();
        await act(async () => {
            render(
                <DialogModal showDialog={true} setShowDialog={setShowDialog}>
                    <div>Test Text</div>
                </DialogModal>
            );
        });
        const modal = await screen.findByRole('dialog', { hidden: true });
        const classes = [...modal.classList];
        expect(classes.some((cls) => cls.includes('backdropAppear'))).toBe(
            true
        );
    });
    test('should have a disappear class modal if closed', async ({
        expect,
    }) => {
        const setShowDialog = vi.fn();

        await act(async () => {
            render(
                <DialogModal showDialog={false} setShowDialog={setShowDialog}>
                    <div>Test Text</div>
                </DialogModal>
            );
        });
        const modal = await screen.findByRole('dialog', { hidden: true });

        const classes = [...modal.classList];
        // expect(classes).toBe(true);
        expect(classes.some((cls) => cls.includes('backdropAppear'))).not.toBe(
            true
        );
        expect(classes.some((cls) => cls.includes('backdropDisappear'))).toBe(
            true
        );
    });
});
