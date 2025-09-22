import { SVG } from "@/Components/utils/SVG";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<'input'> & {
    error?: boolean
}

export const Input: FC<Props> = ({ error, className, id, ...props }) => {
    return (
        <div className={`relative p-1`}>
            <input
                id={id}
                placeholder=" "
                {...props}
                className={`${className}
                    ${error ? 'ring-2 !ring-error border-transparent' : ''}
                    appearance-none placeholder-transparent outline-none
                    focus:ring-2 focus:ring-button-violet focus:border-transparent
                    rounded-full w-full shadow-input-search border-black/10
                    bg-input-primary text-input-text
                    py-2 pl-3
                    peer
                `}
            />
            <label
                htmlFor={id}
                className="absolute left-3 top-0 h-full flex items-center pointer-events-none text-input-text
                           transition-opacity duration-150
                           opacity-0
                           peer-placeholder-shown:opacity-100"
            >
                <SVG magnifyingGlass className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="first-letter:capitalize">поиск</span>
            </label>
        </div>
    )
}
