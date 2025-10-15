import { ChevronIcon } from "@/shared/ui/Icons";
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useState, useRef, useEffect, useCallback } from "react";

type SelectProps = ComponentPropsWithoutRef<'select'> & {
    error?: boolean;
    placeholder?: string;
    icon?: ReactNode;
    options: { value: string; label: string }[];
    defaultValue?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    error,
    className,
    id,
    placeholder = "Выберите вариант",
    value,
    onChange,
    onBlur,
    onFocus,
    icon,
    options,
    defaultValue = "",
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");

    const selectRef = useRef<HTMLSelectElement>(null);

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = useCallback((optionValue: string) => {
        setSelectedValue(optionValue);
        setIsOpen(false);

        if (selectRef.current) {
            selectRef.current.value = optionValue;
            const event = new Event('change', { bubbles: true });
            selectRef.current.dispatchEvent(event);
        }

        if (onChange) {
            const event = {
                target: { value: optionValue },
                currentTarget: { value: optionValue },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(event);
        }
    }, [onChange]);

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setSelectedValue(value || defaultValue || "");
    }, [value, defaultValue]);

    return (
        <div
            className={`${className} relative py-1`}
            onBlur={handleBlur}
            tabIndex={0}
        >
            <select
                ref={(node) => {
                    (selectRef as React.MutableRefObject<HTMLSelectElement | null>).current = node;

                    // Пробрасываем ref наружу
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
                    }
                }}
                id={id}
                value={selectedValue}
                onChange={onChange}
                {...props}
                style={{ display: 'none' }}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={handleToggle}
                className={` 
                    ${error ? 'ring-2 !ring-error border-transparent' : ''}
                    appearance-none
                    outline-none
                    focus:ring-2 focus:ring-button-violet focus:border-transparent
                    rounded-full w-full shadow-input-search border-black/10
                    bg-input-primary text-input-text
                    py-2 px-3
                    cursor-pointer
                    text-left
                `}
                style={{
                    WebkitTextFillColor: "rgba(var(--input-primary-text))",
                    color: "rgba(var(--input-primary-text))",
                } as React.CSSProperties}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {icon && <span className="mr-2">{icon}</span>}
                        <span className={!selectedOption ? 'text-gray-400' : ''}>
                            {displayText}
                        </span>
                    </div>
                    <ChevronIcon
                        direction={isOpen ? "up" : "down"}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background-block border border-checkbox-custom-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOptionClick(option.value)}
                            className={`w-full px-4 py-2 text-left hover:bg-filter-dropdown-button-active first:rounded-t-lg last:rounded-b-lg ${option.value === selectedValue ? 'bg-filter-dropdown-button-active' : ''
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});