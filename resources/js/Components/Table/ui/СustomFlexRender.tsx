import highlight from "@/Components/Table/lib/highlightText";
import { Renderable, CellContext, flexRender } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type QueryParams = Record<string, any>;

type Props = {
    renderFn: Renderable<CellContext<any, unknown>>,
    context: CellContext<any, unknown>,
    currentQuery: QueryParams,
}

const linkMotionProps = {
    className: "inline-block underline",
    style: { scale: 1.01, zIndex: -10 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.02 },
};

const motionProperties = {
    style: { scale: 1.01 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.05 }
};

const formatCellValue = (value: unknown) =>
    String(value).replace(/([,;])([^ ])/g, '$1 $2');

const StatusSquare = ({ status, npStatus }: { status?: string; npStatus?: string }) => (
    <svg width="45" height="45" viewBox="0 0 45 45">
        <rect
            x="3" y="3" width="39" height="39" rx="9"
            fill="none"
            stroke={npStatus === "Да" ? "var(--cell-active)" :
                npStatus === "Нет" ? "var(--cell-terminated)" : "transparent"}
            strokeWidth="6"
        />
        <rect
            x="14" y="14" width="17" height="17" rx="5"
            fill={
                status === "Действует" ? "var(--cell-active)" :
                    status === "Прекращен" ? "var(--error)" :
                        status === "Приостановлен" ? "var(--cell-suspended)" :
                            status === "Частично приостановлен" ? "var(--thumb-secondary)" :
                                status === "Архивный" ? "rgb(39 42 49)" : "transparent"
            }
        />
    </svg>
);

export const CustomFlexRender: FC<Props> = (
    { renderFn, context, currentQuery }
): ReactNode => {
    const JSX = flexRender(renderFn, context);
    const columnID = context.column.id;
    const value = context.getValue();
    const stringValue = formatCellValue(value);
    const row = context.row.original;

    switch (columnID) {
        case "gost":
            return (
                <span className="text-wrap overflow-hidden mx-auto" style={{ maxWidth: '200px' }}>
                    {highlight(stringValue, currentQuery.gost)}
                </span>
            );

        case "full_gost":
            return (
                <span className="text-wrap overflow-hidden mx-auto" title={stringValue}>
                    {highlight(stringValue, currentQuery.full_gost)}
                </span>
            );

        case "regulations":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                    }}
                >
                    {highlight(stringValue, currentQuery.regulations)}
                </span>
            );

        case "tnved":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                    }}
                >
                    {highlight(stringValue, currentQuery.tnved)}
                </span>
            );

        case "ralShortInfoView__RegNumber":
            return (
                <span className="flex items-center justify-between w-full">
                    <span className="text-wrap overflow-hidden px-2 text-left">
                        {highlight(stringValue, currentQuery.ralShortInfoView__fullName)}
                    </span>
                    <span className="w-[45px] h-[45px] flex-shrink-0 flex items-center justify-center ml-2"
                        style={{ minWidth: '45px' }}>
                        <StatusSquare
                            status={row.ralShortInfoView__new_status_AL}
                            npStatus={row.ralShortInfoView__NPStatus}
                        />
                    </span>
                </span>
            );

        case "RegNumber":
            return (
                <span className="flex items-center justify-between w-full">
                    <motion.span className="inline-block px-2 text-left" {...motionProperties}>
                        <a
                            className="underline text-current"
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {highlight(stringValue, currentQuery.fullText)}
                        </a>
                    </motion.span>
                    <span className="w-[45px] h-[45px] flex-shrink-0 flex items-center justify-center ml-2"
                        style={{ minWidth: '45px' }}>
                        <StatusSquare
                            status={row.new_status_AL}
                            npStatus={row.NPstatus}
                        />
                    </span>
                </span>
            );

        // Все стандартные колонки продукта
        case "productFullName":
        case "productBatchSize":
        case "expertFio":
        case "expertSnils":
        case "group":
        case "certType":
        case "productIdentificationGtin":
        case "update_status_date":
        case "previous_update_status_date":
        case "previous_status":
        case "blankNumber":
        case "applicantFilialFullNames":
        case "applicantName":
        case "manufacterName":
        // Поля certificate_applicant
        case "certificate_applicant__id":
        case "certificate_applicant__certificate_id":
        case "certificate_applicant__idLegalSubject":
        case "certificate_applicant__idEgrul":
        case "certificate_applicant__idApplicantType":
        case "certificate_applicant__idLegalSubjectType":
        case "certificate_applicant__fullName":
        case "certificate_applicant__shortName":
        case "certificate_applicant__idPerson":
        case "certificate_applicant__surname":
        case "certificate_applicant__firstName":
        case "certificate_applicant__patronymic":
        case "certificate_applicant__headPosition":
        case "certificate_applicant__ogrn":
        case "certificate_applicant__ogrnAssignDate":
        case "certificate_applicant__inn":
        case "certificate_applicant__kpp":
        case "certificate_applicant__idLegalForm":
        case "certificate_applicant__regDate":
        case "certificate_applicant__regOrganName":
        case "certificate_applicant__addlRegInfo":
        case "certificate_applicant__isEecRegister":
        case "certificate_applicant__passportIssueDate":
        case "certificate_applicant__passportIssuedBy":
        case "certificate_applicant__passportNum":
        case "certificate_applicant__idPersonDoc":
        // Поля certification_authority
        case "certification_authority__id":
        case "certification_authority__certificate_id":
        case "certification_authority__idCertificationAuthority":
        case "certification_authority__fullName":
        case "certification_authority__accredOrgName":
        case "certification_authority__attestatRegNumber":
        case "certification_authority__attestatRegDate":
        case "certification_authority__attestatEndDate":
        case "certification_authority__idRal":
        case "certification_authority__ogrn":
        case "certification_authority__idPerson":
        case "certification_authority__firstName":
        case "certification_authority__surname":
        case "certification_authority__patronymic":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-2"
                    style={{ maxWidth: '200px' }}
                    title={stringValue}
                >
                    {highlight(stringValue, currentQuery[columnID] || '')}
                </span>
            );

        default:
            if (!JSX || typeof JSX === 'string' || typeof JSX === 'number' || typeof JSX === 'boolean') {
                if (typeof JSX === 'string') {
                    if (JSX.includes('http')) {
                        return (
                            <motion.a href={JSX} {...linkMotionProps} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}>
                                {JSX}
                            </motion.a>
                        );
                    }
                    if (JSX === "Действует") {
                        return <span style={{ color: "var(--cell-active)", fontWeight: 800 }}>{JSX}</span>;
                    }
                    if (JSX === "Прекращен") {
                        return <span style={{ color: "var(--cell-terminated)", fontWeight: 800 }}>{JSX}</span>;
                    }
                    if (JSX === "Приостановлен") {
                        return <span style={{ color: "var(--cell-suspended)", fontWeight: 800 }}>{JSX}</span>;
                    }
                    if (JSX === "Частично приостановлен") {
                        return <span style={{ color: "var(--cell-part-suspended)", fontWeight: 800 }}>{JSX}</span>;
                    }
                }
                return JSX;
            }
            return highlight(stringValue, currentQuery.fullText);
    }
}