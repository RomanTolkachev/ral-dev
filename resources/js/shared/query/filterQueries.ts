type TInput = {
    [key: string]: any;
} | null;

type TOutput = { [key: string]: any };

export const filterQueries = (dirty: TInput) => {
    if (!dirty) {
        return {};
    }
    return Object.keys(dirty).reduce((acc: TOutput, item) => {
        if (dirty[item]) {
            acc[item] = dirty[item];
        }
        return acc;
    }, {});
};
