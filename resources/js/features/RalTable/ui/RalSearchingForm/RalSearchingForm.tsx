import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
<<<<<<< HEAD

=======
import { DropdownItem } from '@/Components/DropdownItem'
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import excludePaginationQueries from '@/shared/excludePaginationQueries'
import { isEqual } from 'lodash'
import useParamsCustom from '@/services/hooks/useParamsCustom.ts'
import DEFAULT_REQUEST from '../../config'
<<<<<<< HEAD
import { DropdownItem } from '@/Components/DropdownItem'
=======
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

DEFAULT_REQUEST

interface IProps {
    className?: string
}

type IForm = Record<string, any>

export const TableSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const { data: filters, isPending } = useRalFilters();
    const { handleSubmit, reset, control, setValue: setFormValue } = useFormContext();
    const [prevQueries, setPrevQueries] = useState({});
    const [setQuery, getQuery] = useParamsCustom();

    // после получения фильтров записываем их для последующего сравнения
    useEffect(() => {
        setPrevQueries(control._defaultValues)
    }, [control._defaultValues]);


    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
<<<<<<< HEAD
        return Object.keys(getQuery()).length ? true : false
=======
        return Object.keys(getQuery()).length ? true: false
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
    }, [JSON.stringify(getQuery())]);

    // Тут проверяем должна ли сброситься страничка, затем обновляем query
    const submitHandler = (currentForm: IForm, submittedForm: IForm) => {
        if (isEqual(submittedForm, currentForm)) {
            return;
        }
        if (isEqual(excludePaginationQueries(submittedForm), excludePaginationQueries(currentForm))) {
            setQuery({ ...currentForm, page: currentForm.page }, shouldReplace); // второй параметр true делает replace истории
        } else {
            setFormValue('page', 1);
            setQuery({ ...currentForm, page: 1 }, shouldReplace); // второй параметр true делает replace истории
            setPrevQueries({ ...currentForm, page: 1 });
        }
    }

    return (
        <form
            onSubmit={handleSubmit((data) => submitHandler(data, prevQueries))}
            className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    filters?.map((filterItem, key) => {
                        return <DropdownItem inputData={filterItem} key={key} />
                    })
                )}
            </div>
            <div className={'sticky bottom-0 bg-background-block flex flex-col py-6 space-y-4 gap-2'}>
                <MainButton color={'violet'} className={'mx-auto'}>
                    Применить
                </MainButton>
<<<<<<< HEAD
                <button type='reset' onClick={() => reset()}>сбросить</button>
=======
                <button onClick={() =>reset()}>сбросить</button>
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
            </div>
        </form>
    );
}
