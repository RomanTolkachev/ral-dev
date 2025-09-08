import { FunctionComponent, useMemo } from 'react';
import { CustomFormProvider } from '@/shared/ui/Table/providers/CustomFormProvider';
import useTableDataQuery from '@/shared/ui/Table/useTableDataQuery';
import { FiltersWidget } from '@/shared/ui/Table/ui/FiltersWidget';
import { useQuery } from '@tanstack/react-query';
import { fetchTableFilters } from '@/shared/api/api';
import { Outlet } from 'react-router-dom';
import { getErrorMessage } from '@/shared/ui/Table/lib';
import { Table } from '@/shared/ui/Table/ui/Table';
import useParamsCustom from '@/shared/query/useParamsCustom';

interface Props {
    config: IConfig<any>
}

export const TablePage: FunctionComponent<Props> = ({ config }) => {

    const tableName = config.TABLE_NAME;

    const [_, getQuery] = useParamsCustom();
    const rawQuery = getQuery();
    const { page = 1, perPage = 25, order = "", ...noPagination } = rawQuery;

    const { data: filters = [], isFetching, isPending, isLoading } = useQuery({
        queryFn: () => fetchTableFilters(tableName),
        queryKey: ["filters", tableName, noPagination],
    })

    const useTableReturn = useTableDataQuery({
        enabled: true,
        tableName: tableName,
        defaultRequest: config.DEFAULT_REQUEST
    })

    const { data, failureCount, isPlaceholderData, error, isFetching: tableFetching } = useTableReturn

    const firstLoad = useMemo(() => {
        return useTableReturn.isLoading || isPending
    }, [useTableReturn.isLoading, isPending])

    return (
        <div className='flex grow shrink min-h-0'>
            {firstLoad || error?.code ?
                <div className='w-full h-full grid place-items-center text-table-base'>{getErrorMessage(failureCount, error?.code)}</div>
                :
                <CustomFormProvider filters={filters} config={config}>
                    <section className='bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'>
                        <div className='p-2 flex flex-col grow shrink overflow-hidden'>
                            <div className='my-block bg-background-block pt-6 flex grow overflow-hidden'>
                                <FiltersWidget />
                            </div>
                        </div>
                    </section>
                    <section className={'shrink grow flex flex-col'}>
                        <Table
                            failureCount={failureCount}
                            error={error?.code}
                            isUpdating={isPlaceholderData || tableFetching}
                            paginatedData={data}
                            dictionary={config.DICTIONARY} />
                        <Outlet />
                    </section>
                </CustomFormProvider>
            }
        </div>
    )
};
