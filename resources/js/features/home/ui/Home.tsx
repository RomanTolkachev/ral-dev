import { FunctionComponent, useMemo } from "react"
import HomeCard from "./HomeCard"
import iconsData from "../model/iconsData"

interface IProps {
    className?: string
}


const Home: FunctionComponent<IProps> = ({ className }) => {

    const sortedIconsData = useMemo(() => {
        return iconsData.sort((a, b) => a.order - b.order)
    }, [iconsData])

    return (
        <div className="p-2 h-full">
            <div className="my-block h-full bg-[url('/bg/texture.png')] min-w-[800px]">
                <section className={`${className} pt-20 grid gap-16 grid-cols-5 w-full items-center  max-w-screen-lg mx-auto`}>
                    {sortedIconsData.map((icon) => <HomeCard iconData={icon} key={icon.order} />)}
                </section>
            </div>
        </div>
    )
}

export default Home