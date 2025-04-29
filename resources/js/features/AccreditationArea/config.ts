import { TDefaultPaginationRequest } from "@/shared/types/pagination";
import { IAccreditationAreaDefaultRequest, TAccreditationAreaModel } from "./model";

const DEFAULT_COLUMNS: TAccreditationAreaModel[] = [
    "characteristic", 
    "characteristic_range", 
    'gost', "gost_object", 
    "id", 
    "id_ral", 
    "okpd", 
    "source_file", 
    "source_page", 
    "source_row",
    "tn_ved",
];

const DEFAULT_FILTERS: TAccreditationAreaModel[] = ['gost', "tn_ved"]

const DEFAULT_REQUEST: IAccreditationAreaDefaultRequest = {
    page: 1,
    perPage: '10',
    order: ["id"],
    columns: DEFAULT_COLUMNS
}

export default {DEFAULT_FILTERS, DEFAULT_REQUEST}