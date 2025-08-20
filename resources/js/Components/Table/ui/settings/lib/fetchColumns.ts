import { axiosApi } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getTableSettings = (tableName: string): Promise<string[]> => {
    return axiosApi.get<string[]>(`/settings`, {
        params: {tableName},
        headers: {
            Accept: "application/json", 
            'Content-Type': 'application/json', 
        },
        withCredentials: true
    }).then(res => res.data)
}

export const fetchAwailableColumns = (columnsFor: string) => {
    const { data: availableColumns = [], isFetching: isAvailableColumnsFetching, isLoading: isAvailableColumnsLoading, error: AvailableColumnsError } = useQuery<string[], AxiosError>({
        queryKey: [columnsFor],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getTableSettings(columnsFor)
    })
    return { availableColumns, isAvailableColumnsFetching, isAvailableColumnsLoading, AvailableColumnsError }
}

export const useSelectedColumns = (columnsFor: string) => {
    const { data: selectedColumns = [], isFetching: isSelectedColumnsFetching, isLoading: isSelectedColumnsLoading, error: SelectedColumnsError } = useQuery<string[], AxiosError>({
        queryKey: [columnsFor],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getTableSettings(columnsFor)
    })
    return { selectedColumns, isSelectedColumnsFetching, isSelectedColumnsLoading, SelectedColumnsError }
}


