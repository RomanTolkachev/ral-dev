import axios from 'axios'
import { TPaginatedRal } from '@/types/ral'
import qs from 'qs'
import { ISearchingFormItem } from '@/types/searchingFilters'

// export const LOCAL_URL: 'http://127.0.0.1:8000/api' = 'http://127.0.0.1:8000/api'
export const LOCAL_URL: "/api" = "/api"

const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    timeout: 10000,
})

export const fetchRalFilters = axiosApi.get<ISearchingFormItem[]>('/ral/filters')

export const fetchRalQuery = (queries: Record<string, any>) =>
    axiosApi.get<TPaginatedRal>(`/ral`, {
        params: queries,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
    })
