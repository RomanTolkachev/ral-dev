import React, {FunctionComponent, ReactNode, useEffect, useMemo} from 'react';
import {flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";

interface IProps {
    className?: string
}

export const Table: FunctionComponent<IProps> = () => {
    const data = useSelector(state => state.ralSliceToolkit.ralData);

    let getHeaderName = (accessorKey: string) => {
        switch (accessorKey) {
            case "link": return "ссылка"
            case 'RegNumber': return "регистрационный номер"
            case 'old_status_AL': return "предыдущий статус"
            case 'new_status_AL': return "новый статус"
            case 'status_change_date': return "дата смены статуса"
            case 'nameType': return "тип акредитованного лица"
            case 'nameTypeActivity': return "тип направления деятельности"
            case 'regDate': return "дата регистрации"
            case "fullName": return "полное наименование"
            case 'address': return "адрес"
            case 'applicantFullName': return "полное наименование"
            case 'applicantINN': return "ИНН"
            case 'oaDescription': return "описание"
            case 'NPstatus': return "статус НП"
            case 'id': return "айди"
            case 'NP_status_change_date': return "дата изменения статуса"
            default: return  "дефолт"
        }
    }

    const columns = useMemo(() => {
        let headers: any[] = [];
        let index = 0;
        if (data) {
            for (let key in data[0]) {
                headers[index] = {
                    accessorKey: key,
                    header: getHeaderName(key),
                    cell: (props: any) => <p>{props.getValue()}</p>,
                    enableResizing: true,
                    size: 200
                };
                index++;
            }
        }
        return headers
    },[data])

    // const columns = [
    // {
    //     accessorKey: 'RegNumber',
    //     header: "рег. номер",
    //     cell: (props: any) => <p>{props.getValue()}</p>
    // },
    // {
    //     accessorKey: 'old_status_AL',
    //     header: "старый статус",
    //     cell: (props: any) => <p>{props.getValue()}</p>
    // },
    // {
    //     accessorKey: 'new_status_AL',
    //     header: "новый статус",
    //     cell: (props: any) => <p>{props.getValue()}</p>
    // },]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        enableColumnResizing: true

    }, )

    useEffect(() => {
        console.log(table.getHeaderGroups())
    }, [table]);

    return (
        <div className={'h-full grow grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={""}>верхняя пагинация</div>
            <div className={'p-2 h-full w-full grow flex overflow-y-hidden bg-cyan-200'}>
                <div className={"rim text-base my-block w-full h-full l bg-background-block "}>
                    <table className={"block max-h-full w-full text-sm overflow-x-scroll overflow-y-scroll table-fixed"}>
                        <thead className={"sticky bg-background-block top-0"}>
                            <tr className={'flex w-fit'}>
                                {table.getHeaderGroups()[0].headers.map((header, key) => {
                                    return (
                                        <th style={{width: header.column.getSize()}}
                                            className={`border border-black relative p-2`}
                                            key={header.id}>{header.column.columnDef.header as ReactNode}
                                            <div
                                                className={`bg-resizer cursor-col-resize opacity-0 hover:opacity-100 z-10 w-1.5 bg-amber-700 absolute h-full top-0 right-0 translate-x-1/2`}
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                            ></div>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className={'w-full min-h-max'}>
                        {table.getRowModel().rows.map(row => {
                            return <tr className={'flex w-fit'} key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return <td key={cell.id} style={{width: cell.column.getSize()}} className={`border border-black overflow-hidden`}>{
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }</td>
                                })}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"text-end"}>нижняя пагинация</div>
        </div>
    )
}


