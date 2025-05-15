import { TRalModel } from "@/features/RalTable/model/types"
import useParamsCustom from "@/shared/query/useParamsCustom"
import { Cell, ColumnDef, } from "@tanstack/react-table"
import { FunctionComponent, ReactNode } from "react"
import { useLocation } from "react-router-dom"
import customFlexRender from "./customFlexRender"

export interface IProps {
    className?: string
    headerData: ColumnDef<any, any>
}

const AccreditationAreaHeader: FunctionComponent<IProps> = ({ headerData }) => {
    if (headerData.header === "Определяемая характеристика (Показатель)") {
        return (
            <>
                Определяемая<br />
                характеристика<br />
                (Показатель)
            </>
        )
    }
    if (headerData.header === "Диапазон определения") {
        return (
            <>
                Диапазон<br />
                определения
            </>
        )
    }
    if (headerData.header === "КОД ТН ВЭД ЕАЭС") {
        return (<>КОД<br /> ТН ВЭД ЕАЭС</>)   
    }
    return (
        <span
            // key={id}
            className={`overflow-hidden text-center inline-block w-full`}>
            {/* w-[${cellData.column.getSize()}px]  добавить для resize*/}
            {headerData.header as ReactNode}
        </span>
    );
}

export default AccreditationAreaHeader;