export function objectToString(object: Record<string, any>): string {
    return Object.keys(object)
        .reduce((acc, key) => {
            return `${acc}${key}-${object[key]}-`;
        }, '')
        .slice(0, -1);
}
