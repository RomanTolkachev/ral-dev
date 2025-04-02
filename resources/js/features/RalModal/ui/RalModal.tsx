import { FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { keys } from 'lodash'
import { axiosApi } from "@/shared/api/api";
import { Preloader } from "@/Components/utils/Preloader";
import useCachedData from "../api/useCachedData";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { translateHeaderName } from "@/Components/Table/lib/translateHeaderName";
import { div } from "motion/react-client";
import { translate } from "../lib/translate";
import ModalCell from "./ModalCell";
import customFlexRender from "./customFlexRender";
import RalCell from "@/features/RalTable/ui/RalTable/Cell/ui/RalCell";


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
                [leftColumnName]: translate(item),
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
        <div className="w-full h-full px-2">
            <div className="h-full rounded-[20px]">
{            tableData.length ?
                <table
                className={`relative min-h-full min-w-full max-h-full text-sm table-fixed rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                <tbody className={'font-medium text-table-base'}>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr className={'even:bg-row-modal-even odd:bg-row-modal-odd [&_td:first-child]:text-nowrap [&_td:first-child]:text-start'} key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <RalCell cellData={cell} />
                                    )
                                })}
                            </tr>
                        )
                    })}
                    <tr className={'even:bg-row-modal-even odd:bg-row-modal-odd [&_td:first-child]:text-nowrap'}>
                        {table
                            .getRowModel()
                            .rows[0].getVisibleCells()
                            .map((data, key) => {
                                return <></>
                            })}
                    </tr>
                </tbody>
            </table> 
            : <Preloader className="h-full" widthStyles="w-10" />}
            </div>
        </div>

    )

}