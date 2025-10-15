type ParserData = { [key: string]: any };
type ParsedParser = { name: string;[key: string]: any };

const mainParserPrefixes = [
    "fav_parser",
    "ral_parser",
    "decl_parser",
    "np_parser",
    "applicant_parser",
];

export function extractMainParsers(data: ParserData): ParsedParser[] {
    const result: ParsedParser[] = [];

    mainParserPrefixes.forEach((prefix) => {
        const parserObj: ParsedParser = { name: prefix };
        let hasData = false;

        for (const key in data) {
            if (key.startsWith(prefix)) {
                const newKey = key.slice(prefix.length).replace(/^_/, ""); // убираем ведущий "_"
                parserObj[newKey] = data[key];
                hasData = true;
            }
        }

        if (hasData) {
            result.push(parserObj);
        }
    });

    return result;
}
