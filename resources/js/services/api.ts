import axios from "axios";
import {IRalItem} from "@/types/ral";

// export const LOCAL_URL: "http://127.0.0.1:8000/api" = "http://127.0.0.1:8000/api"
export const LOCAL_URL: "/api" = "/api"


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



// export const fetchRal = <T>():Axios.IPromise<any> => axiosApi.get('/ral')
//     .then(res => res.data)
//     .catch(err => Promise.reject(err))

// export const checkResponse = <T>(res: Response):Promise<T> => {
//     return  res.ok ? res.json() : res.json().then(err => Promise.reject(err))
// }
//
// export const fetchRal = <T>(): Promise<T> => {
//     return fetch(`${LOCAL_URL}/ral`).then((res: Response) => checkResponse(res));
// }
// export const fetchRalFilters = <T>(): Promise<T> => {
//     return fetch(`${LOCAL_URL}/ral/filters`).then((res: Response) => checkResponse(res));
// }
