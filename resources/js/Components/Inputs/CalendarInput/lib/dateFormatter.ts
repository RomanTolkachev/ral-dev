
export function formatToDDMMYYYY(rawDate: string) {

    if (rawDate === "") {
        return rawDate
    }

    const date = new Date(rawDate)

    const formattedDate = Intl.DateTimeFormat('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date)

    return formattedDate
}

export function formatToYYYYMMDD(rawDate: string) {

    if (rawDate === "") {
        return rawDate
    }
    const date = new Date(rawDate)

    const formattedDate = Intl.DateTimeFormat('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date)

    return formattedDate
}