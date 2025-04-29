import { FunctionComponent, useLayoutEffect, useMemo, useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Preloader } from '@/Components/utils/Preloader'
import { SVG } from '@/Components/utils/SVG'
import { getHeaders } from '@/Components/Table/lib/getHeaders'
import { IRalItem } from '@/shared/types/ral'
import { translateHeaderName } from '@/Components/Table/lib/translateHeaderName'
import { PageNavigation } from '@/Components/Inputs/PageNavigation/PageNavigation'
import RalCell from '@/features/RalTable/ui/RalTable/Cell/ui/RalCell'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import RalHeader from '@/features/RalTable/ui/RalTable/Cell/ui/RalHeader'
import FoundedResults from '../Inputs/PageNavigation/Pagination'
import PerPageController from '../Inputs/PerPageController'


interface IProps {
    className?: string
    propsData: any
    loading: any
}

const parentVariants = {
    start: {},
    end: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
}

const childrenVariants = {
    start: { opacity: 0 },
    end: { opacity: 1 }
}

export const Table: FunctionComponent<IProps> = ({ propsData, loading }) => {

    const navigate = useNavigate();

    const headers = useMemo(() => {
        let data = propsData?.data as IRalItem[]
        return propsData ? getHeaders(data, ['id', 'link']) : []
    }, [propsData])

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
    }, [propsData, headers])


    const tableData = useMemo(() => {
        return propsData?.data as IRalItem[] || []
    }, [propsData])

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
        propsData && setAnimationKey(prev => prev + 1)
    }, [propsData])

    return (
        <div className={'h-full grow grid grid-rows-[1fr_auto] grid-cols-[1fr] overflow-hidden'}>
            <div className={'p-2 w-full h-full grow shrink flex overflow-hidden '}>
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
                    currentPage={propsData?.current_page}
                    lastPage={propsData?.last_page}
                    total={propsData?.total}
                />
                <PerPageController />
                <PageNavigation
                    total={propsData?.total}
                    isPending={loading}
                    currentPage={propsData?.current_page}
                    lastPage={propsData?.last_page}
                />
            </div>
        </div>
    )
}

