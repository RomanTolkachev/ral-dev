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
            splitted.map((item, key) => createElement("span", { key, className: `text-left line-clamp-2 overflow-hidden ${key !== splitted.length - 1 ? "mb-3" : ""}` }, item.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, '')))
        )
    }
    if (
        // Основные поля сертификата
        columnID === "productIdentificationName" ||
        columnID === "productIdentificationType" ||
        columnID === "productIdentificationTrademark" ||
        columnID === "productIdentificationModel" ||
        columnID === "productIdentificationArticle" ||
        columnID === "productIdentificationSort" ||
        columnID === "ral_short_info_view__regulations" ||  // Было "regulations"
        columnID === "manufacterFilialFullNames" ||
        columnID === "ral_short_info_view__address" ||      // Было "address"
        columnID === "technicalReglaments" ||
        columnID === "productFullName" ||
        columnID === "productBatchSize" ||
        columnID === "expertFio" ||                        // Было "exprtFio" (исправлена опечатка)
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

        // Поля certificate_applicant (с префиксами)
        columnID === "certificate_applicant__id" ||
        columnID === "certificate_applicant__certificate_id" ||
        columnID === "certificate_applicant__idLegalSubject" ||     // Было "idLegalSubject"
        columnID === "certificate_applicant__idEgrul" ||           // Было "idEgrul"
        columnID === "certificate_applicant__idApplicantType" ||   // Было "idApplicantType"
        columnID === "certificate_applicant__idLegalSubjectType" || // Было "idLegalSubjectType"
        columnID === "certificate_applicant__fullName" ||          // Было "fullName"
        columnID === "certificate_applicant__shortName" ||         // Было "shortName"
        columnID === "certificate_applicant__idPerson" ||          // Было "idPerson"
        columnID === "certificate_applicant__surname" ||           // Было "surname"
        columnID === "certificate_applicant__firstName" ||         // Было "firstName"
        columnID === "certificate_applicant__patronymic" ||        // Было "patronymic"
        columnID === "certificate_applicant__headPosition" ||      // Было "headPosition"
        columnID === "certificate_applicant__ogrn" ||              // Было "ogrn"
        columnID === "certificate_applicant__ogrnAssignDate" ||    // Было "ogrnAssignDate"
        columnID === "certificate_applicant__inn" ||               // Было "inn"
        columnID === "certificate_applicant__kpp" ||               // Было "kpp"
        columnID === "certificate_applicant__idLegalForm" ||       // Было "idLegalForm"
        columnID === "certificate_applicant__regDate" ||
        columnID === "certificate_applicant__regOrganName" ||      // Было "regOrganName"
        columnID === "certificate_applicant__addlRegInfo" ||       // Было "addlRegInfo"
        columnID === "certificate_applicant__isEecRegister" ||     // Было "isEecRegister"
        columnID === "certificate_applicant__passportIssueDate" || // Было "passportIssueDate"
        columnID === "certificate_applicant__passportIssuedBy" ||  // Было "passportIssuedBy"
        columnID === "certificate_applicant__passportNum" ||       // Было "passportNum"
        columnID === "certificate_applicant__idPersonDoc" ||       // Было "idPersonDoc"

        // Поля certification_authority (с префиксами)
        columnID === "certification_authority__id" ||
        columnID === "certification_authority__certificate_id" ||
        columnID === "certification_authority__idCertificationAuthority" || // Было "idCertificationAuthority"
        columnID === "certification_authority__fullName" ||
        columnID === "certification_authority__accredOrgName" ||  // Было "accredOrgName"
        columnID === "certification_authority__attestatRegNumber" || // Было "attestatRegNumber"
        columnID === "certification_authority__attestatRegDate" ||  // Было "attestatRegDate"
        columnID === "certification_authority__attestatEndDate" ||  // Было "attestatEndDate"
        columnID === "certification_authority__idRal" ||            // Было "idRal"
        columnID === "certification_authority__ogrn" ||             // Было "ogrn"
        columnID === "certification_authority__idPerson" ||         // Было "idPerson"
        columnID === "certification_authority__firstName" ||        // Было "firstName"
        columnID === "certification_authority__surname" ||          // Было "surname"
        columnID === "certification_authority__patronymic"          // Было "patronymic"
    ) {
        return createElement(
            'span',
            {
                className: "text-wrap overflow-hidden mx-auto line-clamp-2",
                style: { maxWidth: '200px' },
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