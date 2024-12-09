import {useEffect, useState} from "react";
import {Header} from "@/Components/Header";
import {MainButton} from "@/Components/Buttons/MainButton";
import {useDispatchTyped} from "@/services/hooks/typedUseSelector";
import {requestRal} from "@/services/slices/ral-slice";
import {Table} from "@/Components/Table";

export default function Main() {
    const dispatch = useDispatchTyped();
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        dispatch(requestRal());
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
            <div className={"h-svh overflow-hidden bg-background flex"}>
                <section className={'bg-background flex h-full flex-col w-72'}>
                    <Header>заголовок</Header>
                    <div className={"p-2 flex shrink grow"}>
                        <div className={'flex my-block shrink grow flex-col'}>
                            <div className={"shrink grow"}>содержимое инпутов</div>
                            <MainButton color={"violet"} className={"mx-auto"}>Применить</MainButton>
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
