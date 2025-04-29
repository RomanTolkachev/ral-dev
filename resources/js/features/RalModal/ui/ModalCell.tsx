import { IModel } from "@/features/RalTable/model/types"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, } from "@tanstack/react-table"
import { FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import customFlexRender from "./customModalCell"

export interface IProps {
    className?: string
    cellData: Cell<IModel, unknown>
}

const ModalCell: FunctionComponent<IProps> = ({ cellData }) => {
    const [, getQuery] = useParamsCustom();
    const location: any = useLocation();
    const { getContext, column, row } = cellData;

    /**
     * Переменная достает из таблицы ячейку и возвращает JSX
     */
    const renderFn = column.columnDef.cell;

    return (
        <td
            key={cellData.id}
            className={`overflow-hidden p-2 w-[${cellData.column.getSize()}px] text-center`}>
            <span className={'first-letter:capitalize'}>
                {customFlexRender(renderFn, getContext(), getQuery(), location)}
            </span>
        </td>
    );
}

export default ModalCell;