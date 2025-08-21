    type ITranspond = {
        [key: string]: any
    }
    
    export const transpondInTwoCols = (data: ITranspond, leftColumnName: string, rightColumnName: string): ITranspond[] => {
        return Object.keys(data).reduce((acc, item) => {
            let newItem: ITranspond = {
                [leftColumnName]: item,
                [rightColumnName]: data[item]
            }
            acc.push(newItem);
            return acc
        }, [] as ITranspond[])
    }
