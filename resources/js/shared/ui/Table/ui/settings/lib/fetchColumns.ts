import { axiosApi } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getAvailableColumns = (tableName: string): Promise<string[]> => {
    return axiosApi.get<string[]>(`/available_columns`, {
        params: { for: tableName },
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }).then(res => res.data)
}

const getUserColumns = (tableName: string): Promise<string[]> => {
    return axiosApi.get<string[]>(`/user_columns`, {
        params: { for: tableName },
        withCredentials: true,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }
    }).then(res => res.data)
}

export const fetchAwailableColumns = (columnsFor: string) => {
    const { data: availableColumns = [], isFetching: isAvailableColumnsFetching, isLoading: isAvailableColumnsLoading, error: AvailableColumnsError } = useQuery<string[], AxiosError>({
        queryKey: ['available', columnsFor],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getAvailableColumns(columnsFor)
    })
    return { availableColumns, isAvailableColumnsFetching, isAvailableColumnsLoading, AvailableColumnsError }
}

export const fetchSelectedColumns = (columnsFor: string) => {
    const { data: selectedColumns = [], isFetching: isSelectedColumnsFetching, isLoading: isSelectedColumnsLoading, error: SelectedColumnsError } = useQuery<string[], AxiosError>({
        queryKey: ['selected', columnsFor],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getUserColumns(columnsFor)
    })
    return { selectedColumns, isSelectedColumnsFetching, isSelectedColumnsLoading, SelectedColumnsError }
}


