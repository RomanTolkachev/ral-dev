import { SVG } from "@/Components/utils/SVG";
import { FC } from "react";

export const NoData: FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <div className='w-[300px]'>
                <SVG className={' mb-2'} notFound />
                <p
                    className={
                        'text-3xl text-nowrap tracking-tight font-black text-text-primary ' +
                        'first-letter:capitalize text-center'
                    }>
                    данные не найдены
                </p>
            </div>
        </div>
    )
}