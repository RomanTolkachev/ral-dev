import highlight from "@/shared/highlightText";
import useParamsCustom from "@/shared/query/useParamsCustom";
import { Cell } from "@tanstack/react-table";
import { FC, ReactNode, useRef } from "react";
import { getNPStatusColor, getStatusColor } from "./lib/getColor";
import { LinkWithCircle } from "./LinkWithCircle/LinkWithCircle";
import { TNPStatus, TStatus } from "./model";
import { TColumnAccessors } from "@/features";
import { Tooltip } from "@/Components/toolTip/ToolTip";
import { makeClamp, makeList } from "./lib";

type Props = {
    cellData: Cell<any, unknown>;
};

const formatCellValue = (value: unknown) =>
    String(value).replace(/([,;])([^ ])/g, "$1 $2");

export const CustomCell: FC<Props> = ({ cellData }): ReactNode => {
    const [_, getQuery] = useParamsCustom();
    const currentQuery = getQuery();
    const { getContext } = cellData;
    const context = getContext();
    const rowData = context.row.original;
    const value = context.getValue();
    const stringValue = formatCellValue(value);

    const columnID = (
        context.column.id === "param"
            ? "param"
            : rowData.__meta?.originalKey || context.column.id
    ) as Partial<TColumnAccessors>;

    const triggerRef = useRef<HTMLSpanElement | null>(null);

    const wrapWithTooltip = (content: ReactNode, tooltipContent: ReactNode) => (
        <span
            ref={triggerRef}
            className="text-wrap overflow-hidden w-full mx-auto break-all line-clamp-3"
            style={makeClamp(3)}
        >
            {content}
            <Tooltip
                triggerRef={triggerRef}
                delay={500}
                hideDelay={350}
                distanceFromTrigger={-25}
                content={tooltipContent}
            />
        </span>
    );

    switch (columnID) {
        case "characteristic":
            return wrapWithTooltip(
                highlight(stringValue, currentQuery.tn_ved),
                makeList(stringValue, { delimiter: ";", showBullets: true })
            );

        case "characteristic_range":
            return wrapWithTooltip(
                makeList(stringValue, { liClassName: "line-clamp-2", maxLiItems: 3 }),
                makeList(stringValue, { delimiter: ";", showBullets: true })
            );

        case "tn_ved":
            return wrapWithTooltip(
                highlight(stringValue, currentQuery.tn_ved),
                highlight(stringValue, currentQuery.tn_ved)
            );

        case "full_gost":
            return wrapWithTooltip(
                highlight(stringValue, currentQuery.tn_ved),
                highlight(stringValue, currentQuery.full_gost)
            );
        case "ral_short_info_view__oaDescription":
        case "oaDescription":
        case "ral_short_info_view__address":
        case "address":
        case "manufacterFilialFullNames":
        case "fullName":
        case "applicantFullName":
        case "productFullName":
        case "applicantFilialFullNames":
        case "productIdentificationName":
        case "productBatchSize":
        case "productIdentificationArticle":
        case "productIdentificationGtin":
        case "productIdentificationModel":
        case "productIdentificationSort":
        case "productIdentificationTrademark":
        case "productIdentificationType":
        case "productOrig":
        case "certObjectType":
        case "certType":
        case "group":
        case "status_change__comment":
            return wrapWithTooltip(
                <span style={makeClamp(2)}>{stringValue}</span>,
                stringValue,
            );

        case "okpd":
            return wrapWithTooltip(
                makeList(stringValue, { maxLiItems: 3, showMoreText: "howMany" }),
                stringValue
            );

        case "gost_object":
            return wrapWithTooltip(
                makeList(stringValue, {
                    highlightPattern: currentQuery.gost_object,
                    maxLiItems: 3,
                    showMoreText: "howMany",
                    showBullets: true,
                    liClassName: "line-clamp-1",
                }),
                makeList(stringValue, { showBullets: true })
            );

        case "ral_short_info_view__fullName":
            return (
                <span className="text-wrap overflow-hidden mx-auto">
                    {highlight(stringValue, currentQuery.ral_short_info_view__fullName)}
                </span>
            );

        case "ral_short_info_view__regulations":
        case "regulations":
            const transposed = !!rowData.__meta?.isTransposed;
            const regulationsContent = makeList(stringValue, {
                highlightPattern: currentQuery.regulations,
                maxLiItems: 3,
                showMoreText: "howMany",
                showBullets: true,
                liClassName: "line-clamp-1",
            });

            return transposed ? (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    style={makeClamp(3)}
                >
                    {regulationsContent}
                </span>
            ) : (
                wrapWithTooltip(regulationsContent, makeList(stringValue, {
                    delimiter: ";",
                    showBullets: true,
                    highlightPattern: currentQuery.regulations,
                }))
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

        case "old_status_AL":
        case "new_status_AL":
            return (
                <span
                    className="text-wrap overflow-hidden mx-auto line-clamp-3"
                    title={stringValue}
                    style={{
                        ...makeClamp(3),
                        color: getStatusColor(stringValue as TStatus),
                    }}
                >
                    {stringValue}
                </span>
            );

        case "RegNumber":
        case "ral_short_info_view__RegNumber":
            return highlight(stringValue, currentQuery.ral_short_info_view__RegNumber) as string | null;
        case "applicantName":
            return highlight(stringValue, currentQuery.applicantName) as string | null;
        case "NPstatus":
            return (
                <span
                    style={{
                        color: stringValue === "Не применимо"
                            ? undefined
                            : getNPStatusColor(stringValue as TNPStatus),
                    }}
                >
                    {value as ReactNode}
                </span>
            );

        case "NP_status_change_date":
            return value ? <span>{value as ReactNode}</span> : <span className="w-full text-center">нет данных</span>;

        case "technicalReglaments":
            const splitted = context.getValue() ? (context.getValue() as string).split(";") : [];
            return (
                <span className="text-left text-wrap overflow-hidden flex flex-col mx-auto px-2" title={context.getValue() as string | undefined}>
                    {splitted.map((item, key) => (
                        <span key={key} className="text-left line-clamp-2 overflow-hidden mb-2">
                            {highlight(item.replace(/\d{2}:\d{2}:\d{2}\.\d{3}/g, ''), currentQuery.technicalReglaments)}
                        </span>
                    ))}
                </span>
            );

        case "expertFio":
            return highlight(stringValue, currentQuery.expertFio) as string | null;

        case "certificate_status":
            return <span style={{ color: getStatusColor(stringValue as TStatus) }}>{value as ReactNode}</span>;

        case "custom_number":
        case "custom_certification_authority":
        case "ral_short_info_view__custom_number":
            const splittedRals = stringValue.split(/(?<!https:)\/\//);
            if (!stringValue || stringValue === "") return "нет данных";

            return splittedRals.map((ralString, index) => {
                if (!ralString || ralString === "null") return <div key={index}>нет данных</div>;
                const [NPstatus = "", status = "", numberValue = "", link = ""] = ralString.split("*") as [TNPStatus, TStatus, string, string];

                return (
                    <div key={index} className={splittedRals.length > 1 && index !== splittedRals.length - 1 ? "mb-2" : ""}>
                        <LinkWithCircle
                            npStatus={NPstatus}
                            status={status}
                            link={link}
                            value={highlight(numberValue, currentQuery.ral_short_info_view__RegNumber ?? currentQuery.ral_short_info_view__custom_number ?? currentQuery.custom_certification_authority) as string | null}
                            queryValue=""
                        />
                    </div>
                );
            });

        // Простые текстовые поля
        default:
            return stringValue;
    }
};
