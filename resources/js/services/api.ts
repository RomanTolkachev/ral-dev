export const LOCAL_URL: "http://127.0.0.1:8000/api" = "http://127.0.0.1:8000/api"

export const checkResponse = <T>(res: Response):Promise<T> => {
    return  res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const fetchRal = <T>(): Promise<T> => {
    return fetch(`${LOCAL_URL}/ral`).then((res: Response) => checkResponse(res));
}
export const fetchRalFilters = <T>(): Promise<T> => {
    return fetch(`${LOCAL_URL}/ral/filters`).then((res: Response) => checkResponse(res));
}


