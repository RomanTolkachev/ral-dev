import { Input } from "@/Components/Inputs/Input"
import { Preloader } from "@/Components/utils/Preloader"
import { MainButton } from "@/shared/ui/Buttons/MainButton"
import { FC, PropsWithChildren, useState } from "react"

type Props = {
    loading: boolean
    header?: string
    addFn?: () => void
    addPlaceholder?: string
}

export const Column: FC<PropsWithChildren<Props>> = ({ children, loading, header = "заголовок", addFn, addPlaceholder }) => {
    const [addOpen, setAddOpen] = useState(false);

    const handleAddClick = () => {
        if (addFn) {
            addFn();
        } else {
            setAddOpen(prev => !prev);
        }
    };

    return (
        <div className="bg-slate-800 p-2 flex flex-col min-h-0">
            <h3 className="mb-4 text-center">{header}</h3>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <ul className="">
                    {loading ? <Preloader className="pt-20" widthStyles="size-8" /> : children}
                </ul>
            </div>
            <div className="pt-3">
                <div className={`
                    grid transition-all duration-300 ease-in-out
                    ${addOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}>
                    <div className="min-h-0 overflow-hidden">
                        <form className="flex gap-3 pb-2">
                            <Input placeholder={addPlaceholder} />
                            <MainButton color="violet">сохранить</MainButton>
                        </form>
                    </div>
                </div>
                <button onClick={handleAddClick}>добавить</button>
            </div>
        </div >
    )
}