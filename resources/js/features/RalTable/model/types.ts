import { RAL_MODEL } from "@/features/AccreditationArea/config";
import { TDefaultPaginationRequest } from "@/shared/types/pagination";

export type TRalModel = typeof RAL_MODEL[number];

export interface TDefaultRalRequest extends TDefaultPaginationRequest {
    status_change_date: string[]
    columns: TRalModel[]
    regDate?: string[]
    NP_status_change_date?: string[]
    new_status_AL: string[]
    nameType: string[]
    NPstatus: string[]
}

