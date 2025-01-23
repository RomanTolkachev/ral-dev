import { div } from "motion/react-client"
import { SVG } from "./SVG"

export const NotFound = () => {
    return (
        <div className="h-full w-full grid place-items-center">
            <div className="w-[500px] flex flex-col">
                <SVG className="mb-2" notFound />
                <span className=" w-full text-3xl text-nowrap tracking-tight font-black text-text-primary first-letter:capitalize text-center">
                    404, страница не найдена
                </span>
            </div>
        </div>
    )
}