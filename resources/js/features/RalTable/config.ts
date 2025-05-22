import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { TDefaultRalRequest, TRalModel } from "./model/types"

const PERIOD: number = 2

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear() - PERIOD)

export const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const DEFAULT_COLUMNS: TRalModel[] = [
    "fullName",
    'applicantFullName',
    'RegNumber',
    'regDate',
    'status_change_date',
    'nameType',
    'new_status_AL',
    'applicantINN',
    'NPstatus',
    'ral_short_info_view.id',
    'ral_short_info_view.link',
    'NP_status_change_date',
    'tnved',
    'regulations',
];

const DEFAULT_FILTERS: Partial<Record<TRalModel | "fullText" , string[]>> & TDefaultPaginationRequest = {
    ["regDate"]: ["", ""],
    ["status_change_date"]: ["", ""],
    ["nameType"]: [],
    ["new_status_AL"]: [],
    ["NPstatus"]: [],
    ["NP_status_change_date"]: ["", ""],
    ["tnved"]: [],
    ["regulation"]: [],
    page: 1,
    perPage: "10",
    order: "",
    fullText: [],
};

const DICTIONARY: Record<TRalModel, string> = {
    ["ral_short_info_view.link"]: 'Ссылка',
    RegNumber: 'Рег. номер',
    old_status_AL: 'Предыдущий статус',
    new_status_AL: 'Акт. статус',
    status_change_date: 'Дата смены статуса',
    nameType: 'Тип АЛ',
    nameTypeActivity: 'Тип направления деятельности',
    regDate: 'Дата рег.',
    fullName: 'Наименование АЛ',
    address: 'Адрес',
    applicantFullName: 'Наименование ЮЛ',
    applicantINN: 'ИНН',
    oaDescription: 'Описание',
    NPstatus: 'Статус НЧ',
    ["ral_short_info_view.id"]: 'id',
    NP_status_change_date: 'Дата изм. статуса НЧ',
    fullText: 'Поиск',
    tnved: 'ТН ВЭД (НЧ)',
    regulation: 'ТР ТС/ЕАЭС (НЧ)',
    regulations: 'ТР ТС/ЕАЭС (НЧ)',
}

const DEFAULT_REQUEST: TDefaultRalRequest = {
    page: 1,
    perPage: "10",
    status_change_date: [
        // dateFormatter.format(startdate),
        // dateFormatter.format(currentDate),
        "", ""
    ],
    NP_status_change_date: ["", ""],
    regDate: ["", ""],
    new_status_AL: [],
    order: "",
    nameType: [],
    NPstatus: [],
    user_columns: DEFAULT_COLUMNS
}

export default { DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY, DEFAULT_FILTERS }