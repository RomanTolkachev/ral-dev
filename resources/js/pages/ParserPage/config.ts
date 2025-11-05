export const CONFIG = {
    exclude_tabs: ["decl"],
    dictionary: {
        fav: "Наши",
        ral: "РАЛ",
        all_certs_last_7_days: "Последние 7 дней",
        all_certs_with_changed_status: "Изменили статус",
        np: "Национальная часть",
        applicant: "заявители",
        auth: "Орган сертификации",
        cert_status_changes: "Историчность статуса",
        cert_gost_tnved_ral: "cert_gost_tnved_ral"
    },
    interval_options: [
        { value: "5000", label: "5 секунд" },
        { value: "10000", label: "10 секунд" },
        { value: "15000", label: "15 секунд" },
        { value: "30000", label: "30 секунд" },
        { value: "60000", label: "1 минута" },
        { value: "300000", label: "5 минут" },
        { value: "900000", label: "15 минут" },
        { value: "1800000", label: "30 минут" },
        { value: "3600000", label: "1 час" },
    ],
    refresh_time_ms: 30000,
}