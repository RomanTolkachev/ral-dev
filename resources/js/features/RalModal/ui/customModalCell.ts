import highlight from "@/Components/Table/lib/highlightText";
import { TRalModel } from "@/features/RalTable/model/types";
import { Renderable, CellContext, flexRender } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import { motion } from "motion/react";
import { createElement, ReactNode } from "react";

type QueryParams = Record<string, any>

const linkMotionProps = {
    className: "inline-block underline",
    style: { scale: 1.01, zIndex: -10 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.02 },
}

/**
 * Параметры анимации библиотеки framer-motion
 */
const motionProperties = {
    style: { scale: 1.01, zIndex: -10 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.05 }
}

/**
 * Middlaware, который модифицирует компонент, отрисовываемый в ячейке.
 * На данный момент реализованы следующие модификации:
 * 
 * 
 * @param {Renderable<CellContext<IModel, unknown>>} renderFn Функция рендеринга, которая должа принимать параметром контекст ячейки из таблицы.
 * @param {CellContext<IModel, unknown>} context собственно, контекст ячейки.
 * @param {QueryParams} currentQuery текущие query.
 * @param {location} location вызов useLocation.
 * @returns {React.ReactNode | JSX.Element} Модифицированное значение или элемент.
 */
function customModalCell(renderFn: Renderable<CellContext<TRalModel, unknown>>, context: CellContext<TRalModel, unknown>, currentQuery: QueryParams, location: Location): React.ReactNode | JSX.Element {
    const rowValue = context.row.getAllCells()[0].renderValue()
    const JSX = flexRender(renderFn, context);
    const columnID: string = context.column.id;
    if ( columnID.toLowerCase() === 'value' && !isEmpty(context.getValue())) {
        switch (rowValue) {
            case "ТР ТС/ЕАЭС (НЧ)": {
                let splittedCellData = String(context.getValue()).split(";")
                return createElement(
                    'ul',
                    {
                        className: "",
                    },
                    splittedCellData.map(value => {
                        return createElement('li', {className: "mb-2"}, highlight(value + ";", currentQuery.regulations))  
                    }) as ReactNode,   
                )
            }
            case "ТН ВЭД": {
                return highlight(context.getValue() as string, currentQuery.tnved) 
            }
        }
    }
    if (
        !JSX ||
        typeof JSX === 'string' ||
        typeof JSX === 'number' ||
        typeof JSX === 'boolean' ||
        typeof JSX === 'function' ||
        Array.isArray(JSX)) {
        return JSX;
    } else {
        let value = "props" in JSX ? JSX.props.getValue() : JSX;
        let modifiedValue = highlight(value, currentQuery.fullText);

        // ниже проверки на строковое значение
        if (typeof value === "string") {
            if (value.includes('http')) {
                return createElement(motion.a, { href: value, ...linkMotionProps, target: "_blank", rel: "noopener noreferrer", onClick: e => e.stopPropagation() }, value)
            }
            if (value === "Действует") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-active)`,
                    }
                }, value)
            }
            if (value === "Прекращен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-terminated)`,
                    }
                }, value)
            }
            if (value === "Приостановлен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-suspended)`,
                    }
                }, value)
            }
            if (value === "Частично приостановлен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-part-suspended)`,
                    }
                }, value)
            }

        }
        return modifiedValue;
    }
}

export default customModalCell;

