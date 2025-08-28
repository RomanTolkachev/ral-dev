import { FunctionComponent, useContext, useRef, useCallback, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { SVG } from '@/Components/utils/SVG'
import { CustomSubmitHandlerContext } from '@/shared/ui/Table/providers/CustomFormProvider'
import PageNavButton from '@/shared/ui/Buttons/PageNaVButton'

interface IProps {
    className?: string
    formName?: string
    currentPage?: number
    lastPage?: number
    total?: number
    isPending?: boolean
}

export const PageNavigation: FunctionComponent<IProps> = ({
    className,
    formName = 'page',
    lastPage = 1,
    currentPage,
    isPending = false,
}) => {
    const { control, trigger, getValues, setValue } = useFormContext()
    const handlers = useContext(CustomSubmitHandlerContext)
    const debounceTimeoutRef = useRef<null | number>()

    if (!handlers) return null
    const { customSubmitHandler } = handlers

    const debouncedSubmit = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
        debounceTimeoutRef.current = setTimeout(() => {
            customSubmitHandler(getValues())
        }, 500)
    }, [customSubmitHandler, getValues])

    const handlePageChange = async (newPage: number) => {
        setValue('page', newPage, { shouldDirty: true });
        customSubmitHandler({ ...getValues(), page: newPage });
    }

    // Функция для валидации числа
    const validateNumber = (value: string): number | null => {
        // Удаляем все нечисловые символы, кроме минуса в начале
        const numericValue = value.replace(/[^0-9]/g, '');
        return numericValue ? parseInt(numericValue, 10) : null;
    }

    // Обработчик изменения input
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, updateForm: (value: any) => void) => {
        const rawValue = e.target.value;
        
        // Если поле пустое, позволяем очистку
        if (rawValue === '') {
            updateForm('');
            return;
        }

        // Валидируем и преобразуем в число
        const numericValue = validateNumber(rawValue);
        
        if (numericValue !== null) {
            updateForm(numericValue);
            
            // Проверяем валидность и отправляем если валидно
            const isValid = await trigger();
            if (isValid) {
                debouncedSubmit();
            }
        }
    }

    // Обработчик потери фокуса - гарантируем валидное значение
    const handleBlur = (value: any, updateForm: (value: any) => void) => {
        if (value === '' || value === null || value === undefined) {
            updateForm(1); // Устанавливаем минимальное значение по умолчанию
            debouncedSubmit();
        } else if (value > lastPage) {
            updateForm(lastPage); // Ограничиваем максимумом
            debouncedSubmit();
        } else if (value < 1) {
            updateForm(1); // Ограничиваем минимумом
            debouncedSubmit();
        }
    }

    useEffect(() => {
        return () => {
            debounceTimeoutRef.current && clearTimeout(debounceTimeoutRef.current)
        }
    }, [])

    return (
        <Controller
            name={formName}
            control={control}
            rules={{
                required: 'поле не может быть пустым',
                min: { value: 1, message: "значение не может быть меньше 1" },
                max: { value: lastPage, message: "такая страница отсутствует" },
                validate: {
                    isNumber: (value) => !isNaN(value) || 'должно быть числом'
                }
            }}
            render={({ field: { onChange: updateForm, value = 1, onBlur }, fieldState: { error } }) => (
                <div className='flex items-center gap-2'>
                    <span>Страница</span>
                    <PageNavButton
                        isDisabled={isPending || currentPage === 1}
                        clickHandler={() => handlePageChange(1)}>
                        <SVG
                            className={` ${currentPage === 1 ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navDoubleArrow />
                    </PageNavButton>
                    <PageNavButton
                        isDisabled={isPending || currentPage === 1}
                        clickHandler={() => handlePageChange((currentPage || 1) - 1)}>
                        <SVG
                            className={` ${currentPage === 1 ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navArrow />
                    </PageNavButton>
                    
                    <div className="relative">
                        <input
                            value={value}
                            onChange={(e) => handleInputChange(e, updateForm)}
                            onBlur={() => handleBlur(value, updateForm)}
                            disabled={isPending}
                            className={
                                `${error && 'ring-2 !ring-error border-transparent '}` +
                                ` ${className} bg-input-primary w-20 text-input-text text-sm text-center h-8 shadow-input-page border-black/10 rounded-full focus:border-transparent ` +
                                'focus:ring-2 focus:ring-input-border-active'
                            }
                            type="text" // Меняем на text для лучшего контроля
                            inputMode="numeric" // Мобильная числовая клавиатура
                            pattern="[0-9]*" // Паттерн для числового ввода
                        />
                        
                        {/* Маска для disabled состояния */}
                        {isPending && (
                            <div className="absolute inset-0 bg-background-block/50 rounded-full cursor-not-allowed z-10" />
                        )}
                    </div>
                    
                    {error && (
                        <div className={'text-error'}>
                            {error.message}
                        </div>
                    )}
                    <span className='flex gap-2'>
                        <span>из</span>
                        <span className='text-end min-w-[51px]'>{isPending ? "?" : lastPage}</span>
                    </span>
                    <PageNavButton
                        isDisabled={isPending || currentPage === lastPage}
                        clickHandler={() => handlePageChange((currentPage || 1) + 1)}>
                        <SVG
                            className={`rotate-180 ${currentPage === lastPage ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navArrow />
                    </PageNavButton>
                    <PageNavButton
                        isDisabled={isPending || currentPage === lastPage}
                        clickHandler={() => handlePageChange(lastPage)}>
                        <SVG
                            className={`rotate-180 ${currentPage === lastPage ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navDoubleArrow />
                    </PageNavButton>
                </div>
            )}
        />
    )
}