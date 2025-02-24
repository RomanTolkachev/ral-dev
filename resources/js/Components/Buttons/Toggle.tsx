import React, {FunctionComponent, useEffect, useLayoutEffect, useState} from 'react';
import {SVG} from "@/Components/utils/SVG";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface IProps {
    className?: string
}

export const Toggle: FunctionComponent<IProps> = ({className}) => {
    const [theme, setTheme] = useState(
        () => {
            return localStorage.getItem("theme") ? localStorage.getItem("theme")! : "light"
        }
    );

    const controls = useAnimation()

    useLayoutEffect(() => {
        if (localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme")!);
        } else {
            localStorage.setItem("theme", theme)
        }

        if (theme === "light") {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
            controls.set("left")
        } else {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
            controls.set("right")
        }
    }, []);

    useEffect(()=> {
        localStorage.setItem('theme', theme)

        if (theme === "light") {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        } else {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        }
    },[theme])

    const toggleSwitch = () => {theme === "light" ? setTheme("dark") : setTheme("light")};

    return (
        <div onClick={toggleSwitch} className={`${className} w-7 h-7 p-1  flex`}>
            <AnimatePresence mode="wait">
                {theme === "dark" && <motion.div key={"toggle-1"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 1 }}><SVG sun /></motion.div>}
                {theme === "light" && <motion.div key={"toggle-2"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 1 }}><SVG moon /></motion.div>}
            </AnimatePresence>
        </div>
    );
};

