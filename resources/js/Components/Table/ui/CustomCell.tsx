import { TRalModel } from "@/features/RalTable/model/types"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, } from "@tanstack/react-table"
import { FunctionComponent } from "react"
import { useLocation } from "react-router-dom"
import { CustomFlexRender } from "./СustomFlexRender"

export interface IProps {
    className?: string
    cellData: Cell<TRalModel, unknown>
}

const CustomCell: FunctionComponent<IProps> = ({ cellData }) => {
    const [, getQuery] = useParamsCustom();
    const location: any = useLocation();
    const { getContext, column, row } = cellData;

    const renderFn = column.columnDef.cell;

    return (
        <td
            key={cellData.id}
            className={`overflow-hidden text-center relative text-table-base p-1`}>
            <CustomFlexRender renderFn={renderFn} context={getContext()} currentQuery={getQuery()} />
        </td>
    );
}

export default CustomCell;

/**renderFn, getContext(), getQuery())}  */