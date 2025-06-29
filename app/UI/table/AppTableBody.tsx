import { AppTableRow } from './AppTableRow';
import { AppTableProps } from './AppTable';

export const AppTableBody = ({
    openRow,
    rowsData,
    columns,
    rowAction,
    componentExpandRow,
    rowExpandableHeight,
}: Omit<AppTableProps, 'setOpenRow'>) => {
    return (
        <div
            data-testid={'admin-alarm-table'}
            style={
                {
                    // scrollbarGutter: 'stable',
                    // overflowY: 'scroll',
                }
            }
            className={` 
              top-0 flex h-full   flex-col
                 font-normal text-onSecondary`}
        >
            {rowsData.map((rowData, index) => (
                <AppTableRow
                    isOpen={!!openRow && rowData.id == openRow}
                    index={index}
                    columns={columns}
                    key={rowData['id'] || '' + index.toString()}
                    rowAction={rowAction}
                    rowData={rowData}
                    componentExpandRow={componentExpandRow}
                    rowExpandableHeight={rowExpandableHeight}
                />
            ))}
        </div>
    );
};
