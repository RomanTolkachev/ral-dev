import { motion } from "motion/react"
import { Dispatch, FunctionComponent, RefObject, SetStateAction, useContext, useEffect, useRef } from "react"
import motionVatiants from "../lib/motion"
import { HeaderNavButtonContext } from "./HeaderNavButton"
import { Link } from "react-router"

interface IProps {
    className?: string
    collapseFunction: Dispatch<SetStateAction<boolean>>
    buttonRef: RefObject<HTMLButtonElement>
}


export const LinkList: FunctionComponent<IProps> = ({ className, collapseFunction: close, buttonRef }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const links = useContext(HeaderNavButtonContext)
    console.log(links)

    useEffect(() => {
        function handleCollapse(e: MouseEvent) {
            const isButtonClicked = buttonRef.current?.contains(e.target as Node);
            const isOutsideLinkListClicked = !listRef.current?.contains(e.target as Node);
            if (isButtonClicked || isOutsideLinkListClicked) {
                e.stopPropagation()
                close(prev => !prev);
            }
        }
        document.addEventListener("click", handleCollapse, true);
        return () => {
            document.removeEventListener("click", handleCollapse, true);
        };
    }, [buttonRef, close]);

    return (
        <motion.div
            ref={listRef}
            key="dir"
            {...motionVatiants}
            className="flex flex-col w-fit absolute top-[calc(100%+0.3rem)] bg-orange-400 rounded-md p-2"
        >
            <ul className="flex flex-col gap-2">
                {links && links.map((item, key) => {
                    return (
                        <li key={key} className="text-nowrap" onClick={() => close(prev => !prev)}>
                            <Link className="block" to={item.path}>{item.text}</Link>
                        </li>
                    )
                })}
            </ul>
        </motion.div>
    )
}