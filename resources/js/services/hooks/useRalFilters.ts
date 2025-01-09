import { useQuery } from '@tanstack/react-query';
import { fetchRalFilters } from '@/services/api.ts';
import { ISearchingFormItem } from '@/types/searchingFilters';

export function useRalFilters() {
    const { data, isPending } = useQuery({
        queryKey: ['filters'],
        queryFn: () => fetchRalFilters.then((res) => res.data),
    });

    return { data, isPending };
}
