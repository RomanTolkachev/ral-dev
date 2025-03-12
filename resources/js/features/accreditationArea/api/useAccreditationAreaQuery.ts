import { useQuery } from '@tanstack/react-query'
import { fetchAccreditationAreaQuery } from '@/shared/api/api'
import { objectToString } from '@/shared/objectToString'

export function useAccreditationAreaQuery<T>(queries: Record<string, any>) {
    const { data, isPending } = useQuery<T>({
        queryKey: ['accredtation-area', objectToString(queries)],
        queryFn: () => fetchAccreditationAreaQuery(queries).then((res) => res.data as T),
    })
    return { data, isPending }
}
