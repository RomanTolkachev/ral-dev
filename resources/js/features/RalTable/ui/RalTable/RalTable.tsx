import { Table } from "@/Components/Table/Table"
import { DevTool } from "@hookform/devtools"
import { useFormContext } from "react-hook-form"
import RalSearchingForm from "../RalSearchingForm/RalSearchingForm"
import { FunctionComponent, ReactNode } from "react"
import { useUserInfo } from "../../hooks/useUserInfo"
import useRalColumns from "../../api/useRalColumns"
import useRalQuery from "../../api/useRalQuery"
import CenteredLoader from "./CenteredLoader"

export const Raltable: FunctionComponent = () => {

    const { control } = useFormContext();

    const { userId, isUserChecked } = useUserInfo();
    const { columns, isColumnsFetching, isColumnsLoading } = useRalColumns(userId);
    const shouldFetchRal = isUserChecked && (!userId || !isColumnsFetching && !isColumnsLoading);
    const { ralData, isRalPending } = useRalQuery(shouldFetchRal, userId, columns)

    const content = (): ReactNode => {
        return !isUserChecked
            ? <CenteredLoader>получение данных о пользователе</CenteredLoader>
            :  !shouldFetchRal
                ? <CenteredLoader>получение пользовательских настроек</CenteredLoader>
                : <Table propsData={ralData} loading={isRalPending} />
    }

    return (
        <div className='flex grow shrink min-h-0'>
            <section
                className={
                    'bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'
                }>
                <div className={'p-2 flex flex-col grow shrink overflow-hidden'}>
                    <div className={'my-block bg-background-block pt-6 flex grow overflow-hidden'}>
                        <RalSearchingForm className={'w-full'} />
                    </div>
                </div>
            </section>
            <section className={'shrink grow flex flex-col'}>
                {content()}
                {/* <Table /> */}
            </section>
            <DevTool control={control} />
        </div>
    )
}