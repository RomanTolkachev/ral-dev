import { useQuery } from '@tanstack/react-query'
import { fetchRalQuery } from '@/shared/api/api'
import { objectToString } from '@/shared/objectToString'

export function useRalQuery(queries: Record<string, any>) {
    const filteredQueries = queries

    const { data, isPending } = useQuery({
        queryKey: ['ral', objectToString(filteredQueries)],
        queryFn: () => fetchRalQuery(filteredQueries).then((res) => res.data),
    })

    return { data, isPending }
}
