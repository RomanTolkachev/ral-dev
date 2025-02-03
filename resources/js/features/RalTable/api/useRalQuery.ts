import { useQuery } from '@tanstack/react-query'
import { fetchRalQuery } from '@/shared/api/api'
import { objectToString } from '@/shared/objectToString'

export function useRalQuery(queries: Record<string, any>) {
    console.log(queries)
    const { data, isPending } = useQuery({
        queryKey: ['ral', objectToString(queries)],
        queryFn: () => fetchRalQuery(queries).then((res) => res.data),
    })

    return { data, isPending }
}
