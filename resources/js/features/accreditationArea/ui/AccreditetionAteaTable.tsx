import { MainButton } from "@/Components/Buttons/MainButton"
import { Table } from "@/Components/Table/Table"
import { DevTool } from "@hookform/devtools"
import { useFormContext } from "react-hook-form"

export const AccreditationAreaTable = () => {
    
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
                {/* <Table /> */}
            {/* <DevTool control={control} /> */}
            </section>
        </div>
    )
}