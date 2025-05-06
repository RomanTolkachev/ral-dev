import { getTableSettings } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import config, {  } from "../config";
import { TRalModel } from "../model/types";


const useRalColumns = (userId: string | undefined) => {
    const { data: fetchedColumns = [], isFetching: isColumnsFetching, isLoading: isColumnsLoading, error: columnsError } = useQuery<TRalModel[], AxiosError>({
        enabled: !!userId,
        queryKey: ["ralColumns"],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => {
            return userId ? getTableSettings(userId, "ral_short_info_view") : Promise.reject("User ID is undefined");
        },
    })

    const columns: TRalModel[] = !isEmpty(fetchedColumns) ? fetchedColumns : config.DEFAULT_COLUMNS;

    return { columns, isColumnsFetching, isColumnsLoading, columnsError }
}

export default useRalColumns;

