const PERIOD: number = 2

type TDefaultRalRequest = {
    page: number,
    perPage: string,
    status_change_date: string[]
    user_columns?: string[]
    regDate?: string[]
    NP_status_change_date?: string[]
    order: string
}

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear()-PERIOD)

export const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const DEFAULT_REQUEST:TDefaultRalRequest  = {
    page: 1,
    perPage: "10",
    status_change_date: [
        // dateFormatter.format(startdate),
        // dateFormatter.format(currentDate),
        "",""
    ],
    NP_status_change_date: ["",""],
    regDate: ["",""],
    order: ""
}

export default DEFAULT_REQUEST;