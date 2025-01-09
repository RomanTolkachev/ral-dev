import { useQuery } from '@tanstack/react-query';
import { fetchRalQuery } from '@/services/api';
import { objectToString } from '@/shared/objectToString';
import { filterQueries } from '@/shared/filterQueries.ts';

export function useRalQuery(queries) {
    const filteredQueries = filterQueries(queries); // убираем из query все falsy параметры

    const { data, isPending } = useQuery({
        queryKey: ['ral', objectToString(filteredQueries)],
        queryFn: () => fetchRalQuery(filteredQueries).then((res) => res.data),
    });

    return { data, isPending };
}
