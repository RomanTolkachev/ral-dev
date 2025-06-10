import { TDefaultPaginationRequest } from "@/shared/types/pagination";

const AccreditationAreaModel = [
    'id', 
    "RegDate",
    'source_file_label',
    'source_row', 
    'source_page', 
    'source_file', 
    'gost', 
    'gost_object', 
    'okpd', 
    'tn_ved', 
    'characteristic', 
    'characteristic_range',
    'id_ral',
    'match_status',
    "ralShortInfoView__RegNumber",
    "ralShortInfoView__fullName",
] as const;

export type TAccreditationAreaModel = typeof AccreditationAreaModel[number];

export interface IAccreditationAreaDefaultRequest extends TDefaultPaginationRequest {
    order?: TAccreditationAreaModel[]
    user_columns: TAccreditationAreaModel[]
}
