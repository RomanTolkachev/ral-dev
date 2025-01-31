import highlight from "@/Components/Table/features/highlightText"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, flexRender } from "@tanstack/react-table"
import { motion } from "motion/react"
import { FunctionComponent } from "react"
import { renderToString } from "react-dom/server"
import { Link, useLocation } from "react-router"

interface IModel extends Record<string, any> { }

interface IProps {
    className?: string
    cellData: Cell<IModel, unknown>
}

const RalCell: FunctionComponent<IProps> = ({ cellData }) => {
    const [, getQuery] = useParamsCustom();
    const location = useLocation();

    return (
        <td
            key={cellData.id}
            className={`overflow-hidden p-2 w-[${cellData.column.getSize()}px] text-center`}>
            <span className={'text-table-base'}>
                {
                    cellData.column.id === "подробнее"
                        ? <motion.span
                            className="inline-block"
                            style={{scale: 1.01, zIndex: -10}}
                            initial={{ scale: 1.01 }} 
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link state={{background: location}} className="underline" to={`${cellData.row.original.id}${location.search}`}>подробнее</Link>
                        </motion.span>
                        : highlight(renderToString(flexRender(cellData.column.columnDef.cell, cellData.getContext())), getQuery().fullText)
                }
            </span>
        </td>
    );
}

export default RalCell;