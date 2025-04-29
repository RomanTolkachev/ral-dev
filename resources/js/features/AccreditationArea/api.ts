import { axiosApi } from "@/shared/api/api"
import { ISearchingFormItem } from "@/shared/types/searchingFilters"
import qs from "qs"

export const fetchAccreditationAreaFilters = (queries?: Record<string, any>) => {
    return axiosApi.get<ISearchingFormItem[]>('/accreditation_area/filters', {
        params: queries,
        withCredentials: true,
        paramsSerializer: params => decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' })), 
    }).then(res => res.data)
}