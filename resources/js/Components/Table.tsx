import React, {FormEvent, FunctionComponent, ReactNode, useEffect, useMemo} from 'react';
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useDispatchTyped, useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";
import {Preloader} from "@/Components/utils/Preloader";
import {SVG} from "@/Components/utils/SVG";
import {updatePage} from "@/services/slices/filters-slice";
import {useForm} from "react-hook-form";

interface IProps {
    className?: string
}

export const Table: FunctionComponent<IProps> = () => {
    const dispatch = useDispatchTyped()
    const paginatedData = useSelector(state => state.ralSliceToolkit.ralData);
    const tableHeaders = useSelector(state => state.ralSliceToolkit.headers)
    const isLoading = useSelector(state => state.ralSliceToolkit.ralFetchStart)
    const page = useSelector(state => state.filtersReducer.paginationQueries.page)

    // useEffect(() => {
    //     console.log(paginatedData, tableHeaders, isLoading)
    // }, [paginatedData, tableHeaders, isLoading]);

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
            colData = tableHeaders.map((header, key) => {
                return {
                    accessorKey: header,
                    header: getHeaderName(header),
                    cell: (props: any) => <p>{props.getValue()}</p>,
                    enableResizing: true,
                    size: 200
                }
            })
        }
        return colData;
    },[paginatedData, tableHeaders])

    const table = useReactTable({
        data: paginatedData.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        enableColumnResizing: true
    })

    const {register, formState: {errors}, trigger, setValue} = useForm()
    const handleInputPageChange = async (e:FormEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement
        await trigger("page")
            console.log(errors)
        if (1 > Number(target.value) || target.value > paginatedData.last_page) {
            dispatch(updatePage(+paginatedData.current_page))
        } else {
            dispatch(updatePage(+target.value))
        }
    }

    return (
        <div className={'h-full grow grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={"text-header-text text-sm p-2 ml-6 flex gap-4"}>
                <div className={"flex items-center"}>
                    <span>
                        Страница {Object.keys(paginatedData.data).length !== 0 ? paginatedData.current_page : "загрузка"} из {" "}
                        {Object.keys(paginatedData.data).length !== 0 ? paginatedData.last_page : "загрузка"}
                    </span>
                </div>
                <input
                    className={'w-20'}
                    defaultValue={1}
                    {...register("page",
                        {
                            min: {value: 1, message: "меньше 1"},
                            max: {value: paginatedData.last_page, message: "превысили"},
                            valueAsNumber: true,
                        })}
                    type={"number"} onInput={handleInputPageChange}/>
            </div>
            <div className={'p-2 h-full w-full grow flex overflow-y-hidden'}>
                <div className={"text-base my-block w-full h-full flex items-center justify-center bg-background-block "}>
                    {isLoading ? <Preloader widthStyles={"w-16"}/> : (
                        Object.keys(paginatedData.data).length !== 0 ? (
                            <table
                                className={"block min-h-full max-h-full min-w-full w-full text-sm overflow-x-scroll overflow-y-auto table-fixed rounded-t-md"}>
                                <thead className={"sticky bg-background-block top-0 text-header-text font-medium"}>
                                    <tr className={'flex w-fit bg-row-even text-header-text'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => {
                                            return (
                                                <th style={{width: header.column.getSize()}}
                                                    className={`relative p-2 flex justify-center items-center`}
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
                                <tbody className={'w-full font-medium'}>
                                {table.getRowModel().rows.map(row => {
                                    return <tr className={'flex w-fit even:bg-row-even odd:bg-row-odd h-20'}
                                               key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                            return <td key={cell.id} style={{width: cell.column.getSize()}}
                                                       className={`overflow-hidden flex justify-center items-center`}>
                                                <span
                                                    className={"text-cell-text"}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                            </td>
                                        })}
                                    </tr>
                                })}
                                </tbody>
                            </table> ) :
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
                    Страница {Object.keys(paginatedData.data).length !== 0 ? paginatedData.current_page : "загрузка"} из {" "}
                    {Object.keys(paginatedData.data).length !== 0 ? paginatedData.last_page : "загрузка"}
                </div>
            </div>
        </div>
    )
}

// <Preloader widthStyles={"w-16"}/>

