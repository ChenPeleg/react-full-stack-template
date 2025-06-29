import { AppTableProps } from './AppTable';
import React, { useEffect } from 'react';
import { sleep } from '~/_core/react-common/tools/sleep';

export const AppTableRow = ({
    rowData,
    index,
    rowAction,
    isOpen,
    columns,
    componentExpandRow,
    rowExpandableHeight,
}: Omit<AppTableProps, 'rowsData' | 'openRow' | 'setOpenRow'> & {
    index: number;
    isOpen: boolean;
    rowData: Record<string, any>;
}) => {
    const [rowIsOpen, setRowIsOpen] = React.useState<boolean>(false);
    useEffect(() => {
        sleep(100).then(() => {
            setRowIsOpen(isOpen);
        });
    }, [isOpen]);
    return (
        <div className={'  '}>
            <div
                data-row-id={index}
                onClick={() =>
                    rowAction ? rowAction(rowData, 'toggleOpenClose') : null
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        rowAction ? rowAction(rowData, 'toggleOpenClose') : null;
                    }
                }}
                role="button"
                tabIndex={0}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns.length}, minmax(${
                        (70 / columns.length) | 0
                    }%, 1fr))`,
                }}
                className={`cursor-pointer border-b border-outline text-onSecondary`}
                data-testid={'app-table-row'}
            >
                {columns.map((column, index) => (
                    <div
                        key={column.key + index.toString()}
                        id={`app-table-row-${column.key}`}
                        className={`col-span-1 h-16 overflow-clip flex flex-wrap max-w-full relative  ${column.className || ''}`}
                    >
                        <div
                            id={'table-column_' + column.key}
                            className={`flex h-full flex-row items-center break-words flex-wrap  w-5/6 `}
                        >
                            <div className={' w-full'}>

                            {column.render
                                ? column.render(rowData)
                                : rowData[column.key]?.toString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {rowIsOpen || isOpen ? (
                <div
                    style={{
                        height: isOpen
                            ? `${rowExpandableHeight || 256}px`
                            : '0px',
                    }}
                    className={`transition-timing-function: cubic-bezier(0.4,  0, 0.2, 1)  z-20 overflow-y-hidden  transition-all duration-300 ${
                        !rowIsOpen || !isOpen
                            ? ` ${' scale-[100%] '} transform`
                            : `${' scale-100 '}  transform  `
                    } ${rowIsOpen && isOpen ? ' overflow-y-visible ' : ''}`}
                >
                    {
                        <div className={'overflow-y-visible'}>
                            {componentExpandRow}
                        </div>
                    }
                </div>
            ) : null}
        </div>
    );
};
