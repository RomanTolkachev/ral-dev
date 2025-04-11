import { FunctionComponent } from "react";

interface IProps {
    className?: string
    currentPage?: number
    lastPage?: number
    dataLenght?: number
    total?: number
}

const FoundedResults: FunctionComponent<IProps> = ({ className, currentPage, lastPage, dataLenght, total }) => {
    return (
        <div className={`${className} flex items-center gap-2 `}>
            <span>Найдено результатов:</span>
            <span className="bg-input-nav-bg-active h-8 px-2 text-input-text inline-flex items-center justify-center rounded-full min-w-16 shadow-nav-page">{total}</span>
        </div>
    )
}

export default FoundedResults;