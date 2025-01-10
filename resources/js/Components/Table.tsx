import React, { FormEvent, FunctionComponent, ReactNode, useEffect, useMemo, useRef } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@/services/hooks/typedUseSelector'
import { Preloader } from '@/Components/utils/Preloader'
import { SVG } from '@/Components/utils/SVG'
import { setPage } from '@/services/slices/filters-slice'
import { useFormContext } from 'react-hook-form'
import { useRalQuery } from '@/services/hooks/useRalQuery'
import { getHeaders } from '@/shared/getHeaders'
import { IRalItem, TPaginatedRal } from '@/types/ral'
import { getHeaderName } from '@/shared/getHeaderName.ts'
import { PageInput } from '@/Components/Inputs/PageInput.tsx'

interface IProps {
    className?: string
}

export const Table: FunctionComponent<IProps> = () => {
    const dispatch = useDispatchTyped()
    const queries = useSelector((state) => state.filtersReducer.queries)

    const { data: ralData, isPending } = useRalQuery(queries)

    const headers = useMemo(() => {
        return ralData ? getHeaders(ralData.data) : []
    }, [ralData])

    const columns: ColumnDef<any>[] = useMemo(() => {
        let colData: ColumnDef<any>[] = []
        if (headers.length !== 0) {
            colData = headers.map((header) => {
                return {
                    accessorKey: header,
                    header: getHeaderName(header),
                    cell: (props: any) => <>{props.getValue()}</>,
                    enableResizing: true,
                }
            })
        }
        return colData
    }, [ralData, headers])

    const tableData = useMemo<IRalItem[] | []>(() => {
        return ralData?.data || []
    }, [ralData])

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        enableColumnResizing: true,
        defaultColumn: {
            minSize: 150,
            maxSize: 500,
        },
    })

    const handleInputPageChange = async (e: FormEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement
        await trigger('page')
        if (ralData) {
            if (1 > Number(target.value) || Number(target.value) > ralData?.last_page) {
                dispatch(setPage(+queries.page))
            } else {
                dispatch(setPage(+target.value))
            }
        }
    }

    const inputRef = useRef<HTMLInputElement | null>(null)
    const {trigger} = useFormContext()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current!.value = String(queries.page)
        }
    }, [queries.page])

    return (
        <div className={'h-full grow grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={'text-header-text text-sm p-2 ml-6 flex gap-4 items-center'}>
                <div className={'flex items-center'}>
                    <span>
                        Страница {ralData?.data.length !== 0 ? ralData?.current_page : ' '} из{' '}
                        {ralData?.data.length !== 0 ? ralData?.last_page : ' '}
                    </span>
                </div>
                <PageInput lastPage={ralData?.last_page} />
            </div>
            <div className={'p-2 w-full h-full grow flex overflow-hidden'}>
                <div className={'my-block min-w-full h-full bg-background-block'}>
                    <div
                        className={
                            'text-base grow max-w-full h-full min-h-full max-h-full overflow-x-auto overflow-y-auto bg-background-block'
                        }>
                        {isPending ? (
                            <Preloader className={'h-full flex items-center'} widthStyles={'w-16'} />
                        ) : Object.keys(tableData).length !== 0 ? (
                            <table
                                style={{ width: table.getTotalSize() }}
                                className={`min-h-full min-w-full max-h-full text-sm table-fixed rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                                <thead className={'select-none relative text-header-text font-medium'}>
                                    <tr className={'text-header-text text-nowrap'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => {
                                            return (
                                                <th
                                                    style={{
                                                        width: header.getSize(),
                                                    }}
                                                    className={`sticky bg-row-even top-0 p-2 overflow-hidden`}
                                                    key={header.id}>
                                                    <span className={''}>
                                                        {header.column.columnDef.header as ReactNode}
                                                    </span>
                                                    <span
                                                        className={`bg-resizer absolute translate-x-1/2 cursor-col-resize opacity-0 hover:opacity-100 z-10 w-1.5 bg-button-violet  h-full top-0 right-0 `}
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}></span>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className={'font-medium'}>
                                    {table.getRowModel().rows.map((row) => {
                                        return (
                                            <tr className={'even:bg-row-even odd:bg-row-odd h-20'} key={row.id}>
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className={`overflow-hidden p-2 w-[${cell.column.getSize()}px] text-center`}>
                                                            <span className={'text-table-base'}>
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </span>
                                                        </td>
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
                        ) : (
                            <div className={'mx-auto my-auto h-[300px] w-[300px]'}>
                                <SVG className={'mb-2'} notFound />
                                <p
                                    className={
                                        'text-3xl text-nowrap tracking-tight font-black  text-[#29263b]' +
                                        'first-letter:capitalize text-center'
                                    }>
                                    данные не найдены
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={'text-end'}>
                <div className={'text-header-text text-sm p-2 mr-6'}>
                    Страница {ralData?.data.length !== 0 ? ralData?.current_page : 'загрузка'} из{' '}
                    {ralData?.data.length !== 0 ? ralData?.last_page : 'загрузка'}
                </div>
            </div>
        </div>
    )
}
