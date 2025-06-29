import React from 'react';
import {AppTableHeader} from '~/UI/table/AppTableHeader';
import {AppTableBody} from '~/UI/table/AppTableBody';
import {BottomFloatingRowContainer} from '~/UI/table/BottomFloatingRowContainer/BottomFloatingRowContainer';

export interface AppTableColumn {
    name: string;
    key: string;
    render?: (data: Record<string, any>) => React.ReactNode;
    className?: string;
}

export interface AppTableProps {
    openRow: string | null;
    setOpenRow: (args: string | null) => void;
    rowsData: Record<string, any>[];
    columns: AppTableColumn[];
    rowAction?: (data: Record<string, any>, actionType: string) => void;
    componentExpandRow?: React.ReactNode;
    rowExpandableHeight?: number;
}

const MAX_ROWS_PER_PAGE = 10;
export const AppTable = ({
                             rowsData,
                             columns,
                             rowAction,
                             openRow,
                             setOpenRow,
                             componentExpandRow,
                             rowExpandableHeight,
                         }: AppTableProps) => {
    const allRowsData = rowsData.map((row, index) => ({
        id: `app_table_row_id${index + 1}`, ...row,
    }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPageNumber, setCurrentPageNumber] = React.useState(1);
    const [sortKey, setSortKey] = React.useState<string>('');
    const [sortOrderDesc, setSortOrderDesc] = React.useState<boolean>(true);

    const tableRowAction = (data: Record<string, any>, actionType: string) => {
        switch (actionType) {
            case 'toggleOpenClose':
                if (openRow == data.id) {
                    setOpenRow(null);
                    rowAction && rowAction(data, 'closeRow');
                } else {
                    setOpenRow(data.id);
                    rowAction && rowAction(data, 'openRow');
                }

                return;
            default:
                break;
        }

        rowAction && rowAction(data, actionType);
    };

    // const numberOfPages = Math.ceil(allRowsData.length / MAX_ROWS_PER_PAGE);
    const sortColumn = (key: string) => {
        if (sortKey === key) {
            setCurrentPageNumber(0);
            return;
        }
        setSortKey(key);
        setSortOrderDesc((s) => !s);
    };
    const calculateResultRangeText = () => {
        const dataArrayRef = allRowsData;
        let toResultText = MAX_ROWS_PER_PAGE * currentPageNumber;
        if (currentPageNumber === 1) {
            toResultText = doEntitySortAndDisplayPages().length;
        } else if (toResultText > dataArrayRef.length) {
            toResultText = dataArrayRef.length;
        }
        return `${MAX_ROWS_PER_PAGE * (currentPageNumber - 1) + 1}-${toResultText}`;
    };
    const doEntitySortAndDisplayPages = () => {
        const dataArrayRef = allRowsData;
        const filterEntityForSpecificPage = (entity: any, index: number) => {
            if (!entity) {
                return -1;
            }
            const lastEntity = MAX_ROWS_PER_PAGE * currentPageNumber;
            const firstEntity = MAX_ROWS_PER_PAGE * currentPageNumber - MAX_ROWS_PER_PAGE;
            return index < lastEntity && index >= firstEntity;
        };

        let newSortedEntities;
        if (!sortKey) {
            return [...dataArrayRef].filter(filterEntityForSpecificPage);
        } else if (sortKey !== 'id') {
            if (sortOrderDesc) {
                newSortedEntities = [...dataArrayRef].sort((a, b) =>
                    (a[sortKey] || '').toString().localeCompare(b[sortKey]));
            } else {
                newSortedEntities = [...dataArrayRef].sort((a, b) =>
                    (b[sortKey] || '').toString().localeCompare(a[sortKey]));
            }
            return newSortedEntities.filter(filterEntityForSpecificPage);
        } else {
            return [...dataArrayRef].filter(filterEntityForSpecificPage);
        }
    };
    return (<div className={'flex flex-col  '} id={'app-table'}>
            <AppTableHeader
                index={0}
                isOpen={false}
                columns={columns.map(c=> ({...c,render: undefined }))}
                sortColumn={sortColumn}
            />

            <AppTableBody
                openRow={openRow}
                columns={columns}
                rowAction={tableRowAction}
                rowsData={allRowsData}
                componentExpandRow={componentExpandRow}
                rowExpandableHeight={rowExpandableHeight}
            />
            <BottomFloatingRowContainer customClassName={`  h-[74px]  `}>
                <div
                    id={'pagination'}
                    className={'flex h-full flex-row items-center justify-between'}
                >
                    <div>{`${calculateResultRangeText()} of ${allRowsData.length} Results`}</div>
                    <div>
                        {' '}
                        {/*<PaginationButtons*/}
                        {/*    currentPageNumber={currentPageNumber}*/}
                        {/*    setCurrentPageNumber={(args: any) => {*/}
                        {/*        setCurrentPageNumber(args);*/}
                        {/*    }}*/}
                        {/*    numberOfPages={numberOfPages}*/}
                        {/*    className={''}*/}
                        {/*/>*/}
                    </div>
                </div>
            </BottomFloatingRowContainer>
        </div>);
};
