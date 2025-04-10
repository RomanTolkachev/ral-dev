import axios from 'axios'
import qs from 'qs'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import IPagination from '../types/pagination'

// export const LOCAL_URL: 'http://127.0.0.1:8000/api' = 'http://127.0.0.1:8000/api'
export const LOCAL_URL: "/api" = "/api"

export const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    timeout: 10000,
})

export const fetchRalFilters = (queries: Record<string, any>) =>  
    axiosApi.get<ISearchingFormItem[]>('/ral/filters',{
        params: queries,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
})



export const fetchRalQuery = (queries: Record<string, any>) =>
    axiosApi.get<IPagination>(`/ral`, {
        params: queries,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
    })


export const fetchAccreditationAreaQuery = (queries: Record<string, any>) =>
    axiosApi.get<IPagination>(`/accreditation_area`, {
        params: queries,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
    })
