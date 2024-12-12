import {FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import {SVG} from "@/Components/utils/SVG";


interface IProps {
    className?: string
    key?: number
    isOpen: boolean
}

export const DropdownFilterButton: FunctionComponent<PropsWithChildren<IProps>> = ({children, className, key,isOpen}) => {

    return (
        <div key={key}
             className={"select-none bg-filter-dropdown-button justify-center items-center flex rounded-2xl pl-5 py-3 relative pr-[3.5rem]"}>
            <span>{children}</span>
            <span className={`${isOpen ? "rotate-0" : "rotate-180"} transition-all duration-200 w-6 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1`}>
                <SVG className={"text-button-violet "} arrow={true}/>
            </span>
        </div>
    );
};
