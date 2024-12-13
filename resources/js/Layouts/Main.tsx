import {useEffect, useState} from "react";
import {Header} from "@/Components/Header";
import {MainButton} from "@/Components/Buttons/MainButton";
import {useDispatchTyped, useSelectorTyped as useSelector} from "@/services/hooks/typedUseSelector";
import {requestRal} from "@/services/slices/ral-slice";
import {Table} from "@/Components/Table";
import {Preloader} from "@/Components/utils/Preloader";
import {DropdownItem} from "@/Components/DropdownItem";
import {requestFilters} from "@/services/slices/filters-slice";

export default function Main() {
    const dispatch = useDispatchTyped();
    const menuItems = useSelector(state => state.filtersReducer.filters);
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        dispatch(requestRal());
        dispatch(requestFilters())
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme")!);
        }
    }, []);

    useEffect(()=> {
        if (theme === "light") {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        } else {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        }

    },[theme])
    return (
        <>
            <div className={"h-svh mah-h-svh overflow-hidden bg-background flex w-screen font-Inter"}>
                <section className={'bg-background shrink-0 grid grid-rows-[auto_1fr_auto] !grid-cols-[300px] h-full overflow-hidden'}>
                    <Header>заголовок</Header>
                    <div className={"p-2 flex flex-col shrink grow overflow-hidden"}>
                        <div className={'flex my-block shrink grow flex-col pt-6 overflow-hidden'}>
                            <div className={"shrink grow px-6 w-full overflow-y-scroll space-y-4"}>
                                {!menuItems.length ? <Preloader widthStyles={"w-16"} /> : (
                                    menuItems.map((filterItem, key) => {
                                        return ( <DropdownItem name={filterItem.header} className={''} inputData={filterItem} key={key} />
                                            )
                                    })
                                )}
                            </div>
                            <div className={"sticky bottom-0 flex flex-col bg-background py-6 space-y-4 gap-2"}>
                                <MainButton color={"violet"} className={"mx-auto"}>Применить</MainButton>
                                <button>сбросить</button>
                            </div>
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
                            <div>а тут будет поиск и иконки</div>
                        </nav>
                    </Header>
                    <div className={'flex justify-end gap-3 pr-10'}>
                        <MainButton color={"red"}>Скрыть истекшие</MainButton>
                        <MainButton color={"white"}>Выгрузить</MainButton>
                        <MainButton color={"violet"}
                                    onClick={() => {setTheme(theme === "light" ? "dark" : "light"); localStorage.setItem('theme', theme === "light" ? "dark" : "light")}}
                        >изменить тему</MainButton>
                    </div>
                    <Table />
                </section>
            </div>
        </>
    );
}
