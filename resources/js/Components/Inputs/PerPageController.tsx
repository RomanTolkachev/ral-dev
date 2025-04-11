import { CustomSubmitHandlerContext } from "@/features/ralTable/api/RalFormProvider";
import useParamsCustom from "@/shared/query/useParamsCustom";
import { motion } from "motion/react";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form"

interface IProps {
    className?: string
}


const PerPageController: FunctionComponent<IProps> = () => {
    const { control, getValues, trigger } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext);
    const [, getQuery] = useParamsCustom();



    return (
        <div className="flex gap-3 items-center relative">
            <span>Показывать на странице</span>
            <Controller
                control={control}
                name="perPage"
                render={({ field: { onChange, value } }) => {
                    const selectionsRef = useRef<HTMLDivElement>(null);
                    const [open, setOpen] = useState(false);
                    const [active, setActive] = useState<string>(getQuery().perPage || value.toString());
                    const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);

                    useEffect(() => {
                        setActive(value.toString())
                    }, [value])


                    const handleChange = async (e: React.MouseEvent<HTMLSpanElement>) => {
                        e.stopPropagation();
                        setActive(e.currentTarget.textContent || "" )
                        onChange(Number(e.currentTarget.textContent));
                        const isValid = await trigger()

                        if (isValid) {
                            setOpen(false);
                            setShouldSubmit(true)
                        }
                    }

                    const handleAnimationComplete = () => {
                        if (!open && shouldSubmit) {
                            setShouldSubmit(false);
                            customSubmitHandler(getValues())
                        }
                    }

                    useEffect(() => {
                        if (open) {
                            function handleClickOutside(e: MouseEvent) {
                                if (
                                    selectionsRef.current &&
                                    !selectionsRef.current.contains(e.target as Node)
                                ) {setOpen(false)}   
                            }
                    
                            document.addEventListener("click", e => handleClickOutside(e), true);
                            return () => document.removeEventListener("click", e => handleClickOutside(e), true);
                        }
                    }, [open])


                    return (
                        <motion.div onAnimationComplete={handleAnimationComplete} ref={selectionsRef} onClick={() => setOpen(prev => !prev)}  animate={{y: open ? -20 : 0}}
                            className={`${open ? "border-[rgb(var(--input-border-active))]" : ""}` + ` overflow-hidden min-h-8 h-fit left-[105%] absolute flex flex-col border-2  border-transparent items-center justify-center rounded-full py-0 font-semibold align-middle bg-input-primary text-sm w-12 text-input-text text-center shadow-input-page`}>
                                <motion.span className={"flex items-center select-none"} initial={{height: active === "10" ?  32 : 0, opacity: active === "10" ?  1 : 0,}}  animate={{height: open || active === "10" ? "32px" : 0, opacity:  open || active === "10" ? 1 : 0}} onClick={(e:React.MouseEvent<HTMLSpanElement>) => {open && handleChange(e)}}>10</motion.span>
                                <motion.span className={"flex items-center select-none"} initial={{height: active === "25" ?  32 : 0, opacity: active === "25" ?  1 : 0,}}  animate={{height: open || active === "25" ? "32px" : 0, opacity:  open || active === "25" ? 1 : 0}} onClick={(e:React.MouseEvent<HTMLSpanElement>) => {open && handleChange(e)}}>25</motion.span>
                                <motion.span className={"flex items-center select-none"} initial={{height: active === "50" ?  32 : 0, opacity: active === "50" ?  1 : 0,}}  animate={{height: open || active === "50" ? "32px" : 0, opacity:  open || active === "50" ? 1 : 0}} onClick={(e:React.MouseEvent<HTMLSpanElement>) => {open && handleChange(e)}}>50</motion.span>
                        </motion.div>
                    )
                }}
            />
        </div>
    )
}

export default PerPageController
