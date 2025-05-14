import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { IAccreditationAreaDefaultRequest, TAccreditationAreaModel } from "./model";


const DICTIONARY: Record<TAccreditationAreaModel, string> ={
    id: "ID",
    gost: "ГОСТ",
    characteristic: "Характеристика",
    id_ral: "Лаборатория",
    okpd: "ОКПД",
    characteristic_range: "Область аккредитации",
    tn_ved: "ТН ВЭД",
    gost_object: "расшифровка ГОСТ",
    source_file: "Файл-источник",
    source_page: "Страница в источнике",
    source_row: "Пункт в источнике",
    match_status: 'Совпадение поиска'
}

const DEFAULT_COLUMNS: TAccreditationAreaModel[] = [
    // "id", 
    "characteristic", 
    "characteristic_range", 
    'gost', "gost_object", 
    "id_ral", 
    "okpd", 
    "source_file", 
    "source_page", 
    "source_row",
    "tn_ved",
];

const DEFAULT_FILTERS: Partial<Record<TAccreditationAreaModel, string[]>> & TDefaultPaginationRequest = {
    gost : [], 
    tn_ved: [],     
    page: 1,
    perPage: "10" 
}

const DEFAULT_REQUEST: IAccreditationAreaDefaultRequest = {
    page: 1,
    perPage: '10',
    // order: ["id"],
    user_columns: DEFAULT_COLUMNS
}

export default {DEFAULT_FILTERS, DEFAULT_REQUEST, DEFAULT_COLUMNS, DICTIONARY}