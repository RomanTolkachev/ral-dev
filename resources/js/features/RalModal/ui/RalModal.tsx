import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosApi } from "@/shared/api/api";
import { Preloader } from "@/Components/utils/Preloader";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import transpondInTwoCols from "../lib/transpondInTwoCols";
import { CustomCell } from "@/shared/ui/Table/ui/CustomCell";
import styles from "./styles.module.css"


interface IProps {
    className?: string
}

interface ICertData extends Record<string, any> { }

export const RalModal: FunctionComponent<IProps> = ({ className }) => {

    const [certificationBodyData, setCertificationbodyData] = useState<ICertData | undefined>(undefined)
    const { ralId } = useParams();


    // модалка всегда запрашивает подробную информацию
    useEffect(() => { // TODO: или тут тоже через react query нужно?
        axiosApi.get<Record<string, any>>('/ral_short_info/certification_body', {
            params: { cert_id: ralId }
        }).then(res => res ? (setCertificationbodyData(res.data)) : null); // TODO: нужно продумать тут catch и правильно ли указывать null в тернарнике
    }, [ralId])

    let cols: ColumnDef<any>[] = [
        {
            accessorKey: "param",
            header: 'параметр',
            cell: (props: any) => props.getValue() ,
        },
        {
            accessorKey: "value",
            header: 'значение',
            cell: (props: any) => props.getValue(),
        }
    ];

    const tableData = useMemo<Record<string, any>[] | []>(() => {
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
                {tableData.length ?
                    <table
                        className={`relative min-h-full min-w-full max-h-full text-sm table-fixed rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                        <tbody className={'font-medium text-table-base'}>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id} className={'even:bg-row-modal-even odd:bg-row-modal-odd [&_td:first-child]:text-nowrap [&_td]:text-start [&_ul]'}>
                                        {row.getVisibleCells().map(cell => <td key={cell.id}><CustomCell cellData={cell} /></td>)}
                                    </tr>
                                )
                            })}
                            {/* этот последний ряд является заглушкой. Если в таблице всего 1 ряд с данными, то эта заглушка растянется по вертикали на все свободное место */}
                            <tr className={'even:bg-row-modal-even odd:bg-row-modal-odd [&_td:first-child]:text-nowrap'}>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    : <Preloader className="h-full" widthStyles="w-10" />}
            </div>
        </div>
    )
}