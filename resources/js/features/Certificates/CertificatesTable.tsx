import { DevTool } from '@hookform/devtools';
import { FunctionComponent, ReactNode, useContext } from 'react';
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider';
import config from './config';
import { AuthContext } from '@/app/providers/AuthProvider';
import useTableDataQuery from '@/Components/Table/useTableDataQuery';
import useUserColumns from '@/Components/Table/useUserColumns';
import { useFormContext } from 'react-hook-form';
import { AbstractTable } from '@/Components/Table';
import CenteredLoader from '@/Components/utils/CenteredLoader';
import { FiltersWidget } from '@/Components/Table/ui/FiltersWidget';

interface Props {
    className?: string;
}

const CertificatesTable: FunctionComponent<Props> = ({ className }) => {

    const tableName = 'certificates';

    const { control } = useFormContext();

    const user = useContext(AuthContext);
    const userId = user?.userInfo?.id
    const isUserChecked = user ? user?.isFetched : false

    const filtersContext = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    if (!filtersContext) {
        return null
    }

    const { columns: userColumns, isColumnsLoading } = useUserColumns({
        userId: userId,
        defaultColumns: config.DEFAULT_COLUMNS,
        tableName
    })
    const { filtersData: { data: filters, isFetched: isFiltersFetched } } = filtersContext
    const shouldFetchTableData = isUserChecked && (!userId || isFiltersFetched && !isColumnsLoading);
    const { data, fetchStatus, isPending } = useTableDataQuery({
        enabled: isFiltersFetched,
        tableName,
        columns: userColumns ? userColumns : config.DEFAULT_COLUMNS,
        userId: user?.userInfo?.id,
        defaultRequest: config.DEFAULT_REQUEST
    })

    const content = (): ReactNode => {
        return !isUserChecked
            ? <CenteredLoader>получение данных о пользователе</CenteredLoader>
            : !shouldFetchTableData
                ? <CenteredLoader>получение пользовательских настроек</CenteredLoader>
                : <AbstractTable paginatedData={data} loading={isPending} dictionary={config.DICTIONARY} />
    }


    return (
        <div className='flex grow shrink min-h-0'>
            <section
                className={
                    'bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'
                }>
                <div className={'p-2 flex flex-col grow shrink overflow-hidden'}>
                    <div className={'my-block bg-background-block pt-6 flex grow overflow-hidden'}>
                        <FiltersWidget
                            className={'w-full'}
                            filters={filters}
                            dictionary={config.DICTIONARY} />
                    </div>
                </div>
            </section>
            <section className={'shrink grow flex flex-col'}>
                {content()}
            </section>
            <DevTool control={control} />
        </div>
    )
};

export default CertificatesTable;