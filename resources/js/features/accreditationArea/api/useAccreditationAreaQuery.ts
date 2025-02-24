import { useQuery } from '@tanstack/react-query'
import { fetchRalQuery } from '@/shared/api/api'
import { objectToString } from '@/shared/objectToString'

export function useRalQuery<T>(queries: Record<string, any>) {
    const { data, isPending } = useQuery<T>({
        queryKey: ['ral', objectToString(queries)],
        queryFn: () => fetchRalQuery(queries).then((res) => res.data as T),
    })

    return { data, isPending }
}
