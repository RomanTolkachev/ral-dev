function excludePaginationQueries(object: Record<string, any>) {
    return Object.keys(object).filter(item => {
        if (item !== "page" && item !== "perPage") {
            return item
        }
    }).reduce((acc, key) => {
        acc[key] = object[key]
        return acc
    }, {} as Record<string, any>)
}

export default excludePaginationQueries