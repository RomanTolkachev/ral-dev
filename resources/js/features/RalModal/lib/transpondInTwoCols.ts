import { translate } from "./translate"

    type ITranspond = {
        [key: string]: any
    }
    const transpondInTwoCols = (data: ITranspond, leftColumnName: string, rightColumnName: string): ITranspond[] => {
        return Object.keys(data).reduce((acc, item) => {
            let newItem: ITranspond = {
                [leftColumnName]: translate(item),
                [rightColumnName]: data[item]
            }
            acc.push(newItem);
            return acc
        }, [] as ITranspond[])
    }

    export default transpondInTwoCols;