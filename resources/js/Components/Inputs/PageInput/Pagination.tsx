import { FunctionComponent } from "react";

interface IProps {
    className?: string
    currentPage?: number
    lastPage?: number
    dataLenght?: number
    total?: number
}

const Pagination: FunctionComponent<IProps> = ({ className, currentPage, lastPage, dataLenght, total }) => {
    return (
        <div className={`${className} flex flex-col items-start`}>
            <span>
                Страница {dataLenght ? currentPage : ' '} из{' '}
                {dataLenght ? lastPage : ' '}
            </span>
            <span>Всего записей: {total}</span>
        </div>
    )
}

export default Pagination;