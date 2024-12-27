import {useEffect, useState} from "react";
import {Header} from "@/Components/Header";
import {MainButton} from "@/Components/Buttons/MainButton";
import {useDispatchTyped, useSelectorTyped} from "@/services/hooks/typedUseSelector";
import {requestRal} from "@/services/slices/ral-slice";
import {requestFilters} from "@/services/slices/filters-slice";
import {TableSearchingForm} from "@/Components/TableSerachingForm/TableSearchingForm";
import {Table} from "@/Components/Table";
import {Toggle} from "@/Components/Buttons/Toggle";

export default function Main() {
    const dispatch = useDispatchTyped();

    const paginationQueries = useSelectorTyped(state => state.filtersReducer.paginationQueries)
    const page = useSelectorTyped(state => state.filtersReducer.paginationQueries.page)
    const perPage = useSelectorTyped(state => state.filtersReducer.paginationQueries.perPage)
    useEffect(() => {
        // @ts-ignore
        dispatch(requestRal(paginationQueries));
        dispatch(requestFilters())
    }, []);


    return (
        <>
            <div className={"h-svh mah-h-svh overflow-hidden bg-background flex w-screen font-Inter transition-colors duration-200"}>
                <section className={'bg-background shrink-0 grid grid-rows-[auto_1fr_auto] !grid-cols-[300px] h-full overflow-hidden'}>
                    <Header>заголовок</Header>
                    <div className={"p-2 flex flex-col grow shrink overflow-hidden"}>
                        <div className={"my-block pt-6 flex grow overflow-hidden"}>
                            <TableSearchingForm className={"w-full"} />
                        </div>
                    </div>
                </section>
                <section className={"shrink grow flex flex-col"}>
                    <Header className={"mb-6"}>
                        <nav className={"flex shrink grow"}>
                            <h2>тут будет заголовок раздела</h2>
                            <ul className={"flex shrink grow justify-around"}>
                                <li>справочники</li>
                                <li>кабинет менеджера</li>
                            </ul>
                            <div className={"pr-24"}>
                                <Toggle />
                            </div>
                        </nav>
                    </Header>
                    <div className={'flex justify-end gap-3 pr-10'}>
                        <MainButton color={"red"}>Скрыть истекшие</MainButton>
                        <MainButton color={"white"}>Выгрузить</MainButton>
                        <MainButton color={"violet"}
                        >изменить тему
                        </MainButton>
                    </div>
                    <Table />
                </section>
            </div>
        </>
    );
}
