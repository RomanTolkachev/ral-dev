import { FC, useState, useRef, useEffect, KeyboardEvent, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { SVG } from "@/Components/utils/SVG";

interface IProps {
    className?: string;
    inputData: { header: string };
    options?: string[];
}

export const MultiSelectVariants: FC<IProps> = ({
    className,
    inputData,
    options = ["004/2012", "003", "0020", "0037", "0018", "007", "008", "034", "017"]
}) => {
    const {
        control,
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { errors }
    } = useFormContext();

    const inputName = inputData.header;
    const error = errors[inputName];
    const [inputText, setInputText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const formValues = watch();

    const currentValues = formValues[inputName] || [];
    const isValidInput = inputText.length >= 2;

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputText.toLowerCase()) &&
        !currentValues.includes(option)
    );

    const handleAdd = (value: string) => {
        if (!value) return;

        if (currentValues.includes(value)) {
            setError(inputName, { type: 'duplicate', message: 'Это значение уже добавлено' });
            return;
        }

        const newValues = [...currentValues, value];
        setValue(inputName, newValues, { shouldDirty: true });
        setInputText('');
        clearErrors(inputName);
        // setShowDropdown(false);
        inputRef.current?.focus();
    };

    const handleRemove = (valueToRemove: string) => {
        const newValues = currentValues.filter((val: string) => val !== valueToRemove);
        setValue(inputName, newValues, { shouldDirty: true });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!isValidInput) {
                setError(inputName, { type: 'minLength', message: 'Введите минимум 2 символа' });
                return;
            }
            handleAdd(inputText);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);
        if (error) clearErrors(inputName);
        // setShowDropdown(true);
    };

    const handleOptionSelect = (option: string) => {
        handleAdd(option);
        // setShowDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef}>
            <div className="relative h-fit p-1">
                <input
                    ref={inputRef}
                    autoComplete="off"
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    // onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    id={`${inputName}-multi-select`}
                    className={`
                        ${error && 'ring-2 !ring-error border-transparent'}
                        ring-transparent
                        appearance-none placeholder-transparent
                        focus:ring-2 focus:ring-button-violet
                        rounded-full w-full shadow-input-search border-black/10
                        peer bg-input-primary text-input-text
                        autofill:bg-red-200 focus:autofill:bg-red-200
                        pr-10 py-2 pl-10
                    `}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SVG magnifyingGlass className="w-4 h-4 text-input-text" />
                </div>
                <label
                    htmlFor={`${inputName}-multi-select`}
                    className={`
                        flex items-center w-full
                        cursor-text select-none transition-all -z-[1]
                        absolute top-1/2 left-10 transform -translate-y-1/2
                        peer-focus:opacity-0 peer-focus:scale-75 peer-focus:-translate-y-6
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                        ${inputText ? 'opacity-0 scale-75 -translate-y-6' : ''}
                        text-input-text
                    `}
                >
                    <span className="first-letter:capitalize">поиск</span>
                </label>
            </div>

            <AnimatePresence>
                {showDropdown && (

                    <motion.div
                        initial={{ opacity: 0, height: 0.1 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0.1 }}
                        transition={{ duration: 0.2, }}
                        className="w-full relative rounded-md max-h-32 overflow-y-auto px-3"
                    >
                        <div className="sticky top-0 bg-background-block text-center p-2 text-header-text">варианты</div>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className="pr-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors text-gray-light-gray"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">
                                {inputText.length > 0 ? "Совпадений не найдено" : "Начните вводить текст"}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {currentValues.length > 0 && (
                <div className="relative pl-3 pr-3 max-h-32 overflow-y-auto thumb-secondary mt-2">
                    <div className="sticky top-0 text-center p-2 bg-background-block z-[2] text-header-text">выбрано:</div>
                    {currentValues.map((item: string) => (
                        <div
                            key={item}
                            className="flex items-center border-b last:border-b-0 border-checkbox-custom-border group relative pr-6 min-w-0"
                        >
                            <span title={item} className="truncate pr-2 py-2 text-gray-light-gray">
                                {item}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item);
                                }}
                                className="absolute right-0 text-gray-light-gray hover:text-red-500 ml-2"
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-red-500 text-sm mt-1">
                    {error.message as ReactNode}
                </div>
            )}
        </div>
    );
};