import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SVG } from "../utils/SVG";
import { useParams } from "react-router";

interface IModalProps {
    closeModal: () => void;
    children: React.ReactNode;
}

const modalVariants = {
    start: {
        opacity: 0,
    },
    appearing: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};


const Modal: React.FunctionComponent<IModalProps> = ({
    closeModal,
    children,
}) => {

    const params = useParams();
    // функции для закрытия модалки
    const innerRef: React.RefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                innerRef.current &&
                !innerRef.current.contains(e.target as Node)
            ) {
                closeModal();
            }
        }

        function handleClickEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                closeModal();
            }
        }

        document.addEventListener("click", handleClickOutside, true);
        document.addEventListener("keydown", handleClickEscape, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
            document.removeEventListener("keydown", handleClickEscape, true);
        };
    }, [closeModal]);

    return createPortal(
        <motion.section
            key={"modal"}
            variants={modalVariants}
            initial="start"
            animate="appearing"
            exit="exit"
            className={
                "fixed left-0 top-0 z-[11] flex h-full max-h-full w-full justify-center bg-black bg-opacity-80 font-Inter"
            }
        >
            <div
                className={
                    "relative z-[12] my-auto flex h-full max-h-full w-full items-center overflow-hidden rounded-xl bg-background py-10 sm:pb-10 lg:h-fit lg:w-[700px] lg:py-20"
                }
                ref={innerRef}
            >
                <div
                    className={`max-h-[calc(100dvh-5rem)] w-full overflow-y-auto lg:max-h-[calc(100svh-7.5rem)]`}
                >
                    {children}
                </div>
                <motion.div
                    initial={{ scale: 1.01 }}
                    whileHover={{ scale: 1.07 }}
                    className={
                        "absolute right-[-10px] top-[-12px] h-[45px] w-[45px] p-3 text-table-base hover:cursor-pointer lg:right-[7px] lg:top-[7px]"
                    }
                    onClick={closeModal}
                >
                    <SVG escape />
                </motion.div>
            </div>
        </motion.section>,
        document.getElementById("portal") as HTMLElement,
    );
};

export default Modal;