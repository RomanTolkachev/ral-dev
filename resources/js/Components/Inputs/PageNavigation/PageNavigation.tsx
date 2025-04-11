import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'
import { FunctionComponent, useContext } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import PageNavButton from '@/Components/Buttons/PageNaVButton'
import { SVG } from '@/Components/utils/SVG'


interface IProps {
    className?: string
    formName?: string
    currentPage?: number
    lastPage?: number
    total?: number
    isPending?: boolean
}

export const PageNavigation: FunctionComponent<IProps> = ({ className, formName = 'page', lastPage = 1, currentPage, isPending = false, total }) => {
    const { control, trigger, getValues, setValue } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext)

    const handlePageChange = async (newPage: number) => {
        setValue(formName, newPage);
        const isValid = await trigger()
        isValid && customSubmitHandler(getValues())
    }

    return (
        <Controller
            name={formName}
            control={control}
            rules={{
                required: 'поле не может быть пустым',
                min: { value: 1, message: "значение не может быть меньше 1" },
                max: { value: lastPage, message: "такая страница отсутстует" }
            }}
            render={({ field: { onChange: updateForm, value = 1 }, fieldState: { error } }) => (
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
                        <input 
                            min={1}
                            max={lastPage}
                            value={value}
                            onChange={async (e) => {
                                updateForm(e.target.valueAsNumber)
                                const isValid = await trigger();
                                isValid && customSubmitHandler(getValues())
                            }}
                            className={
                                `${error && 'ring-2 !ring-error border-transparent '}` +
                                ` ${className} bg-input-primary w-20 text-input-text text-sm text-center h-8 shadow-input-page border-black/10 rounded-full focus:border-transparent ` +
                                'focus:ring-2 focus:ring-input-border-active'
                            }
                            type="number"
                        />
                        {error && (
                            <div className={'text-error'}>
                                {error.message}
                            </div>
                        )}
                        <span className='flex gap-2'> 
                            <span>из</span>
                            <span className='text-end min-w-6'>{lastPage}</span>
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
