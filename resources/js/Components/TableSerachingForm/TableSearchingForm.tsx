import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {Preloader} from "@/Components/utils/Preloader";
import {DropdownItem} from "@/Components/DropdownItem";
import {MainButton} from "@/Components/Buttons/MainButton";
import {useForm} from "react-hook-form";
import {useDispatchTyped as useDispatch, useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";
import {requestRal} from "@/services/slices/ral-slice";
import {updatePage} from "@/services/slices/filters-slice";

interface IProps {
    className?: string
}

export const TableSearchingForm: FunctionComponent<IProps> = ({className}) => {

    console.log("рендер формы")

    const menuItems = useSelector(state => state.filtersReducer.filters);
    const statePagination = useSelector(state => state.filtersReducer.paginationQueries);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
    } = useForm()

    const form = watch();
    const submitHandler = useCallback((data: any) => {
        const queriesAndPagination = Object.assign({}, data, statePagination);
        console.log(queriesAndPagination);
        // @ts-ignore
        dispatch(requestRal(queriesAndPagination))
    }, [form, statePagination, dispatch])


    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${className} flex-col overflow-hidden flex`}>
            <div className={"px-6 w-full grow shrink overflow-y-auto space-y-4"}>
                {!menuItems.length ? <Preloader widthStyles={"w-16"}/> : (
                    menuItems.map((filterItem, key) => {
                        return (<DropdownItem control={control} register={register} name={filterItem.header} className={''}// @ts-ignore
                                              inputData={filterItem} key={key}/>
                        )
                    })
                )}
            </div>
            <div className={"sticky bottom-0 flex flex-col bg-background py-6 space-y-4 gap-2"}>
                <MainButton color={"violet"} className={"mx-auto"}>Применить</MainButton>
                <button>сбросить</button>
            </div>
        </form>
    );
};
