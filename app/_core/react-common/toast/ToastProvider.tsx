import React, { useEffect } from 'react';
import { Toast } from './Toast';

export interface ToastConfig {
    duration?: number;
    id?: string;
    className?: string;
    position?: {
        top?: string | null;
        bottom?: string | null;
        left?: string | null;
        right?: string | null;
    };
    size?: {
        width?: string;
        height?: string;
    };
    content?: React.ReactNode | string;
    isLegacy?: boolean;
}

export interface ToastProps {
    show: boolean;
    setShow: (
        content: React.ReactNode,
        config?: ToastConfig | number
    ) => () => void;
}

export const ToastContext = React.createContext<ToastProps>({
    show: false,
    setShow: () => () => {},
});

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <path
            d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
            fill="currentColor"
        />
    </svg>
);

export const ToastProvider = ({
    children,
    globalConfig,
}: {
    children: React.ReactNode;
    globalConfig?: ToastConfig;
}) => {
    const [showToast, setShowToast] = React.useState(false);
    // const [toastQueue, setToastQueue] = React.useState<any[]>([]);
    const toastQueue = React.useRef({ queue: [] });
    const setToastQueue = (newQueue: any) =>
        (toastQueue.current.queue = newQueue);
    const [toastConfig, setToastConfig] = React.useState<ToastConfig>(
        globalConfig || {
            duration: 2000,
            className: '',
            position: {
                top: '70px',
                right: '100px',
            },
            id: '',
            content: '',
        }
    );
    const setShowToastHandler = (
        content?: React.ReactNode,
        config?: ToastConfig | number
    ): (() => void) => {
        if (showToast) {
            setToastQueue([
                ...toastQueue.current.queue,
                {
                    content,
                    config,
                },
            ]);
            return () => {};
        }
        let newConfig = { ...toastConfig };
        if (typeof config === 'number') {
            newConfig = {
                ...toastConfig,
                duration: config,
                content: content || toastConfig.content,
            };
        } else if (typeof config === 'object') {
            newConfig = { ...toastConfig, ...config };
        }

        newConfig.content = content || toastConfig.content;
        if (globalConfig?.isLegacy) {
            newConfig.isLegacy = globalConfig.isLegacy;
        }
        setToastConfig(newConfig);
        setShowToast(true);
        const duration =
            typeof config === 'number'
                ? config
                : config?.duration || toastConfig.duration;
        setTimeout(() => {
            if (toastQueue.current.queue.length) {
                const { content, config } = toastQueue.current.queue[0];
                setToastQueue(toastQueue.current.queue.slice(1));
                setShowToastHandler(content, config);
            } else {
                // setToastQueue([]);
                setShowToast(false);
            }
        }, duration);
        return () => {
            setShowToast(false);
        };
    };
    useEffect(() => {
        if (globalConfig) {
            setToastConfig({
                ...toastConfig,
                ...globalConfig,
            });
        }
    }, [globalConfig]);

    return (
        <>
            <ToastContext.Provider
                value={{
                    show: showToast,
                    setShow: setShowToastHandler,
                }}
            >
                {showToast && (
                    <div>
                        <Toast
                            config={toastConfig}
                            show={showToast}
                            setShow={setShowToast}
                            className={` shadow-xl ${toastConfig.isLegacy ? 'bg-surfaceHigh' : 'relative'}`}
                        >
                            {(closePopover) => (
                                <div
                                    className={`bg-surfaceHigh p-4 pl-3 pr-6 ${toastConfig.isLegacy ? '' : 'h-14'}`}
                                >
                                    <button
                                        className={
                                            'absolute right-2 top-1 flex h-6 w-6 flex-row items-center  justify-center rounded-full text-xs font-bold text-gray-500 hover:bg-gray-200  '
                                        }
                                        onClick={() => {
                                            setToastQueue([]);
                                            closePopover();
                                        }}
                                    >
                                        <XIcon className={'h-2'} />
                                    </button>
                                    {toastConfig.content}
                                    {toastQueue.current.queue?.length ? (
                                        <div
                                            className={
                                                'absolute left-1 top-1 h-5  w-5 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-200  '
                                            }
                                        >
                                            [{toastQueue.current.queue.length}]
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            )}
                        </Toast>
                    </div>
                )}
                {children}
            </ToastContext.Provider>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    return React.useContext(ToastContext).setShow;
};
