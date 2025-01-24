function splitValue(value: string): Array<string> {
    let separated = value.split(/[\s,;]+/) 
    return separated[0] === "" ? [] : separated
}

export default splitValue
