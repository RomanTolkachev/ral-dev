import { QueryKey, useQueryClient } from "@tanstack/react-query";

/** 
*    Функция получает агруметами параметр поиска, ключи из useQuery и все кэнированные данные
*    Возвращает либо объект с данными конкретного аккредитованного лица, либо undefined
*/
function findExistingDatabyKey(searchableParam: string, paramsKeys: QueryKey[], cachedClient: any): Record<string, any> | undefined {
    let foundedData: Record<string, any> | undefined = undefined;
    if (paramsKeys.length) {
        for (const item of paramsKeys) {
            const queryData: Record<string, any> | undefined = cachedClient.getQueryData(item);
            if (queryData && queryData.data && Array.isArray(queryData.data) && queryData.data.length) {
                foundedData = queryData.data.find((item: Record<string, any>) => {
                    return item.id.toString() === searchableParam
                });
                if (foundedData) {
                    break;
                }
            };
        }
    };
    return foundedData;
}

function useCachedData(param: string) {
    const queryClient = useQueryClient(); // получаем весь кэш запросов
    const cachedKeys = queryClient.getQueryCache().getAll().map(item => item.queryKey); // получаем все имеющиеся ключи
    return findExistingDatabyKey(param, cachedKeys, queryClient)
}

export default useCachedData;
