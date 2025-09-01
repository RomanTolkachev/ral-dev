import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { IAccreditationAreaDefaultRequest, TAccreditationAreaModel } from "./model";


const DICTIONARY: Record<TAccreditationAreaModel, string> = {
    id: "ID",
    characteristic: "Определяемая характеристика (Показатель)",
    id_ral: "Лаборатория",
    okpd: "КОД ОКПД 2",
    characteristic_range: "Диапазон определения",
    tn_ved: "КОД ТН ВЭД ЕАЭС",
    gost_object: "Наименование объекта",
    source_file: "Файл-источник",
    source_page: "Страница в источнике",
    source_row: "Пункт в источнике",
    match_status: 'Совпадение поиска',
    source_file_label: 'Тип области',
    ral_short_info_view__fullName: "Лаборатория",
    ral_short_info_view__RegNumber: "Рег. номер",
    ral_short_info_view__custom_number: "Рег. номер (расш.)",
    full_gost: "ГОСТ",
    ral_short_info_view__NPstatus: "Статус НЧ",
    ral_short_info_view__new_status_AL: "Текущий статус",
    ral_short_info_view__link: "ссылка",
    ral_short_info_view__id: "ID рал",
    ral_short_info_view__address: "адрес",
    ral_short_info_view__applicantFullName: "заявитель",
    ral_short_info_view__applicantINN: "ИНН",
    ral_short_info_view__nameType: "тип наименования",
    ral_short_info_view__nameTypeActivity: "nameTypeActivity",
    ral_short_info_view__NP_status_change_date: "дата смены статуса НЧ",
    ral_short_info_view__oaDescription: "описание деятельности",
    ral_short_info_view__old_status_AL: "предыдущий статус",
    ral_short_info_view__regDate: "дата регистрации",
    ral_short_info_view__regulations: "regulations",
    ral_short_info_view__status_change_date: "дата изменения статуса"
}

const DEFAULT_FILTERS: Partial<Record<TAccreditationAreaModel, string[]>> & TDefaultPaginationRequest = {
    tn_ved: [],
    full_gost: [],
    gost_object: [],
    id_ral: [],
    source_file_label: [],
    page: 1,
    perPage: "25",
    ral_short_info_view__RegNumber: [],
    ral_short_info_view__fullName: []
}

const DEFAULT_REQUEST: IAccreditationAreaDefaultRequest = {
    page: 1,
    perPage: '25',
    order: ""
}

const CELL_WIDTH: Partial<Record<TAccreditationAreaModel, number>> = {
    ral_short_info_view__RegNumber: 220,
    source_file_label: 60,
    characteristic_range: 120,
    source_row: 90,
    source_page: 120,
    tn_ved: 90,
    okpd: 70,
    id_ral: 120,
    gost_object: 300,
    full_gost: 300,
    ral_short_info_view__custom_number: 210
}

const ORDERABLE_CELLS: TAccreditationAreaModel[] = [];
const HIDDEN_COLUMNS: TAccreditationAreaModel[] = ["ral_short_info_view__NPstatus", "ral_short_info_view__new_status_AL", "ral_short_info_view__link", "ral_short_info_view__id",];

export const config: IConfig<TAccreditationAreaModel> = {
    DICTIONARY,
    ROW_CLICK_FN: "none",
    TABLE_NAME: "accreditation_area",
    DEFAULT_REQUEST,
    CELL_WIDTH,
    ORDERABLE_CELLS,
    HIDDEN_COLUMNS
}

export default { DEFAULT_FILTERS, DEFAULT_REQUEST, DICTIONARY, CELL_WIDTH, ORDERABLE_CELLS }