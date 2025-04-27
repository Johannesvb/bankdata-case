import { For, JSX, JSXElement } from "solid-js"
import {
    SolidUiTable,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table"

export type TableProps<T> = {
    columns: TableColumn<T>[],
    data: T[],
    caption?: string
}

export type TableColumn<T> = {
    header: string
    key: keyof T | undefined,
    render?: (rowData: T) => JSX.Element,
}

export const Table = <T,>(props: TableProps<T>): JSX.Element => {
    return <SolidUiTable>
        <TableCaption>{props.caption}</TableCaption>
        <TableHeader>
            <TableRow>
                <For each={props.columns}>{(column) => {
                    return <TableHead>{column.header}</TableHead>
                }}</For>
            </TableRow>
        </TableHeader>
        <TableBody>

            <For each={props.data}>{(row) => {
                return <TableRow>
                    <For each={props.columns}>{(column) => {

                        let cellContent: string | JSXElement = "";
                        if (column.render) {
                            cellContent = column.render(row);
                        } else if (column.key) {
                            cellContent = String(row[column.key]);
                        }

                        return <TableCell>
                            {cellContent}
                        </TableCell>
                    }}
                    </For>
                </TableRow>
            }}</For>
        </TableBody>
    </SolidUiTable>
}