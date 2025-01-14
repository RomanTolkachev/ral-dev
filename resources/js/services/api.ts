import axios from 'axios'
import { IRalItem, TPaginatedRal } from '@/types/ral'
import * as qs from 'qs'

export const LOCAL_URL: 'http://127.0.0.1:8000/api' = 'http://127.0.0.1:8000/api'
// export const LOCAL_URL: "/api" = "/api"

const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    timeout: 10000,
})

export const fetchRalFilters = axiosApi.get<IRalItem[]>('/ral/filters')

export const fetchRalQuery = (queries: Record<string, any>) =>
    axiosApi.get<TPaginatedRal>(`/ral`, {
        params: queries,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
    })
