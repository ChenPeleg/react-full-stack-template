import { AppTableProps } from './AppTable';
import {AppTableRow} from '~/UI/table/AppTableRow';


export const AppTableHeader = ({
    index,
    rowAction,
    columns,
}: Omit<AppTableProps, 'rowsData' | 'openRow' | 'setOpenRow'> & {
    index: number;
    isOpen: boolean;
    sortColumn: (key: string) => void;
}) => {
    const headerRowData: Record<string, string> = {};
    for (const column of columns) {
        headerRowData[column.key] = column.name;
    }
    return (
        <AppTableRow
            isOpen={false}
            index={index}
            columns={columns.map((c) => ({ ...c, className: 'font-bold' }))}
            key={(columns[0]?.key || '') + index.toString()}
            rowAction={rowAction}
            rowData={headerRowData}
        />
    );
};
