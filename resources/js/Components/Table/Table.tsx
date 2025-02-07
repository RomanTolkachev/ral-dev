import { FunctionComponent, ReactNode, useEffect, useMemo, useRef } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Preloader } from '@/Components/utils/Preloader'
import { SVG } from '@/Components/utils/SVG'
import { useRalQuery } from '@/features/ralTable/api/useRalQuery'
import { getHeaders } from '@/Components/Table/lib/getHeaders'
import { IRalItem } from '@/shared/types/ral'
import { translateHeaderName } from '@/Components/Table/lib/translateHeaderName'
import { PageInput } from '@/Components/Inputs/PageInput.tsx'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty } from 'lodash'
import DEFAULT_REQUEST from '@/features/ralTable/config'
import RalCell from '@/features/RalTable/ui/RalTable/Cell/ui/RalCell'
import { useSelectorTyped } from '@/features/store/typedUseSelector'

interface IProps {
    className?: string
}

interface TQueries extends Record<string, any> {
    page: number,
    perPage: number,
    status_change_date: string[]
    user_columns?: string[]
}

export const Table: FunctionComponent<IProps> = () => {
    const [, getQuery] = useParamsCustom();
    const userColumns = useSelectorTyped(state => state.userState.settings.ralTableColumns); // тут дальше в стейте будем хранить настройки для столбца юзера
    
    const queries = isEmpty(getQuery()) ? DEFAULT_REQUEST : getQuery();
    queries.user_columns = userColumns; // к дефолтному запросу добавляем колонки пользователя

    const { data: ralData, isPending } = useRalQuery(queries); //TODO: тут нужно вынести выше и через пропсы давать query

    const headers = useMemo(() => {
        return ralData ? ["подробнее", ...getHeaders(ralData.data)] : []
    }, [ralData])

    const columns: ColumnDef<any>[] = useMemo(() => {
        let colData: ColumnDef<any>[] = [];
        if (headers.length !== 0) {
            colData = headers.map((header) => {
                return {
                    accessorKey: header,
                    header: translateHeaderName(header),
                    cell: (props: any) => {return <>{props.getValue()}</>;},
                    enableResizing: true,
                }
            })
        }
        return colData;
    }, [ralData, headers])


    const tableData = useMemo<IRalItem[] | []>(() => {
        return ralData?.data || []
    }, [ralData])

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // columnResizeMode: 'onChange',
        // enableColumnResizing: true,
        defaultColumn: {
            minSize: 50,
            maxSize: 500,
        },
    })

    const inputRef = useRef<HTMLInputElement | null>(null)
    
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
                                className={`min-h-full min-w-full max-h-full text-sm table-auto rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                                <thead className={'select-none relative text-header-text font-medium'}>
                                    <tr className={'text-header-text text-nowrap'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => {
                                            return (
                                                <th
                                                    style={{
                                                        width: header.getSize(),
                                                    }}
                                                    className={`sticky z-[1] bg-row-even top-0 p-2 overflow-hidden`}
                                                    key={header.id}>
                                                    <span className={''}>
                                                        {header.column.columnDef.header as ReactNode}
                                                    </span>
                                                    {/* <span
                                                        className={`bg-resizer absolute translate-x-1/2 cursor-col-resize opacity-0 hover:opacity-100 z-10 w-1.5 bg-button-violet  h-full top-0 right-0 `}
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}></span> */}
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
                                                        <RalCell key={cell.id} cellData={cell} />
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
                            <div className={' w-full h-full grid place-items-center'}>
                                <div className='w-[300px]'>
                                    <SVG className={' mb-2'} notFound />
                                    <p
                                        className={
                                            'text-3xl text-nowrap tracking-tight font-black text-text-primary ' +
                                            'first-letter:capitalize text-center'
                                        }>
                                        данные не найдены
                                    </p>
                                </div>
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
