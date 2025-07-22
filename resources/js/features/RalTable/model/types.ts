import ralConfig from '@/features/ralTable/config'
import { TDefaultPaginationRequest } from "@/shared/types/pagination";



const RAL_MODEL = [
    'ral_short_info_view.link', // это для join
    'nameType',
    'nameTypeActivity',
    'fullName',
    'address',
    'oaDescription',
    'NPstatus',
    'ral_short_info_view.id', // это для join
    'id', // это для перевода
    'link', // это для перевода
    'regDate',
    'NP_status_change_date',
    'applicantFullName',
    'old_status_AL',
    'new_status_AL',
    'applicantINN',
    'applicantINN',
    'RegNumber',
    'status_change_date',
    'regulations',
    'tnved',
    'regulation',
    "fullText"
] as const

export type TRalModel = typeof RAL_MODEL[number];

export interface TDefaultRalRequest extends TDefaultPaginationRequest {
    status_change_date: string[]
    user_columns: TRalModel[]
    regDate?: string[]
    NP_status_change_date?: string[]
    new_status_AL: string[]
    nameType: string[]
    NPstatus: string[]
}

