import highlight from "@/Components/Table/lib/highlightText";
import { Renderable, CellContext, flexRender } from "@tanstack/react-table";
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
function customFlexRender(renderFn: Renderable<CellContext<any, unknown>>, context: CellContext<any, unknown>, currentQuery: QueryParams, location: Location): React.ReactNode | JSX.Element {
    const JSX = flexRender(renderFn, context);
    const columnID: string = context.column.id;
    if (columnID === "gost") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: { maxWidth: '200px', },
            },
            highlight(cellValue, currentQuery.gost),
        )
    }
    if (columnID === "full_gost") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                title: context.getValue(),
                // style: { maxWidth: '200px', },
            },
            highlight(cellValue, currentQuery.full_gost),
        )
    }
    if (columnID === "tn_ved") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: { maxWidth: '200px', },
            },
            highlight(cellValue, currentQuery.tn_ved),
        )
    }
    if (columnID === "ralShortInfoView__fullName") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: { maxWidth: '200px', },
            },
            highlight(cellValue, currentQuery.ralShortInfoView__fullName),
        )
    }
    if (columnID === "oaDescription") {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto line-clamp-4",
                title: context.getValue(),
                // style: { maxWidth: '200px', },
            },
            highlight(String(context.getValue()), currentQuery.oaDescription),
        )
    }
    if (
        columnID === "status_change__id" ||
        columnID === "status" ||
        columnID === "begin_date" ||
        columnID === "end_date" ||
        columnID === "comment" ||
        columnID === "publish_date" ||
        columnID === "status_changes_by" ||
        columnID === "idChangeStatus"
    ) {

        const splitted = context.getValue() ? (context.getValue() as string).split(" // ") : [];
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden flex flex-col mx-auto px-2",
                title: context.getValue(),
                // style: { maxWidth: '200px', },
            },
            splitted.map((item, key) => createElement("span", {key, className: `text-left line-clamp-2 overflow-hidden ${key !== splitted.length - 1 ? "mb-3" : ""}`}, item.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, '')))
        )
    }
    if (
        columnID === "productIdentificationName" ||
        columnID === "productIdentificationType" ||
        columnID === "productIdentificationTrademark" ||
        columnID === "productIdentificationModel" ||
        columnID === "productIdentificationArticle" ||
        columnID === "productIdentificationSort" ||
        columnID === "regulations" ||
        columnID === "manufacterFilialFullNames" ||
        columnID === "address" ||
        columnID === "technicalReglaments" ||
        columnID === "productFullName" ||
        columnID === "productBatchSize" ||
        columnID === "exprtFio" ||
        columnID === "expertSnils" ||
        columnID === "group" ||
        columnID === "certType" ||
        columnID === "productIdentificationGtin" ||
        columnID === "update_status_date" ||
        columnID === "previous_update_status_date" ||
        columnID === "previous_status" ||
        columnID === "blankNumber" ||
        columnID === "applicantFilialFullNames" ||
        columnID === "applicantName" ||
        columnID === "manufacterName" ||



        columnID === "certificate_applicant__id" ||
        columnID === "certificate_applicant__certificate_id" ||
        columnID === "idLegalSubject" ||
        columnID === "idEgrul" ||
        columnID === "idApplicantType" ||
        columnID === "idLegalSubjectType" ||
        columnID === "fullName" ||
        columnID === "shortName" ||
        columnID === "idPerson" ||
        columnID === "surname" ||
        columnID === "firstName" ||
        columnID === "patronymic" ||
        columnID === "headPosition" ||
        columnID === "ogrn" ||
        columnID === "ogrnAssignDate" ||
        columnID === "inn" ||
        columnID === "kpp" ||
        columnID === "idLegalForm" ||
        columnID === "certificate_applicant__regDate" ||
        columnID === "regOrganName" ||
        columnID === "addlRegInfo" ||
        columnID === "isEecRegister" ||
        columnID === "passportIssueDate" ||
        columnID === "passportIssuedBy" ||
        columnID === "passportNum" ||
        columnID === "idPersonDoc" ||


        columnID === "certification_authority__id" ||
        columnID === "certification_authority__certificate_id" ||
        columnID === "idCertificationAuthority" ||
        columnID === "certification_authority__fullName" ||
        columnID === "accredOrgName" ||
        columnID === "attestatRegNumber" ||
        columnID === "attestatRegDate" ||
        columnID === "attestatEndDate" ||
        columnID === "idRal" ||
        columnID === "ogrn" ||
        columnID === "idPerson" ||
        columnID === "firstName" ||
        columnID === "surname" ||
        columnID === "patronymic"
    ) {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto line-clamp-2",
                style: { maxWidth: '200px', },
                title: context.getValue()
            },
            String(context.getValue()),
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

    if (columnID === "certificate_name") {
        return createElement(
            motion.span,
            {
                className: "inline-block",
                ...motionProperties,
            },
            createElement(
                "a",
                {
                    className: "underline line-clamp-2",
                    state: {
                        background: location,
                    },
                    href: `${context.row.original.certificate_link}`,
                    title: context.getValue(),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e: MouseEvent) => e.stopPropagation()
                },
                highlight(context.getValue() as string | null, currentQuery.certificate_name)
            )
        )
    }

    if (columnID === "ralShortInfoView__RegNumber") {
        let cellValue = String(context.getValue()).replace(/([,;])([^ ])/g, '$1 $2')
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto",
                style: { maxWidth: '200px', },
            },
            highlight(cellValue, currentQuery.ralShortInfoView__RegNumber),
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
                return createElement(motion.a, { href: value, ...linkMotionProps, target: "_blank", rel: "noopener noreferrer", onClick: e => e.stopPropagation() }, value)
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