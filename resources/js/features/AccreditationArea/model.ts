import { TDefaultPaginationRequest } from "@/shared/types/pagination";

const AccreditationAreaModel = [
    'id', 
    'source_row', 
    'source_page', 
    'source_file', 
    'gost', 
    'gost_object', 
    'okpd', 
    'tn_ved', 
    'characteristic', 
    'characteristic_range',
    'id_ral'
] as const;

export type TAccreditationAreaModel = typeof AccreditationAreaModel[number];

export interface IAccreditationAreaDefaultRequest extends TDefaultPaginationRequest {
    order: TAccreditationAreaModel[]
    columns: TAccreditationAreaModel[]
}
