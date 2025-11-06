import { FunctionComponent, ReactNode, useEffect, useLayoutEffect, useMemo, useState } from "react"
import HomeCard from "./HomeCard"
import iconsData from "../model/iconsData"
import { useQuery } from "@tanstack/react-query";

interface IProps {
    className?: string
}

type versionData = {
    feature: string
    version: string | number
    branch: string
    commit: string
    author: string
    date: string
}

const getVersion = async (): Promise<versionData> => {
    try {
        const response = await fetch('/version.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: versionData = await response.json();

        // Возвращаем данные напрямую, так как структура совпадает
        return data;

    } catch (error) {
        console.error('Error loading version data:', error);

        // Возвращаем объект с пустыми строками в случае ошибки
        return {
            feature: "",
            version: "",
            branch: "",
            commit: "",
            author: "",
            date: ""
        };
    }
}

const Home: FunctionComponent<IProps> = ({ className }) => {

    const [isLight, setIsLight] = useState<boolean | undefined>(undefined)

    const sortedIconsData = useMemo(() => {
        return iconsData.sort((a, b) => a.order - b.order)
    }, [iconsData])

    const { data: version } = useQuery({
        queryKey: ["version"],
        queryFn: getVersion
    })

    // передача темы в виде bool пропса. Картинки у карточек в png, поэтому приходится менять пути к картинкам png
    useLayoutEffect(() => {
        setIsLight(document.body.classList.contains('light'))
        const observer = new MutationObserver(
            () => setIsLight(document.body.classList.contains('light'))
        )
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => {
            observer.disconnect();
        };
    }, [])

    return (
        <div className="p-2 h-full">
            <div className={`relative my-block bg-center bg-cover bg-no-repeat h-full ${isLight ? "bg-[url('/bg/main_bg_light.png')]" : "bg-[url('/bg/main_bg_dark.webp')]"} min-w-[800px]`}>
                <section className={`${className} pt-20 grid gap-16 grid-cols-5 w-full items-center  max-w-screen-lg mx-auto`}>
                    {sortedIconsData.map((icon) => <HomeCard isLight={isLight} iconData={icon} key={icon.order} />)}
                </section>
                <div className={`${!isLight ? "text-orange-600 " : ""} p-2 absolute bottom-0 w-fit`}>
                    {version?.version && `Версия: ${version.version}, `}
                    {version?.feature && `Фича: ${version.feature}`}
                </div>
            </div>
        </div>
    )
}

export default Home