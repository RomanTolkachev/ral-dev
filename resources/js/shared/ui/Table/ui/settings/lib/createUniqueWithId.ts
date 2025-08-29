import { UniqueIdentifier } from "@dnd-kit/core";

interface CreateUniqueOptions {
    exclude?: string[];
    arrays: string[][];
}

export const createUniqueWithId = (options: CreateUniqueOptions): Array<{ value: string, id: UniqueIdentifier }> => {
    const { exclude = [], arrays = [] } = options;
    
    const allItems = arrays.flat();
    const res = [...new Set(allItems)]
        .filter(item => !exclude.includes(item))
        .map((item, index) => ({
            id: `${item}-${index}`,
            value: item
        }));
    
    return res;
}