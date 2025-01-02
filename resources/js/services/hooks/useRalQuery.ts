import {useQuery} from "@tanstack/react-query";
import {fetchRalQuery} from "@/services/api";

export const useRalQuery = (page: number = 1, perPage: number = 10) => {
    const {data, isPending} = useQuery({
        queryKey: ['ral', `page:${page}-parPage-${perPage}`],
        queryFn: () => fetchRalQuery({page: page, perPage: perPage})
    });
    return {data, isPending}
}
