import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { isEqual } from 'lodash'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { useRalFilters } from '../../api/useRalFilters'
import { useSelectorTyped } from '@/features/store/typedUseSelector'


interface IProps {
    className?: string
}

type IForm = Record<string, any>

const RalSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const userFilters = useSelectorTyped(state => state.userState.settings)
    const { data: filters, isPending } = useRalFilters(userFilters);
    const { handleSubmit, reset, control, setValue: setFormValue, formState} = useFormContext();
    const [prevQueries, setPrevQueries] = useState({});
    const [setQuery, getQuery] = useParamsCustom();

    // после получения фильтров записываем их для последующего сравнения
    useEffect(() => {
        setPrevQueries(control._defaultValues)
        return () => {setPrevQueries(getQuery())}
    }, [control._defaultValues]);

    // изменяем prevForm для сравнения после каждой отправки
    useEffect(() => {
        setPrevQueries(getQuery())
    }, [formState.submitCount, JSON.stringify(getQuery())])


    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(getQuery())]);

    /**
     * Обработчик формы с проверкой сброса страницы на первую, если параметры поиска изменились
     * @param currentForm Текущее состояние формы
     * @param submittedForm Предыдущая отправленная форма (берется из query)
     * @returns 
     */
    const submitHandler = (currentForm: IForm, submittedForm: IForm) => {
        /*форма не изменилась*/
        if (isEqual(submittedForm, currentForm)) {
            return;
        }
        /*форма не изменилась, страница изменилась*/
        if (submittedForm.page !== currentForm.page) {
            setFormValue('page', currentForm.page);
            setQuery({ ...currentForm, page: currentForm.page }, shouldReplace); // второй параметр true делает replace истории
        }
        /*форма изменилась, сброс страницы*/
        else {
            setFormValue('page', 1);
            setQuery({ ...currentForm, page: 1 }, shouldReplace); // второй параметр true делает replace истории
            setPrevQueries({ ...currentForm, page: 1 });
        }
    }

    return (
        <form
            onSubmit={handleSubmit((data) => submitHandler(data, prevQueries))}
            className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 pt-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    filters?.map((filterItem, key) => {
                        return <DropdownItem inputData={filterItem} key={`ddi-${key}`} />
                    })
                )}
            </div>
            <div className={`sticky w-fit bottom-0 bg-background-block flex flex-col py-6 space-y-4 gap-2 mx-auto`}>
                <MainButton isDisabled={!formState.isValid} color={'violet'} className={`w-full ${formState.isValid ? "" : "bg-gray-400"} mx-auto`}>
                    Применить
                </MainButton>
                <MainButton className={`w-full`} onClick={()=>reset()} color={'white'} type='reset'>Сбросить фильтры</MainButton>
            </div >
        </form >
    );
}

export default RalSearchingForm;