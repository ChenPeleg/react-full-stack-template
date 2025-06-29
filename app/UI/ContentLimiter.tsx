export const ContentLimiter = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={'flex h-[calc(100vh-4rem)] w-full   '}>
            {children}
        </div>
    );
}
