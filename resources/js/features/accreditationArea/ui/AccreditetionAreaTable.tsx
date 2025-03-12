import { MainButton } from "@/Components/Buttons/MainButton"
import { useSelectorTyped } from "@/features/store/typedUseSelector"
import { DevTool } from "@hookform/devtools"
import { isEmpty } from "lodash"
import { useFormContext } from "react-hook-form"
import DEFAULT_REQUEST from "../config"
import useParamsCustom from "@/shared/query/useParamsCustom"
import IPagination from "@/shared/types/pagination"
import { Preloader } from "@/Components/utils/Preloader"
import { AbstractTable } from "@/Components/Table/AbstractTable"
import { useAccreditationAreaQuery } from "../api/useAccreditationAreaQuery"

export const AccreditationAreaTable = () => {

    const [, getQuery] = useParamsCustom();
    const userColumns = useSelectorTyped(state => state.userState.settings.AccreditationAreaColumns); // колонки конкретного юзера
    const queries = isEmpty(getQuery()) ? DEFAULT_REQUEST : getQuery();
    // queries.user_columns = userColumns; // к дефолтному запросу добавляем колонки пользователя
    const { data: accreditationData, isPending } = useAccreditationAreaQuery<IPagination>(queries); //TODO: тут нужно вынести выше и через пропсы давать query
    
    // const { control } = useFormContext();

    return (
        <div className='flex grow shrink min-h-0'>
            <section
                className={
                    'bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'
                }>
                <div className={'p-2 flex flex-col grow shrink overflow-hidden'}>
                    <div className={'my-block bg-background-block pt-6 flex grow overflow-hidden'}>
                        {/* <RalSearchingForm className={'w-full'} /> */}
                    </div>
                </div>
            </section>
            <section className={'shrink pt-8 grow flex flex-col'}>
                <div className={'flex justify-end gap-3 pr-10 mb-2'}>
                    <MainButton color={'red'}>кнопка 1</MainButton>
                    <MainButton color={'white'}>кнопка 2</MainButton>
                    <MainButton color={'violet'}>кнопка 3</MainButton>
                </div>
                { isPending && !isEmpty(accreditationData)
                    ? <Preloader className={'h-full flex items-center'} widthStyles={'w-16'} /> 
                    : <AbstractTable paginatedData={accreditationData} columns={userColumns} />
                }
            {/* <DevTool control={control} /> */}
            </section>
        </div>
    )
}


