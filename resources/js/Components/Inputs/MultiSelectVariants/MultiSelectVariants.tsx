import { FC, useState, useRef, useEffect, KeyboardEvent, ReactNode, useContext, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { SVG } from "@/Components/utils/SVG";
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from "@/shared/api/AbstractFormProvider";
import { ISearchingFormItem } from "@/shared/types/searchingFilters";
import highlight from "@/Components/Table/lib/highlightText";

interface IProps {
    className?: string;
    inputData: ISearchingFormItem;
}

export const MultiSelectVariants: FC<IProps> = ({ className, inputData }) => {
    const handlers = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext);
    const {
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        handleSubmit
    } = useFormContext();

    if (!handlers) return null;
    const { customSubmitHandler } = handlers;

    const inputName = inputData.header;
    const options = inputData.sortValues.checkboxValues;
    const error = errors[inputName];
    const [inputText, setInputText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const uniqueOptions = useMemo(() => [...new Set(options)], [options]);

    const handleAdd = useCallback((value: string, currentValues: string[]) => {
        if (!value) return;

        if (currentValues.includes(value)) {
            setError(inputName, { type: 'duplicate', message: 'Это значение уже добавлено' });
            return;
        }

        const newValues = [...currentValues, value];
        setValue(inputName, newValues, { shouldDirty: true });
        setInputText('');
        clearErrors(inputName);
        inputRef.current?.focus();
        handleSubmit(customSubmitHandler)();
    }, [inputName, setValue, clearErrors, setError, handleSubmit, customSubmitHandler]);

    const handleRemove = useCallback((valueToRemove: string, currentValues: string[]) => {
        const newValues = currentValues.filter(val => val !== valueToRemove);
        setValue(inputName, newValues, { shouldDirty: true });
        handleSubmit(customSubmitHandler)();
    }, [inputName, setValue, handleSubmit, customSubmitHandler]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>, currentValues: string[]) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputText.length < 2) {
                setError(inputName, { type: 'minLength', message: 'Введите минимум 2 символа' });
                return;
            }
            handleAdd(inputText, currentValues);
        }
    }, [inputText, inputName, setError, handleAdd]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);
        if (error) clearErrors(inputName);
    }, [error, clearErrors, inputName]);

    const handleOptionSelect = useCallback((option: string, currentValues: string[]) => {
        handleAdd(option, currentValues);
    }, [handleAdd]);

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
        <Controller
            name={inputName}
            control={control}
            defaultValue={[]}
            render={({ field: { value: currentValues = [] } }) => {
                const filteredOptions = uniqueOptions.filter(option =>
                    option.toLowerCase().includes(inputText.toLowerCase()) &&
                    !currentValues.includes(option)
                );

                return (
                    <div ref={dropdownRef} className={className}>
                        <div className="relative h-fit p-1 mb-2">
                            <input
                                ref={inputRef}
                                autoComplete="off"
                                type="text"
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, currentValues)}
                                onFocus={() => setShowDropdown(true)}
                                id={`${inputName}-multi-select`}
                                className={`
                                    ${error && 'ring-2 !ring-error border-transparent '}
                                    ring-transparent
                                    appearance-none placeholder-transparent 
                                    focus:ring-2 focus:ring-button-violet
                                    rounded-full w-full shadow-input-search border-black/10
                                    peer bg-input-primary text-input-text
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
                                <div style={{ scrollbarGutter: "stable" }} className="p-2 ">
                                    <motion.div
                                        initial={{ opacity: 0, height: 0.1 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0.1 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ scrollbarGutter: "stable" }}
                                        className="w-full relative overflow-hidden rounded-md max-h-32 overflow-y-auto px-3 bg-background-block"
                                    >
                                        {showDropdown && <div className="sticky top-0 text-center px-2 pt-2 pb-4 bg-background-block z-[2] text-header-text">варианты:</div>}
                                        {filteredOptions.length > 0 ? (
                                            filteredOptions.map((option) => (
                                                <div
                                                    key={option}
                                                    className="pr-4 py-2 hover:scale-x-105 cursor-pointer transition-all text-header-text line-clamp-1 "
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handleOptionSelect(option, currentValues)}
                                                >
                                                    {/* Применяем highlight здесь */}
                                                    {highlight(option, inputText)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-500">
                                                {inputText.length > 0 ? "Совпадений не найдено" : "Начните вводить текст"}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {showDropdown && <div className="sticky top-0 text-center p-2 bg-background-block z-[2] text-header-text">выбрано:</div>}

                        {currentValues.length > 0 && (
                            <div style={{backgroundImage: 'var(--input-list-border)'}} className="relative rounded-2xl p-[1px] bg-[linear-gradient(to_bottom,#748ebb_0%,transparent_100%)]">
                                <div style={{ backgroundImage: 'var(--input-list-bg)' }} className=" rounded-2xl p-2 shadow-inner">
                                    <div
                                        style={{ scrollbarGutter: "stable" }}
                                        className="relative max-h-32 thumb-secondary overflow-y-auto px-3"
                                    >
                                        {currentValues.map((item: string) => (
                                            <div
                                                key={item}
                                                className="flex items-center border-b last:border-b-0 border-checkbox-custom-border group relative pr-6 min-w-0 text-header-text"
                                            >
                                                <span title={item} className="truncate pr-2 py-2 ">
                                                    {item}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemove(item, currentValues);
                                                    }}
                                                    className="absolute right-0 hover:text-red-500 ml-2"
                                                    type="button"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-sm mt-1">
                                {error.message as ReactNode}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};