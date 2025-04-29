import axios from 'axios'
import qs from 'qs'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import IPagination from '../types/pagination'
import { IUser } from '../types/user'
import { TRalTableModel } from '@/features/ralTable/config'

// export const LOCAL_URL: 'http://127.0.0.1:8000/api' = 'http://127.0.0.1:8000/api'
export const LOCAL_URL: "/api" = "/api"
export const WEB_URL: "/" = "/"

export const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    withCredentials: true,
    timeout: 10000,
})

const webApi = axios.create({
    baseURL: WEB_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        Accept: "aplication/json"
    }
})

export const fetchRalFilters = (queries: Record<string, any>) =>
    axiosApi.get<ISearchingFormItem[]>('/ral/filters', {
        params: queries,
        withCredentials: true,
        paramsSerializer: function (params) {
            return decodeURIComponent(qs.stringify(params, { arrayFormat: 'brackets' }))
        },
    })

export const fetchRalQuery = (queries: Record<string, any>) =>
    axiosApi.get<IPagination>(`/ral`, {
        params: queries,
        withCredentials: true,
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

export const fetchCookies = () => {
    return webApi.get<void>(`/sanctum/csrf-cookie`);
}

export const login = async (payload: {email: string, password: string}):Promise<IUser> => {
    await fetchCookies()
    return axiosApi.post(`/login`, {
        email: payload.email,
        password: payload.password,
      }, {
        withCredentials: true, 
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }
    })
}

export const getUser = () => {
    return axiosApi.get<IUser>(`/user`, {
        headers: {Accept: "application/json" },
        withCredentials: true,
    }).then(res => res.data)
}

export const getTableSettings = (userId: string, tableName: string): Promise<TRalTableModel[]> => {
    return axiosApi.get<TRalTableModel[]>(`/settings`, {
        params: {userId, tableName},
        headers: {
            Accept: "application/json", 
            'Content-Type': 'application/json', 
        },
        withCredentials: true,
    }).then(res => res.data)
}

export const logOut = (): Promise<IUser> => {
    return axiosApi.post('/log_out', {}, {
        withCredentials: true,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }
    });
}
