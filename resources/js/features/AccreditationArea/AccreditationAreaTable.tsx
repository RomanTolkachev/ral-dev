import AbstractSearchingForm from '@/Components/Table/AbstractSearchingForm';
import { DevTool } from '@hookform/devtools';
import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { AbstractTable } from '@/Components/Table/AbstractTable';
import { AbstractFormProvider, CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider';
import config from './config';
import { AuthContext } from '@/app/providers/AuthProvider';
import { fetchAccreditationAreaFilters } from './api';

interface Props {
    className?: string;

}

const AccreditationAreaTable: FunctionComponent<Props> = ({ className }) => {

    // const { control } = useFormContext();

    const user = useContext(AuthContext);

    // const content = (): ReactNode => {
    //     return !isUserChecked
    //         ? <CenteredLoader>получение данных о пользователе</CenteredLoader>
    //         :  !shouldFetchRal
    //             ? <CenteredLoader>получение пользовательских настроек</CenteredLoader>
    //             : <Table propsData={ralData} loading={isRalPending} />
    // }
    return (
        <AbstractFormProvider 
            tableName='accreditation_area'
            defaultFilters={config.DEFAULT_FILTERS}
            defaultRequest={config.DEFAULT_REQUEST}
            user={user}
            queryFn={fetchAccreditationAreaFilters}
            >
            <div className='flex grow shrink min-h-0'>
                <section
                    className={
                        'bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'
                    }>
                    <div className={'p-2 flex flex-col grow shrink overflow-hidden'}>
                        <div className={'my-block bg-background-block pt-6 flex grow overflow-hidden'}>
                            <AbstractSearchingForm className={'w-full'} />
                        </div>
                    </div>
                </section>
                <section className={'shrink grow flex flex-col'}>
                    <AbstractTable paginatedData={undefined} columns={[]} />
                    {/* {content()} */}
                </section>
                {/* <DevTool control={control} /> */}
            </div>
        </AbstractFormProvider>
    )
};

export default AccreditationAreaTable;