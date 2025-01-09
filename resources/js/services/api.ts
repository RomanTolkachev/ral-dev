import axios from 'axios'
import { IRalItem, TPaginatedRal } from '@/types/ral'

export const LOCAL_URL: 'http://127.0.0.1:8000/api' = 'http://127.0.0.1:8000/api'
// export const LOCAL_URL: "/api" = "/api"

const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    timeout: 10000,
})

export const fetchRalFilters = axiosApi.get<IRalItem[]>('/ral/filters')

export const fetchRalQuery = (queries) =>
    axiosApi.get<TPaginatedRal>('/ral', {
        params: queries,
    })
