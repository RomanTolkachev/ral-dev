import { FunctionComponent, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { getHeaders } from '@/shared/ui/Table/lib/getHeaders'
import { IRalItem } from '@/shared/types/ral'
import IPagination from '@/shared/types/pagination'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { CustomCellContext } from '@/shared/ui/Table/providers/CustomFormProvider'
import { PageNavigation } from '@/Components/Inputs/PageNavigation/PageNavigation'
import FoundedResults from '@/Components/Inputs/PageNavigation/Pagination'
import PerPageController from '@/Components/Inputs/PerPageController/PerPageController'
import { Preloader } from '@/Components/utils/Preloader'
import createTranslateFn from '../lib/translate'
import { CustomHeader } from './CustomHeader'
import { CustomCell } from './CustomCell'
import { CustomisationContext } from '../model'
import { enterExitAnimation } from '@/shared/framer-motion/enter-exit-animation'
import { getErrorMessage } from '../lib'
import { NoData } from './notFound'
import { DevTool } from '@hookform/devtools'
import { useFormContext } from 'react-hook-form'

interface IProps {
    className?: string
    paginatedData: IPagination | undefined
    dictionary?: Record<string, any>
    customCellrender?: any
    isUpdating?: boolean
    failureCount?: number
    error?: string
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

export const Table: FunctionComponent<IProps> = ({ className, paginatedData, dictionary, isUpdating: isUpdating = false, failureCount = 0, error }) => {

    const { control } = useFormContext()

    const navigate = useNavigate();

    const translateFn = dictionary ? createTranslateFn(dictionary) : null

    const configContext = useContext<CustomisationContext | null>(CustomCellContext);

    if (!configContext?.config) {
        return null
    }

    const { HIDDEN_COLUMNS, ORDERABLE_CELLS, CELL_WIDTH, ROW_CLICK_FN } = configContext.config

    const headers = useMemo(() => {
        const data = paginatedData?.data as IRalItem[]
        return paginatedData ? getHeaders(data, HIDDEN_COLUMNS) : []
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
                    size: CELL_WIDTH?.[header] ?? 150
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

    function handleClick(action: "navigate" | "none", to: string): void {
        switch (action) {
            case "navigate": {
                navigate(to)
            }
            case "none": {
                return
            }
        }
    }

    // принудительно вызываем рендер tbody каждое изменение ralData, чтобы менять ключ анимации.
    // Ключ подставлен в key у tbody
    const [animationKey, setAnimationKey] = useState<number>(0);
    useLayoutEffect(() => {
        paginatedData && setAnimationKey(prev => prev + 1)
    }, [paginatedData])

    return (
        <div className={`${className} h-full grow grid grid-rows-[1fr_auto] grid-cols-[1fr] overflow-hidden`}>
            <DevTool control={control} />
            <div className={'p-2 w-full h-full grow flex overflow-hidden'}>
                <div className={'my-block min-w-full h-full bg-background-block relative'}>
                    {/* Оверлей с прелоудером */}
                    {isUpdating && (
                        <motion.div
                            {...enterExitAnimation}
                            className="absolute inset-0 bg-background-block/70 z-10 flex justify-center items-center rounded-xl"
                        >
                            <div className="flex flex-col items-center">
                                <Preloader widthStyles='w-10' />
                                <span className="mt-3 text-table-base">{getErrorMessage(failureCount)}</span>
                            </div>
                        </motion.div>
                    )}

                    <div className='text-base grow max-w-full h-full min-h-full max-h-full overflow-x-auto overflow-y-auto bg-background-block'>
                        {error ?
                            <div className='w-full h-full grid place-items-center text-table-base'>{getErrorMessage(null, error)}</div> :
                            Object.keys(tableData).length ? (
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
                                                        <CustomHeader orderable={ORDERABLE_CELLS ?? []} headerData={header} />
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <motion.tbody
                                        key={animationKey}
                                        variants={parentVariants}
                                        initial="start"
                                        animate="end"
                                        className={'font-medium'}
                                    >
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
                                                    onClick={() => handleClick(ROW_CLICK_FN, `${row.original.id}${location.search}`)}
                                                >
                                                    {row.getVisibleCells().map((cell) => {
                                                        return (
                                                            <td
                                                                key={cell.id}
                                                                className={` text-center relative text-table-base p-1`}>
                                                                <CustomCell cellData={cell} />
                                                            </td>
                                                        )
                                                    })}
                                                </motion.tr>
                                            )
                                        })}
                                        <motion.tr className={'even:bg-row-even odd:bg-row-odd'}>
                                            {table
                                                .getRowModel()
                                                .rows[0]?.getVisibleCells()
                                                .map((item, key) => {
                                                    return <td key={`last-row${key}`}></td>
                                                })}
                                        </motion.tr>
                                    </motion.tbody>
                                </table>
                            ) : <NoData className='w-full h-full grid place-items-center' />}
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
                    isPending={isUpdating}
                    total={paginatedData?.total}
                    currentPage={paginatedData?.current_page}
                    lastPage={paginatedData?.last_page}
                />
            </div>
        </div>
    )
}