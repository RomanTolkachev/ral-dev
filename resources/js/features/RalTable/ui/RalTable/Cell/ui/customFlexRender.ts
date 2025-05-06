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
 * 
 * @param {Renderable<CellContext<IModel, unknown>>} renderFn Функция рендеринга, которая должа принимать параметром контекст ячейки из таблицы.
 * @param {CellContext<IModel, unknown>} context собственно, контекст ячейки.
 * @param {QueryParams} currentQuery текущие query.
 * @param {location} location вызов useLocation.
 * @returns {React.ReactNode | JSX.Element} Модифицированное значение или элемент.
 */
function customFlexRender(renderFn: Renderable<CellContext<TRalModel, unknown>>, context: CellContext<TRalModel, unknown>, currentQuery: QueryParams, location: Location): React.ReactNode | JSX.Element {
    const JSX = flexRender(renderFn, context);
    const columnID: string = context.column.id;
    if (columnID === "applicantFullName") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: {maxWidth: '200px',},
                title: context.getValue()
            },
            highlight(cellValue, currentQuery.fullText),
        )
    }
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
                highlight(context.getValue() as string | null, currentQuery.fullText) 
            )
        )
    }
    if (columnID === "tnved") {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden line-clamp-2 mx-auto",
                style: {maxWidth: '100px',}
            },
            isEmpty(context.getValue()) ? '-' as ReactNode : String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2') as ReactNode,
        )
    }
    if (columnID === 'regulations') {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden line-clamp-2 mx-auto",
                style: {maxWidth: '150px',},
                title: context.getValue()
            },
            isEmpty(context.getValue()) ? '-' as ReactNode : String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2') as ReactNode,
        )
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
    if (columnID === "NPstatus") {
        let dynamicColor: string | null;
        let fontWeight: number | null;
        switch(String(context.getValue()).toLowerCase()) {
            case "да":  dynamicColor = 'var(--cell-active)'; fontWeight = 800; break
            case "нет": dynamicColor = `var(--cell-suspended)`; fontWeight = 800; break
            default: dynamicColor = null; fontWeight = null 
        }
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: {maxWidth: '100px', color: dynamicColor, fontWeight  }
            },
            context.getValue() as ReactNode,
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
                        fontWeight: 800
                    }
                }, value)
            }
            if (value === "Прекращен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-terminated)`,
                        fontWeight: 800
                    }
                }, value)
            }
            if (value === "Приостановлен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-suspended)`,
                        fontWeight: 800
                    }
                }, value)
            }
            if (value === "Частично приостановлен") {
                return createElement('span', {
                    style: {
                        color: `var(--cell-part-suspended)`,
                        fontWeight: 800
                    }
                }, value)
            }

        }
        return modifiedValue;
    }
}

export default customFlexRender;