import React, {FunctionComponent, useEffect} from 'react';
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";

interface IProps {
    className?: string
}

export const Table: FunctionComponent<IProps> = () => {
    const data = useSelector(state => state.ralSliceToolkit.ralData);

    const columns = [
    {
        accessorKey: 'RegNumber',
        header: "рег. номер",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'old_status_AL',
        header: "старый статус",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'new_status_AL',
        header: "новый статус",
        cell: (props) => <p>{props.getValue()}</p>
    },]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    console.log(table.getHeaderGroups())
    return (
        // <div>табличка</div>
        <table className={"overflow-y-scroll block max-h-full"}>
            <thead className={"sticky bg-background-block top-0 block"}>
                <tr>
                    {table.getHeaderGroups()[0].headers.map((header) => {
                        return <th className={"border border-black p-2"} key={header.id}>{header.column.columnDef.header}</th>
                    })}
                </tr>
            </thead>
            <tbody className={'w-full block min-h-max'}>
            {table.getRowModel().rows.map(row => {
                return <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                       return  <td key={cell.id}>{
                           flexRender(cell.column.columnDef.cell, cell.getContext())
                       }</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    )
}


