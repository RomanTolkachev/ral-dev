import { getTableSettings } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type TParams = {
    userId: string | undefined,
    tableName: string,
}

const useUserColumns = ({ userId, tableName }: TParams) => {
    const { data: fetchedColumns = [], isFetching: isColumnsFetching, isLoading: isColumnsLoading, error: columnsError } = useQuery<string[], AxiosError>({
        enabled: !!userId,
        queryKey: ["ralColumns"],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => {
            return userId ? getTableSettings(userId, tableName) : Promise.reject("User ID is undefined");
        },
    })
    return { isColumnsFetching, isColumnsLoading, columnsError }
}

export default useUserColumns;

