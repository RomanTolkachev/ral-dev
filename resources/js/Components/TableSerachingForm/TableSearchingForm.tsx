import React, {FunctionComponent} from 'react';
import {Preloader} from "@/Components/utils/Preloader";
import {DropdownItem} from "@/Components/DropdownItem";
import {MainButton} from "@/Components/Buttons/MainButton";
import {useForm} from "react-hook-form";
import {useDispatchTyped as useDispatch, useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";
import {fetchRal} from "@/services/api";
import {requestRal} from "@/services/slices/ral-slice";

interface IProps {
    className?: string
}

export const TableSearchingForm: FunctionComponent<IProps> = ({className}) => {

    const menuItems = useSelector(state => state.filtersReducer.filters);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const submitHandler = (data) => {
        console.log(data);
        dispatch(requestRal(data))

    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${className} flex-col overflow-hidden flex`}>
            <div className={"px-6 w-full grow shrink overflow-y-auto space-y-4"}>
                {!menuItems.length ? <Preloader widthStyles={"w-16"}/> : (
                    menuItems.map((filterItem, key) => {
                        return (<DropdownItem register={register} name={filterItem.header} className={''}
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
