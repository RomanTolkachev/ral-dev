import { Preloader } from "@/Components/utils/Preloader"
import { AddRoleForm } from "@/features/permissions/ui/AddRoleForm"
import { PropsWithChildren, useRef, useState, forwardRef } from "react"
import styles from "./Column.module.css"

type Props = {
    loading: boolean
    header?: string
    addFn?: () => void
    addPlaceholder?: string
    isEditing?: boolean 
    blocked?: boolean 
}

export const Column = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((
    { children, loading, header = "заголовок", addFn, addPlaceholder, isEditing, blocked = false },
    ref
) => {
    const [addOpen, setAddOpen] = useState(false);
    const addButtonRef = useRef<HTMLButtonElement>(null)

    const handleAddClick = () => {
        if (addFn) {
            addFn();
        } else {
            setAddOpen(prev => !prev);
        }
    };

    return (
        <div ref={ref} className={`${isEditing ? styles.pulse : ""} ${blocked ? "blur-sm" : ""} p-2 flex flex-col min-h-0 bg-background-block my-block relative`}>
        {blocked && <div className="absolute inset-0 z-10 cursor-not-allowed"></div>}
            <h3 className="mb-4 text-center text-xl first-letter:capitalize py-4">{header}</h3>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <ul className="">
                    {loading ?
                        <Preloader className="pt-20" widthStyles="size-8" />
                        : children}
                </ul>
            </div>
            <div className="pt-3">
                <div className={`
                    grid transition-all duration-300 ease-in-out
                    ${addOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}>
                    <AddRoleForm excludeRef={addButtonRef} placeholder="" onClose={() => setAddOpen(false)} hasExternalHandler={false} />
                </div>
                <button ref={addButtonRef} onClick={handleAddClick}>добавить</button>
            </div>
        </div >
    )
})