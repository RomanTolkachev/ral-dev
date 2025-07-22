import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from "@/shared/api/AbstractFormProvider";
import { ISearchingFormItem } from "@/shared/types/searchingFilters";
import { FC, useContext, useState, KeyboardEvent, useRef, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { enterExitAnimation as animationParams } from "@/shared/framer-motion/enter-exit-animation";
import { SVG } from "@/Components/utils/SVG";

interface IProps {
    className?: string;
    inputData: ISearchingFormItem;
}

export const MultiSelect: FC<IProps> = ({ className, inputData }) => {
    const handlers = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext);
    const { 
        control, 
        watch, 
        setValue, 
        setError, 
        clearErrors, 
        formState: { errors }, 
        handleSubmit 
    } = useFormContext();
    
    const inputName = inputData.header;
    const error = errors[inputName];
    const [inputText, setInputText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const formValues = watch();

    if (!handlers) return null;
    const { customSubmitHandler } = handlers;

    const isValidInput = inputText.length >= 2;
    const currentValues = formValues[inputName] || [];

    const handleAdd = async (value: string) => {
        if (!value) return;

        if (currentValues.includes(value)) {
            setError(inputName, { type: 'duplicate', message: 'Такое уже есть' });
            return;
        }

        const newValues = [...currentValues, value];
        setValue(inputName, newValues, { shouldDirty: true });
        setInputText('');
        clearErrors(inputName);
        inputRef.current?.focus();

        // Используем handleSubmit для правильного времени выполнения
        handleSubmit(customSubmitHandler)();
    };

    const handleRemove = async (valueToRemove: string) => {
        const newValues = currentValues.filter((val: string) => val !== valueToRemove);
        setValue(inputName, newValues, { shouldDirty: true });
        
        // Используем handleSubmit для правильного времени выполнения
        handleSubmit(customSubmitHandler)();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!isValidInput) {
                setError(inputName, { type: 'minLength', message: 'Минимум 2 символа' });
                return;
            }
            handleAdd(inputText);
        }
    };

    const handleSubmitClick = () => {
        if (!isValidInput) {
            setError(inputName, { type: 'minLength', message: 'Минимум 2 символа' });
            return;
        }
        handleAdd(inputText);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        if (error) clearErrors(inputName);
    };

    return (
        <div className={`${className} flex flex-col`}>
            {/* Поле ввода с кнопкой подтверждения */}
            <div className="p-1 relative">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        id={`${inputName}-multi-select`}
                        className={`
                            ${error && 'ring-2 !ring-error border-transparent'}
                            ring-transparent
                            appearance-none placeholder-transparent
                            focus:ring-2 focus:ring-button-violet
                            rounded-full w-full shadow-input-search border-black/10
                            peer bg-input-primary text-input-text
                            autofill:bg-red-200 focus:autofill:bg-red-200
                            pr-10`}
                    />
                    <label
                        htmlFor={`${inputName}-multi-select`}
                        className={`
                            flex justify-center items-center w-full
                            cursor-text select-none transition-all -z-[1]
                            absolute top-0 translate-y-1/2 left-0
                            peer-focus:-z-[1] peer-placeholder-shown:z-[1] text-input-text`}>
                        <SVG magnifyingGlass className={'absolute translate-x-full left-0 w-4 h-4'} />
                        <span className={'first-letter:capitalize'}>поиск</span>
                    </label>

                    {/* Кнопка подтверждения */}
                    <button
                        type="button"
                        onClick={handleSubmitClick}
                        disabled={!isValidInput}
                        className={`
                            absolute right-2 top-1/2 transform -translate-y-1/2
                            w-6 h-6 flex items-center justify-center
                            rounded-full
                            ${isValidInput ?
                                'bg-button-violet text-white cursor-pointer' :
                                'bg-gray-500 text-gray-200 cursor-not-allowed'}
                            transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-violet`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Список выбранных значений */}
            <div className="pl-3 pr-3 max-h-32 overflow-y-auto thumb-secondary mt-2">
                <Controller
                    name={inputName}
                    control={control}
                    render={({ field: { value = [] } }) => (
                        <div className="space-y-1">
                            {value.map((item: string, index: number) => (
                                <div
                                    key={`selected-${index}`}
                                    className="flex items-center border-b last:border-b-0 border-checkbox-custom-border group relative pr-6 min-w-0"
                                >
                                    <span title={item} className="truncate pr-2 py-2 text-gray-light-gray">
                                        {item}
                                    </span>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="absolute right-0 text-gray-light-gray hover:text-red-500 ml-2"
                                        type="button"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                />
            </div>

            {/* Сообщение об ошибке */}
            <AnimatePresence>
                {(error && error.message) && (
                    <motion.div
                        {...animationParams}
                        className='text-error text-center mt-2'>
                        {error.message as ReactNode}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};