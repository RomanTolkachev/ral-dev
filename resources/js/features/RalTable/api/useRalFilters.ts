import { useQuery } from '@tanstack/react-query'
import { fetchRalFilters } from '@/shared/api/api'
import { objectToString } from '@/shared/objectToString'


/**
 * Фетч фильтров для таблицы. 
 * @param actualFilters - фильтры, которые нужны данному пользователю. Должны браться из user store
 * @returns Возвращает массив с фильтрами
 */
export function useRalFilters(actualFilters: Record<string, any>) {
    const { data, isPending } = useQuery({
        queryKey: ['filters', objectToString(actualFilters)],
        queryFn: () => fetchRalFilters(actualFilters),
    })
    return { data, isPending }
}

