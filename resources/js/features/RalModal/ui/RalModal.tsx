import { FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { keys } from 'lodash'
import { axiosApi } from "@/shared/api/api";
import { Preloader } from "@/Components/utils/Preloader";
import useCachedData from "../api/useCachedData";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { translateHeaderName } from "@/Components/Table/lib/translateHeaderName";
import { div } from "motion/react-client";


interface IProps {
    className?: string
}

interface ICertData extends Record<string, any> { }

export const RalModal: FunctionComponent<IProps> = ({ className }) => {

    const [certificationBodyData, setCertificationbodyData] = useState<ICertData | undefined>(undefined)
    const { ralId } = useParams();

    /*
        модалка всегда запрашивает подробную информацию
    */
    useEffect(() => { // TODO: или тут тоже через reract query нужно?
        axiosApi.get<Record<string, any>>('/ral/certification_body', {
            params: { cert_id: ralId }
        }).then(res => res ? (setCertificationbodyData(res.data)) : null); // TODO: нужно продумать тут catch и правильно ли указывать null в тернарнике
    }, [ralId])
    let cols: ColumnDef<any>[] = [
        {
            accessorKey: "param",
            header: 'параметр',
            cell: (props: any) => { return <>{props.getValue()}</> },
        },
        {
            accessorKey: "value",
            header: 'значение',
            cell: (props: any) => { return <>{props.getValue()}</> },
        }
    ];

    type ITranspond = {
        [key:string]: any
    }
    const transpondInTwoCols = (data: ITranspond, leftColumnName: string, rightColumnName: string):ITranspond[] => {
        return Object.keys(data).reduce((acc, item) => {
            let newItem: ITranspond = {
                [leftColumnName]: item,
                [rightColumnName]: data[item]
            }
            acc.push(newItem);
            return acc
        },[] as ITranspond[])
    }


    let tableData = useMemo<Record<string, any>[] | []>(() => {
        return certificationBodyData ? transpondInTwoCols(certificationBodyData, "param", "value") : []
    }, [certificationBodyData])

    const table = useReactTable({
        data: tableData,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div className="px-5 h-full">
{            tableData.length ?
                <table
                className={`relative min-h-full min-w-full max-h-full text-sm table-fixed rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                <thead className={'select-none text-header-text font-medium relative'}>
                    <tr className={'text-header-text text-nowrap sticky top-0'}>
                        {table.getHeaderGroups()[0].headers.map((header) => {
                            return (
                                <th
                                    className={`bg-row-even p-2 overflow-hidden`}
                                    key={header.id}>
                                    <span className={''}>
                                        {header.column.columnDef.header as ReactNode}
                                    </span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className={'font-medium text-table-base'}>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr className={'even:bg-row-even odd:bg-row-odd h-fit'} key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td className="p-1" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    <tr className={'even:bg-row-even odd:bg-row-odd'}>
                        {table
                            .getRowModel()
                            .rows[0].getVisibleCells()
                            .map((item, key) => {
                                return <td key={key}></td>
                            })}
                    </tr>
                </tbody>
            </table> 
            : <Preloader className="h-full" widthStyles="w-10" />}
        </div>

    )

}