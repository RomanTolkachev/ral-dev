import { fetchRalQuery } from "@/shared/api/api"
import useParamsCustom from "@/shared/query/useParamsCustom"
import IPagination from "@/shared/types/pagination"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { isEmpty } from "lodash"
import { useMemo } from "react"
import { TRalModel } from "../model/types"
import config from "../config"

const useRalQuery = (enabled: boolean, userId: string | undefined, columns: TRalModel[]) => {

    const [, getQuery] = useParamsCustom();
    const rawQuery = getQuery();
    const currentQueries = useMemo(() => rawQuery, [JSON.stringify(rawQuery)]);
   
    const computedQueries = useMemo(() => {
        const base = !isEmpty(currentQueries) ? currentQueries : config.DEFAULT_REQUEST;
        return { ...base, user_columns: columns }
    }, [currentQueries, columns])
    
    const { data: ralData, isPending: isRalPending, fetchStatus: ralFetchStatus } = useQuery<IPagination, AxiosError>({
        enabled,
        queryKey: ['ral', computedQueries, userId],
        queryFn: () => { return fetchRalQuery(computedQueries).then(res => res.data) },
    })

    return {ralData, isRalPending, ralFetchStatus}
}

export default useRalQuery;


