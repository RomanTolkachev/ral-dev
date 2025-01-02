import React, {FormEvent, FunctionComponent, ReactNode, useEffect, useMemo, useRef} from 'react';
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useDispatchTyped, useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";
import {Preloader} from "@/Components/utils/Preloader";
import {SVG} from "@/Components/utils/SVG";
import {updatePage} from "@/services/slices/filters-slice";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {fetchRal, fetchRalQuery} from "@/services/api";
import {IRalItem, TPaginatedRal} from "@/types/ral";
import {useRalQuery} from "@/services/hooks/useRalQuery";

interface IProps {
    className?: string
}

export const Table: FunctionComponent<IProps> = () => {
    const dispatch = useDispatchTyped()
    const tableHeaders = useSelector(state => state.ralSliceToolkit.headers)
    const storePage = useSelector(state => state.filtersReducer.paginationQueries.page)
    const storePerPage = useSelector(state => state.filtersReducer.paginationQueries.perPage)

    const {isPending: loadStat, data} = useQuery({
        queryKey: ['ral'],
        queryFn: () => fetchRalQuery({page: 1, perPage: 10})
    })

    const {data:ralData , isPending } = useRalQuery(storePage, storePerPage)


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

    const columns: ColumnDef<any>[] = useMemo(() => {
        let colData: ColumnDef<any>[] = [];
        if (tableHeaders.length !== 0) {
            colData = tableHeaders.map((header) => {
                return {
                    accessorKey: header,
                    header: getHeaderName(header),
                    cell: (props: any) => <>{props.getValue()}</>,
                    enableResizing: true,
                }
            })
        }
        return colData;
    },[ralData, tableHeaders])

    const tableData = useMemo(() => {
        return ralData?.data || []
    }, [ralData])

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        defaultColumn: {
            minSize: 200,
            maxSize: 400
        }
    })

    const {register, trigger } = useForm()
    const handleInputPageChange = async (e:FormEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement
        await trigger("page")
        if (ralData.last_page) {
            if (1 > Number(target.value) || Number(target.value) > ralData.last_page) {
                dispatch(updatePage(+paginatedData.current_page))
            } else {
                dispatch(updatePage(+target.value))
            }
        }
    }

    const {name, ref} = register("page")
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.value = String(storePage)
        }
    }, [storePage]);

    return (
        <div className={'h-full grow grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={"text-header-text text-sm p-2 ml-6 flex gap-4"}>
                <div className={"flex items-center"}>
                    <span>
                        Страница {ralData?.data.length !== 0 ? ralData?.current_page : " " } из {" "}
                        {ralData?.data.length !== 0 ? ralData?.last_page : " "}
                    </span>
                </div>
                <input
                    className={'w-20 bg-background-block rounded-md'}
                    defaultValue={1}
                    name={name}
                    ref={(e) => {
                        ref(e)
                        inputRef.current = e
                    }}
                    type={"number"} onInput={handleInputPageChange}/>
            </div>
            <div className={'p-2 h-full w-full grow flex overflow-y-hidden'}>
                <div className={"text-base my-block grow max-w-full h-full overflow-x-scroll overflow-y-scroll bg-background-block"}>
                    {isPending ? <Preloader widthStyles={"w-16"}/> : (
                        Object.keys(tableData).length !== 0 ? (
                            <table style={{width: table.getTotalSize(), minWidth: '100%'}}
                                className={`min-h-full max-h-full text-sm table-auto rounded-t-md`}>
                                <thead className={"sticky bg-background-block select-none top-0 text-header-text font-medium"}>
                                    <tr className={'bg-row-even text-header-text'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => {
                                            return (
                                                <th style={{width: header.getSize()}}
                                                    className={`relative p-2`}
                                                    key={header.id}>
                                                    <span
                                                        className={''}>{header.column.columnDef.header as ReactNode}</span>
                                                    <div
                                                        className={`bg-resizer cursor-col-resize opacity-0 hover:opacity-100 z-10 w-1.5 bg-button-violet absolute h-full top-0 right-0 translate-x-1/2`}
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}
                                                    ></div>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className={'font-medium '}>
                                {table.getRowModel().rows.map(row => {
                                    return <tr className={'even:bg-row-even odd:bg-row-odd h-20'}
                                               key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={`overflow-hidden p-2 w-[${cell.column.getSize()}px] text-center border-x`}>
                                                    <span
                                                        className={"text-table-base "}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                })}
                                </tbody>
                            </table>
                            ) :
                            <div className={'mx-auto my-auto h-[300px] w-[300px]'}>
                                <SVG className={'mb-2'} notFound />
                                <p className={" text-3xl text-nowrap tracking-tight font-black  text-[#29263b] first-letter:capitalize text-center"}>данные не найдены</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={"text-end"}>
                <div className={"text-header-text text-sm p-2 mr-6"}>
                    Страница {ralData?.data.length !== 0 ? ralData?.current_page : "загрузка"} из {" "}
                    {ralData?.data.length !== 0 ? ralData?.last_page : "загрузка"}
                </div>
            </div>
        </div>
    )
}


