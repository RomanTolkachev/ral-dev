import { AuthContext } from "@/app/providers/AuthProvider";
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from "@/shared/ui/Table/providers/AbstractFormProvider";
import { FunctionComponent, ReactNode, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { config } from "./config";
import useTableDataQuery from "@/shared/ui/Table/useTableDataQuery";
import CenteredLoader from "@/Components/utils/CenteredLoader";
import { AbstractTable } from "@/shared/ui/Table";
import { FiltersWidget } from "@/shared/ui/Table/ui/FiltersWidget";
import { DevTool } from "@hookform/devtools";

interface Props {
    className?: string;
}

const RalTable: FunctionComponent<Props> = ({ className }) => {

    const tableName = 'ral';

    const { control } = useFormContext();

    const methods = useFormContext();

    const user = useContext(AuthContext);
    const userId = user?.userInfo?.id
    const isUserChecked = user ? user?.isFetched : false

    const filtersContext = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    if (!filtersContext) {
        return null
    }

    const { filtersData: { data: filters, isFetched: isFiltersFetched } } = filtersContext
    const shouldFetchTableData = isUserChecked && (!userId || isFiltersFetched);
    const { data, fetchStatus, isPending } = useTableDataQuery({
        enabled: isFiltersFetched,
        tableName,
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
        </div>
    )
};

export default RalTable;