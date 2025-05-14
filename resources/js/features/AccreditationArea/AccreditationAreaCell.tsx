import { TRalModel } from "@/features/RalTable/model/types"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, } from "@tanstack/react-table"
import { FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import customFlexRender from "./customFlexRender"

export interface IProps {
    className?: string
    cellData: Cell<TRalModel, unknown>
}

const AccreditationAreaCell: FunctionComponent<IProps> = ({ cellData }) => {
    const [, getQuery] = useParamsCustom();
    const location: any = useLocation();
    const { getContext, column, row, id } = cellData;

    /**
     * Функция достает из таблицы ячейку и возвращает JSX
     */
    const renderFn = column.columnDef.cell;

    return (
        <td
            key={id}
            className={`overflow-hidden text-center`}>
            {/* w-[${cellData.column.getSize()}px]  добавить для resize*/}

            <span className={'text-table-base p-1'}>
                {customFlexRender(renderFn, getContext(), getQuery(), location)}
            </span>
        </td>
    );
}

export default AccreditationAreaCell;