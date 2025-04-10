import { FunctionComponent, useLayoutEffect, useMemo, useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Preloader } from '@/Components/utils/Preloader'
import { SVG } from '@/Components/utils/SVG'
import { useRalQuery } from '@/features/ralTable/api/useRalQuery'
import { getHeaders } from '@/Components/Table/lib/getHeaders'
import { IRalItem } from '@/shared/types/ral'
import { translateHeaderName } from '@/Components/Table/lib/translateHeaderName'
import { PageNavigation } from '@/Components/Inputs/PageNavigation/PageNavigation'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty } from 'lodash'
import DEFAULT_REQUEST from '@/features/ralTable/config'
import RalCell from '@/features/RalTable/ui/RalTable/Cell/ui/RalCell'
import { useSelectorTyped } from '@/features/store/typedUseSelector'
import IPagination from '@/shared/types/pagination'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import RalHeader from '@/features/RalTable/ui/RalTable/Cell/ui/RalHeader'
import FoundedResults from '../Inputs/PageNavigation/Pagination'
import { Controller } from 'react-hook-form'
import PerPageController from '../Inputs/PerPageController'


interface IProps {
    className?: string
}

/**
 * параметры анимации
 */
const parentVariants = {
    start: {},
    end: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
}

/**
 * параметры анимации
 */
const childrenVariants = {
    start: { opacity: 0 },
    end: { opacity: 1 }
}

export const Table: FunctionComponent<IProps> = () => {
    const [, getQuery] = useParamsCustom();
    const userColumns = useSelectorTyped(state => state.userState.settings.ralTableColumns); // тут дальше в стейте будем хранить настройки для столбца юзера

    const queries = isEmpty(getQuery()) ? DEFAULT_REQUEST : getQuery();
    queries.user_columns = userColumns; // к дефолтному запросу добавляем колонки пользователя

    const { data: ralData, isPending } = useRalQuery<IPagination>(queries); //TODO: тут нужно вынести выше и через пропсы давать query

    const navigate = useNavigate();

    const headers = useMemo(() => {
        let data = ralData?.data as IRalItem[]
        return ralData ? getHeaders(data, ['id', 'link']) : []
    }, [ralData])

    const columns: ColumnDef<any>[] = useMemo(() => {
        let colData: ColumnDef<any>[] = [];
        if (headers.length !== 0) {
            colData = headers.map((header) => {
                return {
                    accessorKey: header,
                    header: translateHeaderName(header),
                    cell: (props: any) => { return <>{props.getValue()}</>; },
                    enableResizing: true,
                }
            })
        }
        return colData;
    }, [ralData, headers])


    const tableData = useMemo(() => {
        return ralData?.data as IRalItem[] || []
    }, [ralData])

    const table = useReactTable({
        data: tableData as IRalItem[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        // columnResizeMode: 'onChange',
        // enableColumnResizing: true,
        defaultColumn: {
            minSize: 20,
            maxSize: 500,
        },
    })

    /**
     * функция для перехода по ссылке при клике на row
     */
    function handleRowClick(to: string): void {
        navigate(to)
    }

    /**
     * принудительно вызываем рендер tbody каждое изменение ralData, чтобы менять ключ анимации.
     * Ключ подставлен в key у tbody
     */
    const [animationKey, setAnimationKey] = useState<number>(0);
    useLayoutEffect(() => {
        ralData && setAnimationKey(prev => prev + 1)
    }, [ralData])

    return (
        <div className={'h-full grow grid grid-rows-[1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={'p-2 w-full h-full grow shrink flex overflow-hidden '}>
                <div className={'my-block min-w-full h-full bg-background-block'}>
                    <div
                        className={
                            'text-base grow max-w-full h-full min-h-full max-h-full overflow-x-auto overflow-y-auto bg-background-block'
                        }>
                        {isPending ? (
                            <Preloader className={'h-full flex items-center'} widthStyles={'w-16'} />
                        ) : Object.keys(tableData).length ? (
                            <table
                                style={{ width: table.getTotalSize() }}
                                className={`min-h-full min-w-full max-h-full text-sm table-auto rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                                <thead className={'select-none relative text-header-text font-medium'}>
                                    <tr className={'text-header-text text-nowrap'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => <RalHeader key={header.id} headerData={header} />)}    
                                    </tr>
                                </thead>
                                <motion.tbody key={animationKey} variants={parentVariants} initial="start" animate="end" className={'font-medium'}>
                                    {table.getRowModel().rows.map((row) => {
                                        return (
                                            <motion.tr
                                                variants={childrenVariants}
                                                whileHover={{
                                                    y: -1,
                                                    cursor: "pointer",
                                                    transition: { duration: 0.2 },
                                                    boxShadow: "var(--row-hover)"
                                                }}
                                                className={'even:bg-row-even odd:bg-row-odd h-20 z-10 [&_span]:line-clamp-3'}
                                                key={row.id}
                                                onClick={() => handleRowClick(`${row.original.id}${location.search}`)}
                                            >
                                                {row.getVisibleCells().map((cell) => <RalCell key={cell.id} cellData={cell} />)}
                                            </motion.tr>
                                        )
                                    })}
                                    <motion.tr className={'even:bg-row-even odd:bg-row-odd'}>
                                        {table
                                            .getRowModel()
                                            .rows[0].getVisibleCells()
                                            .map((item, key) => <td key={`last-row${key}`}></td>)}  
                                    </motion.tr>
                                </motion.tbody>
                            </table>
                        ) : (
                            <div className={'w-full h-full grid place-items-center'}>
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
            <div className={'text-sm py-4 px-2 ml-6 flex gap-4 h-fit items-center justify-between text-table-base font-semibold'}>
                <FoundedResults
                    className='w-52 min-w-fit'
                    dataLenght={tableData?.length}
                    currentPage={ralData?.current_page}
                    lastPage={ralData?.last_page}
                    total={ralData?.total}
                />
                <PerPageController />
                <PageNavigation
                    total={ralData?.total}
                    isPending={isPending}
                    currentPage={ralData?.current_page}
                    lastPage={ralData?.last_page}
                />
            </div>
        </div>
    )
}

