
import { ColumnDef, } from "@tanstack/react-table"
import { FunctionComponent, ReactNode } from "react"


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
            className={`overflow-hidden text-center inline-block w-full`}>
            {/* w-[${cellData.column.getSize()}px]  добавить для resize*/}
            {headerData.header as ReactNode}
        </span>
    );
}

export default AccreditationAreaHeader;