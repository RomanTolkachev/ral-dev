function handleValue(value: Array<string> | string): string {
    return Array.isArray(value) ? value.join(' ') : value
}

export default handleValue;