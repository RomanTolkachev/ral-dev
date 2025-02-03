const PERIOD: number = 2

type TDefaultRalRequest = {
    page: number,
    perPage: number,
    status_change_date: string[]
    user_columns?: string[]
    regDate?: string[]
}

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear()-PERIOD)

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const DEFAULT_REQUEST:TDefaultRalRequest  = {
    page: 1,
    perPage: 10,
    status_change_date: [
        // dateFormatter.format(startdate),
        // dateFormatter.format(currentDate),
        "",""
    ],
    regDate: ["",""]
}

export default DEFAULT_REQUEST;