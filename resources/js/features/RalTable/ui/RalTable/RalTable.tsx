import { MainButton } from "@/Components/Buttons/MainButton"
import { Table } from "@/Components/Table/Table"
import { DevTool } from "@hookform/devtools"
import { useFormContext } from "react-hook-form"
import RalSearchingForm from "../RalSearchingForm/RalSearchingForm"

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
                        <RalSearchingForm className={'w-full'} />
                    </div>
                </div>
            </section>
            <section className={'shrink grow flex flex-col'}>
                <Table />
            </section>
            <DevTool control={control} />
        </div>
    )
}