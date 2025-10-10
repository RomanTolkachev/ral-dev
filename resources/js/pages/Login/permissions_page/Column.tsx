import { Preloader } from "@/Components/utils/Preloader"
import { FC, PropsWithChildren } from "react"

type Props = {
    loading: boolean
    header?: string
    addFn?: () => void
}

export const Column: FC<PropsWithChildren<Props>> = ({children, loading, header = "заголовок", addFn}) => {
    return (
        <div className="bg-slate-800 p-2 flex flex-col min-h-0">
            <h3 className="mb-4 text-center">{header}</h3>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <ul className="">
                    {loading ? <Preloader className="pt-20" widthStyles="size-8" /> : children }
                </ul>
            </div>
            <div className="pt-3">
                <button onClick={addFn}>добавить</button>
            </div>
        </div>
    )
}