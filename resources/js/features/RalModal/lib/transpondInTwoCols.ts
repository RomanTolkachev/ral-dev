import { translate } from "./translate"

type ITranspond = {
    [key: string]: any
}
const transpondInTwoCols = (data: ITranspond, leftColumnName: string, rightColumnName: string): ITranspond[] => {
    return Object.keys(data).reduce((acc, originalKey) => {
        let newItem: ITranspond = {
            [leftColumnName]: translate(originalKey),
            [rightColumnName]: data[originalKey],
            __meta: {                                 // сохраняем мета-информацию
                originalKey: originalKey,            // исходный ключ
                translatedKey: translate(originalKey), // переведенный ключ
                isTransposed: true                   // флаг транспонирования
            }
        }
        acc.push(newItem);
        return acc
    }, [] as ITranspond[])
}

export default transpondInTwoCols;