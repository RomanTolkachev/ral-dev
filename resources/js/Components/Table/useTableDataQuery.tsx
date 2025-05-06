import { fetchAbstractTable, fetchRalQuery } from "@/shared/api/api"
import useParamsCustom from "@/shared/query/useParamsCustom"
import IPagination, { TDefaultPaginationRequest } from "@/shared/types/pagination"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { isEmpty } from "lodash"
import { useMemo } from "react"

type TParams = {
    tableName: string, 
    enabled: boolean, 
    userId: string | undefined, 
    columns: string[], 
    defaultRequest: TDefaultPaginationRequest
}

const useTableDataQuery = ({tableName, enabled, userId, columns, defaultRequest}:TParams) => {

    const [, getQuery] = useParamsCustom();
    const rawQuery = getQuery();
    const currentQueries = useMemo(() => rawQuery, [JSON.stringify(rawQuery)]);
   
    const computedQueries = useMemo(() => {
        const base = !isEmpty(currentQueries) ? currentQueries : defaultRequest;
        return { ...base, user_columns: columns }
    }, [currentQueries, columns])
    
    const { data, isPending, fetchStatus } = useQuery<IPagination, AxiosError>({
        enabled,
        queryKey: [tableName, computedQueries, userId],
        queryFn: () => { return fetchAbstractTable(tableName, computedQueries).then(res => res.data) },
    })

    return {data, isPending, fetchStatus}
}

export default useTableDataQuery;


