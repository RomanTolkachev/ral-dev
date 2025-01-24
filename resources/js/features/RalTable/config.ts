const PERIOD: number = 2

const currentDate = new Date();
const startdate = new Date(currentDate);
startdate.setFullYear(currentDate.getFullYear()-PERIOD)

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})

const DEFAULT_REQUEST = {
    page: 1,
    perPage: 10,
    status_change_date: [
        // dateFormatter.format(startdate),
        // dateFormatter.format(currentDate),
        "",""
    ],
}

export default DEFAULT_REQUEST;