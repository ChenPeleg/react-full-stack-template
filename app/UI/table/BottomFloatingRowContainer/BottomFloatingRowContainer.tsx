import React from 'react';

export const BottomFloatingRowContainer = ({
    children,
    customClassName,
}: {
    children: React.ReactNode;
    customClassName: string;
}) => {
    // const screenWidth = useWindowDimensions().width;
    // const maxWidth = calculateBottomFloatMaxWidth(
    //     screenWidth,
    //     isAlarmDrawerOpen
    // );
    return (
        <div
            id={'bottom-floating-row-container-root'}
            style={{
                transition: 'width 300ms ease-in-out',
            }}
            className={`absolute bottom-0 z-10  flex h-[64px]bg-transparent${
                customClassName || ''
            } `}
        >
            <div className={'mr-36 mt-0 w-full  bg-[#F8F7FA]'}>{children}</div>
        </div>
    );
};
