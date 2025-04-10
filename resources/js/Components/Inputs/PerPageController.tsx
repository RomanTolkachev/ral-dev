import { enterExitAnimation } from "@/shared/framer-motion/enter-exit-animation";
import { AnimatePresence, motion } from "motion/react";
import { input } from "motion/react-client";
import { FunctionComponent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form"

interface IProps {
    className?: string
}

const Selections:FunctionComponent<{changeHandler: (e:React.MouseEvent<HTMLSpanElement>) => void, close: () => void}> = ({changeHandler, close}) => {
    const selectionsRef = useRef<HTMLSpanElement>(null);
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {
                if (
                    selectionsRef.current &&
                    !selectionsRef.current.contains(e.target as Node)
                ) { 
                    close();
                }
            }
    
            document.addEventListener("click", handleClickOutside, true);
            return () => {
                document.removeEventListener("click", handleClickOutside, true);
            };
        }, [close]);

    return (
        <motion.span {...enterExitAnimation} ref={selectionsRef} className="flex flex-col absolute bottom-full left-full bg-red-200">
            <span onClick={e => changeHandler(e)}>10</span>
            <span onClick={e => changeHandler(e)}>25</span>
            <span onClick={e => changeHandler(e)}>50</span>
        </motion.span>
    );
}

const PerPageController:FunctionComponent<IProps> = () => {
    const { control, } = useFormContext();
    return (
        <div className="flex gap-3 items-center ">
            <span>Показывать на странице</span>
            <Controller
                control={control}
                name="perPage"
                render={({ field: { value, onChange } }) => {
                    const [open, setOpen] = useState(false);
                    const handleChange = (e:React.MouseEvent<HTMLSpanElement> ) => {
                        e.stopPropagation();
                        onChange(Number(e.currentTarget.textContent));
                        setOpen(false)
                    } 
                    return (
                        <div onClick={() => setOpen(prev => !prev)}  
                            className={`${open ? "border-[rgb(var(--input-border-active))] " : ""}` + `border-2 relative flex border-transparent items-center justify-center rounded-full py-0 font-semibold align-middle bg-input-primary text-sm w-20 text-input-text text-center h-8 shadow-input-page`}>
                            <span >{value}</span>
                            <AnimatePresence>
                                {open && <Selections close={() => setOpen(false)} changeHandler={e => handleChange(e)} />}
                            </AnimatePresence>
                        </div>


                        // <select className="rounded-full py-0 focus:ring-2 font-semibold focus:ring-input-border-active align-middle border-transparent bg-input-primary text-sm w-20 text-input-text text-center h-8 shadow-input-page">
                        //     <option value="10">10</option>
                        //     <option value="25">25</option>
                        //     <option value="50">50</option>
                        // </select>
                    )
                }}
            />
        </div>
    )
}

export default PerPageController
