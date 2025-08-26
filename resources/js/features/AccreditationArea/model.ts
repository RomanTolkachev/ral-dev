import { TDefaultPaginationRequest } from "@/shared/types/pagination";

const AccreditationAreaModel = [
    "source_row",
    "match_status", 
    "gost_object", 
    "okpd", 
    "tn_ved", 
    "characteristic", 
    "characteristic_range", 
    "source_page", 
    "id_ral", 
    "source_file", 
    "id", 
    "source_file_label", 
    "full_gost", 
    "ral_short_info_view__link", 
    "ral_short_info_view__RegNumber", 
    "ral_short_info_view__old_status_AL", 
    "ral_short_info_view__new_status_AL", 
    "ral_short_info_view__status_change_date", 
    "ral_short_info_view__nameType", 
    "ral_short_info_view__nameTypeActivity", 
    "ral_short_info_view__regDate", 
    "ral_short_info_view__fullName", 
    "ral_short_info_view__address", 
    "ral_short_info_view__applicantINN", 
    "ral_short_info_view__applicantFullName", 
    "ral_short_info_view__oaDescription", 
    "ral_short_info_view__id", 
    "ral_short_info_view__NPstatus", 
    "ral_short_info_view__NP_status_change_date", 
    "ral_short_info_view__regulations"] as const ;

export type TAccreditationAreaModel = typeof AccreditationAreaModel[number];

export interface IAccreditationAreaDefaultRequest extends TDefaultPaginationRequest {
    order?: TAccreditationAreaModel[] | ""
}
