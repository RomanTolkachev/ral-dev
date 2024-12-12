import {FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import {SVG} from "@/Components/utils/SVG";


interface IProps {
    className?: string
    key?: number
    clickHandler: () => void,
    isOpen: boolean
}

export const DropdownFilterButton: FunctionComponent<PropsWithChildren<IProps>> = ({children, clickHandler, className, key,isOpen}) => {

    return (
        <div key={key} onMouseDown={clickHandler}
             className={`${className} ${isOpen ? "bg-filter-dropdown-button-active": "bg-filter-dropdown-button"} transition-all shadow-md font-medium select-none justify-center items-center flex rounded-2xl pl-5 py-3 relative pr-[3.5rem]`}>
            <span>{children}</span>
            <span className={`${isOpen ? "-rotate-180" : "-rotate-90"} transition-all duration-200 w-6 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1`}>
                <SVG className={"text-button-violet "} arrow={true}/>
            </span>
        </div>
    );
};
