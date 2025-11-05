import { SVG } from "@/Components/utils/SVG";
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useState } from "react";

type Props = ComponentPropsWithoutRef<'input'> & {
    error?: boolean
    placeholder?: string
    icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(({ error, className, id, placeholder = "поиск", value, onBlur, onFocus, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(value && value.toString().trim().length > 0);

    const shouldShowLabel = !hasValue && !isFocused;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <div className={`${className} relative p-1`}>
            <input
                ref={ref}
                id={id}
                placeholder=" "
                value={value || ""}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
                style={{
                    WebkitTextFillColor: "rgba(var(--input-primary-text))",
                    color: "rgba(var(--input-primary-text))",
                    caretColor: "rgba(var(--input-primary-text))"
                } as React.CSSProperties}
                className={`${className} 
                    ${error ? 'ring-2 !ring-error border-transparent' : ''}
                    appearance-none
                    outline-none
                    focus:ring-2 focus:ring-button-violet focus:border-transparent
                    rounded-full w-full shadow-input-search border-black/10
                    bg-input-primary text-input-text
                    py-2 pl-3 pr-10
                `}
            />
            <label
                htmlFor={id}
                className="absolute left-3 top-0 h-full flex items-center pointer-events-none text-input-text
                           transition-all duration-150"
                style={{
                    opacity: shouldShowLabel ? 1 : 0,
                    transform: shouldShowLabel ? 'scale(1)' : 'scale(0.95)'
                }}
            >
                {icon ? icon : <SVG magnifyingGlass className="w-4 h-4 mr-2 flex-shrink-0" />}
                <span className="first-letter:capitalize">{placeholder}</span>
            </label>
        </div>
    )
})