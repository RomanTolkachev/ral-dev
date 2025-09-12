import highlight from "@/shared/ui/Table/lib/highlightText";
import useParamsCustom from "@/shared/query/useParamsCustom";
import { Cell } from "@tanstack/react-table";
import { FC, ReactNode } from "react";
import { getNPStatusColor, getStatusColor } from "./lib/getColor";
import { LinkWithCircle } from "./LinkWithCircle/LinkWithCircle";
import { TNPStatus, TStatus } from "./model";
import { TColumnAccessors } from "@/features";
import { Tooltip } from "@/Components/toolTip/ToolTip";
import { makeClamp, makeList } from "./lib";

type Props = {
    cellData: Cell<any, unknown>
}

const formatCellValue = (value: unknown) => String(value).replace(/([,;])([^ ])/g, '$1 $2');

export const CustomCell: FC<Props> = (
    { cellData }
): ReactNode => {
    const [_, getQuery] = useParamsCustom();
    const currentQuery = getQuery();
    const { getContext } = cellData
    const context = getContext()
    const columnID = context.column.id as Partial<TColumnAccessors>;
    const value = context.getValue();
    const stringValue = formatCellValue(value);

    switch (columnID) {
        // accreditation_area
        case "characteristic":
            return (
                <Tooltip hideDelay={350} distanceFromTrigger={-25} content={makeList(stringValue, { delimiter: ";", showBullets: true })}>
                    <span
                        className="text-wrap overflow-hidden w-full mx-auto line-clamp-3 break-all"
                        style={makeClamp(3)}
                    >
                        {highlight(stringValue, currentQuery.tn_ved)}
                    </span>
                </Tooltip>
            );
        case "characteristic_range":
            return (
                <Tooltip hideDelay={350} distanceFromTrigger={-25} content={makeList(stringValue, { delimiter: ";", showBullets: true })}>
                    <span
                        className="text-wrap overflow-hidden w-full mx-auto line-clamp-3 break-all"
                        style={makeClamp(3)}
                    >
                        {makeList(stringValue, { liClassName: "line-clamp-1", maxLiItems: 3 })}
                    </span>
                </Tooltip>
            );
        case "tn_ved":
            return (
                <Tooltip hideDelay={350} distanceFromTrigger={-25} content={highlight(stringValue, currentQuery.tn_ved)}>
                    <span
                        className="text-wrap overflow-hidden w-full mx-auto line-clamp-3 break-all"
                        style={makeClamp(3)}
                    >
                        {highlight(stringValue, currentQuery.tn_ved)}
                    </span>
                </Tooltip>
            );
        case "full_gost":
            return (
                <Tooltip hideDelay={350} distanceFromTrigger={-25} content={highlight(stringValue, currentQuery.full_gost)}>
                    <span
                        className="text-wrap overflow-hidden w-full mx-auto line-clamp-3 break-all"
                    >
                        {highlight(stringValue, currentQuery.tn_ved)}
                    </span>
                </Tooltip>
            );
        case "okpd":
            return (
                <Tooltip alwaysShow hideDelay={350} distanceFromTrigger={-25} content={stringValue}>
                    <div
                        className="text-wrap overflow-hidden w-full mx-auto break-all"
                    // style={makeClamp(3)}
                    >
                        {makeList(stringValue, { maxLiItems: 3, showMoreText: "howMany" })}

                    </div>
                </Tooltip>
            );
        case "gost_object":
            return (
                <Tooltip alwaysShow hideDelay={350} distanceFromTrigger={-25} content={makeList(stringValue, { showBullets: true })}>
                    <span
                        className="text-wrap overflow-hidden w-full mx-auto break-all text-start"
                    // style={makeClamp(3)}
                    >
                        {makeList(stringValue, { highlightPattern: currentQuery.gost_object, maxLiItems: 3, showMoreText: "howMany", showBullets: true, liClassName: "line-clamp-1" })}
                    </span>
                </Tooltip>
            );

        case "ral_short_info_view__fullName":
            return (
                <span className="text-wrap overflow-hidden mx-auto">
                    {highlight(stringValue, currentQuery.ral_short_info_view__fullName)}
                </span>
            );

        case "regulations":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={makeClamp(3)}
                >
                    {highlight(stringValue, currentQuery.regulations)}
                </span>
            );

        case "tnved":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={makeClamp(3)}
                >
                    {highlight(stringValue, currentQuery.tnved)}
                </span>
            );


        case "new_status_AL":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={makeClamp(3)}
                >
                    {stringValue}
                </span>
            );

        case "RegNumber":
        case "ral_short_info_view__RegNumber":
            return highlight(stringValue, currentQuery.ral_short_info_view__RegNumber) as string | null
        case "NPstatus":
            return <span style={{ color: value === "Не применимо" ? value : getNPStatusColor(stringValue as TNPStatus) }}>{value as ReactNode}</span>

        case "NP_status_change_date":
            return value ? <span>{value as ReactNode}</span> : <span className="w-full text-center">нет данных</span>;

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

        case "certificate_status":
            return <span style={{ color: getStatusColor(stringValue as TStatus) }}>{value as ReactNode}</span>

        case "custom_number":
        case "laboratory":
        case "ral_short_info_view__custom_number":
            const splittedRals = stringValue.split(/(?<!https:)\/\//);

            if (!stringValue || stringValue === "") {
                return "нет данных";
            }

            return splittedRals.map((ralString, index) => {
                if (!ralString || ralString === "null") {
                    return <div key={index}>нет данных</div>;
                }

                const [NPstatus = "", status = "", numberValue = "", link = ""] = ralString.split("*") as [TNPStatus, TStatus, string, string];
                const shouldAddMargin = splittedRals.length > 1 && index !== splittedRals.length - 1;
                const containerClassName = shouldAddMargin ? "mb-2" : "";

                return (
                    <div key={index} className={containerClassName}>
                        <LinkWithCircle
                            npStatus={NPstatus}
                            status={status}
                            link={link}
                            value={highlight(numberValue, currentQuery.ral_short_info_view__RegNumber ?? currentQuery.ral_short_info_view__custom_number) as string | null}
                            queryValue={""}
                        />
                    </div>
                );
            });

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
        case "productIdentificationType":
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
        case "ral_short_info_view__oaDescription":
        case "oaDescription":
        case "productIdentificationModel":
        case "address":
        // Поля status_change
        case "status_change__comment":
        case "source_file":
            return (
                <Tooltip hideDelay={350} distanceFromTrigger={-25} content={stringValue}>
                    <span
                        className="text-wrap mx-auto line-clamp-2 break-all"
                    // title={stringValue}
                    >
                        {stringValue}
                    </span>
                </Tooltip>
            );

        default:
            return highlight(stringValue, currentQuery.fullText);
    }
}