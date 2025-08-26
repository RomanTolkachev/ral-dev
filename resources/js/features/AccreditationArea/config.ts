import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { IAccreditationAreaDefaultRequest, TAccreditationAreaModel } from "./model";


const DICTIONARY: Record<TAccreditationAreaModel, string> ={
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
    RegDate: "Рег. номер",
    ralShortInfoView__fullName: "Лаборатория",
    ralShortInfoView__RegNumber: "Рег. номер",
    full_gost: "ГОСТ",
    ralShortInfoView__NPStatus: "Статус НЧ",
    ralShortInfoView__new_status_AL: "Текущий статус",
    ralShortInfoView__link: "ссылка"
}

const DEFAULT_COLUMNS: TAccreditationAreaModel[] = [
    "ralShortInfoView__fullName", // двойное подчеркивание
    "ralShortInfoView__RegNumber", 
    "ralShortInfoView__NPStatus", 
    "ralShortInfoView__new_status_AL",
    "ralShortInfoView__link", 
    "id_ral",
    "source_file_label",
    "source_file", 
    "source_page", 
    "source_row",
    "full_gost",
    "characteristic", 
    "characteristic_range", 
    "gost_object", 
    "okpd", 
    "tn_ved",
];

const DEFAULT_FILTERS: Partial<Record<TAccreditationAreaModel, string[]>> & TDefaultPaginationRequest = {
    tn_ved: [], 
    full_gost: [],
    gost_object: [],
    id_ral: [],
    source_file_label: [],    
    page: 1,
    perPage: "25",
    ralShortInfoView__RegNumber: [],
    ralShortInfoView__fullName: []
}

const DEFAULT_REQUEST: IAccreditationAreaDefaultRequest = {
    page: 1,
    perPage: '25',
    user_columns: DEFAULT_COLUMNS
}

const CELL_WIDTH: Partial<Record<TAccreditationAreaModel, number>> = {
    ralShortInfoView__RegNumber: 180,
    source_file_label: 60,
    characteristic_range: 120,
    source_row: 90,
    source_page: 120,
    tn_ved: 90,
    okpd: 70,
    id_ral: 120,
    gost_object: 300,
    full_gost: 300
}

const ORDERABLE_CELLS:TAccreditationAreaModel[] = [];
const HIDDEN_COLUMNS:TAccreditationAreaModel[] = ["ralShortInfoView__NPStatus", "ralShortInfoView__new_status_AL", "ralShortInfoView__link",];

export const config: IConfig<TAccreditationAreaModel> = {
    DICTIONARY,
    ROW_CLICK_FN: () => {},
    TABLE_NAME: "accreditation_area",
    DEFAULT_REQUEST,
    CELL_WIDTH,
    ORDERABLE_CELLS,
    HIDDEN_COLUMNS
}

export default {DEFAULT_FILTERS, DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY, CELL_WIDTH, ORDERABLE_CELLS}