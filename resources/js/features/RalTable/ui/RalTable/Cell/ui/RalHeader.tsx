import { SVG } from "@/Components/utils/SVG"
import { IRalItem } from "@/shared/types/ral"
import { Header } from "@tanstack/react-table"
import { FunctionComponent, ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"

interface IProps {
    className?: string
    key?: string | number
    headerData: Header<any, unknown>
}

const orderable: (keyof IRalItem)[] = ["NP_status_change_date", "regDate", "status_change_date"]

const RalHeader: FunctionComponent<IProps> = ({ className, headerData }) => {

    let isOrderable: boolean = orderable.includes(headerData.id as keyof IRalItem)
    const { control, trigger, getValues, setValue } = useFormContext();

    const columnName = headerData.id;

    return (
        <th
            style={{
                // width: headerData.getSize(),
            }}
            className={`${className} sticky z-[1] bg-row-even top-0 p-2 overflow-hidden`}>
            <span className={'flex gap-1 justify-center items-center'}>
                {headerData.column.columnDef.header as ReactNode}
                {isOrderable &&
                    <Controller
                        name={"order"}
                        control={control}
                        render={({ field: { value, onChange: updateForm }, fieldState }) => {
                            const regex = new RegExp(`^${columnName}`, 'i');
                            let isActive = regex.test(value);
                            let descRegexp = new RegExp('desc','i')
                            let isArrowDown = value === '' || (isActive && descRegexp.test(value)) || !isActive;
                            let color = isActive ? "text-[var(--cell-suspended)]" : undefined
                            let direction = isArrowDown ? 'rotate-180' : 'rotate-0'
                            console.log(isArrowDown) 
                            return (
                                <span
                                    onClick={() => value === `${columnName}_desc` ? updateForm(columnName) : updateForm(`${columnName}_desc`)}
                                        
                                    className="w-6 flex justify-center items-center"
                                    >
                                    <SVG className={`w-4 transition-all ${color} ${direction}`} arrow />
                                </span>
                            )
                        }}
                    />
                }
            </span>

            {/* <span
                className={`bg-resizer absolute translate-x-1/2 cursor-col-resize opacity-0 hover:opacity-100 z-10 w-1.5 bg-button-violet  h-full top-0 right-0 `}
                onMouseDown={headerData.getResizeHandler()}
                onTouchStart={headerData.getResizeHandler()}></span> */}
        </th>
    )
}

export default RalHeader;