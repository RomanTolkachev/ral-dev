import highlight from "@/Components/Table/lib/highlightText";
import { IModel } from "@/features/RalTable/model/types";
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
 * - все ячейки в колонке id возвращают Link из react-router
 * - оборачивание частьи значения в <mark> функция highLight
 * - замена строки, содержащей ссылку на тэг <а>
 * - подсветка значений "Прекращен" и "Приостановлен"
 * 
 * @param {Renderable<CellContext<IModel, unknown>>} renderFn Функция рендеринга, которая должа принимать параметром контекст ячейки из таблицы.
 * @param {CellContext<IModel, unknown>} context собственно, контекст ячейки.
 * @param {QueryParams} currentQuery текущие query.
 * @param {location} location вызов useLocation.
 * @returns {React.ReactNode | JSX.Element} Модифицированное значение или элемент.
 */
function customFlexRender(renderFn: Renderable<CellContext<IModel, unknown>>, context: CellContext<IModel, unknown>, currentQuery: QueryParams, location: Location): React.ReactNode | JSX.Element {
    const JSX = flexRender(renderFn, context);
    const columnID: string = context.column.id;
    if (columnID === "RegNumber") {
        return createElement(
            motion.span,
            {
                className: "inline-block",
                ...motionProperties,
            },
            createElement(
                "a",
                {
                    className: "underline",
                    state: {
                        background: location,
                    },
                    href: `${context.row.original.link}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e: MouseEvent) => e.stopPropagation()
                },
                context.getValue() as ReactNode,   
            )
        )
    }
    if (columnID === "tnved" || columnID === "regulation") {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden line-clamp-2 mx-auto",
                style: {maxWidth: '100px',}
            },
            isEmpty(context.getValue()) ? 'нет данных' as ReactNode : String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2') as ReactNode,
        )
        debugger
    }
    if (columnID === "nameType") {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: {maxWidth: '100px',}
            },
            String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2') as ReactNode,
        )
    }
    if (columnID === "applicantFullName") {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: {maxWidth: '200px',},
                title: context.getValue()
            },
            String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2') as ReactNode,
        )
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
                return createElement(motion.a, { href: value, ...linkMotionProps, target: "_blank", rel: "noopener noreferrer", onClick: e => e.stopPropagation()  }, value)
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

export default customFlexRender;