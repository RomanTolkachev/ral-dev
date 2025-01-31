import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { isArray, keys } from "lodash";


/* 
    Функция получает агруметами параметр поиска, ключи из useQuery и все кэнированные данные
    Возвращает либо объект с данными конкретного аккредитованного лица, либо undefined
*/
function findExistingDatabyKey(searchableParam: string, paramsKeys: QueryKey[], cachedClient: any): Record<string, any> | undefined {
    let foundedData: Record<string, any> | undefined = undefined;
    if (paramsKeys.length) {
        // console.log("ключи имеются")
        for (const item of paramsKeys) {
            const queryData: Record<string, any> | undefined = cachedClient.getQueryData(item);
            // если есть какие-то значения в data
            if (queryData && queryData.data && isArray(queryData.data) && queryData.data.length) {
                // console.log("зашли в нижний if, ищем данные")
                foundedData = queryData.data.find((item: Record<string, any>) => {
                    // console.log("внутри поиска")
                    return item.id.toString() === searchableParam
                });
                if (foundedData) {
                    break;
                }
            };
        }
    };
    // console.log("перед выходом из хука", foundedData)
    return foundedData;
}

function useCachedData(param: string) {
    const queryClient = useQueryClient(); // получаем весь кэш запросов
    const cachedKeys = queryClient.getQueryCache().getAll().map(item => item.queryKey); // получаем все имеющиеся ключи
    return findExistingDatabyKey(param, cachedKeys, queryClient)
}

export default useCachedData;
