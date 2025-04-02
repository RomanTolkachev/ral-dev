import { AnimatePresence } from "motion/react";
import { createContext, FunctionComponent, ReactNode, useMemo, useRef, useState } from "react";
import { LinkList } from "./LinkList";
import { TLinkItem } from "@/Components/Header";

interface IProps {
    className?: string
    children: ReactNode
    onClick?: () => void
    links: TLinkItem[]
}

export const HeaderNavButtonContext = createContext<TLinkItem[] | undefined>(undefined)

export const HeaderNavButton: FunctionComponent<IProps> = ({ className, children, links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null)
    return (
        <HeaderNavButtonContext.Provider value={links}>
            <div className="relative flex flex-col items-center line-clamp-2">
                <button
                    ref={buttonRef}
                    className={`${className} bg-header-nav-button text-header-nav-text py-1 px-8 rounded-md`}
                    onClick={() =>  setIsOpen(prevState => !prevState)}
                >
                    {children}
                </button>
                <AnimatePresence mode="wait">
                    {isOpen && <LinkList buttonRef={buttonRef} collapseFunction={setIsOpen} />}
                </AnimatePresence>
            </div>
        </HeaderNavButtonContext.Provider>
    )
}