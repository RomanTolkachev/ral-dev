import { fetchAbstractTable, fetchRalQuery } from "@/shared/api/api"
import useParamsCustom from "@/shared/query/useParamsCustom"
import IPagination, { TDefaultPaginationRequest } from "@/shared/types/pagination"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { isEmpty } from "lodash"
import { useEffect, useMemo } from "react"

type TParams = {
    tableName: string,
    enabled: boolean,
    userId: string | undefined,
    defaultRequest: TDefaultPaginationRequest
}

const useTableDataQuery = ({ tableName, defaultRequest }: TParams) => {

    const [, getQuery] = useParamsCustom();
    const rawQuery = getQuery();
    const currentQueries = useMemo(() => rawQuery, [JSON.stringify(rawQuery)]);

    const computedQueries = useMemo(() => {
        const base = !isEmpty(currentQueries) ? currentQueries : defaultRequest;
        return { ...base }
    }, [currentQueries])

    const queryKey = useMemo(() => {
        return [tableName, computedQueries];
    }, [tableName, JSON.stringify(computedQueries)]); // Сериализуем для стабильности

    const { data, isPending, fetchStatus } = useQuery<IPagination, AxiosError>({
        queryKey: queryKey,
        queryFn: () => {
            return fetchAbstractTable(tableName, computedQueries).then(res => res.data)
        }
    })

    return { data, isPending, fetchStatus }
}

export default useTableDataQuery;


