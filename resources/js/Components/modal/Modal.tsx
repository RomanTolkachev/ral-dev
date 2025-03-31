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
                    "relative z-[12] my-auto flex h-[80%] items-center overflow-hidden rounded-xl bg-background px-2 py-14 sm:pb-10 w-[700px]"
                }
                ref={innerRef}
            >
                <div
                    className={`w-full overflow-y-auto h-full`}
                >
                    {children}
                </div>
                <motion.div
                    initial={{ scale: 1.01 }}
                    whileHover={{ scale: 1.07 }}
                    className={
                        "absolute h-[45px] w-[45px] p-3 text-table-base hover:cursor-pointer right-[7px] top-[7px]"
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