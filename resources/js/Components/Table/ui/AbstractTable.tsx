import { FunctionComponent, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { SVG } from '@/Components/utils/SVG'
import { getHeaders } from '@/Components/Table/lib/getHeaders'
import { IRalItem } from '@/shared/types/ral'
import IPagination from '@/shared/types/pagination'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { CustomCellContext } from '@/shared/api/AbstractFormProvider'
import { PageNavigation } from '@/Components/Inputs/PageNavigation/PageNavigation'
import FoundedResults from '@/Components/Inputs/PageNavigation/Pagination'
import PerPageController from '@/Components/Inputs/PerPageController/PerPageController'
import { Preloader } from '@/Components/utils/Preloader'
import createTranslateFn from '../lib/translate'
import CustomCell from './CustomCell'
import { CustomHeader } from './CustomHeader'


interface IProps {
    className?: string
    paginatedData: IPagination | undefined
    loading: boolean
    dictionary?: Record<string, any>
    customCellrender?: any
}

// параметры анимации
const parentVariants = {
    start: {},
    end: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
}
const childrenVariants = {
    start: { opacity: 0 },
    end: { opacity: 1 }
}

export const AbstractTable: FunctionComponent<IProps> = ({ className, paginatedData, loading, dictionary }) => {

    const navigate = useNavigate();

    const translateFn = dictionary ? createTranslateFn(dictionary) : null

    const { rowClickFn, OrderableCells, cellWidths, HiddenColumns } = useContext(CustomCellContext) ?? {};


    const headers = useMemo(() => {
        const data = paginatedData?.data as IRalItem[]
        return paginatedData ? getHeaders(data, HiddenColumns) : []
    }, [paginatedData])

    const columns: ColumnDef<any>[] = useMemo(() => {
        let colData: ColumnDef<any>[] = [];
        if (headers.length !== 0) {
            colData = headers.map((header) => {
                return {
                    accessorKey: header,
                    header: translateFn ? translateFn(header) : header,
                    cell: (props: any) => { return <>{props.getValue()}</>; },
                    enableResizing: true,
                    size: cellWidths?.[header] ?? 150
                }
            })
        }
        return colData;
    }, [paginatedData, headers])

    const tableData = useMemo(() => {
        return paginatedData?.data as IRalItem[] || []
    }, [paginatedData])

    const table = useReactTable({
        data: tableData as IRalItem[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            minSize: 50,
            maxSize: 500,
        },
    })

    /**
     * функция для перехода по ссылке при клике на row
     */
    function handleRowClick(to: string): void {
        if (rowClickFn) {
            rowClickFn()
        } else {
            navigate(to)
        }
    }

    /**
     * принудительно вызываем рендер tbody каждое изменение ralData, чтобы менять ключ анимации.
     * Ключ подставлен в key у tbody
     */
    const [animationKey, setAnimationKey] = useState<number>(0);
    useLayoutEffect(() => {
        paginatedData && setAnimationKey(prev => prev + 1)
    }, [paginatedData])

    return (
        <div className={`${className} h-full grow grid grid-rows-[1fr_auto] grid-cols-[1fr] overflow-hidden`}>
            <div className={'p-2 w-full h-full grow flex overflow-hidden'}>
                <div className={'my-block min-w-full h-full bg-background-block'}>
                    <div
                        className={
                            'text-base grow max-w-full h-full min-h-full max-h-full overflow-x-auto overflow-y-auto bg-background-block'
                        }>
                        {loading ? (
                            <Preloader className={'h-full flex items-center'} widthStyles={'w-16'} />
                        ) : Object.keys(tableData).length ? (
                            <table
                                style={{ width: table.getTotalSize() }}
                                className={`min-h-full min-w-full max-h-full text-sm table-fixed rounded-t-md [&_td]:border-r [&_td]:border-r-filter-dropdown-button`}>
                                <thead className={'select-none relative text-header-text font-medium'}>
                                    <tr className={'text-header-text'}>
                                        {table.getHeaderGroups()[0].headers.map((header) => {
                                            return (
                                                <th
                                                    style={{
                                                        width: header.getSize(),
                                                    }}
                                                    className={`sticky z-[1] bg-row-even top-0 p-2 overflow-hidden`}
                                                    key={header.id}>
                                                    <CustomHeader orderable={OrderableCells ?? []} headerData={header} />
                                                </th>
                                            )
                                        })}
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
                                                className={'even:bg-row-even odd:bg-row-odd h-20 z-10'}
                                                key={row.id}
                                                onClick={() => handleRowClick(`${row.original.id}${location.search}`)}
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <CustomCell key={cell.id} cellData={cell} />
                                                    )
                                                })}
                                            </motion.tr>
                                        )
                                    })}
                                    <motion.tr className={'even:bg-row-even odd:bg-row-odd'}>
                                        {table
                                            .getRowModel()
                                            .rows[0].getVisibleCells()
                                            .map((item, key) => {
                                                return <td key={`last-row${key}`}></td>
                                            })}
                                    </motion.tr>
                                </motion.tbody>
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
            <div className={'text-sm py-4 px-2 ml-6 flex gap-4 h-fit items-center justify-between text-table-base font-semibold'}>
                <FoundedResults
                    className='w-52 min-w-fit'
                    dataLenght={tableData?.length}
                    currentPage={paginatedData?.current_page}
                    lastPage={paginatedData?.last_page}
                    total={paginatedData?.total}
                />
                <PerPageController />
                <PageNavigation
                    total={paginatedData?.total}
                    isPending={loading}
                    currentPage={paginatedData?.current_page}
                    lastPage={paginatedData?.last_page}
                />
            </div>
        </div>
    )
}
