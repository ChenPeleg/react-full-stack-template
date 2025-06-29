
export const TransparentButton = ({
    children,
    className,
    onClick,
    ...config
}: any) => {
    return (
        <button
            onClick={onClick}
            data-testid={'app-button'}
            className={`h-10 w-full rounded border border-outline
            p-2 text-onPrimary shadow-md   hover:bg-surfaceMain disabled:opacity-40 ${className}`}
            {...config}
        >
            {children}
        </button>
    );
};
