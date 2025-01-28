function sortObject(object: Record<string, any>) {
    return Object.keys(object).sort().reduce((acc, key) => {
        acc[key] = object[key];
        return acc
    }, {} as Record<string, any>)
}

export default sortObject