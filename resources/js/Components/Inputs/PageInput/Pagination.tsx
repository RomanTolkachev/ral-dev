import { FunctionComponent } from "react";

interface IProps {
    className?: string
    currentPage?: number
    lastPage?: number
    dataLenght?: number
}

const Pagination: FunctionComponent<IProps> = ({ className, currentPage, lastPage, dataLenght }) => {
    return (
        <div className={`${className} flex items-center`}>
            <span>
                Страница {dataLenght ? currentPage : ' '} из{' '}
                {dataLenght ? lastPage : ' '}
            </span>
        </div>
    )
}

export default Pagination;