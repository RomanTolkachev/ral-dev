
const PERIOD: number = 2

type TDefaultRalRequest = {
    page: number,
    perPage: string,
    status_change_date: string[]
    user_columns?: string[]
    regDate?: string[]
    NP_status_change_date?: string[]
    order: string
}

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear()-PERIOD)

export const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const DEFAULT_REQUEST:TDefaultRalRequest  = {
    page: 1,
    perPage: "10",
    status_change_date: [
        // dateFormatter.format(startdate),
        // dateFormatter.format(currentDate),
        "",""
    ],
    NP_status_change_date: ["",""],
    regDate: ["",""],
    order: "",
    user_columns: [""]
}

const RAL_COLUMNS = [
    'ral_short_info_view.link',
    'nameType',
    'nameTypeActivity',
    'fullName',
    'address',
    'oaDescription',
    'NPstatus',
    'ral_short_info_view.id',
    'regDate',
    'NP_status_change_date',
    'applicantFullName',
    'new_status_AL',
    'applicantINN',
    'applicantINN',
    'RegNumber',
    'status_change_date',
    'np_regulations_tnveds.tnved',
    'np_regulations_tnveds.regulation',
    'ral_short_info_view.regulations'
] as const;

export type TRalTableModel = typeof RAL_COLUMNS[number];

const DEFAULT_COLUMNS: TRalTableModel[]  = [
    'applicantFullName',
    'RegNumber',
    'regDate',
    'ral_short_info_view.link',
    'status_change_date',
    'nameType',
    'new_status_AL',
    'ral_short_info_view.id',
    'applicantINN',
    'NPstatus',
    'NP_status_change_date',
    'np_regulations_tnveds.tnved',
    'ral_short_info_view.regulations',
];

export default { DEFAULT_REQUEST, DEFAULT_COLUMNS, RAL_COLUMNS }