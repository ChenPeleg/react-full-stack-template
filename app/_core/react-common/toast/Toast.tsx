import React, { useEffect } from 'react';
import styles from './Toast.module.css';
import {ToastConfig} from '~/_core/react-common/toast/ToastProvider';
import {useWindowSize} from '~/_core/react-common/hooks/useWindowResize';


export const Toast = ({
    show,
    setShow,
    children,
    className,
    config,
}: {
    show: boolean;
    config: ToastConfig;
    setShow: (show: boolean) => void;
    children: React.ReactNode | ((closePopover: () => void) => React.ReactNode);
    className?: string;
}) => {
    const popOverRef = React.useRef<HTMLElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [innerHeight, innerWidth] = useWindowSize();
    const togglePopoverHandler = (
        e: Event & { newState: 'open' | 'close' }
    ) => {
        const isPopoverGoesOpen = e.newState === 'open';
        setShow(isPopoverGoesOpen);
    };

    useEffect(() => {
        popOverRef.current?.addEventListener(
            'beforetoggle',
            togglePopoverHandler as any
        );
        setPopoverPosition();
        const oldRef = popOverRef.current;
        return () => {
            oldRef?.removeEventListener(
                'beforetoggle',
                togglePopoverHandler as any
            );
        };
    }, [popOverRef]);
    useEffect(() => {
        show && setPopoverPosition();
    }, [innerHeight, innerWidth]);
    useEffect(() => {
        if (show) {
            const popover = popOverRef.current;
            if (config.isLegacy) {
                // setShow(false);
                return;
            }
            popover && popover['showPopover'] && popover['showPopover']();
        } else {
            setTimeout(() => {
                const popover = popOverRef.current;
                if (config.isLegacy) {
                    // setShow(false);
                    return;
                }
                popover && popover['hidePopover'] && popover['hidePopover']();
            }, 200);
        }
    }, [show]);
    const setPopoverPosition = () => {};

    const styleAttributes = {
        '--toast-right': config.position?.right || 'none',
        '--toast-left': config.position?.left || 'none',
        '--toast-top': config.position?.top || 'none',
        '--toast-bottom': config.position?.bottom || 'none',
        '--toast-width': config.size?.width || '240px',
        '--toast-height': config.size?.height || '150px',
    };
  
    const closeModal = () => {
        const popover = popOverRef.current;
        if (config.isLegacy) {
            setShow(false);
            return;
        }
        popover && popover['hidePopover'] && popover['hidePopover']();
    };
    return (
        <div
            // @ts-expect-error this is ok
            style={{
                ...styleAttributes,
            }}
            className={'relative flex flex-row justify-center'}
            ref={buttonRef}
        >
            {config.isLegacy ? (
                <div
                    style={{
                        boxShadow: '0 1px 10px #0000001a, 0 2px 15px #0000000d',
                        ...styleAttributes,
                    }}
                    className={` rounded ${styles.legacyToastPopover}  ${show ? styles.legacyToastPopoverOpen : ''}      ${className}`}
                    // @ts-expect-error is supported in most browsers
                    ref={popOverRef}
                    id="app-legacy-toast"
                >
                    {typeof children === 'function'
                        ? children(closeModal)
                        : children}
                </div>
            ) : (
                <div
                    style={{
                        boxShadow: '0 1px 10px #0000001a, 0 2px 15px #0000000d',
                        ...styleAttributes,
                    }}
                    className={` rounded ${styles.toastPopover}   ${className}  `}
                    // @ts-expect-error is supported in most browsers
                    ref={popOverRef}
                    id="app-toast"
                    popover={'manual'}
                >
                    {typeof children === 'function'
                        ? children(closeModal)
                        : children}
                </div>
            )}
        </div>
    );
};
