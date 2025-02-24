import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'
import { FunctionComponent, useContext } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Pagination from './Pagination'
import PageNavButton from '@/Components/Buttons/PageNaVButton'
import { SVG } from '@/Components/utils/SVG'


interface IProps {
    className?: string
    formName?: string
    currentPage?: number
    lastPage?: number
    dataLenght?: number
    total?: number
    isPending?: boolean
}

export const PageInput: FunctionComponent<IProps> = ({ className, dataLenght, formName = 'page', lastPage = 1, currentPage, isPending = false }) => {
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
                <>
                    <Pagination
                        className='w-52 min-w-fit'
                        dataLenght={dataLenght}
                        currentPage={currentPage}
                        lastPage={lastPage}>
                    </Pagination>
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
                            updateForm(e.target.value)
                            const isValid = await trigger();
                            isValid && customSubmitHandler(getValues())
                        }}
                        className={
                            `${error && 'ring-2 !ring-error border-transparent '}` +
                            ` ${className} bg-input-primary w-20 text-input-text shadow-input-page border-black/10 rounded-md focus:border-transparent ` +
                            'focus:ring-2 focus:ring-input-border-active'
                        }

                        type="number"
                    />
                    {error && (
                        <div className={'text-error'}>
                            {error.message}
                        </div>
                    )}
                    <PageNavButton
                        isDisabled={isPending || currentPage === lastPage}
                        clickHandler={() => handlePageChange((currentPage || 1) + 1)}>
                        <SVG
                            className={`rotate-180 ${currentPage === lastPage ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navArrow />
                    </PageNavButton>
                    <PageNavButton
                        isDisabled={isPending ||currentPage === lastPage}
                        clickHandler={() => handlePageChange(lastPage)}>
                        <SVG
                            className={`rotate-180 ${currentPage === lastPage ? "text-[rgb(var(--page-nav-icon-inactive))]" : "text-[rgb(var(--page-nav-icon-active))]"}`}
                            navDoubleArrow />
                    </PageNavButton>
                </>
            )
            }
        />
    )
}
