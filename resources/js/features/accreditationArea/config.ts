type TDefaultRalRequest = {
    page: number,
    perPage: number,
    user_columns?: string[]
}

const DEFAULT_REQUEST:TDefaultRalRequest  = {
    page: 1,
    perPage: 10,
}

export default DEFAULT_REQUEST;