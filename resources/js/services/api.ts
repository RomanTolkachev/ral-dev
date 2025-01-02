import axios from "axios";
import {IRalItem, TPaginatedRal} from "@/types/ral";
import AxiosXHR = Axios.AxiosXHR;

export const LOCAL_URL: "http://127.0.0.1:8000/api" = "http://127.0.0.1:8000/api"
// export const LOCAL_URL: "/api" = "/api"


const axiosApi = axios.create({
    baseURL: LOCAL_URL,
    timeout: 10000,
})

type TInput = {
    [key:string]: any
} | null

type TOutput = {
    [key:string]: any
}

const filterQueries = (dirty: TInput) => {
    if (!dirty) {
        return {}
    }
    return Object.keys(dirty).reduce((acc: TOutput, item) => {
        if (dirty[item]) {
            acc[item] = dirty[item]
        }
        return acc
    },{})
}


export const fetchRalFilters = axiosApi.get<IRalItem[]>("/ral/filters")
    .then((res)=> res.data)


export const fetchRal = (queries = null) => axiosApi.get("/ral", {
    params: filterQueries(queries),
})
    .then(res => res.data)
    .catch(err => Promise.reject(err))

export const fetchRalQuery = (queries = null): Axios.IPromise<TPaginatedRal> => axiosApi.get("/ral", {
    params: filterQueries(queries),
}).then(res => res.data)


