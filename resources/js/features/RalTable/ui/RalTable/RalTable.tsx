import { MainButton } from "@/Components/Buttons/MainButton"
import { Table } from "@/Components/Table/Table"
import { DevTool } from "@hookform/devtools"
import { useFormContext } from "react-hook-form"
import RalSearchingForm from "../RalSearchingForm/RalSearchingForm"
import { AuthContext } from "@/app/providers/AuthProvider"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTableSettings } from "@/shared/api/api"
import { isEmpty } from "lodash"
import LoadingDots from "@/Components/utils/LoadingDots"

export const Raltable = () => {
    
    const { control } = useFormContext();

    // получение данных о пользователе
    const user = useContext(AuthContext);
    const userId = user?.user?.userInfo?.id
    const isUserChacked = user ? !user?.user?.isLoading : false // user может быть undefined
   
    // const {data, isFetching, isLoading, error} = useQuery({
    //     enabled: !isEmpty(user),
    //     queryKey: ["ralSettings"],
    //     queryFn: () => {
    //         return userId ? getTableSettings(userId, "ral_short_info_view") : Promise.reject("User ID is undefined");
    //     },
    // })

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
                {/* {isUserChacked ? <Table /> : <div className="h-full w-full flex items-center justify-center">получение данных о пользователе<LoadingDots /></div>} */}
                <Table />
            </section>
            <DevTool control={control} />
        </div>
    )
}