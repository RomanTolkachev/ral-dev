import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { IAccreditationAreaDefaultRequest, TAccreditationAreaModel } from "./model";


const DICTIONARY: Record<TAccreditationAreaModel, string> ={
    id: "ID",
    gost: "ГОСТ",
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
    source_file_label: 'Тип области'
}

const DEFAULT_COLUMNS: TAccreditationAreaModel[] = [
    // "id", 
    "id_ral", 
    "source_file_label",
    "source_file", 
    "source_page", 
    "source_row",
    'gost', 
    "characteristic", 
    "characteristic_range", 
    "gost_object", 
    "okpd", 
    "tn_ved",
];

const DEFAULT_FILTERS: Partial<Record<TAccreditationAreaModel, string[]>> & TDefaultPaginationRequest = {
    gost : [], 
    tn_ved: [], 
    source_file_label: [],    
    page: 1,
    perPage: "10" 
}

const DEFAULT_REQUEST: IAccreditationAreaDefaultRequest = {
    page: 1,
    perPage: '10',
    user_columns: DEFAULT_COLUMNS
}

const CELL_WIDTH: Partial<Record<TAccreditationAreaModel, number>> = {
    source_file_label: 60,
    characteristic_range: 120,
    source_row: 90,
    source_page: 120,
    tn_ved: 90,
    okpd: 70,
    gost: 80,
    id_ral: 120,
}

export default {DEFAULT_FILTERS, DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY, CELL_WIDTH}