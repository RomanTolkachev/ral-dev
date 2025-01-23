import { MainButton } from "@/Components/Buttons/MainButton"
import { Table } from "@/Components/Table/Table"
import { TableSearchingForm } from "@/features/RalTable/ui/RalSearchingForm/RalSearchingForm"
import { DevTool } from "@hookform/devtools"
import { useFormContext } from "react-hook-form"

export const Raltable = () => {
    
    const { control } = useFormContext();

    return (
        <div className='flex grow shrink min-h-0'>
            <section
                className={
                    'bg-background shrink-0 grid grid-rows-[1fr] !grid-cols-[300px] h-full overflow-hidden'
                }>
                <div className={'p-2 flex flex-col grow shrink overflow-hidden'}>
                    <div className={'my-block bg-background-block pt-6 flex grow overflow-hidden'}>
                        <TableSearchingForm className={'w-full'} />
                    </div>
                </div>
            </section>
            <section className={'shrink grow flex flex-col'}>
                <div className={'flex justify-end gap-3 pr-10 mb-2'}>
                    <MainButton color={'red'}>Скрыть истекшие</MainButton>
                    <MainButton color={'white'}>Выгрузить</MainButton>
                    <MainButton color={'violet'}>изменить тему</MainButton>
                </div>
                <Table />
            <DevTool control={control} />
            </section>
        </div>
    )
}