import { TDefaultRalRequest, TRalModel } from "./model/types"

const PERIOD: number = 2

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear()-PERIOD)

export const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const RAL_MODEL = [
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
] as const

const DEFAULT_COLUMNS: TRalModel[]  = [
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

const DEFAULT_FILTERS: TRalModel[]  = [
    'regDate',
    'status_change_date',
    'nameType',
    'new_status_AL',
    'ral_short_info_view.id',
    'NPstatus',
    'NP_status_change_date',
    'np_regulations_tnveds.tnved',
    'ral_short_info_view.regulations',
];

const DICTIONARY:Record<string, string> = {
    ["ral_short_info_view.link"]: 'Ссылка',
    RegNumber: 'Рег. номер',
    old_status_AL: 'Предыдущий статус',
    new_status_AL: 'Акт. статус',
    status_change_date: 'Дата смены статуса',
    nameType: 'Тип АЛ',
    nameTypeActivity: 'Тип направления деятельности',
    regDate: 'Дата рег.',
    fullName: 'Полное наименование',
    address: 'Адрес',
    applicantFullName: 'Наименование',
    applicantINN: 'ИНН',
    oaDescription: 'Описание',
    NPstatus: 'Статус НЧ',
    id: 'id',
    NP_status_change_date: 'Дата изм. статуса НЧ',
    fullText: 'Поиск',
    tnved: 'ТН ВЭД (НЧ)',
    regulation: 'ТР ТС/ЕАЭС (НЧ)',
    regulations: 'ТР ТС/ЕАЭС (НЧ)',
}

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
    new_status_AL: [],
    order: "",
    nameType: [],
    NPstatus: [],
    columns: DEFAULT_COLUMNS
}

export default { DEFAULT_REQUEST, DEFAULT_COLUMNS, RAL_MODEL, DICTIONARY, DEFAULT_FILTERS }