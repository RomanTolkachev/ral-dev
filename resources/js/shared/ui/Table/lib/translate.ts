
function createTranslateFn(dictionary: Record<string, string>):(raw: string) => string {
    return function(raw: string) {
        return dictionary[raw] ?? raw
    }
}

export default createTranslateFn