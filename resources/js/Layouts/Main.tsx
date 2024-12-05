import {useEffect, useState} from "react";
import {Header} from "@/Components/Header";
import {MainButton} from "@/Components/Buttons/MainButton";

export default function Main() {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
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
            <div className={"h-svh bg-red-100 flex"}>
                <section className={'bg-green-200 flex h-full flex-col w-72'}>
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
                        <MainButton color={"violet"}>Обновить</MainButton>
                    </div>
                    <div className={'shrink grow flex-col flex'}>
                        <div>верхняя пагинация</div>
                        <div className={'p-2 shrink grow'}>
                            <div className={"text-5xl my-block w-full h-full bg-stone-400 flex justify-center items-center"}>
                                <span className={""}>табличка</span>
                            </div>
                        </div>
                        <div className={"text-end"}>нижняя пагинация</div>
                    </div>
                </section>
            </div>
            {/*<div className={"p-10 bg-background-block"}>*/}
            {/*    <h1 className={'mt-10 font-bold text-text-primary w-fit rounded-2xl p-6 mx-auto bg-background'}>Привет, мир</h1>*/}
            {/*</div>*/}
            {/*<button className={'bg-cyan-200 mt-10 rounded-2xl p-6 block w-fit mx-auto'} onClick={() => {setTheme(theme === "light" ? "dark" : "light"); localStorage.setItem('theme', theme === "light" ? "dark" : "light")}}> изменить тему</button>*/}
        </>
    );
}
