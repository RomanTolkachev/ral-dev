import highlight from "@/Components/Table/lib/highlightText";
import useParamsCustom from "@/shared/query/useParamsCustom";
import { flexRender, Cell } from "@tanstack/react-table";
import { color, motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { Circle } from "./Circle";
import { getNPStatusColor, getStatusColor } from "./getColor";

type Props = {
    cellData: Cell<any, unknown>
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

export const CustomCell: FC<Props> = (
    { cellData }
): ReactNode => {
    const [_, getQuery] = useParamsCustom();
    const currentQuery = getQuery();
    const renderFn = cellData.column.columnDef.cell
    const { getContext } = cellData
    const context = getContext()
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

        case "new_status_AL":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={{
                        color: `${getStatusColor(stringValue)}`,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                    }}
                >
                    {highlight(stringValue, currentQuery.new_status_AL)}
                </span>
            );

        case "ralShortInfoView__RegNumber":
            const status = context.row.original.ralShortInfoView__new_status_AL
            const NPStatus = context.row.original.ralShortInfoView__NPStatus
            const link = row.ralShortInfoView__link
            return (
                <span className="flex items-center justify-between w-full">
                    <span className="flex-shrink-0 flex items-center justify-center">
                        <Circle outerColor={getNPStatusColor(NPStatus)} innerColor={getStatusColor(status)} />
                    </span>
                    <motion.span className="text-wrap overflow-hidden px-2 text-left" {...motionProperties}>
                        <a
                            className="underline text-current"
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >{highlight(stringValue, currentQuery.ralShortInfoView__fullName)}</a>
                    </motion.span>
                </span>
            );

        case "RegNumber":
            const status1 = context.row.original.new_status_AL
            const NPStatus1 = context.row.original.NPstatus
            return (
                <span className="flex items-center justify-between w-full">
                    <span className="flex-shrink-0 flex items-center justify-center">
                        <Circle outerColor={getNPStatusColor(NPStatus1)} innerColor={getStatusColor(status1)} />
                    </span>
                    <motion.span className="inline-block px-2 text-right" {...motionProperties}>
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
                </span>
            );

        case "ral_short_info_view__RegNumber":
            const status2 = context.row.original.ral_short_info_view__new_status_AL
            const NPStatus2 = context.row.original.ral_short_info_view__NPstatus
            console.log({status2, NPStatus2})
            return (
                <span className="flex items-center justify-between w-full">
                    {status2 && NPStatus2 && <span className="flex-shrink-0 flex items-center justify-center">
                          <Circle outerColor={getNPStatusColor(NPStatus2)} innerColor={getStatusColor(status2)} />
                    </span>}
                    <motion.span className="inline-block px-2 text-right" {...motionProperties}>
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
                </span>
            );

        case "technicalReglaments":
            const splitted = context.getValue() ? (context.getValue() as string).split(";") : [];
            return (
                <span
                    className={"text-left text-wrap overflow-hidden flex flex-col mx-auto px-2"}
                    title={context.getValue() as string | undefined}>
                    {splitted.map((item, key) => (
                        <span key={key} className="text-left line-clamp-2 overflow-hidden mb-2">
                            {highlight(item.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, ''), currentQuery.technicalReglaments)}
                        </span>
                    ))}
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
        case "productIdentificationName":
        case "productIdentificationArticle":
        case "update_status_date":
        case "previous_update_status_date":
        case "previous_status":
        case "blankNumber":
        case "applicantFilialFullNames":
        case "applicantName":
        case "manufacterName":
        case "manufacterFilialFullNames":
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
        // Поля ral_short_info_view
        case "ral_short_info_view__address":
        case "ral_short_info_view__regulations":
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