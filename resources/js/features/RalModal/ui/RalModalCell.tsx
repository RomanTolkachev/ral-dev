import { IModel } from "@/features/RalTable/model/types"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, } from "@tanstack/react-table"
import { FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import customFlexRender from "./customModalCell"
import customModalCell from "./customModalCell"

export interface IProps {
    className?: string
    cellData: Cell<IModel, unknown>
}

const RalModalCell: FunctionComponent<IProps> = ({ cellData }) => {
    const [, getQuery] = useParamsCustom();
    const location: any = useLocation();
    const { getContext, column, row } = cellData;

    /**
     * Функция достает из таблицы ячейку и возвращает JSX
     */
    const renderFn = column.columnDef.cell;

    return (
        <td
            key={cellData.id}
            className={`overflow-hidden text-center text-table-base p-1 [&_li]:leading-[1]`}>
            {/* w-[${cellData.column.getSize()}px]  добавить для resize*/}
                {customModalCell(renderFn, getContext(), getQuery(), location)}
        </td>
    );
}

export default RalModalCell;