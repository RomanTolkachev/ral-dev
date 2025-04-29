import { getTableSettings } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import config, { TRalTableModel } from "../config";


const useRalColumns = (userId: string | undefined) => {
    const { data: fetchedColumns = [], isFetching: isColumnsFetching, isLoading: isColumnsLoading, error: columnsError } = useQuery<TRalTableModel[], AxiosError>({
        enabled: !!userId,
        queryKey: ["ralColumns"],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => {
            return userId ? getTableSettings(userId, "ral_short_info_view") : Promise.reject("User ID is undefined");
        },
    })

    const columns: TRalTableModel[] = !isEmpty(fetchedColumns) ? fetchedColumns : config.DEFAULT_COLUMNS;

    return { columns, isColumnsFetching, isColumnsLoading, columnsError }
}

export default useRalColumns;

