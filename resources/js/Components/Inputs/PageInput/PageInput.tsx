import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'
import IPagination from '@/shared/types/pagination'
import { IRalItem } from '@/shared/types/ral'
import { FunctionComponent, useContext } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Pagination from './Pagination'
import PageNavButton from '@/Components/Buttons/PageNaVButton'


interface IProps {
    className?: string
    formName?: string
    currentPage?: number
    lastPage?: number
    dataLenght?: number
    total?: number
}

export const PageInput: FunctionComponent<IProps> = ({ className, dataLenght, formName = 'page', lastPage = 1, currentPage, total }) => {
    const { control, trigger, getValues, setValue } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext)

    const handlePageChange = async (newPage: number) => {
        console.log(
            "новая страница", newPage,
        )
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
                        className='w-32 min-w-fit'
                        dataLenght={dataLenght}
                        currentPage={currentPage}
                        lastPage={lastPage}>
                    </Pagination>
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
                            ` ${className} w-20 bg-background-block rounded-md focus:border-transparent ` +
                            'focus:ring-2 focus:ring-input-border-active'
                        }

                        type="number"
                    />
                    {error && (
                        <div className={'text-error'}>
                            {error.message}
                        </div>
                    )}
                    <PageNavButton isDisabled={currentPage === 1} clickHandler={() => handlePageChange((currentPage || 1) - 1)}>назад</PageNavButton>
                    <PageNavButton isDisabled={currentPage === lastPage} clickHandler={() => handlePageChange((currentPage || 1) + 1)}>вперед</PageNavButton>
                    <PageNavButton isDisabled={currentPage === 1} clickHandler={() => handlePageChange(1)}>в начало</PageNavButton>
                    <PageNavButton isDisabled={currentPage === lastPage} clickHandler={() => handlePageChange(lastPage)}> в конец</PageNavButton>
                </>
            )
            }
        />
    )
}
