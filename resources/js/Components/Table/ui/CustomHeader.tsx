import { OrderInput } from "@/Components/Inputs/OrderInput"
import { IRalItem } from "@/shared/types/ral"
import { Header } from "@tanstack/react-table"
import { FunctionComponent, ReactNode } from "react"

interface IProps {
    className?: string
    key?: string | number
    headerData: Header<any, unknown>
    orderable: string[]
}

export const CustomHeader: FunctionComponent<IProps> = ({ headerData, orderable }) => {
    const isOrderable = orderable.includes(headerData.id as keyof IRalItem)
    const columnName = headerData.id

    return (
        <span className={'flex gap-1 justify-center items-center sticky z-[1] bg-row-even top-0 p-2 overflow-hidden'}>
            {headerData.column.columnDef.header as ReactNode}
            {isOrderable && <OrderInput columnName={columnName} hookFormName="order"/>}
        </span>
    )
}