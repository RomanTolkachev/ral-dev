import { SVG } from "@/Components/utils/SVG"
import { CustomSubmitHandlerContext } from "@/shared/api/AbstractFormProvider"
import { IRalItem } from "@/shared/types/ral"
import { Header } from "@tanstack/react-table"
import { motion, ObjectTarget, Target, useAnimate, useAnimation } from "motion/react"
import { FunctionComponent, ReactNode, RefObject, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

interface IProps {
    className?: string
    key?: string | number
    headerData: Header<any, unknown>
}

const orderable: (keyof IRalItem)[] = ["NP_status_change_date", "regDate", "status_change_date"]

const RalHeader: FunctionComponent<IProps> = ({ className, headerData }) => {

    let isOrderable: boolean = orderable.includes(headerData.id as keyof IRalItem)
    const { control, trigger, getValues } = useFormContext();
    const handlers = useContext(CustomSubmitHandlerContext);
    if (!handlers) return null
    const {customSubmitHandler} = handlers
    const [scope, animate] = useAnimate();
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
                        render={({ field: { value, onChange: updateForm, ref }, fieldState }) => {
                            const regex = new RegExp(`^${columnName}`, 'i');
                            let isActive = regex.test(value);
                            let descRegexp = new RegExp('desc', 'i')
                            let isArrowDown = value === '' || (isActive && descRegexp.test(value)) || !isActive;
                            const [firstRender, setIsFirstRender] = useState(true)


                            // чтобы при первом рендере стрелочка не анимировалась, если она должна смотреть вниз 
                            useLayoutEffect(() => {
                                if (scope.current && firstRender) {
                                    animate(scope.current, {
                                        rotate: isArrowDown ? 180 : 0,
                                    }, { duration: 0 });
                                }
                            }, []);

                            useEffect(() => {
                                setIsFirstRender(false)
                            }, [])


                            // смысл в том, чтобы форма сабмитилась только после анимирования стрелки, иначе некрасиво
                            useEffect(() => {
                                if (!firstRender) {
                                    const asyncAnimate = (scope: HTMLElement, properties: Record<string, any>) => {
                                        return new Promise<void>((resolve) => {
                                            animate(scope, properties, { onComplete: resolve })
                                        })
                                    }
                                    const animateAndSubmit = async () => {
                                        if (scope.current) {
                                            isActive ? await asyncAnimate(scope.current, { color: 'var(--cell-suspended)' }) : await asyncAnimate(scope.current, { color: 'rgb(137, 137, 137)' })
                                            isArrowDown ? await asyncAnimate(scope.current, { rotate: 180 }) : await asyncAnimate(scope.current, { rotate: 0 })
                                        }
                                        const isValid = await trigger();
                                        isValid && customSubmitHandler(getValues())
                                    }
                                    animateAndSubmit();
                                }

                            }, [isArrowDown, isActive, firstRender])

                            return (
                                <motion.span
                                    ref={scope}
                                    onClick={
                                        () => value === `${columnName}_desc` ? updateForm(columnName) : updateForm(`${columnName}_desc`)
                                    }
                                    className="w-6 flex justify-center items-center"
                                >
                                    <SVG className={`w-4`} arrow />
                                </motion.span>
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