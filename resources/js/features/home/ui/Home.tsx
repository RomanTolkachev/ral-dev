import { FunctionComponent, useEffect, useLayoutEffect, useMemo, useState } from "react"
import HomeCard from "./HomeCard"
import iconsData from "../model/iconsData"

interface IProps {
    className?: string
}


const Home: FunctionComponent<IProps> = ({ className }) => {

    const [isLight, setIsLight] = useState<boolean | undefined>(undefined)

    const sortedIconsData = useMemo(() => {
        return iconsData.sort((a, b) => a.order - b.order)
    }, [iconsData])

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
            <div className={`my-block bg-center bg-cover bg-no-repeat h-full ${isLight ? "bg-[url('/bg/main_bg_light.png')]" : "bg-[url('/bg/main_bg_dark.webp')]"} min-w-[800px]`}>
                <section className={`${className} pt-20 grid gap-16 grid-cols-5 w-full items-center  max-w-screen-lg mx-auto`}>
                    {sortedIconsData.map((icon) => <HomeCard isLight={isLight} iconData={icon} key={icon.order} />)}
                </section>
            </div>
        </div>
    )
}

export default Home