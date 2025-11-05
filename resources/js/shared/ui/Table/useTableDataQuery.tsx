import { fetchAbstractTable } from "@/shared/api/api"
import useParamsCustom from "@/shared/query/useParamsCustom"
import IPagination, { TDefaultPaginationRequest } from "@/shared/types/pagination"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import isEmpty from "lodash-es/isEmpty"
import { useMemo } from "react"

type TParams = {
    tableName: string,
    enabled: boolean,
    defaultRequest: TDefaultPaginationRequest
}

const useTableDataQuery = ({ tableName, defaultRequest }: TParams) => {
    const [_, getQuery] = useParamsCustom();
    const rawQuery = getQuery();

    const currentQueries = useMemo(() => {
        return !isEmpty(rawQuery) ? rawQuery : defaultRequest;
    }, [rawQuery, defaultRequest])

    const queryKey = useMemo(() => {
        return [tableName, currentQueries];
    }, [tableName, currentQueries]);

    const useTableReturn = useQuery<IPagination, AxiosError>({
        queryKey: queryKey,
        queryFn: ({ signal }) => {
            return fetchAbstractTable(tableName, currentQueries, signal).then(res => res.data)
        },
        retry: (fails, err) => fails < 2,
        placeholderData: keepPreviousData, // пока мы фетчим, у нас будет старая data
        staleTime: 1000 * 60 * 5, // 5 минут - данные считаются свежими
    })

    return useTableReturn
}

export default useTableDataQuery;