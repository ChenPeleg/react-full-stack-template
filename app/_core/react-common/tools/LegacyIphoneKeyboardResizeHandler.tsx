import React, { useEffect, useRef } from 'react';

/**
 * Hook that checks if the viewport changes only for iPhone
 */
function useIphoneKeyBoardResize(
    ref: React.RefObject<HTMLElement>,
    viewportResizeOnIosHandler: () => void
) {
    useEffect(() => {
        /**
         * Call if the viewport changes only for iPhone
         */
        function handleViewPortChange(event: React.MouseEvent) {
            if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
                // return;
            }

            if (event.target instanceof VisualViewport) {
                typeof viewportResizeOnIosHandler === 'function' &&
                    viewportResizeOnIosHandler();
            }
        }

        // Bind the event listener
        // @ts-expect-error this is correct
        window.visualViewport.addEventListener('resize', handleViewPortChange);
        return () => {
            // Unbind the event listener on clean up

            // @ts-expect-error this is correct
            window.visualViewport.removeEventListener(
                'resize',
                // @ts-expect-error this is correct
                handleViewPortChange
            );
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export const IphoneKeyboardResize = ({
    children,
    viewportResizeOnIosHandler,
    $$debugDisable,
}: {
    children: React.ReactNode;
    viewportResizeOnIosHandler: () => void;
    $$debugDisable?: boolean;
}) => {
    const wrapperRef = useRef(null);

    useIphoneKeyBoardResize(wrapperRef, viewportResizeOnIosHandler);
    if ($$debugDisable) {
        return <>{children}</>;
    }

    return (
        <div
            className={'flex'}
            id={'iphone-keyboard-resize-wrapper'}
            ref={wrapperRef}
        >
            {children}
        </div>
    );
};
